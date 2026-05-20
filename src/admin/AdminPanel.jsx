import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import axios from "axios";

export default function AdminPanel() {

  const [products, setProducts] = useState([]);

  // ---------------- FILTER STATUS (NEW) ----------------
  const [filterStatus, setFilterStatus] = useState("all");

  // ---------------- FORM ----------------
  const [form, setForm] = useState({
    id: null,
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
    images: [],
    stock: 0,
    variants: [],
    hasVariants: false,
    active: true
  });

  // ---------------- VARIANTS TEMP ----------------
  const [variantName, setVariantName] = useState("");
  const [variantStock, setVariantStock] = useState(0);

  // ---------------- LOAD ----------------
  const loadProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setProducts(data || []);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // ---------------- CLOUDINARY ----------------
  const uploadImage = async (file) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "lielashop");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dx17lxzey/image/upload",
      formData
    );

    return res.data.secure_url;
  };

  // ---------------- ADD IMAGE ----------------
  const handleAddImage = async (file) => {
    const url = await uploadImage(file);

    setForm((prev) => ({
      ...prev,
      image: prev.image || url,
      images: [...(prev.images || []), url]
    }));
  };

  // ---------------- REMOVE IMAGE (NEW) ----------------
  const removeImage = (index) => {
    const updated = [...form.images];
    updated.splice(index, 1);
    setForm({ ...form, images: updated });
  };

  // ---------------- SAVE ----------------
  const saveProduct = async () => {

    const payload = {
      name: form.name,
      price: form.price,
      description: form.description,
      category: form.category,
      image: form.images[0] || form.image,
      images: form.images,
      stock: form.stock,
      variants: form.variants,
      hasVariants: form.hasVariants,
      active: form.active
    };

    if (form.id) {
      await supabase
        .from("products")
        .update(payload)
        .eq("id", form.id);
    } else {
      await supabase
        .from("products")
        .insert([payload]);
    }

    setForm({
      id: null,
      name: "",
      price: "",
      description: "",
      category: "",
      image: "",
      images: [],
      stock: 0,
      variants: [],
      hasVariants: false,
      active: true
    });

    setVariantName("");
    setVariantStock(0);

    loadProducts();
  };

  // ---------------- EDIT ----------------
  const editProduct = (product) => {
    setForm(product);
  };

  // ---------------- DELETE ----------------
  const deleteProduct = async (id) => {
    await supabase
      .from("products")
      .delete()
      .eq("id", id);

    loadProducts();
  };

  // ---------------- ADD VARIANT ----------------
  const addVariant = () => {
    setForm({
      ...form,
      variants: [
        ...form.variants,
        { name: variantName, stock: variantStock }
      ],
      hasVariants: true
    });

    setVariantName("");
    setVariantStock(0);
  };

  // ---------------- TOGGLE ACTIVE ----------------
  const toggleActive = async (product) => {
    await supabase
      .from("products")
      .update({ active: !product.active })
      .eq("id", product.id);

    loadProducts();
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Panel Admin
      </h1>

      {/* ---------------- FORM ---------------- */}
      <div className="border p-4 rounded-xl space-y-3">

        <input
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          placeholder="Precio"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          placeholder="Categoría"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border p-2 w-full"
        />

        {/* ---------------- IMAGE UPLOAD ---------------- */}
        <label className="bg-black text-white px-4 py-2 rounded cursor-pointer inline-block">
          Subir imagen
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) handleAddImage(file);
            }}
          />
        </label>

        {/* ---------------- IMAGE PREVIEW + DELETE ---------------- */}
        <div className="flex gap-2 flex-wrap mt-2">
          {form.images.map((img, i) => (
            <div key={i} className="relative">
              <img src={img} className="w-16 h-16 object-cover border" />

              <button
                onClick={() => removeImage(i)}
                className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1"
              >
                X
              </button>
            </div>
          ))}
        </div>

        <input
          placeholder="Stock"
          type="number"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
          className="border p-2 w-full"
        />

        <textarea
          placeholder="Descripción"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 w-full"
        />

        {/* ---------------- VARIANTS ---------------- */}
        <div className="border p-3">
          <h3 className="font-bold mb-2">Variantes (tonos)</h3>

          <input
            placeholder="Nombre tono"
            value={variantName}
            onChange={(e) => setVariantName(e.target.value)}
            className="border p-2 w-full mb-2"
          />

          <input
            placeholder="Stock"
            type="number"
            value={variantStock}
            onChange={(e) => setVariantStock(Number(e.target.value))}
            className="border p-2 w-full mb-2"
          />

          <button
            onClick={addVariant}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Agregar variante
          </button>

          <div className="mt-2">
            {form.variants.map((v, i) => (
              <div key={i}>
                {v.name} - stock: {v.stock}
              </div>
            ))}
          </div>
        </div>

        {/* ---------------- ACTIVE ---------------- */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
          />
          Activo
        </label>

        <button
          onClick={saveProduct}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {form.id ? "Actualizar" : "Crear"}
        </button>

      </div>

      {/* ---------------- FILTERS (NEW) ---------------- */}
      <div className="flex gap-2 mt-6 mb-4">

        <button
          onClick={() => setFilterStatus("all")}
          className={`px-3 py-1 border rounded ${filterStatus === "all" ? "bg-black text-white" : ""}`}
        >
          Todos
        </button>

        <button
          onClick={() => setFilterStatus("active")}
          className={`px-3 py-1 border rounded ${filterStatus === "active" ? "bg-black text-white" : ""}`}
        >
          Activos
        </button>

        <button
          onClick={() => setFilterStatus("hidden")}
          className={`px-3 py-1 border rounded ${filterStatus === "hidden" ? "bg-black text-white" : ""}`}
        >
          Ocultos
        </button>

      </div>

      {/* ---------------- LIST ---------------- */}
      <div className="grid gap-4 mt-6">

        {products
          .filter((p) => {
            if (filterStatus === "active") return p.active !== false;
            if (filterStatus === "hidden") return p.active === false;
            return true;
          })
          .map((p) => (

            <div key={p.id} className="border p-4 rounded-xl">

              <h2 className="font-bold">{p.name}</h2>
              <p>{p.price}</p>
              <p>{p.category}</p>

              {!p.active && (
                <span className="text-red-500">Oculto</span>
              )}

              <button
                onClick={() => toggleActive(p)}
                className="bg-gray-700 text-white px-3 py-1 rounded mt-2"
              >
                {p.active ? "Ocultar" : "Activar"}
              </button>

              <div className="flex gap-2 mt-2">

                <button
                  onClick={() => editProduct(p)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>

                <button
                  onClick={() => deleteProduct(p.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Eliminar
                </button>

              </div>

            </div>

          ))}

      </div>

    </div>
  );
}