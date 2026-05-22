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

    <section className="p-6">

      <h2 className="text-2xl font-bold text-pink-600 mb-4">
        Favoritos
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

        {featuredProducts.map((p) => (

          <div
            key={`fav-${p.id}`}
            onClick={() =>
              handleFavoriteClick(p)
            }
            className="bg-white rounded-xl shadow cursor-pointer hover:scale-[1.02] transition h-full flex flex-col overflow-hidden"
          >

            <div className="h-40 overflow-hidden">

              <ImageCarousel
                images={p.images || []}
                featured
              />

            </div>

            <div className="p-4">

              <p className="text-sm font-semibold leading-tight">

                {p.name}

              </p>

              <p className="text-pink-500 text-sm font-bold">
  {"$ " + Number(p.price).toLocaleString("en-US")}
</p>

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

            setShowCatalog(prev => {

              const newValue = !prev;

              if (prev === true) {

                setOpenSection(null);
                setSelectedVariant({});

              }

              return newValue;

            });

          }}
          className="bg-pink-500 text-white px-4 py-2 rounded-full"
        >

          {showCatalog
            ? "Cerrar catálogo"
            : "Ver catálogo"}

        </button>

      </div>

    </section>

  );

}