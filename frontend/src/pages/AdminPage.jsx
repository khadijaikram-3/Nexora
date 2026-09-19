import { BarChart3, PlusCircle, ShoppingBasket } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";

import AnalyticsTab from "../components/AnalyticsTab";
import ProductsList from "../components/ProductsList";
import CreateProductForm from "../components/CreateProductForm";

const tabs = [
  {
    id: "create",
    label: "Create Product",
    icon: PlusCircle,
  },
  {
    id: "products",
    label: "Products",
    icon: ShoppingBasket,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
  },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");
  const { fetchAllProducts } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080B12] text-[#F5F7FA]">
      {/* Subtle background detail */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-[600px] -translate-x-1/2 rounded-full bg-[#38BDF8]/[0.03] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

        {/* Page Header */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-[#38BDF8]">
            Nexora Management
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-[#F5F7FA] sm:text-4xl">
            Admin Dashboard
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#64748B] sm:text-base">
            Manage your products, inventory, and store performance from one
            place.
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          className="mb-10 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex w-full max-w-2xl flex-col gap-2 rounded-xl border border-[#1E293B] bg-[#0D111A] p-1.5 sm:flex-row">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#38BDF8] text-[#080B12] shadow-sm"
                      : "text-[#9AA4B2] hover:bg-[#182131] hover:text-[#F5F7FA]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === "create" && <CreateProductForm />}

          {activeTab === "products" && <ProductsList />}

          {activeTab === "analytics" && <AnalyticsTab />}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPage;