import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MoveRight, LockKeyhole } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";

const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();

  const savings = subtotal - total;
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSavings = savings.toFixed(2);

  const handlePayment = async () => {
    try {
      const res = await axios.post("/payments/create-checkout-session", {
        products: cart,
        couponCode: coupon ? coupon.code : null,
      });

      const session = res.data;

      window.location.href = session.url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <motion.div
      className="space-y-5 rounded-xl border border-[#1E293B] bg-[#121824] p-4 shadow-lg sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-[#38BDF8]">
          Checkout
        </p>

        <h2 className="mt-1 text-xl font-semibold text-[#F5F7FA]">
          Order Summary
        </h2>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3">
        <dl className="flex items-center justify-between gap-4">
          <dt className="text-sm text-[#9AA4B2]">
            Original Price
          </dt>

          <dd className="text-sm font-medium text-[#F5F7FA]">
            ${formattedSubtotal}
          </dd>
        </dl>

        {savings > 0 && (
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-sm text-[#9AA4B2]">
              Savings
            </dt>

            <dd className="text-sm font-medium text-[#22C55E]">
              -${formattedSavings}
            </dd>
          </dl>
        )}

        {coupon && isCouponApplied && (
          <dl className="flex items-center justify-between gap-4">
            <dt className="min-w-0 text-sm text-[#9AA4B2]">
              Coupon{" "}
              <span className="text-[#64748B]">
                ({coupon.code})
              </span>
            </dt>

            <dd className="shrink-0 text-sm font-medium text-[#22C55E]">
              -{coupon.discountPercentage}%
            </dd>
          </dl>
        )}

        {/* Total */}
        <div className="border-t border-[#1E293B] pt-4">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-semibold text-[#F5F7FA]">
              Total
            </dt>

            <dd className="text-2xl font-bold text-[#38BDF8]">
              ${formattedTotal}
            </dd>
          </dl>
        </div>
      </div>

      {/* Checkout Button */}
      <motion.button
        type="button"
        className="flex w-full items-center justify-center rounded-lg bg-[#38BDF8] px-5 py-3 text-sm font-semibold text-[#080B12] transition-colors duration-200 hover:bg-[#0EA5E9] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        onClick={handlePayment}
      >
        Proceed to Checkout
        <MoveRight className="ml-2 h-4 w-4" />
      </motion.button>

      {/* Security Note */}
      <div className="flex items-center justify-center gap-2 text-[#64748B]">
        <LockKeyhole className="h-3.5 w-3.5" />

        <span className="text-xs">
          Secure checkout
        </span>
      </div>

      {/* Continue Shopping */}
      <div className="flex items-center justify-center gap-2 border-t border-[#1E293B] pt-4">
        <span className="text-sm text-[#64748B]">
          or
        </span>

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#7DD3FC] transition-colors duration-200 hover:text-[#38BDF8]"
        >
          Continue Shopping
          <MoveRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
};

export default OrderSummary;