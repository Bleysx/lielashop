import { createClient } from "@supabase/supabase-js";
// ✅ correcto
import products from "../data/products.optimized.js";

// 🔐 pon tus keys aquí (solo para script local)
const supabaseUrl = "https://uplwdpbwmwtrxlyempjq.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

function format(p) {
  const firstImage = p.images?.[0];

  return {
    name: p.name,
    price: p.price,
    description: p.description || "",
    image: firstImage || "",   // fallback seguro
    images: p.images || [],
    category: p.category,
    hasVariants: p.hasVariants || false,
    variants: p.variants || null
  };
}

async function seed() {
  console.log("🚀 Iniciando migración...");

  const formatted = products.map(format);

const { error } = await supabase
  .from("products")
  .insert(formatted);

if (error) {
  console.error("❌ Error:", error);
  return;
}

console.log(
  "✅ Migración completa:",
  formatted.length,
  "productos"
);

seed();

}