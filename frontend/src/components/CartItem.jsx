import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <div className='rounded-xl border border-[#1E293B] bg-[#121824] p-4 shadow-lg transition-all duration-300 hover:border-[#334155] md:p-6'>
      <div className='space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0'>

        {/* Product Image */}
        <div className='shrink-0 md:order-1'>
          <img
            className='h-20 w-20 rounded-lg object-cover border border-[#1E293B] md:h-32 md:w-32'
            src={item.image}
            alt={item.name}
          />
        </div>

        <label className='sr-only'>Choose quantity:</label>

        {/* Quantity + Price */}
        <div className='flex items-center justify-between md:order-3 md:justify-end'>
          <div className='flex items-center gap-2'>

            <button
              className='inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#1E293B] bg-[#0D111A] text-[#9AA4B2] transition-colors duration-200 hover:border-[#38BDF8]/40 hover:bg-[#182131] hover:text-[#38BDF8] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30'
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
              aria-label='Decrease quantity'
            >
              <Minus size={15} />
            </button>

            <p className='min-w-8 text-center text-sm font-medium text-[#F5F7FA]'>
              {item.quantity}
            </p>

            <button
              className='inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#1E293B] bg-[#0D111A] text-[#9AA4B2] transition-colors duration-200 hover:border-[#38BDF8]/40 hover:bg-[#182131] hover:text-[#38BDF8] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30'
              onClick={() =>
                updateQuantity(item._id, Number(item.quantity) + 1)
              }
              aria-label='Increase quantity'
            >
              <Plus size={15} />
            </button>

          </div>

          <div className='ml-6 text-end md:order-4 md:w-32'>
            <p className='text-base font-bold text-[#38BDF8]'>
              ${item.price}
            </p>
          </div>
        </div>

        {/* Product Details */}
        <div className='w-full min-w-0 flex-1 space-y-3 md:order-2 md:max-w-md'>
          <p className='text-base font-semibold text-[#F5F7FA] transition-colors duration-200 hover:text-[#38BDF8]'>
            {item.name}
          </p>

          <p className='text-sm leading-relaxed text-[#9AA4B2]'>
            {item.description}
          </p>

          <div className='flex items-center gap-4'>
            <button
              className='inline-flex items-center text-sm font-medium text-red-400 transition-colors duration-200 hover:text-red-300 hover:underline focus:outline-none'
              onClick={() => removeFromCart(item._id)}
              aria-label={`Remove ${item.name} from cart`}
            >
              <Trash size={17} />
              <span className='ml-1.5'>Remove</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartItem;