import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", {
        id: "login",
      });
      return;
    }

    addToCart(product);
  };

  return (
    <motion.div
      className="group relative flex w-full flex-col overflow-hidden rounded-xl border border-[#1E293B] bg-[#121824] shadow-lg"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Product Image */}
      <div className="relative mx-3 mt-3 h-60 overflow-hidden rounded-lg bg-[#0D111A]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        <div className="pointer-events-none absolute inset-0 bg-black/5 transition-colors duration-300 group-hover:bg-transparent" />
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <h5 className="line-clamp-1 text-xl font-semibold tracking-tight text-[#F5F7FA]">
          {product.name}
        </h5>

        <div className="mb-5 mt-3 flex items-center justify-between">
          <span className="text-2xl font-bold text-[#38BDF8]">
            ${Number(product.price).toFixed(2)}
          </span>
        </div>

        {/* Add to Cart */}
        <motion.button
          type="button"
          className="mt-auto flex w-full items-center justify-center rounded-lg bg-[#38BDF8] px-5 py-2.5 text-center text-sm font-semibold text-[#080B12] transition-colors duration-200 hover:bg-[#0EA5E9] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
          onClick={handleAddToCart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;