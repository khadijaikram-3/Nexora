import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowRight } from "lucide-react";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCard from "../components/GiftCouponCard";

const CartPage = () => {
  const { cart } = useCartStore();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080B12] text-[#F5F7FA] py-8 md:py-16">
      {/* Subtle background detail */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-[600px] -translate-x-1/2 rounded-full bg-[#38BDF8]/[0.03] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 2xl:px-0">
        {/* Page Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-1 text-sm font-medium uppercase tracking-[0.18em] text-[#38BDF8]">
            Shopping Cart
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-[#F5F7FA] sm:text-4xl">
            Your Cart
          </h1>

          {cart.length > 0 && (
            <p className="mt-2 text-sm text-[#64748B]">
              Review your items before checking out.
            </p>
          )}
        </motion.div>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          {/* Cart Items */}
          <motion.div
            className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {cart.length === 0 ? (
              <EmptyCartUI />
            ) : (
              <div className="space-y-5">
                {cart.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </div>
            )}

            {cart.length > 0 && <PeopleAlsoBought />}
          </motion.div>

          {/* Order Sidebar */}
          {cart.length > 0 && (
            <motion.div
              className="mx-auto mt-6 max-w-4xl flex-1 space-y-5 lg:mt-0 lg:w-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <OrderSummary />

              <GiftCouponCard />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;

const EmptyCartUI = () => (
  <motion.div
    className="flex min-h-[500px] flex-col items-center justify-center rounded-xl border border-[#1E293B] bg-[#121824] px-6 py-16 text-center shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-[#1E293B] bg-[#0D111A]">
      <ShoppingCart className="h-9 w-9 text-[#38BDF8]" />
    </div>

    <p className="mb-2 text-sm font-medium uppercase tracking-[0.15em] text-[#38BDF8]">
      Your cart
    </p>

    <h3 className="text-2xl font-semibold text-[#F5F7FA] sm:text-3xl">
      Your cart is empty
    </h3>

    <p className="mt-3 max-w-md text-sm leading-relaxed text-[#64748B]">
      Looks like you haven't added anything to your cart yet. Explore Nexora
      and find something worth taking home.
    </p>

    <Link
      className="group mt-7 inline-flex items-center rounded-lg bg-[#38BDF8] px-6 py-3 text-sm font-semibold text-[#080B12] transition-all duration-200 hover:bg-[#0EA5E9] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
      to="/"
    >
      Start Shopping
      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  </motion.div>
);