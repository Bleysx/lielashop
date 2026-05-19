import { useEffect, useState, useRef } from "react";
import products from "./products.optimized.js";
import { getCloudinaryUrl } from "./utils/cloudinary.js";
function ImageCarousel({ images = [], featured = false }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
  if (!images.length) return;

  const img = new Image();
  img.src = getCloudinaryUrl(images[index]);
}, [index]);

  if (!images.length) return null;

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
  <img
  src={getCloudinaryUrl(images[index] || "")}
  loading="lazy"
  decoding="async"
  className={`w-full rounded-xl ${
    featured
      ? "h-48 object-cover bg-white"
      : "h-56 md:h-72 object-cover"
  }`}
/>

      {images.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-2 top-1/2 bg-white/70 px-2 rounded-full">
            ‹
          </button>
          <button onClick={next} className="absolute right-2 top-1/2 bg-white/70 px-2 rounded-full">
            ›
          </button>
        </>
      )}
    </div>
  );
}
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10z"/>
      <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M22 12a10 10 0 10-11 10v-7H8v-3h3V9c0-3 2-5 5-5h2v3h-2c-1 0-2 .5-2 2v2h4l-1 3h-3v7a10 10 0 0010-10z"/>
    </svg>
  );
}
function findCartItem(productId, variantId) {
  return cart.find(item =>
    item.productId === productId &&
    item.variantId === variantId
  );
}
export default function LielashopMakeup() {

  const logoUrl = "https://i.ibb.co/0p21PF9J/logo.jpg";

  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [cart, setCart] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const catalogRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const featuredProducts = [
  products[45],
  products[113],
  products[2],
  products[50]
];

const addToCart = (product, variantId = null) => {
  setCart((prev) => {
    const exists = prev.find(
      (p) => p.id === product.id && p.variantId === variantId
    );

    if (exists) {
      return prev.map((p) =>
        p.id === product.id && p.variantId === variantId
          ? { ...p, qty: p.qty + 1 }
          : p
      );
    }

    return [
      ...prev,
      {
        ...product,
        variantId,
        qty: 1,
      },
    ];
  });
};
const removeFromCart = (productId, variantId) => {
  setCart(prev =>
    prev.filter(
      item => !(item.id === productId && item.variantId === variantId)
    )
  );
};
const handleFavoriteClick = (product) => {
  setShowCatalog(true);

  // abrir la sección correcta
  setOpenSection(product.category);

  // esperar a que renderice y hacer scroll
  setTimeout(() => {
    catalogRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 100);
};
  const decreaseQty = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (!exists) return prev;
      if (exists.qty === 1) return prev.filter((p) => p.id !== product.id);
      return prev.map((p) => p.id === product.id ? { ...p, qty: p.qty - 1 } : p);
    });
  };

  const getQty = (productId, variantId) => {
  const item = cart.find((p) => {
    const sameProduct = p.id === productId;

    const sameVariant =
      p.variantId === variantId ||
      (!p.variantId && !variantId);

    return sameProduct && sameVariant;
  });

  return item ? item.qty : 0;
};
  const goToProduct = (anchor) => {
  setShowCatalog(true);

  setTimeout(() => {
    const el = document.getElementById(anchor);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, 300);
};

  const parsePrice = (price) => {
  if (!price) return 0;

  return Number(
    price.toString().replace(/[^0-9]/g, "")
  );
};

  const total = cart.reduce(
  (acc, item) => acc + parsePrice(item.price) * item.qty,
  0
);

  const formatTotal = (v) => "$" + v.toLocaleString("es-CO");

  const buildWhatsAppMessage = () => {
  if (cart.length === 0) return "Hola, quiero hacer un pedido";

  const items = cart.map((p, i) => {
    let text = `${i + 1}. ${p.name} x${p.qty} - ${p.price}`;

    if (p.variantId) {
      text += ` (Tono ${p.variantId})`;
    }

    return text;
  }).join("%0A");

  return `Hola, quiero este pedido:%0A${items}%0A%0ATotal: ${formatTotal(total)}`;
};

  const getProductsByCategory = (cat) => products.filter((p) => p.category === cat);

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

  return (
    <div className="bg-pink-50 min-h-screen text-gray-800">

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b border-pink-200 h-16">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center gap-3">
          <img src={logoUrl} className={`rounded-full transition-all duration-300 ${scrolled ? "w-9 h-9" : "w-12 h-12"}`} />
          <div className="leading-tight">
            <h1 className={`font-bold transition-all duration-300 ${scrolled ? "text-base" : "text-xl"}`}>Lielashop Makeup</h1>
            <p className="text-xs text-pink-400 transition-all duration-300 opacity-100">
              Belleza y Maquillaje
            </p>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section
  className="text-center py-16 bg-cover bg-center relative"
  style={{
    backgroundImage: "url(https://media.istockphoto.com/id/1658893205/es/foto/inventar-productos-en-la-vista-superior-de-fondo-rosa.jpg?s=612x612&w=0&k=20&c=XX_FdY2MVCSnlJY-D9BuC-C6qCJAqStGokQRAoD58Go=)"
  }}
>
  <div className="absolute inset-0 bg-white/70" />

  <div className="relative">
    <h1 className="text-5xl font-bold">
      La belleza empieza aquí ✨
    </h1>

    <p className="text-gray-600 mt-3">
      Descubre tus productos favoritos
    </p>
    <button
  onClick={() => {
    setShowCatalog(true);

    setTimeout(() => {
      catalogRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }}
  className="mt-6 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition"
>
  Comprar ahora
</button>
  </div>
</section>

      {/* FAVORITOS */}
      <section className="p-6">
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Favoritos</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {featuredProducts.map((p) => (
  <div
    key={`fav-${p.id}`}
    onClick={() => handleFavoriteClick(p)}
  className="bg-white rounded-xl shadow cursor-pointer hover:scale-[1.02] transition h-full flex flex-col overflow-hidden"
  >
  <div className="h-40 overflow-hidden">
  <ImageCarousel images={p.images || []} featured />
</div>
              <div className="p-4">
                <p className="text-sm font-semibold leading-tight">{p.name}</p>
                <p className="text-pink-500 text-sm font-bold">{p.price}</p>
                {p.description && (
                  <p className="text-xs text-gray-500 mt-1">
                    {p.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
<div className="flex justify-center mt-4">
        <button
  onClick={() => {
  setShowCatalog((prev) => {
    const newValue = !prev;

    // si estás cerrando el catálogo
    if (prev === true) {
      setOpenSection(null);
      setSelectedVariant({}); // AQUÍ VA EL FIX
    }

    return newValue;
  });
}}
  className="bg-pink-500 text-white px-4 py-2 rounded-full"
>
  {showCatalog ? "Cerrar catálogo" : "Ver catálogo"}
</button>
  </div>
      </section>

      {/* CATÁLOGO */}
      {showCatalog && (
        <section ref={catalogRef} className="existing-classes py-10 px-4">
          {catalogSections.map((section) => {
  const isOpen = openSection === section.key;
  const items = getProductsByCategory(section.key);

  return (
    <div
  id={`section-${section.key}`}
  key={section.title}
  className="mb-6 scroll-mt-24"
>
      <button
       onClick={() => {
  setOpenSection(isOpen ? null : section.key);

  setTimeout(() => {
    const sectionElement = document.getElementById(`section-${section.key}`);

    sectionElement?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);
}}
        className="w-full flex justify-between items-center bg-pink-100 px-4 py-3 rounded-xl font-semibold text-pink-700"
      >
        <div className="flex flex-col items-start">
          <span className="text-gray-800 font-bold">
  {section.title}
</span>

          {/* línea decorativa */}
          <div className="w-12 h-1 bg-pink-500 mt-1 rounded-full"></div>
        </div>

        <span className="text-xl">{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {items.length === 0 ? (
            <p className="text-gray-400">Próximamente productos</p>
          ) : (
            items.slice(0, 30).map((product) => (
            <div
  id={product.anchor}
  key={product.id}
  className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-2 md:p-3 scroll-mt-24 flex flex-col"
>
               <ImageCarousel images={product.images} />
                <div className="p-2 md:p-3 flex flex-col flex-1">
                  <p className="text-sm font-semibold leading-tight">{product.name}</p>

                  {product.description && (
                    <p className="text-xs text-gray-500 mt-1">
                      {product.description}
                    </p>
                  )}

                  <p className="text-pink-500 text-sm font-bold">{product.price}</p>
                  {product.hasVariants && (
  <select
    className="w-full text-xs mt-2 border rounded-md p-1"
    value={selectedVariant?.[product.id] || ""}
    onChange={(e) =>
      setSelectedVariant({
        ...selectedVariant,
        [product.id]: Number(e.target.value)
      })
    }
  >
    <option value="">Seleccionar tono o color</option>

    {product.variants.map((v) => (
      <option key={v.id} value={v.id}>
        {v.name}
      </option>
    ))}
  </select>
)}
                  <div className="flex justify-between items-center mt-auto bg-pink-50 rounded-full px-3 py-2">
                    <button onClick={() => decreaseQty(product, selectedVariant?.[product.id])} className="w-9 h-9 bg-white rounded-full">−</button>
                    <span>{getQty(product.id, selectedVariant?.[product.id])}</span>
                   <button
  disabled={product.hasVariants && !selectedVariant[product.id]}
  onClick={() => addToCart(product, selectedVariant?.[product.id])}
  className="w-9 h-9 bg-pink-500 text-white rounded-full disabled:opacity-40"
>
  +
</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
})}
        </section>
      )}

      {/* BANNER FRASE */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="rounded-2xl bg-linear-to-r from-pink-200 via-pink-100 to-rose-100 py-10 text-center shadow-sm">
          <p className="text-pink-600 font-medium text-lg">
            Cada producto resalta tu belleza única ✨
          </p>
        </div>
      </section>

      {/* CART */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {cart.length > 0 ? (
          <>
            <button
              onClick={() => setShowSummary(true)}
              className="bg-pink-500 text-white px-4 py-2 rounded-full"
            >
              🛒 {cart.length}
            </button>

            <a
              href={`https://wa.me/573017170457?text=${buildWhatsAppMessage()}`}
              className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition"
            >
              <img
  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
  alt="WhatsApp"
  className="w-7 h-7"
/>
            </a>
          </>
        ) : (
          <a
            href={`https://wa.me/573017170457?text=${buildWhatsAppMessage()}`}
            className="fixed bottom-4 right-4 z-50 bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition"
          >
            <img
  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
  alt="WhatsApp"
  className="w-7 h-7"
/>
          </a>
        )}
      </div>

      {/* MINI CART DRAWER */}
      {showSummary && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl p-4 z-50">
            <div className="flex justify-between items-center">
              <h3 className="font-bold">Carrito</h3>
              <button onClick={() => setShowSummary(false)}>✕</button>
            </div>

            <div className="mt-4 space-y-2">
          {cart.map((c) => (
  <div
    key={`${c.id}-${c.variantId}`}
    className="flex justify-between text-sm"
  >
    
    {/* 🔴 BLOQUE IZQUIERDO (INFO PRODUCTO) */}
    <div>
      <span>
        {c.name} x{c.qty}
      </span>

      {/* 🔽 AQUÍ VA LA VARIANTE */}
      {c.variantId && (
        <p className="text-xs text-gray-400">
          Tono: {c.variantId}
        </p>
      )}
    </div>

    {/* 🔵 BLOQUE DERECHO (PRECIO UNITARIO Y TOTAL) */}
    <div className="text-right">
      <div className="text-xs text-gray-400">
        COP {formatTotal(parsePrice(c.price))} c/u
      </div>

      <span className="font-semibold">
        COP {formatTotal(parsePrice(c.price) * c.qty)}
      </span>
    </div>
 {/* 🔴 BOTÓN ELIMINAR (AQUÍ VA) */}
    <button
      onClick={() => removeFromCart(c.id, c.variantId)}
      className="ml-2 w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center"
    >
      ×
    </button>
  </div>
))}
            </div>

            <p className="mt-4 font-bold">Total: {formatTotal(total)}</p>

            <a
              href={`https://wa.me/573017170457?text=${buildWhatsAppMessage()}`}
              className="block mt-4 bg-green-500 text-white text-center py-3 rounded-full"
            >
              Finalizar compra
            </a>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-pink-200 bg-white py-8 text-center space-y-3">
        <p className="font-semibold">Lielashop Makeup</p>
  
        <div className="flex justify-center gap-4 pt-2">
          <a href="https://www.instagram.com/lielashop_makeup" target="_blank">
            <InstagramIcon />
          </a>
          <a href="https://www.facebook.com/people/Lielashop-Make-Up/61578019997912/?rdid=ZxbPrJxpS2yhKUal&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18WPPxJimF%2F" target="_blank">
            <FacebookIcon />
          </a>
        </div>
      </footer>

    </div>
  );
}
