import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "../lib/axios";
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [dailySalesData, setDailySalesData] = useState([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get("/analytics");
        setAnalyticsData(response.data.analyticsData);
        setDailySalesData(response.data.dailySalesData);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (isLoading) {
    return (
      <div className='min-h-[400px] flex items-center justify-center text-[#9AA4B2]'>
        Loading analytics...
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>

      {/* Analytics Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8'>

        <AnalyticsCard
          title='Total Users'
          value={analyticsData.users.toLocaleString()}
          icon={Users}
        />

        <AnalyticsCard
          title='Total Products'
          value={analyticsData.products.toLocaleString()}
          icon={Package}
        />

        <AnalyticsCard
          title='Total Sales'
          value={analyticsData.totalSales.toLocaleString()}
          icon={ShoppingCart}
        />

        <AnalyticsCard
          title='Total Revenue'
          value={`$${analyticsData.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
        />

      </div>

      {/* Sales Chart */}
      <motion.div
        className='bg-[#121824] border border-[#1E293B] rounded-xl p-5 sm:p-6 shadow-lg'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <div className='mb-6'>
          <p className='text-sm font-medium text-[#38BDF8] mb-1'>
            Performance
          </p>

          <h2 className='text-xl sm:text-2xl font-semibold text-[#F5F7FA]'>
            Sales Overview
          </h2>

          <p className='text-sm text-[#64748B] mt-1'>
            Daily sales and revenue performance
          </p>
        </div>

        <ResponsiveContainer width='100%' height={400}>
          <LineChart data={dailySalesData}>
            <CartesianGrid
              strokeDasharray='3 3'
              stroke='#1E293B'
              vertical={false}
            />

            <XAxis
              dataKey='date'
              stroke='#64748B'
              tick={{ fill: "#9AA4B2", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#1E293B" }}
            />

            <YAxis
              yAxisId='left'
              stroke='#64748B'
              tick={{ fill: "#9AA4B2", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              yAxisId='right'
              orientation='right'
              stroke='#64748B'
              tick={{ fill: "#9AA4B2", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0D111A",
                border: "1px solid #1E293B",
                borderRadius: "8px",
                color: "#F5F7FA",
              }}
              labelStyle={{
                color: "#9AA4B2",
                marginBottom: "4px",
              }}
            />

            <Legend
              wrapperStyle={{
                color: "#9AA4B2",
                paddingTop: "16px",
              }}
            />

            <Line
              yAxisId='left'
              type='monotone'
              dataKey='sales'
              stroke='#38BDF8'
              strokeWidth={2}
              dot={{ r: 3, fill: "#38BDF8" }}
              activeDot={{ r: 6 }}
              name='Sales'
            />

            <Line
              yAxisId='right'
              type='monotone'
              dataKey='revenue'
              stroke='#7DD3FC'
              strokeWidth={2}
              dot={{ r: 3, fill: "#7DD3FC" }}
              activeDot={{ r: 6 }}
              name='Revenue'
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

    </div>
  );
};

export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon }) => {
  return (
    <motion.div
      className='relative overflow-hidden bg-[#121824] border border-[#1E293B] rounded-xl p-5 shadow-lg'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -3 }}
    >
      <div className='relative z-10 flex items-center justify-between'>
        <div>
          <p className='text-[#9AA4B2] text-sm mb-1 font-medium'>
            {title}
          </p>

          <h3 className='text-[#F5F7FA] text-2xl sm:text-3xl font-bold'>
            {value}
          </h3>
        </div>

        <div className='flex items-center justify-center w-11 h-11 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/20'>
          <Icon className='h-5 w-5 text-[#38BDF8]' />
        </div>
      </div>

      <div className='absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-[#38BDF8]/5 blur-2xl' />
    </motion.div>
  );
};