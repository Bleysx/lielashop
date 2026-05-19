import { useState } from "react";
import products from "../data/products.optimized.js";

export function useCatalog() {
  // ---------------- UI STATE ----------------
  const [showCatalog, setShowCatalog] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState({});

  // ---------------- DATA ----------------
  const catalogSections = [
    { title: "Labios", key: "labios" },
    { title: "Cuidado facial", key: "cuidado_facial" },
    { title: "Cejas y pestañas", key: "cejas_pestanas" },
    { title: "Rubor", key: "rubor" },
    { title: "Paleta de sombras", key: "sombras" },
    { title: "Bases y corrector", key: "bases_corrector" },
    { title: "Polvos sueltos y compactos", key: "polvos" },
    { title: "Cabello", key: "cabello" }
  ];

  // ---------------- LOGIC ----------------
  const getProductsByCategory = (cat) => {
    if (!cat) return [];
    return products.filter((p) => p.category === cat);
  };

  return {
    // state
    showCatalog,
    setShowCatalog,

    openSection,
    setOpenSection,

    selectedVariant,
    setSelectedVariant,

    // data
    catalogSections,

    // logic
    getProductsByCategory
  };
}