import { useEffect, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";

const FeaturedProducts = ({ featuredProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const { addToCart } = useCartStore();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else if (window.innerWidth < 1200) setItemsPerPage(3);
      else setItemsPerPage(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
  };

  const isStartDisabled = currentIndex === 0;

  const isEndDisabled =
    currentIndex >= featuredProducts.length - itemsPerPage;

  return (
    <div className="py-4">
      <div className="relative mx-auto max-w-7xl px-2 sm:px-4">

        {/* Products viewport */}
        <div className="overflow-hidden">
          {/* Sliding products */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${
                currentIndex * (100 / itemsPerPage)
              }%)`,
            }}
          >
            {featuredProducts?.map((product) => (
              <div
                key={product._id}
                className="w-full shrink-0 p-2 sm:w-1/2 lg:w-1/3 xl:w-1/4"
              >
                <motion.div
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#1E293B] bg-[#121824] shadow-lg"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  {/* Product Image */}
                  <div className="relative mx-3 mt-3 overflow-hidden rounded-lg bg-[#0D111A]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-48 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-black/5 transition-colors duration-300 group-hover:bg-transparent" />
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-[#F5F7FA]">
                      {product.name}
                    </h3>

                    <p className="mb-5 text-xl font-bold text-[#38BDF8]">
                      ${Number(product.price).toFixed(2)}
                    </p>

                    <motion.button
                      onClick={() => addToCart(product)}
                      className="mt-auto flex w-full items-center justify-center rounded-lg bg-[#38BDF8] px-4 py-2.5 text-sm font-semibold text-[#080B12] transition-colors duration-200 hover:bg-[#0EA5E9] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Previous button */}
        <button
          onClick={prevSlide}
          disabled={isStartDisabled}
          aria-label="Previous featured products"
          className={`absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 -translate-x-1/2 items-center justify-center rounded-full border transition-all duration-200 ${
            isStartDisabled
              ? "cursor-not-allowed border-[#1E293B] bg-[#121824] text-[#475569] opacity-60"
              : "border-[#1E293B] bg-[#121824] text-[#9AA4B2] shadow-lg hover:border-[#38BDF8]/50 hover:bg-[#182131] hover:text-[#38BDF8]"
          }`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Next button */}
        <button
          onClick={nextSlide}
          disabled={isEndDisabled}
          aria-label="Next featured products"
          className={`absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border transition-all duration-200 ${
            isEndDisabled
              ? "cursor-not-allowed border-[#1E293B] bg-[#121824] text-[#475569] opacity-60"
              : "border-[#1E293B] bg-[#121824] text-[#9AA4B2] shadow-lg hover:border-[#38BDF8]/50 hover:bg-[#182131] hover:text-[#38BDF8]"
          }`}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default FeaturedProducts;