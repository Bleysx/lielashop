export default function Catalog({
  showCatalog,
  catalogRef,
  catalogSections,
  openSection,
  setOpenSection,
  getProductsByCategory,
  search,
  setSearch,
  ImageCarousel,
  selectedVariant,
  setSelectedVariant,
  getQty,
  decreaseQty,
  addToCart
}) {

  const hasResults = catalogSections.some((section) =>
  getProductsByCategory(section.key).some((product) => {
    const text = `${product.name ?? ""} ${product.description ?? ""} ${product.category ?? ""}`
      .toLowerCase();

    return text.includes(search.toLowerCase());
  })
);

  return (
    <section
  ref={catalogRef}
  className="existing-classes pt-2 pb-10 px-4"
>
     
     <div className="mb-6">

  <div className="relative">

    <input
      type="text"
      placeholder="Buscar..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="
        w-full
        pl-11
        pr-4
        py-3
        rounded-2xl
        border
        border-pink-200
        bg-white/95
        backdrop-blur-sm
        shadow-sm
        focus:outline-none
        focus:ring-2
        focus:ring-pink-300
        focus:border-pink-300
        text-sm
      "
    />

    <span
      className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        text-gray-400
      "
    >
      🔍
    </span>

  </div>

</div>
{
search.trim()
&&
!hasResults
&& (

<div
className="
text-center
py-10
text-gray-500
"
>

<p className="text-lg">

🔍 No encontramos productos

</p>

<p className="text-sm mt-2">

Prueba otra palabra.

</p>

</div>

)
}
     {catalogSections
.filter((section) => {

if (!search?.trim())
return true;

const items =
getProductsByCategory(section.key);

return items.some((product) => {

const text = [
product.name,
product.description,
product.category
]
.join(" ")
.toLowerCase();

return text.includes(
search.toLowerCase()
);

});

})
.map((section) => {
        const isSearching = search?.trim();

const isOpen =
  isSearching ||
  openSection === section.key;
      const items = getProductsByCategory(section.key)
.filter((product) => {

if (!search?.trim())
return true;

const text = [
product.name,
product.description,
product.category
]
.join(" ")
.toLowerCase();

return text.includes(
search.toLowerCase()
);

});
        return (
          <div
            id={`section-${section.key}`}
            key={section.key}
            className="mb-6 scroll-mt-24"
          >
            {/* HEADER DE LA SECCIÓN */}
            <button
              onClick={() => {
                setOpenSection(isOpen ? null : section.key);

                setTimeout(() => {
                  document
                    .getElementById(`section-${section.key}`)
                    ?.scrollIntoView({
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

                <div className="w-12 h-1 bg-pink-500 mt-1 rounded-full"></div>
              </div>

              <span className="text-xl">{isOpen ? "−" : "+"}</span>
            </button>

            {/* PRODUCTOS (ESTO ES LO QUE TE FALTABA) */}
            {isOpen && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">

                {items.length === 0 ? (
                  <p className="text-gray-400">Próximamente productos</p>
                ) : (
                  items.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-2 flex flex-col scale-[0.96]"
                    >
                      {/* IMÁGENES */}
                      <ImageCarousel
  images={
    Array.isArray(product.images)
      ? product.images
      : product.images
      ? [product.images]
      : product.image
      ? [product.image]
      : []
  }
/>

                     <div className="pt-1 px-2 pb-2 flex flex-col">
                        <p className="text-[13px] font-semibold leading-tight">
                          {product.name}
                        </p>

                     <p className="text-pink-500 text-xs font-bold mt-2">
  {"$ " + Number(String(product.price).replace(/\D/g, "")).toLocaleString("en-US")}
</p>
                      
{/* VARIANTES */}
{product.variants?.length > 0 && (

  <select
    className="w-full text-xs mt-3 border rounded-md p-1"
    value={selectedVariant?.[product.id] || ""}
    onChange={(e) =>
      setSelectedVariant({
        ...selectedVariant,
        [product.id]: e.target.value,
      })
    }
  >

    <option value="">
      Seleccionar tono o color
    </option>

    {product.variants.map((v, i) => (
      <option key={i} value={v.name}>
        {v.name}
      </option>
    ))}

  </select>

)}
                        {/* CONTADOR */}
                        <div className="flex justify-between items-center mt-3 bg-pink-50 rounded-full px-3 py-2">
                          <button
                            onClick={() =>
  decreaseQty(
    product.id,
    selectedVariant?.[product.id]
  )
}
                            className="w-9 h-9 bg-white rounded-full"
                          >
                            −
                          </button>

                          <span>
                            {getQty(product.id, selectedVariant?.[product.id])}
                          </span>

                          <button
                            disabled={
                              product.hasVariants &&
                              !selectedVariant?.[product.id]
                            }
                            onClick={() =>
                              addToCart(product, selectedVariant?.[product.id])
                            }
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
  );
}