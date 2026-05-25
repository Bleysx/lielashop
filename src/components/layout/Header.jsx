export default function Header({
  logoUrl,
  scrolled
}) {
  return (
    <header className="sticky top-0 z-40 bg-white h-16">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center gap-3">

        <img
          src={logoUrl}
          className={`rounded-full transition-all duration-300 ${
            scrolled
              ? "w-9 h-9"
              : "w-12 h-12"
          }`}
        />

        <div className="leading-tight">
          <h1
            className={`font-bold transition-all duration-300 ${
              scrolled
                ? "text-base"
                : "text-xl"
            }`}
          >
            Lielashop Makeup
          </h1>

          <p className="text-xs text-pink-400 transition-all duration-300 opacity-100">
            Belleza y Maquillaje
          </p>

        </div>
      </div>
    </header>
  );
}