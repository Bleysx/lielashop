import { useState, useEffect } from "react";

export default function ImageCarousel({
  images = [],
  featured = false
}) {

  const [index, setIndex] = useState(0);

  // ---------------- CLOUDINARY RESOLVER ----------------
  const getCloudinaryUrl = (image, width = 400) => {
    if (!image) return "";

    // ya es URL completa (secure_url)
    if (image.startsWith("http")) {
      return image;
    }

    // public_id antiguo
    const cloudName = "dx17lxzey";
    return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_${width}/${image}`;
  };

  // ---------------- PRELOAD ----------------
  useEffect(() => {
    if (!images.length) return;

    const img = new Image();
    img.src = getCloudinaryUrl(images[index] || images[0], 400);
  }, [images, index]);

  if (!images.length) return null;

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIndex((prev) =>
      (prev - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative">

      <img
        src={getCloudinaryUrl(images[index], 400)}
        loading="lazy"
        decoding="async"
          style={{ objectFit: "cover" }}
        className={`w-full rounded-xl ${
          featured
            ? "h-48 object-cover bg-white"
            : "h-56 md:h-72 object-cover"
        }`}
      />

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 bg-white/70 px-2 rounded-full"
          >
            ‹
          </button>

          <button
            onClick={next}
            className="absolute right-2 top-1/2 bg-white/70 px-2 rounded-full"
          >
            ›
          </button>
        </>
      )}

    </div>
  );
}