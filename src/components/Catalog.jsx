export default function Catalog({
  showCatalog,
  catalogRef,
  catalogSections,
  openSection,
  setOpenSection,
  getProductsByCategory,
  ImageCarousel,
  selectedVariant,
  setSelectedVariant,
  getQty,
  decreaseQty,
  addToCart
}) {
  if (!showCatalog) return null;

  return (
    <section ref={catalogRef} className="existing-classes py-10 px-4">

      {catalogSections.map((section) => {
        const isOpen = openSection === section.key;
        const items = getProductsByCategory(section.key);

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
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">

                {items.length === 0 ? (
                  <p className="text-gray-400">Próximamente productos</p>
                ) : (
                  items.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-2 md:p-3 flex flex-col"
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

                      <div className="p-2 flex flex-col flex-1">
                        <p className="text-sm font-semibold leading-tight">
                          {product.name}
                        </p>

                        {product.description && (
                          <p className="text-xs text-gray-500 mt-1">
                            {product.description}
                          </p>
                        )}

                     <p className="text-pink-500 text-sm font-bold mt-1">
  {"$ " + Number(String(product.price).replace(/\D/g, "")).toLocaleString("en-US")}
</p>
                      
                        {/* VARIANTES */}
                       {product.variants?.length > 0 && (
                          <select
                            className="w-full text-xs mt-2 border rounded-md p-1"
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
                        <div className="flex justify-between items-center mt-auto bg-pink-50 rounded-full px-3 py-2">
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