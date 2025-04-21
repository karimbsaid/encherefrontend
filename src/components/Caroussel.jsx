import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const Carousel = ({ images = [], title = "Image", showThumbnails = true }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <>
      {/* Main Image Viewer */}
      <div className="relative   overflow-hidden rounded-lg bg-muted">
        <img
          src={images[currentImageIndex] || "/placeholder.svg"}
          alt={title}
          className="w-auto h-96 object-cover"
        />

        {/* Prev Button */}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-1 rounded-full shadow"
        >
          <HiChevronLeft className="h-6 w-6 text-black" />
        </button>

        {/* Next Button */}
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-1 rounded-full shadow"
        >
          <HiChevronRight className="h-6 w-6 text-black" />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-2 right-2 rounded-md bg-white/70 px-2 py-1 text-xs text-black">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {showThumbnails && (
        <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md ${
                index === currentImageIndex
                  ? "ring-2 ring-primary"
                  : "ring-1 ring-border"
              }`}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Carousel;
