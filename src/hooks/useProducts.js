import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

    const { data, error, count } = await supabase
  .from("products")
  .select("*", { count: "exact" })
    .eq("deleted", false)
  .eq("active", true);

console.log("TOTAL DB:", count);
console.log("PRODUCTOS:", data);

const raros = data.filter(
  p =>
    (p.hasVariants &&
    !Array.isArray(p.variants))
    ||
    !Array.isArray(p.images)
);

console.log(
 "PRODUCTOS RAROS:",
 raros
);

      if (error) {
        console.error("ERROR PRODUCTS:", error);
        setProducts([]);
        setLoading(false);
        return;
      }

     console.log("SUPABASE PRODUCTS:", data);
setProducts(data || []);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return { products, loading };
}