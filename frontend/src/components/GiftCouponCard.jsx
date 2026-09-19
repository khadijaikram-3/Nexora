import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Tag, X } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { toast } from "react-hot-toast";

const GiftCouponCard = () => {
  const [userInputCode, setUserInputCode] = useState("");

  const {
    coupon,
    isCouponApplied,
    applyCoupon,
    getMyCoupon,
    removeCoupon,
  } = useCartStore();

  useEffect(() => {
    const loadCoupon = async () => {
      const couponData = await getMyCoupon();

      if (couponData?.code) {
        setUserInputCode(couponData.code);
      }
    };

    loadCoupon();
  }, [getMyCoupon]);

  const handleApplyCoupon = () => {
    if (!userInputCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    applyCoupon(userInputCode.trim());
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setUserInputCode("");
  };

  return (
    <motion.div
      className="space-y-5 rounded-xl border border-[#1E293B] bg-[#121824] p-4 shadow-lg sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#38BDF8]/20 bg-[#38BDF8]/10">
          <Tag className="h-5 w-5 text-[#38BDF8]" />
        </div>

        <div>
          <p className="text-sm font-medium text-[#38BDF8]">
            Savings
          </p>

          <h3 className="text-lg font-semibold text-[#F5F7FA]">
            Voucher or Gift Card
          </h3>
        </div>
      </div>

      {/* Coupon Input */}
      <div className="space-y-3">
        <label
          htmlFor="voucher"
          className="block text-sm font-medium text-[#9AA4B2]"
        >
          Enter your coupon code
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            id="voucher"
            className="block w-full rounded-lg border border-[#1E293B] bg-[#0D111A] px-3 py-2.5 text-sm text-[#F5F7FA] placeholder-[#64748B] outline-none transition-all duration-200 focus:border-[#38BDF8]/60 focus:ring-2 focus:ring-[#38BDF8]/10"
            placeholder="e.g. NEXORA10"
            value={userInputCode}
            onChange={(e) => setUserInputCode(e.target.value)}
          />

          <motion.button
            type="button"
            className="flex shrink-0 items-center justify-center rounded-lg bg-[#38BDF8] px-5 py-2.5 text-sm font-semibold text-[#080B12] transition-colors duration-200 hover:bg-[#0EA5E9] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleApplyCoupon}
          >
            Apply Code
          </motion.button>
        </div>
      </div>

      {/* Applied Coupon */}
      {isCouponApplied && coupon && (
        <motion.div
          className="rounded-lg border border-[#22C55E]/20 bg-[#22C55E]/5 p-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[#22C55E]">
                Coupon Applied
              </p>

              <p className="mt-1 text-sm text-[#9AA4B2]">
                <span className="font-semibold text-[#F5F7FA]">
                  {coupon.code}
                </span>{" "}
                — {coupon.discountPercentage}% off
              </p>
            </div>

            <button
              type="button"
              onClick={handleRemoveCoupon}
              className="rounded-md p-1 text-[#64748B] transition-colors hover:bg-[#22C55E]/10 hover:text-[#EF4444] focus:outline-none"
              aria-label="Remove coupon"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Available Coupon */}
      {coupon && !isCouponApplied && (
        <div className="rounded-lg border border-[#1E293B] bg-[#0D111A] p-4">
          <p className="text-sm font-medium text-[#9AA4B2]">
            Your Available Coupon
          </p>

          <div className="mt-2 flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-[#F5F7FA]">
              {coupon.code}
            </span>

            <span className="rounded-full border border-[#38BDF8]/20 bg-[#38BDF8]/10 px-2.5 py-1 text-xs font-medium text-[#7DD3FC]">
              {coupon.discountPercentage}% off
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default GiftCouponCard;