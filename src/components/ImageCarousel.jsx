import { useState, useEffect } from "react";
import { getCloudinaryUrl } from "../utils/cloudinary";

export default function ImageCarousel({
  images = [],
  featured = false
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images.length) return;

    const img = new Image();
    img.src = getCloudinaryUrl(images[index]);
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