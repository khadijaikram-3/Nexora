import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CategoryItem = ({ category }) => {
  return (
    <motion.div
      className='relative overflow-hidden h-96 w-full rounded-xl border border-[#1E293B] bg-[#121824] group'
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Link to={"/category" + category.href}>
        <div className='w-full h-full cursor-pointer'>

          {/* Image */}
          <div className='absolute inset-0 overflow-hidden'>
            <img
              src={category.imageUrl}
              alt={category.name}
              className='w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110'
              loading='lazy'
            />
          </div>

          {/* Dark overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-[#080B12] via-[#080B12]/40 to-transparent opacity-90 z-10 transition-opacity duration-300 group-hover:opacity-95' />

          {/* Category information */}
          <div className='absolute bottom-0 left-0 right-0 p-5 z-20'>
            <h3 className='text-[#F5F7FA] text-2xl font-bold mb-1'>
              {category.name}
            </h3>

            <p className='text-[#9AA4B2] text-sm transition-colors duration-300 group-hover:text-[#7DD3FC]'>
              Explore {category.name}
            </p>
          </div>

        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryItem;