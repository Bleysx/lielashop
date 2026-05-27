import { useState } from "react";
import { supabase } from "../lib/supabase";
import axios from "axios";

import AdminPanel from "./AdminPanel";
import CreateProduct from "./CreateProduct";

export default function AdminLayout({ user }) {

const [open,setOpen]=useState(false);

const [page,setPage]=useState("products");

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

const [form,setForm]=useState({
id:null,
name:"",
price:"",
description:"",
category:"",
image:"",
images:[],
stock:0,
variants:[],
hasVariants:false,
active:true
});

const [variantName,setVariantName]=
useState("");

const uploadImage=async(file)=>{

const formData=new FormData();

formData.append("file",file);

formData.append(
"upload_preset",
"lielashop"
);

const res=await axios.post(
"https://api.cloudinary.com/v1_1/dx17lxzey/image/upload",
formData
);

return res.data.secure_url;

};

const handleAddImage=
async(file)=>{

if(!file)return;

const url=
await uploadImage(file);

setForm(prev=>({

...prev,

images:[
...(prev.images||[]),
url
],

image:
prev.image||url

}));

};

const removeImage=(i)=>{

setForm(prev=>({

...prev,

images:
prev.images.filter(
(_,index)=>
index!==i
)

}));

};

const addVariant=()=>{

if(
!variantName.trim()
)return;

setForm(prev=>({

...prev,

variants:[
...prev.variants,
{
name:
variantName.trim()
}
]

}));

setVariantName("");

};

const removeVariant=
(index)=>{

setForm(prev=>({

...prev,

variants:
prev.variants.filter(
(_,i)=>
i!==index
)

}));

};

const saveProduct=
async()=>{

const payload={

name:form.name,

price:
Number(form.price),

description:
form.description,

category:
form.category,

image:
form.images?.length
?form.images[0]
:form.image,

images:form.images,

variants:
form.variants,

stock:
form.stock,

hasVariants:
form.hasVariants,

active:
form.active

};

const {error}=form.id

?await supabase
.from("products")
.update(payload)
.eq("id",form.id)

:await supabase
.from("products")
.insert([payload]);

if(error){

console.log(error);

return;

}

setForm({

id:null,
name:"",
price:"",
description:"",
category:"",
image:"",
images:[],
stock:0,
variants:[],
hasVariants:false,
active:true

});

setVariantName("");

};

return(

<div className="min-h-screen bg-pink-50">

{!open&&(

<button
onClick={()=>
setOpen(true)
}
className="
fixed
top-4
left-4
z-50
bg-black
text-white
w-8
h-8
rounded
"
>
☰
</button>

)}

{open&&(

<div
onClick={()=>
setOpen(false)
}
className="
fixed
inset-0
bg-black/30
z-40
"
/>

)}

<aside
  className={`
    fixed
    left-0
    top-0
    h-full
    w-56
    bg-pink-100
    z-50
    transition-all
    ${open ? "translate-x-0" : "-translate-x-full"}
  `}
>
  <div className="p-4 flex flex-col gap-4">

    {/* USER */}
    <div className="text-sm font-medium text-gray-700">
      {user?.email}
    </div>

    {/* MENU */}
    <div className="flex flex-col gap-2 w-full">
      <button
        onClick={() => {
          setPage("products");
          setOpen(false);
        }}
        className="
          w-full
          text-left
          px-4 py-2
          rounded-xl
          border
          transition
          active:scale-95
          bg-white
          border-gray-200
          hover:bg-gray-50
        "
      >
        📦 Productos
      </button>

      <button
        onClick={() => {
          setPage("create");
          setOpen(false);
        }}
        className="
          w-full
          text-left
          px-4 py-2
          rounded-xl
          border
          transition
          active:scale-95
          bg-white
          border-gray-200
          hover:bg-gray-50
        "
      >
        ➕ Crear
      </button>
    </div>

  </div>
</aside>

<main className="p-6">

{page==="products"&&(

<AdminPanel/>

)}

{page==="create"&&(

<CreateProduct

form={form}
setForm={setForm}

variantName={
variantName
}

setVariantName={
setVariantName
}

addVariant={
addVariant
}

removeVariant={
removeVariant
}

handleAddImage={
handleAddImage
}

removeImage={
removeImage
}

saveProduct={
saveProduct
}

CATEGORIES={
CATEGORIES
}

/>

)}

</main>

</div>

);

}