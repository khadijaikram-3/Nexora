import { XCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PurchaseCancelPage = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080B12] px-4 py-12">
      {/* Subtle background detail */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EF4444]/[0.025] blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-xl border border-[#1E293B] bg-[#121824] shadow-xl"
      >
        <div className="p-6 sm:p-8">
          {/* Status Icon */}
          <div className="mb-5 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#EF4444]/20 bg-[#EF4444]/10">
              <XCircle className="h-8 w-8 text-[#EF4444]" />
            </div>
          </div>

          {/* Heading */}
          <p className="mb-2 text-center text-sm font-medium uppercase tracking-[0.18em] text-[#EF4444]">
            Checkout
          </p>

          <h1 className="mb-3 text-center text-2xl font-bold tracking-tight text-[#F5F7FA] sm:text-3xl">
            Purchase Cancelled
          </h1>

          <p className="mb-6 text-center text-sm leading-relaxed text-[#9AA4B2]">
            Your order has been cancelled. No charges have been made.
          </p>

          {/* Information Box */}
          <div className="mb-6 rounded-lg border border-[#1E293B] bg-[#0D111A] p-4">
            <p className="text-center text-sm leading-relaxed text-[#64748B]">
              If you encountered any issues during the checkout process, please
              don't hesitate to contact our team.
            </p>
          </div>

          {/* Return Button */}
          <Link
            to="/"
            className="group flex w-full items-center justify-center rounded-lg border border-[#1E293B] bg-[#0D111A] px-4 py-2.5 text-sm font-semibold text-[#F5F7FA] transition-all duration-200 hover:border-[#38BDF8]/40 hover:bg-[#182131] hover:text-[#38BDF8] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/20"
          >
            <ArrowLeft
              className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            Return to Shop
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PurchaseCancelPage;