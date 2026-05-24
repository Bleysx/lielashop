import { useEffect, useState, useRef } from "react";

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
import { useProducts } from "./hooks/useProducts";
import { supabase } from "./lib/supabase";

import WholesaleSection from "./components/WholesaleSection";
import AdminPage from "./admin/AdminPage";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


export default function LielashopMakeup() {
  // ---------------- PRODUCTS ----------------
  const { products,  favorites, loading } = useProducts();

  // 🔴 FIX CRÍTICO: asegurar array válido siempre
  const safeProducts = products || [];

  // ---------------- CATALOG ----------------
  const {
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
  } = useCatalog(safeProducts);

  const catalogRef = useRef(null);

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
  const [scrolled, setScrolled] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const logoUrl = "https://i.ibb.co/0p21PF9J/logo.jpg";

  // ---------------- SCROLL HEADER ----------------
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ---------------- DATA ----------------
 const safeFavorites = (favorites || []).slice(0, 4);

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
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Cargando productos...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
            <div className="font-sans"></div>
            <div className="w-full bg-pink-100 text-gray-700 text-[11px] py-1 text-center flex justify-center gap-1 items-center border-b border-pink-100">
 <span>
  📦 Compras al por mayor desde <span className="text-pink-500 font-medium">$50.000</span>
</span>
  <a
    href="https://api.whatsapp.com/send/?phone=573017170457&text=Hola%2C+quiero+hacer+un+pedido+mayorista&type=phone_number&app_absent=0"
    target="_blank"
    rel="noreferrer"
    className="underline font-medium"
  >
    Solicitar info
  </a>

</div> 

              <Header logoUrl={logoUrl} scrolled={scrolled} />

              <Hero setShowCatalog={setShowCatalog} catalogRef={catalogRef} />

              <Favorites
                featuredProducts={safeFavorites}
                handleFavoriteClick={handleFavoriteClick}
                showCatalog={showCatalog}
                setShowCatalog={setShowCatalog}
                setOpenSection={setOpenSection}
                setSelectedVariant={setSelectedVariant}
                ImageCarousel={ImageCarousel}
              />

              <Catalog
                showCatalog={showCatalog}
                catalogRef={catalogRef}
                catalogSections={catalogSections}
                openSection={openSection}
                setOpenSection={setOpenSection}
                search={search}
                setSearch={setSearch}
                getProductsByCategory={getProductsByCategory}
                ImageCarousel={ImageCarousel}
                selectedVariant={selectedVariant}
                setSelectedVariant={setSelectedVariant}
                getQty={getQty}
                decreaseQty={decreaseQty}
                addToCart={addToCart}
              />

              <Banner />

              <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
                <CartButton
                  cart={cart}
                  setShowSummary={setShowSummary}
                  buildWhatsAppMessage={buildWhatsAppMessage}
                />
              </div>

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
            </>
          }
        />

        <Route
          path="/admin"
          element={<AdminPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}