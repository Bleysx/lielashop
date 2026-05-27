export default function CreateProduct({

form,
setForm,

variantName,
setVariantName,

addVariant,
removeVariant,

handleAddImage,
removeImage,

saveProduct,

CATEGORIES

}){

return(

<div
className="
border
rounded-xl
bg-white
p-4
space-y-3
"
>

<h1
className="
font-bold
text-xl
"
>

Crear producto

</h1>

<input
className="
border
p-2
w-full
rounded-xl
"
placeholder="Nombre"
value={form.name}
onChange={e=>
setForm({
...form,
name:e.target.value
})
}
/>

<input
className="
border
p-2
w-full
rounded-xl
"
placeholder="Precio (solo números)"
value={form.price}
onChange={e=>{

const value=

e.target.value
.replace(/\D/g,"");

setForm({

...form,

price:value

});

}}
/>

<select
className="
border
p-2
w-full
rounded-xl
"
value={form.category}
onChange={e=>

setForm({

...form,

category:
e.target.value

})

}
>

<option value="">

Selecciona categoría

</option>

{

CATEGORIES.map(cat=>(

<option
key={cat}
value={cat}
>

{cat}

</option>

))

}

</select>

<label
className="
bg-black
text-white
px-4
py-3
rounded-xl
cursor-pointer
inline-block
text-center
"
>

Subir imagen

<input
hidden
type="file"
onChange={e=>

handleAddImage(

e.target.files[0]

)

}
/>

</label>

<div
className="
flex
gap-2
flex-wrap
"
>

{

form.images.map(

(img,i)=>(

<div
key={i}
className="relative"
>

<img

src={img}

className="
w-16
h-16
rounded-lg
object-cover
border
"

/>

<button

onClick={()=>

removeImage(i)

}

className="
absolute
top-0
right-0
bg-red-500
text-white
text-xs
px-1
rounded
"

>

×

</button>

</div>

)

)

}

</div>

<div
className="
border
rounded-xl
p-3
space-y-3
bg-pink-50
"
>

<p
className="
font-medium
text-sm
"
>

Variantes agregadas:

{form.variants.length}

</p>

<div className="relative">

<input

className="
w-full
rounded-xl
border
border-pink-200
bg-white
px-4
py-3
pr-10
outline-none
focus:ring-2
focus:ring-pink-200
"

placeholder="
Ej: Tono 01
"

value={variantName}

onChange={e=>

setVariantName(
e.target.value
)

}

/>

<span
className="
absolute
right-3
top-1/2
-translate-y-1/2
"
>

🏷️

</span>

</div>

<button

onClick={addVariant}

className="
w-full
bg-pink-500
hover:bg-pink-600
text-white
py-2.5
rounded-xl
transition
"

>

+ Agregar variante

</button>

<div className="space-y-2">

{

form.variants.map(

(v,i)=>(

<div

key={i}

className="
bg-white
rounded-lg
border
p-2
flex
justify-between
items-center
"

>

<span>

{v.name}

</span>

<button

onClick={()=>

removeVariant(i)

}

className="
bg-red-500
text-white
px-3
py-1
rounded-lg
text-xs
"

>

Eliminar

</button>

</div>

)

)

}

</div>

</div>

<button
onClick={
saveProduct
}
className="
bg-black
text-white
w-full
py-2
rounded
"
>

Crear

</button>

</div>

);

}