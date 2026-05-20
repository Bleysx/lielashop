import { useEffect, useState } from "react";

import { supabase }
from "../lib/supabase";

import LoginAdmin
from "./LoginAdmin";

import AdminPanel
from "./AdminPanel";

export default function AdminPage(){

const [user,setUser]=
useState(null);

useEffect(()=>{

supabase.auth
.getUser()

.then(({data})=>{

setUser(
data?.user || null
);

});

const {
data:listener
}=supabase.auth
.onAuthStateChange(
(_,session)=>{

setUser(
session?.user || null
);

}
);

return ()=>{

listener.subscription
.unsubscribe();

};

},[]);

if(!user){

return(

<LoginAdmin
onLogin={setUser}
/>

);

}

return(

<AdminPanel/>

);

}