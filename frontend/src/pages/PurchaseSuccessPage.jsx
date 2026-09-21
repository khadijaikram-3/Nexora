import { ArrowRight, CheckCircle, HandHeart, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../lib/axios";
import Confetti from "react-confetti";
import { useCartStore } from "../stores/useCartStore";

const PurchaseSuccessPage = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const { clearCart } = useCartStore();

  useEffect(() => {
    let isMounted = true;

    const handleCheckoutSuccess = async () => {
      try {
        const sessionId = new URLSearchParams(
          window.location.search
        ).get("session_id");

        if (!sessionId) {
          if (isMounted) {
            setError("No Session ID found in the URL");
            setIsProcessing(false);
          }
          return;
        }

        await axios.post("/payments/checkout-success", {
          sessionId,
        });

        clearCart();
      } catch (error) {
        console.error("Checkout success processing failed:", error);

        if (isMounted) {
          setError(
            error.response?.data?.message ||
              "We couldn't confirm your purchase. Please check your order details."
          );
        }
      } finally {
        if (isMounted) {
          setIsProcessing(false);
        }
      }
    };

    handleCheckoutSuccess();

    return () => {
      isMounted = false;
    };
  }, [clearCart]);

  if (isProcessing) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080B12] px-4">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#38BDF8]/[0.025] blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#38BDF8]/20 bg-[#38BDF8]/10">
            <Loader className="h-7 w-7 animate-spin text-[#38BDF8]" />
          </div>

          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#38BDF8]">
            Nexora
          </p>

          <h1 className="mt-2 text-2xl font-semibold text-[#F5F7FA]">
            Processing your purchase
          </h1>

          <p className="mt-2 text-sm text-[#64748B]">
            Please wait while we confirm your payment.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080B12] px-4 py-12">
        <div className="relative z-10 w-full max-w-md rounded-xl border border-[#1E293B] bg-[#121824] p-6 text-center shadow-xl sm:p-8">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#EF4444]/20 bg-[#EF4444]/10">
            <CheckCircle className="h-8 w-8 text-[#EF4444]" />
          </div>

          <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-[#EF4444]">
            Checkout
          </p>

          <h1 className="text-2xl font-bold text-[#F5F7FA]">
            We couldn't confirm your purchase
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-[#9AA4B2]">
            {error}
          </p>

          <Link
            to="/"
            className="mt-7 flex w-full items-center justify-center rounded-lg bg-[#38BDF8] px-4 py-2.5 text-sm font-semibold text-[#080B12] transition-colors duration-200 hover:bg-[#0EA5E9]"
          >
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080B12] px-4 py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#22C55E]/[0.025] blur-3xl" />
      </div>

      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.1}
        style={{ zIndex: 99 }}
        numberOfPieces={700}
        recycle={false}
      />

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-xl border border-[#1E293B] bg-[#121824] shadow-xl">
        <div className="p-6 sm:p-8">
          <div className="mb-5 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#22C55E]/20 bg-[#22C55E]/10">
              <CheckCircle className="h-8 w-8 text-[#22C55E]" />
            </div>
          </div>

          <p className="mb-2 text-center text-sm font-medium uppercase tracking-[0.18em] text-[#22C55E]">
            Order Confirmed
          </p>

          <h1 className="mb-3 text-center text-2xl font-bold tracking-tight text-[#F5F7FA] sm:text-3xl">
            Purchase Successful!
          </h1>

          <p className="text-center text-sm leading-relaxed text-[#9AA4B2]">
            Thank you for your order. We're processing it now.
          </p>

          <p className="mt-2 text-center text-sm text-[#22C55E]">
            Check your email for order details and updates.
          </p>

          <div className="my-6 rounded-lg border border-[#1E293B] bg-[#0D111A] p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-[#64748B]">
                Order number
              </span>

              <span className="text-sm font-semibold text-[#22C55E]">
                #12345
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-[#64748B]">
                Estimated delivery
              </span>

              <span className="text-sm font-semibold text-[#22C55E]">
                3–5 business days
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex w-full items-center justify-center rounded-lg border border-[#22C55E]/20 bg-[#22C55E]/[0.06] px-4 py-2.5 text-sm font-semibold text-[#22C55E]">
              <HandHeart className="mr-2 h-4 w-4" />
              Thanks for trusting us!
            </div>

            <Link
              to="/"
              className="group flex w-full items-center justify-center rounded-lg bg-[#38BDF8] px-4 py-2.5 text-sm font-semibold text-[#080B12] transition-colors duration-200 hover:bg-[#0EA5E9] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30"
            >
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccessPage;