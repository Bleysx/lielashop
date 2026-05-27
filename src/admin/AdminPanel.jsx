import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { getCloudinaryUrl } from "../utils/cloudinary";

export default function AdminPanel() {

const CATEGORIES=[
"labios",
"cuidado_facial",
"cejas_pestanas",
"rubor",
"sombras",
"bases_corrector",
"polvos",
"cabello",
"accesorios"
];

const [products,setProducts]=
useState([]);

const [search,setSearch]=
useState("");

const [filterCategory,
setFilterCategory]=
useState("all");

const [filterStatus,
setFilterStatus]=
useState("all");

const [viewMode,
setViewMode]=
useState("cards");

const normalizeProduct=(p)=>({

...p,

images:
Array.isArray(p.images)
?p.images
:[],

variants:
Array.isArray(p.variants)
?p.variants
:[]

});

const loadProducts=
async()=>{

const {data,error}=

await supabase

.from("products")

.select("*")

.eq("deleted",false)

.order(
"created_at",
{
ascending:false
}
);

if(error)return;

setProducts(

(data||[])

.map(
normalizeProduct
)

);

};

useEffect(()=>{

loadProducts();

},[]);

useEffect(()=>{

const channel=

supabase

.channel(
"products-realtime"
)

.on(

"postgres_changes",

{

event:"*",

schema:"public",

table:"products"

},

()=>{

loadProducts();

}

)

.subscribe();

return()=>{

supabase.removeChannel(
channel
);

};

},[]);

const deleteProduct=
async(id)=>{

const ok=

window.confirm(
"¿Eliminar producto?"
);

if(!ok)return;

await supabase

.from("products")

.update({

deleted:true

})

.eq("id",id);

loadProducts();

};

const toggleFavorite=
async(p)=>{

const favorites=

products.filter(

x=>

x.is_favorite

).length;

if(

!p.is_favorite

&&

favorites>=4

){

alert(
"Máximo 4 favoritos"
);

return;

}

await supabase

.from("products")

.update({

is_favorite:
!p.is_favorite

})

.eq("id",p.id);

loadProducts();

};

const toggleActive=
async(p)=>{

await supabase

.from("products")

.update({

active:
!p.active

})

.eq("id",p.id);

loadProducts();

};

const filtered=

products

.filter(p=>{

if(

filterStatus===
"active"

)

return p.active;

if(

filterStatus===
"hidden"

)

return !p.active;

return true;

})

.filter(p=>{

if(

filterCategory===
"all"

)

return true;

return(

p.category===

filterCategory

);

})

.filter(p=>

p.name

?.toLowerCase()

.includes(

search

.toLowerCase()

)

);

const editProduct=(p)=>{

setEditingProduct({

...normalizeProduct(p)

});

};

const [editingProduct,setEditingProduct]=
useState(null);

 const [newVariant, setNewVariant] = useState("");

return(

<div className="p-6">

<h1
className="
text-2xl
font-bold
mb-4
"
>

Panel Admin

</h1>

{editingProduct && (

<>

<div
onClick={()=>
setEditingProduct(null)
}
className="
fixed
inset-0
bg-black/40
z-40
"
/>

<div
className="
fixed
top-0
right-0
h-full
w-full
sm:w-[420px]
bg-white
shadow-2xl
z-50
overflow-y-auto
p-5
"
>

<div
className="
flex
justify-between
items-center
mb-5
"
>

<h2
className="
font-bold
text-xl
"
>

Editar producto

</h2>

<button
onClick={()=>
setEditingProduct(null)
}
className="
bg-gray-100
hover:bg-gray-200
w-9
h-9
rounded-full
"
>

✕

</button>

</div>

 <div
      className="
      border
      rounded-2xl
      bg-white
      p-5
      space-y-4
      shadow-sm
      "
    >
      <input
        className="
        w-full
        border
        border-pink-200
        bg-pink-50
        rounded-xl
        p-3
        outline-none
        focus:ring-2
        focus:ring-pink-200
        focus:border-pink-400
        "
        placeholder="Nombre"
        value={editingProduct.name}
        onChange={(e) =>
          setEditingProduct({
            ...editingProduct,
            name: e.target.value,
          })
        }
      />

      <input
        className="
        w-full
        border
        border-pink-200
        bg-pink-50
        rounded-xl
        p-3
        outline-none
        focus:ring-2
        focus:ring-pink-200
        focus:border-pink-400
        "
        placeholder="Precio"
        value={editingProduct.price}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, "");

          setEditingProduct({
            ...editingProduct,
            price: value,
          });
        }}
      />

      <select
        className="
        w-full
        border
        border-pink-200
        bg-pink-50
        rounded-xl
        p-3
        outline-none
        focus:ring-2
        focus:ring-pink-200
        focus:border-pink-400
        "
        value={editingProduct.category}
        onChange={(e) =>
          setEditingProduct({
            ...editingProduct,
            category: e.target.value,
          })
        }
      >
        <option value="">Categoría</option>

        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

<label className="w-full block border border-dashed border-pink-300 bg-pink-50 rounded-xl p-4 text-center cursor-pointer hover:bg-pink-100 transition">
  📷 Sube o cambia la imagen
  <input
    type="file"
    accept="image/*"
    className="hidden"
    onChange={async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const url = await handleAddImage(file);

      setEditingProduct({
        ...editingProduct,
        images: [...(editingProduct.images || []), url],
        image: editingProduct.image || url,
      });
    }}
  />
</label>
<div className="flex gap-2 flex-wrap mt-2">
  {editingProduct.images?.map((img, i) => (
    <div key={i} className="relative">
      <img
        src={getCloudinaryUrl(img, 150)}
        className="w-16 h-16 object-cover rounded-lg border"
      />

      <button
        onClick={() => {
          const updated = editingProduct.images.filter((_, idx) => idx !== i);

          setEditingProduct({
            ...editingProduct,
            images: updated,
            image: updated[0] || "",
          });
        }}
        className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs"
      >
        ×
      </button>
    </div>
  ))}
</div>

      {/* VARIANTES */}
      <div
        className="
        bg-pink-50
        border
        border-pink-100
        rounded-2xl
        p-4
        space-y-3
        "
      >
        <p className="font-semibold text-gray-700">
          🏷️ Variantes
          <span className="ml-2 text-pink-500">
            ({editingProduct.variants?.length || 0})
          </span>
        </p>

        <input
          id="newVariant"
          value={newVariant}
          onChange={(e) => setNewVariant(e.target.value)}
          placeholder="Ej: Tono 01"
          className="
          w-full
          border
          border-pink-200
          bg-white
          rounded-xl
          px-4
          py-3
          outline-none
          focus:ring-2
          focus:ring-pink-200
          "
        />

        <button
          onClick={() => {
            if (!newVariant.trim()) return;

            setEditingProduct({
              ...editingProduct,
              variants: [
                ...(editingProduct.variants || []),
                { name: newVariant },
              ],
            });

            setNewVariant("");
          }}
          className="
          w-full
          bg-pink-500
          hover:bg-pink-600
          transition
          text-white
          font-medium
          rounded-xl
          py-3
          shadow-sm
          "
        >
          + Agregar variante
        </button>

        <div
          className="
          space-y-2
          max-h-44
          overflow-y-auto
          "
        >
          {editingProduct.variants?.map((v, i) => (
            <div
              key={i}
              className="
              bg-white
              border
              rounded-xl
              p-3
              flex
              justify-between
              items-center
              "
            >
              <span>🏷️ {v.name}</span>

              <button
                onClick={() => {
                  const updated = editingProduct.variants.filter(
                    (_, idx) => idx !== i
                  );

                  setEditingProduct({
                    ...editingProduct,
                    variants: updated,
                  });
                }}
                className="
                bg-red-100
                text-red-600
                hover:bg-red-200
                px-3
                py-1
                rounded-lg
                text-xs
                "
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* GUARDAR */}
      <button
  onClick={async () => {
    try {
      if (!editingProduct?.id) {
        console.error("Falta ID del producto");
        return;
      }

      const payload = {
        name: editingProduct.name,
        price: Number(editingProduct.price),
        category: editingProduct.category,
        variants: editingProduct.variants || [],
      };

      console.log("Guardando:", payload);

      const { data, error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", editingProduct.id)
        .select();

      if (error) {
        console.error("Error guardando:", error);
        return;
      }

      console.log("Guardado OK:", data);

      // ✅ CIERRA EL PANEL DESPUÉS DE GUARDAR
      setEditingProduct(null);

    } catch (err) {
      console.error("Error inesperado:", err);
    }
  }}
  className="
    w-full
    bg-black
    hover:bg-gray-900
    text-white
    rounded-xl
    py-3
    font-medium
  "
>
  Guardar cambios
</button>

      {/* TERMINAR EDICIÓN */}
      <button
        onClick={() => {
          setEditingProduct(null);
        }}
        className="
        w-full
        border
        border-gray-200
        rounded-xl
        py-3
        hover:bg-gray-50
        "
      >
        Terminar edición
      </button>
    </div>
</div>

</>

)}

<div
className="
flex
gap-2
flex-wrap
mb-4
"
>

<input

placeholder="
Buscar producto
"

value={search}

onChange={e=>

setSearch(
e.target.value
)

}

className="
border
p-2
rounded
"

/>

<select

value={
filterCategory
}

onChange={e=>

setFilterCategory(
e.target.value
)

}

className="
border
p-2
rounded
"

>

<option value="all">

Todas

</option>

{

CATEGORIES.map(

cat=>(

<option
key={cat}
value={cat}
>

{cat}

</option>

)

)

}

</select>

</div>

<div className="flex flex-wrap gap-2">
  <button
    onClick={() => setFilterStatus("all")}
    className="
      px-4 py-2
      rounded-xl
      border
      text-sm
      font-medium
      transition
      active:scale-95
      whitespace-nowrap

      bg-white
      border-gray-200
      hover:bg-gray-50
    "
  >
    Todos
  </button>

  <button
    onClick={() => setFilterStatus("active")}
    className="
      px-4 py-2
      rounded-xl
      border
      text-sm
      font-medium
      transition
      active:scale-95
      whitespace-nowrap

      bg-white
      border-gray-200
      hover:bg-green-50
      hover:border-green-200
      hover:text-green-700
    "
  >
    Activos
  </button>

  <button
    onClick={() => setFilterStatus("hidden")}
    className="
      px-4 py-2
      rounded-xl
      border
      text-sm
      font-medium
      transition
      active:scale-95
      whitespace-nowrap

      bg-white
      border-gray-200
      hover:bg-red-50
      hover:border-red-200
      hover:text-red-600
    "
  >
    Ocultos
  </button>
</div>
<div className="mt-4 mb-4">
  <button
    onClick={() => setViewMode("cards")}
    className="
      px-4 py-2
      rounded-xl
      border
      text-sm
      font-medium
      transition
      active:scale-95
      whitespace-nowrap

      bg-white
      border-gray-200
      hover:bg-gray-50
    "
  >
    Cards
  </button>
</div>

{

viewMode==="cards"

&&

<div
className="
grid
gap-4
"
>

{

filtered.map(

p=>(

<div
key={p.id}
className="
bg-white
border
rounded-2xl
p-4
shadow-sm
space-y-3
"
>

<div className="flex gap-3">

<img
  src={
    p.image
      ? getCloudinaryUrl(p.image, 200)
      : "/placeholder.png"
  }
  className="
    w-20
    h-20
    rounded-xl
    object-cover
    border
  "
/>

<div className="flex-1">

<h2
className="
font-semibold
text-lg
"
>

{p.name}

</h2>

<p
className="
text-pink-600
font-bold
"
>

$

{Number(
p.price
).toLocaleString()}

</p>

<p
className="
text-sm
text-gray-500
"
>

{p.category}

</p>

<span
className={

p.active

?

"text-green-600"

:

"text-red-500"

}

>

{

p.active

?

"🟢 Activo"

:

"🔴 Oculto"

}

</span>

</div>

</div>

{!!p.variants?.length && (

<div
className="
border-t
pt-3
"
>

<p
className="
text-sm
font-semibold
mb-2
"
>

Variantes:

{

p.variants.length

}

</p>

<div
className="
flex
flex-wrap
gap-2
"
>

{

p.variants.map(

(v,i)=>(

<div

key={i}

className="
bg-gray-100
px-3
py-1
rounded-full
text-sm
flex
items-center
gap-2
"

>

{v.name}

</div>

)

)

}

</div>

</div>

)}

<div
className="
flex
flex-wrap
gap-2
pt-2
"
>

<button

onClick={()=>editProduct(p)}

className="
bg-blue-500
text-white
px-3
py-2
rounded-lg
text-sm
"

>

Editar

</button>

<button

onClick={()=>

toggleFavorite(p)

}

className={`
px-3
py-2
rounded-lg
text-sm
text-white
${
p.is_favorite

?

"bg-pink-500"

:

"bg-gray-500"

}
`}

>

{

p.is_favorite

?

"❤️ Favorito"

:

"🤍 Favorito"

}

</button>

<button

onClick={()=>

toggleActive(p)

}

className="
bg-gray-700
text-white
px-3
py-2
rounded-lg
text-sm
"

>

{

p.active

?

"Ocultar"

:

"Activar"

}

</button>

<button

onClick={()=>

deleteProduct(
p.id
)

}

className="
bg-red-500
text-white
px-3
py-2
rounded-lg
text-sm
"

>

Eliminar

</button>

</div>

</div>

)

)

}

</div>

}

</div>

);

}