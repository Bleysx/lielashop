export default function Hero({
  setShowCatalog,
  catalogRef
}) {

  return (
    <section
      className="text-center py-10 bg-cover bg-center relative mb-8"
      style={{
        backgroundImage:
          "url(https://media.istockphoto.com/id/1658893205/es/foto/inventar-productos-en-la-vista-superior-de-fondo-rosa.jpg?s=612x612&w=0&k=20&c=XX_FdY2MVCSnlJY-D9BuC-C6qCJAqStGokQRAoD58Go=)"
      }}
    >

      <div className="absolute inset-0 bg-white/70" />

      <div className="relative">

        <h1 className="text-2xl font-bold">
          ✨ La belleza empieza aquí ✨
        </h1>

        <p className="text-gray-600 mt-3">
          Descubre tus productos favoritos
        </p>

        <button
          onClick={() => {

            setShowCatalog(true);

            setTimeout(() => {

              catalogRef.current?.scrollIntoView({
                behavior:"smooth",
                block:"start"
              });

            },100);

          }}
          className="mt-6 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition"
        >
          Comprar ahora
        </button>

      </div>

    </section>
  );

}