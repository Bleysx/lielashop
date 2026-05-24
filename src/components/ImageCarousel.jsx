import { useState, useEffect } from "react";
import { getCloudinaryUrl } from "../utils/cloudinary";
export default function ImageCarousel({
  images = [],
  featured = false
}) {

  const [index, setIndex] = useState(0);

  // ---------------- CLOUDINARY RESOLVER ----------------
 

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
? "h-44 object-cover bg-white"
: "h-48 md:h-56 object-cover"
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