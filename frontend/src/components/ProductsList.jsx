import { motion } from "framer-motion";
import { Trash, Star, Package } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
  const {
    deleteProduct,
    toggleFeaturedProduct,
    products,
  } = useProductStore();

  return (
    <motion.div
      className="mx-auto max-w-6xl overflow-hidden rounded-xl border border-[#1E293B] bg-[#121824] shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="border-b border-[#1E293B] px-5 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#38BDF8]/20 bg-[#38BDF8]/10">
            <Package className="h-5 w-5 text-[#38BDF8]" />
          </div>

          <div>
            <p className="text-sm font-medium text-[#38BDF8]">
              Inventory
            </p>

            <h2 className="text-xl font-semibold text-[#F5F7FA]">
              Products
            </h2>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#1E293B]">
          <thead className="bg-[#0D111A]">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#64748B]"
              >
                Product
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#64748B]"
              >
                Price
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#64748B]"
              >
                Category
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#64748B]"
              >
                In Stock
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#64748B]"
              >
                Featured
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#64748B]"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#1E293B] bg-[#121824]">
            {products?.map((product) => (
              <tr
                key={product._id}
                className="transition-colors duration-200 hover:bg-[#182131]"
              >
                {/* Product */}
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-[#1E293B] bg-[#0D111A]">
                      <img
                        className="h-full w-full object-cover"
                        src={product.image}
                        alt={product.name}
                      />
                    </div>

                    <div className="ml-4">
                      <div className="max-w-xs truncate text-sm font-medium text-[#F5F7FA]">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Price */}
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm font-medium text-[#38BDF8]">
                    ${Number(product.price).toFixed(2)}
                  </div>
                </td>

                {/* Category */}
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="inline-flex rounded-full border border-[#1E293B] bg-[#0D111A] px-2.5 py-1 text-xs font-medium capitalize text-[#9AA4B2]">
                    {product.category?.replaceAll("-", " ")}
                  </span>
                </td>

                {/* Stock */}
                <td className="whitespace-nowrap px-6 py-4">
                  <div
                    className={`text-sm font-medium ${
                      product.countInStock > 0
                        ? "text-[#9AA4B2]"
                        : "text-[#EF4444]"
                    }`}
                  >
                    {product.countInStock}
                  </div>
                </td>

                {/* Featured */}
                <td className="whitespace-nowrap px-6 py-4">
                  <button
                    type="button"
                    onClick={() => toggleFeaturedProduct(product._id)}
                    aria-label={
                      product.isFeatured
                        ? `Remove ${product.name} from featured products`
                        : `Add ${product.name} to featured products`
                    }
                    className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200 ${
                      product.isFeatured
                        ? "border-[#F59E0B]/30 bg-[#F59E0B]/10 text-[#F59E0B] hover:bg-[#F59E0B]/20"
                        : "border-[#1E293B] bg-[#0D111A] text-[#64748B] hover:border-[#F59E0B]/30 hover:text-[#F59E0B]"
                    }`}
                  >
                    <Star
                      className="h-4 w-4"
                      fill={product.isFeatured ? "currentColor" : "none"}
                    />
                  </button>
                </td>

                {/* Actions */}
                <td className="whitespace-nowrap px-6 py-4">
                  <button
                    type="button"
                    onClick={() => deleteProduct(product._id)}
                    aria-label={`Delete ${product.name}`}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-[#EF4444] transition-all duration-200 hover:border-[#EF4444]/20 hover:bg-[#EF4444]/10"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {(!products || products.length === 0) && (
        <div className="px-6 py-12 text-center">
          <Package className="mx-auto h-10 w-10 text-[#475569]" />

          <p className="mt-3 text-sm font-medium text-[#9AA4B2]">
            No products found
          </p>

          <p className="mt-1 text-sm text-[#64748B]">
            Create a product to see it here.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default ProductsList;