import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import axios from "axios";

export default function AdminPanel() {

  useEffect(() => {
  const checkAuth = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
      window.location.replace("/login");
    }
  };

  checkAuth();
}, []);

useEffect(() => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        window.location.replace("/login");
      }
    }
  );

  return () => subscription.unsubscribe();
}, []);

useEffect(() => {
  let timer;

  const logout = async () => {
  await supabase.auth.signOut();

  const channel = new BroadcastChannel("auth");
  channel.postMessage("logout");
  channel.close();

  window.location.replace("/login");
};

  const resetTimer = () => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      logout();
    }, 15 * 60 * 1000); // 15 minutos
  };

  const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];

  events.forEach((event) =>
    window.addEventListener(event, resetTimer)
  );

  resetTimer();

  return () => {
    if (timer) clearTimeout(timer);

    events.forEach((event) =>
      window.removeEventListener(event, resetTimer)
    );
  };
}, []);

useEffect(() => {
  const syncLogout = (event) => {
    if (event.key === "sb-session" && !event.newValue) {
      window.location.replace("/login");
    }
  };

  window.addEventListener("storage", syncLogout);

  return () => {
    window.removeEventListener("storage", syncLogout);
  };
}, []);

useEffect(() => {
  const channel = new BroadcastChannel("auth");

  channel.onmessage = (event) => {
    if (event.data === "logout") {
      window.location.replace("/login");
    }
  };

  return () => {
    channel.close();
  };
}, []);

const CATEGORIES = [
  "labios",
  "cuidado_facial",
  "cejas_pestanas",
  "rubor",
  "sombras",
  "bases_corrector",
  "polvos",
  "cabello",
  //"accesorios"
];

const [search, setSearch] = useState("");
const [filterCategory, setFilterCategory] = useState("all");
const [viewMode, setViewMode] = useState("cards"); // "cards" | "table" 
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

  useEffect(() => {
  const check = async () => {
    const { data } = await supabase.auth.getUser();

    if (!data?.user) {
      window.location.replace("/login");
    }
  };

  check();
}, []);

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
    .eq("deleted", false)
    .order("created_at", { ascending: false });

  if (!error) {
    setProducts((data || []).map(normalizeProduct));
  }
};
const deleteProduct = async (id) => {
  const ok = window.confirm("¿Seguro que quieres eliminar este producto?");
  if (!ok) return;

  console.log("ID A ELIMINAR:", id);

  const { data, error } = await supabase
    .from("products")
    .update({ deleted: true })
    .eq("id", id)
    .select();

  if (error) {
    console.error("ERROR SUPABASE DELETE:", error);
    return;
  }

  console.log("UPDATE RESULT:", data);

  await loadProducts();
};
const toggleActive = async (p) => {
  const { data, error } = await supabase
    .from("products")
    .update({ active: !p.active })
    .eq("id", p.id)
    .select();

  if (error) {
    console.error("ERROR TOGGLE:", error);
    return;
  }

  await loadProducts();
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

  // ----------- SAVE (FIX FINAL VARIANTS BUG) ------------
  const saveProduct = async () => {

    const payload = {
      name: form.name,
      price: Number(form.price),
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
const filtered = (products || [])
  .filter(p => !p.deleted)

  // estado activo/oculto
  .filter(p => {
    if (filterStatus === "active") return p.active === true;
    if (filterStatus === "hidden") return p.active === false;
    return true;
  })

  // categoría
  .filter(p => {
    if (filterCategory === "all") return true;
    return p.category === filterCategory;
  })

  // 🔍 BUSCADOR (ESTO ES LO QUE SE ROMPIÓ)
  .filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

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

<div className="flex gap-2 mb-4 flex-wrap">

  {/* SEARCH */}
  <input
    className="border p-2 rounded w-64"
    placeholder="Buscar producto..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  {/* CATEGORY FILTER */}
  <select
  value={filterCategory}
  onChange={(e) => setFilterCategory(e.target.value)}
  className="border p-2 rounded mb-4 ml-2"
>
  <option value="all">Todas las categorías</option>

  {CATEGORIES.map((cat) => (
    <option key={cat} value={cat}>
      {cat}
    </option>
  ))}
</select>

</div>

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
  placeholder="Precio (solo números)"
  value={form.price}
  onChange={e => {
    const value = e.target.value.replace(/\D/g, "");
    setForm({ ...form, price: value });
  }}
/>

<select
  className="border p-2 w-full"
  value={form.category}
  onChange={(e) =>
    setForm({ ...form, category: e.target.value })
  }
>
  <option value="">Selecciona categoría</option>

  {CATEGORIES.map((cat) => (
    <option key={cat} value={cat}>
      {cat}
    </option>
  ))}
</select>

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

<div className="flex gap-2 mt-4 mb-2">
  <button
    onClick={() => setViewMode("cards")}
    className={`px-3 py-1 border rounded ${
      viewMode === "cards" ? "bg-black text-white" : ""
    }`}
  >
    Cards
  </button>

  <button
    onClick={() => setViewMode("table")}
    className={`px-3 py-1 border rounded ${
      viewMode === "table" ? "bg-black text-white" : ""
    }`}
  >
    Tabla
  </button>
</div>

  {/* LIST */}
<div className="mt-6">

  {viewMode === "cards" && (
    <div className="grid gap-4 mt-6">
      {filtered.map(p => (
        <div key={p.id} className="border p-4 rounded-xl">

          <h2 className="font-bold">{p.name}</h2>
          <p>
  {"$ " + Number(p.price).toLocaleString("en-US")}
</p>
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
              onClick={() => toggleActive(p)}
              className="bg-gray-700 text-white px-3 py-1 rounded"
            >
              {p.active ? "Ocultar" : "Activar"}
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
  )}

  {viewMode === "table" && (
    <div className="overflow-x-auto border rounded-xl mt-4">
      <table className="w-full text-sm">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Nombre</th>
            <th className="p-2 text-left">Precio</th>
            <th className="p-2 text-left">Categoría</th>
            <th className="p-2 text-left">Estado</th>
            <th className="p-2 text-left">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map(p => (
            <tr key={p.id} className="border-t">

              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.price}</td>
              <td className="p-2">{p.category}</td>

              <td className="p-2">
                <span className={p.active ? "text-green-600" : "text-red-500"}>
                  {p.active ? "Activo" : "Oculto"}
                </span>
              </td>

              <td className="p-2 flex gap-2">

                <button
                  onClick={() => editProduct(p)}
                  className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                >
                  Editar
                </button>

                <button
                  onClick={() => toggleActive(p)}
                  className="bg-gray-700 text-white px-2 py-1 rounded text-xs"
                >
                  {p.active ? "Ocultar" : "Activar"}
                </button>

                <button
                  onClick={() => deleteProduct(p.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                >
                  Eliminar
                </button>

              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )}

</div>
    </div>
  );
}