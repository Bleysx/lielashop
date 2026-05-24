import { useState } from "react";

export function useCatalog(products = []) {

  // ---------------- UI STATE ----------------
  const [showCatalog, setShowCatalog] =
    useState(false);

  const [openSection, setOpenSection] =
    useState(null);

  const [selectedVariant, setSelectedVariant] =
    useState({});

  const [search, setSearch] =
  useState("");

  // ---------------- DATA ----------------
  const catalogSections = [
    { title: "Labios", key: "labios" },
    {
      title: "Cuidado facial",
      key: "cuidado_facial"
    },
    {
      title: "Cejas y pestañas",
      key: "cejas_pestanas"
    },
    { title: "Rubor", key: "rubor" },
    {
      title: "Paleta de sombras",
      key: "sombras"
    },
    {
      title: "Bases y corrector",
      key: "bases_corrector"
    },
    {
      title: "Polvos sueltos y compactos",
      key: "polvos"
    },
    {
      title: "Cabello",
      key: "cabello"
    },
  {
 title: "Accesorios",
key: "accesorios"
}
  ];

  // ---------------- LOGIC ----------------
  const getProductsByCategory =
    (cat) => {

      if (!cat) return [];

     return products.filter(
  (p) =>
    p.category === cat &&
    p.active !== false
);
    };

  return {

    showCatalog,
    setShowCatalog,

    openSection,
    setOpenSection,

    selectedVariant,
    setSelectedVariant,

    search,
    setSearch,

    catalogSections,

    getProductsByCategory

  };

}