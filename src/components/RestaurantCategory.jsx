import ItemList from "./ItemList";
import { motion, AnimatePresence } from "framer-motion";

const RestaurantCategory = ({
  data,
  showItems,
  setExpandIndex,
  currentIndex,
}) => {
  const handleClick = () => {
    setExpandIndex(showItems ? null : currentIndex);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div
        className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={handleClick}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800">
            {data.title} ({data.itemCards.length})
          </h3>
          <motion.span
            animate={{ rotate: showItems ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            ▼
          </motion.span>
        </div>
      </div>

      <AnimatePresence>
        {showItems && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="border-t border-gray-100">
              <ItemList items={data.itemCards} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RestaurantCategory;
