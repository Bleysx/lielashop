import fetch from "node-fetch";
import FormData from "form-data";
import products from "./src/products.js";
import fs from "fs";

const CLOUD_NAME = "dx17lxzey";
const UPLOAD_PRESET = "lielashop";

async function uploadImage(url) {
  const formData = new FormData();
  formData.append("file", url);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  if (!data.public_id) {
    console.log("❌ ERROR SUBIENDO:", data);
  }

  return data.public_id;
}

async function migrate() {
  console.log("🔥 INICIANDO MIGRACIÓN...");

  const updated = [];

  for (const product of products) {
    const newImages = [];

    for (const img of product.images) {
      if (!img) continue;

      console.log("⬆️ Subiendo:", img);

      const publicId = await uploadImage(img);

      if (publicId) newImages.push(publicId);
    }

    updated.push({
      ...product,
      images: newImages,
    });
  }

  console.log("✅ MIGRACIÓN TERMINADA");
  fs.writeFileSync(
  "products.optimized.js",
  `export default ${JSON.stringify(updated, null, 2)};`
);

console.log("📁 Archivo creado: products.optimized.js");
}

migrate();