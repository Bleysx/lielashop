import { useEffect, useState, useRef } from "react";
import products from "./data/products.optimized.js";
import { getCloudinaryUrl } from "./utils/cloudinary.js";

import ImageCarousel from "./components/ImageCarousel";

import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Hero from "./components/layout/Hero";
import CartButton from "./components/cart/CartButton";
import CartDrawer from "./components/cart/CartDrawer";
import Banner from "./components/layout/Banner";
import Favorites from "./components/Favorites";
import Catalog from "./components/Catalog";

import { useCart } from "./hooks/useCart";
import { useCatalog } from "./hooks/useCatalog";

import { supabase } from "./lib/supabase";

export default function LielashopMakeup() {

useEffect(() => {
  console.log("SUPABASE TEST INICIADO");

  const test = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*");

      console.log("DATA:", data);
      console.log("ERROR:", error);
    } catch (err) {
      console.log("CATCH ERROR:", err);
    }
  };

  test();
}, []);

  const logoUrl = "https://i.ibb.co/0p21PF9J/logo.jpg";

  // ---------------- CART ----------------
  const {
    cart,
    addToCart,
    removeFromCart,
    decreaseQty,
    getQty,
    total,
    formatTotal,
    buildWhatsAppMessage
  } = useCart();

  // ---------------- STATE ----------------
  const [featuredIndex] = useState(0);

  const [scrolled, setScrolled] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const {
  showCatalog,
  setShowCatalog,
  openSection,
  setOpenSection,
  selectedVariant,
  setSelectedVariant,
  catalogSections,
  getProductsByCategory
} = useCatalog();

  const catalogRef = useRef(null);

  // ---------------- SCROLL HEADER ----------------
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ---------------- DATA ----------------
  const featuredProducts = [
    products[45],
    products[113],
    products[2],
    products[50]
  ];

  // ---------------- ACTIONS ----------------
  const handleFavoriteClick = (product) => {
    setShowCatalog(true);
    setOpenSection(product.category);

    setTimeout(() => {
      catalogRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  };

  // ---------------- RENDER ----------------
  return (
    <div className="bg-pink-50 min-h-screen text-gray-800">

      {/* HEADER */}
      <Header logoUrl={logoUrl} scrolled={scrolled} />

      {/* HERO */}
      <Hero
        setShowCatalog={setShowCatalog}
        catalogRef={catalogRef}
      />

      {/* FAVORITOS */}
      <Favorites
        featuredProducts={featuredProducts}
        handleFavoriteClick={handleFavoriteClick}
        showCatalog={showCatalog}
        setShowCatalog={setShowCatalog}
        setOpenSection={setOpenSection}
        setSelectedVariant={setSelectedVariant}
        ImageCarousel={ImageCarousel}
      />

      {/* CATÁLOGO */}
      <Catalog
        showCatalog={showCatalog}
        catalogRef={catalogRef}
        catalogSections={catalogSections}
        openSection={openSection}
        setOpenSection={setOpenSection}
        getProductsByCategory={getProductsByCategory}
        ImageCarousel={ImageCarousel}
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
        getQty={getQty}
        decreaseQty={decreaseQty}
        addToCart={addToCart}
      />

      {/* BANNER */}
      <Banner />

      {/* CART BUTTON */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

        <CartButton
          cart={cart}
          setShowSummary={setShowSummary}
          buildWhatsAppMessage={buildWhatsAppMessage}
        />

      </div>

      {/* CART DRAWER */}
      <CartDrawer
        showSummary={showSummary}
        setShowSummary={setShowSummary}
        cart={cart}
        removeFromCart={removeFromCart}
        formatTotal={formatTotal}
        total={total}
        buildWhatsAppMessage={buildWhatsAppMessage}
      />

      <Footer />

    </div>
  );
}