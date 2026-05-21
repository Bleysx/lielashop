import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import axios from "axios";

export default function AdminPanel() {

  const [products, setProducts] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [editing, setEditing] = useState(false);

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

  const [variantName, setVariantName] = useState("");

  // ---------------- NORMALIZE ----------------
  const normalizeProduct = (p) => ({
    ...p,
    images: Array.isArray(p.images) ? p.images : [],
    variants: Array.isArray(p.variants) ? p.variants : []
  });

  // ---------------- LOAD ----------------
  const loadProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setProducts((data || []).map(normalizeProduct));
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // ---------------- REALTIME ----------------
  useEffect(() => {
    const channel = supabase
      .channel("products-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        () => loadProducts()
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
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

  const handleAddImage = async (file) => {
    if (!file) return;

    const url = await uploadImage(file);

    setForm(prev => ({
      ...prev,
      images: [...(prev.images || []), url],
      image: prev.image || url
    }));
  };

  const removeImage = (i) => {
    setForm(prev => ({
      ...prev,
      images: (prev.images || []).filter((_, index) => index !== i)
    }));
  };

  // ---------------- SAVE (FIX FINAL VARIANTS BUG) ----------------
  const saveProduct = async () => {

    const payload = {
      name: form.name,
      price: form.price,
      description: form.description,
      category: form.category,
      image: form.images?.length ? form.images[0] : form.image,

      images: Array.isArray(form.images) ? form.images : [],

      // 🔥 FIX REAL: NO fallback a existing, permite borrar correctamente
      variants: Array.isArray(form.variants) ? form.variants : [],

      stock: form.stock,
      hasVariants: form.hasVariants,
      active: form.active
    };

    const { error } = form.id
      ? await supabase.from("products").update(payload).eq("id", form.id)
      : await supabase.from("products").insert([payload]);

    if (error) return;

    resetForm();
    setEditing(false);
  };

  // ---------------- EDIT ----------------
  const editProduct = (p) => {
    const safe = normalizeProduct(p);

    setForm({
      id: safe.id,
      name: safe.name || "",
      price: safe.price || "",
      description: safe.description || "",
      category: safe.category || "",
      image: safe.image || "",
      images: safe.images,
      stock: safe.stock || 0,
      variants: safe.variants,
      hasVariants: safe.hasVariants || false,
      active: safe.active ?? true
    });

    setEditing(true);
  };

  const resetForm = () => {
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
  };

  const cancelEdit = () => {
    resetForm();
    setEditing(false);
  };

  // ---------------- VARIANTS FIX ----------------
  const addVariant = () => {
    if (!variantName.trim()) return;

    setForm(prev => ({
      ...prev,
      variants: [
        ...(Array.isArray(prev.variants) ? prev.variants : []),
        { name: variantName.trim() }
      ]
    }));

    setVariantName("");
  };

  const removeVariant = (index) => {
    setForm(prev => ({
      ...prev,
      variants: (Array.isArray(prev.variants) ? prev.variants : [])
        .filter((_, i) => i !== index)
    }));
  };

  // ---------------- FILTER ----------------
  const filtered = (products || []).filter(p => {
    if (filterStatus === "active") return p.active === true;
    if (filterStatus === "hidden") return p.active === false;
    return true;
  });

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">Panel Admin</h1>

      {editing && (
        <div className="mb-4 flex gap-2 items-center">
          <span className="text-blue-600 text-sm">Editando producto</span>

          <button
            onClick={cancelEdit}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Terminar edición
          </button>
        </div>
      )}

      {/* FILTERS */}
      <div className="flex gap-2 mb-4">

        <button onClick={() => setFilterStatus("all")}
          className={`px-3 py-1 border rounded ${filterStatus === "all" ? "bg-black text-white" : ""}`}>
          Todos
        </button>

        <button onClick={() => setFilterStatus("active")}
          className={`px-3 py-1 border rounded ${filterStatus === "active" ? "bg-black text-white" : ""}`}>
          Activos
        </button>

        <button onClick={() => setFilterStatus("hidden")}
          className={`px-3 py-1 border rounded ${filterStatus === "hidden" ? "bg-black text-white" : ""}`}>
          Ocultos
        </button>

      </div>

      {/* FORM */}
      <div className="border p-4 rounded-xl space-y-3">

        <input
          className="border p-2 w-full"
          placeholder="Nombre"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border p-2 w-full"
          placeholder="Precio"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
        />

        <input
          className="border p-2 w-full"
          placeholder="Categoría"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
        />

        <label className="bg-black text-white px-4 py-2 rounded cursor-pointer inline-block">
          Subir imagen
          <input
            type="file"
            hidden
            onChange={e => handleAddImage(e.target.files[0])}
          />
        </label>

        <div className="flex gap-2 flex-wrap">
          {form.images.map((img, i) => (
            <div key={i} className="relative">
              <img src={img} className="w-16 h-16 object-cover border" />
              <button
                onClick={() => removeImage(i)}
                className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* VARIANTS */}
        <div className="border p-3">

          <div className="text-sm mb-2">
            Variantes agregadas: {form.variants.length}
          </div>

          <input
            className="border p-2 w-full mb-2"
            placeholder="Nombre variante"
            value={variantName}
            onChange={e => setVariantName(e.target.value)}
          />

          <button
            onClick={addVariant}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Agregar variante
          </button>

          <div className="mt-3 space-y-2">
            {form.variants.map((v, i) => (
              <div key={i} className="flex justify-between items-center border p-2 rounded">
                <span>{v.name}</span>

                <button
                  onClick={() => removeVariant(i)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>

        </div>

        <button
          onClick={saveProduct}
          className="bg-black text-white w-full py-2 rounded"
        >
          {form.id ? "Actualizar" : "Crear"}
        </button>

      </div>

      {/* LIST */}
      <div className="grid gap-4 mt-6">

        {filtered.map(p => (
          <div key={p.id} className="border p-4 rounded-xl">

            <h2 className="font-bold">{p.name}</h2>
            <p>{p.price}</p>
            <p>{p.category}</p>

            <span className={p.active ? "text-green-600" : "text-red-500"}>
              {p.active ? "Activo" : "Oculto"}
            </span>

            <div className="flex gap-2 mt-3">

              <button
                onClick={() => editProduct(p)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Editar
              </button>

              <button
                onClick={() => supabase.from("products").update({ active: !p.active }).eq("id", p.id)}
                className="bg-gray-700 text-white px-3 py-1 rounded"
              >
                {p.active ? "Ocultar" : "Activar"}
              </button>

              <button
                onClick={() => supabase.from("products").delete().eq("id", p.id)}
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