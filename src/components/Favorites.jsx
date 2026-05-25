export default function Favorites({
  featuredProducts,
  handleFavoriteClick,
  showCatalog,
  setShowCatalog,
  setOpenSection,
  setSelectedVariant,
  ImageCarousel
}) {

  return (

    <section className="p-6 pt-2">

     <div className="mb-4">

  <h2 className="text-lg md:text-2xl font-bold text-pink-600 mb-4">
   🩷 Favoritos de nuestras clientes
  </h2>

  <div className="w-12 h-1 bg-pink-500 mt-2 rounded-full"></div>

</div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

        {featuredProducts.map((p) => (

          <div
            key={`fav-${p.id}`}
            onClick={() =>
              handleFavoriteClick(p)
            }
            className="relative bg-white rounded-2xl shadow cursor-pointer hover:scale-[1.02] transition h-full flex flex-col overflow-hidden"
          >
<div className="absolute top-2 right-2 z-10">

  <div className="bg-white/90 rounded-full p-1 shadow-sm hover:shadow-md">

    🩷

  </div>

</div>
           <div className="h-38 overflow-hidden">

              <ImageCarousel
                images={p.images || []}
                featured
              />

            </div>

            <div className="px-3 pt-3 pb-4">

              <p className="text-sm font-semibold leading-tight">

                {p.name}

              </p>

              <p className="text-pink-500 text-sm font-bold">
  {"$ " + Number(p.price).toLocaleString("en-US")}
</p>

            </div>

          </div>

        ))}

      </div>

<div className="mt-2 mb-1">

</div>

    </section>

  );

}