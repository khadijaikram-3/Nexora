import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = [
  "audio",
  "gaming",
  "entertainment",
  "mobile-accessories",
  "smart-tech",
  "cameras-creator",
];

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    countInStock: "",
    image: "",
  });

  const { createProduct, loading } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProduct(newProduct);

      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        countInStock: "",
        image: "",
      });
    } catch {
      console.log("Error creating a product");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewProduct({
          ...newProduct,
          image: reader.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      className="mx-auto mb-8 max-w-2xl rounded-xl border border-[#1E293B] bg-[#121824] p-6 shadow-lg sm:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="mb-7">
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#38BDF8]/20 bg-[#38BDF8]/10">
            <PlusCircle className="h-5 w-5 text-[#38BDF8]" />
          </div>

          <div>
            <p className="text-sm font-medium text-[#38BDF8]">
              Inventory
            </p>

            <h2 className="text-2xl font-semibold text-[#F5F7FA]">
              Create New Product
            </h2>
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-[#64748B]">
          Add a new product to your Nexora store inventory.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Product Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-[#9AA4B2]"
          >
            Product Name
          </label>

          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                name: e.target.value,
              })
            }
            placeholder="e.g. Wireless Noise Cancelling Headphones"
            className="block w-full rounded-lg border border-[#1E293B] bg-[#0D111A] px-3 py-2.5 text-sm text-[#F5F7FA] placeholder-[#64748B] outline-none transition-all duration-200 focus:border-[#38BDF8]/60 focus:ring-2 focus:ring-[#38BDF8]/10"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-[#9AA4B2]"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                description: e.target.value,
              })
            }
            rows="4"
            placeholder="Describe the product and its key features..."
            className="block w-full resize-none rounded-lg border border-[#1E293B] bg-[#0D111A] px-3 py-2.5 text-sm text-[#F5F7FA] placeholder-[#64748B] outline-none transition-all duration-200 focus:border-[#38BDF8]/60 focus:ring-2 focus:ring-[#38BDF8]/10"
            required
          />
        </div>

        {/* Price + Stock */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="price"
              className="mb-2 block text-sm font-medium text-[#9AA4B2]"
            >
              Price
            </label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#64748B]">
                $
              </span>

              <input
                type="number"
                id="price"
                name="price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: e.target.value,
                  })
                }
                step="0.01"
                min="0"
                placeholder="0.00"
                className="block w-full rounded-lg border border-[#1E293B] bg-[#0D111A] py-2.5 pl-7 pr-3 text-sm text-[#F5F7FA] placeholder-[#64748B] outline-none transition-all duration-200 focus:border-[#38BDF8]/60 focus:ring-2 focus:ring-[#38BDF8]/10"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="countInStock"
              className="mb-2 block text-sm font-medium text-[#9AA4B2]"
            >
              Stock
            </label>

            <input
              type="number"
              id="countInStock"
              name="countInStock"
              value={newProduct.countInStock}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  countInStock: e.target.value,
                })
              }
              min="0"
              placeholder="0"
              className="block w-full rounded-lg border border-[#1E293B] bg-[#0D111A] px-3 py-2.5 text-sm text-[#F5F7FA] placeholder-[#64748B] outline-none transition-all duration-200 focus:border-[#38BDF8]/60 focus:ring-2 focus:ring-[#38BDF8]/10"
              required
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-medium text-[#9AA4B2]"
          >
            Category
          </label>

          <select
            id="category"
            name="category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                category: e.target.value,
              })
            }
            className="block w-full rounded-lg border border-[#1E293B] bg-[#0D111A] px-3 py-2.5 text-sm text-[#F5F7FA] outline-none transition-all duration-200 focus:border-[#38BDF8]/60 focus:ring-2 focus:ring-[#38BDF8]/10"
            required
          >
            <option value="">Select a category</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category
                  .split("-")
                  .map(
                    (word) =>
                      word.charAt(0).toUpperCase() + word.slice(1)
                  )
                  .join(" ")}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#9AA4B2]">
            Product Image
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="file"
              id="image"
              className="sr-only"
              accept="image/*"
              onChange={handleImageChange}
            />

            <label
              htmlFor="image"
              className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-[#1E293B] bg-[#0D111A] px-4 py-2.5 text-sm font-medium text-[#9AA4B2] transition-all duration-200 hover:border-[#38BDF8]/40 hover:bg-[#182131] hover:text-[#F5F7FA] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/20"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Image
            </label>

            {newProduct.image && (
              <span className="flex items-center gap-2 text-sm text-[#22C55E]">
                <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
                Image uploaded
              </span>
            )}
          </div>
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={!loading ? { y: -1 } : {}}
          whileTap={!loading ? { scale: 0.98 } : {}}
          className="mt-2 flex w-full items-center justify-center rounded-lg bg-[#38BDF8] px-4 py-2.5 text-sm font-semibold text-[#080B12] transition-colors duration-200 hover:bg-[#0EA5E9] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader
                className="mr-2 h-5 w-5 animate-spin"
                aria-hidden="true"
              />
              Creating Product...
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Product
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;