import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

  const { data, error, count } = await supabase
  .from("products_with_flags")
  .select("*", { count: "exact" })
  .eq("deleted", false)
  .eq("active", true);

console.log("ERROR:", error);
console.log("DATA:", data);

if (error) {
  console.error("ERROR PRODUCTS:", error);
  setProducts([]);
  setLoading(false);
  return;
}

const raros = data.filter(
  p =>
    (p.hasVariants &&
    !Array.isArray(p.variants))
    ||
    !Array.isArray(p.images)
);

console.log("PRODUCTOS RAROS:", raros);

setProducts(data || []);
setLoading(false);
    };

    fetchProducts();
    
  }, []);

  console.log("FAVORITES RAW CHECK:", products.map(p => ({
  id: p.id,
  is_favorite: p.is_favorite
})));

 const favorites = products.filter(
  (p) => p.is_favorite === true || p.is_favorite === "true"
);

 return { products, favorites, loading };
}