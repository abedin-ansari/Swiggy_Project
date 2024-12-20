import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { CDN_url } from "../utils/constants";
import { addItems } from "../slice/CartSlice";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();

  const handleAddItems = (item) => {
    dispatch(addItems(item));
  };

  const buttonClasses =
    "w-24 px-4 py-0.5 rounded text-sm font-medium shadow-sm transition-all duration-200 " +
    "border border-green-600 bg-white text-green-600 " +
    "hover:bg-green-600 hover:text-white hover:shadow-md";

  return (
    <div>
      {items.map((item, index) => (
        <motion.div
          key={item.card.info.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="p-6 border-b border-gray-100 last:border-0 flex justify-between items-start hover:bg-gray-50 transition-colors"
        >
          <div className="flex-1 pr-8">
            <h4 className="text-lg font-medium text-gray-800 mb-2">
              {item.card.info.name}
            </h4>
            <span className="text-base font-medium text-gray-700 mb-2 block">
              ₹
              {item.card.info.price
                ? item.card.info.price / 100
                : item.card.info.defaultPrice / 100}
            </span>
            <p className="hidden sm:block text-sm text-gray-600 leading-relaxed">
              {item.card.info.description}
            </p>
          </div>

          <div className="relative min-w-[150px] flex flex-col items-center">
            {item.card.info.imageId ? (
              <>
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={CDN_url + item.card.info.imageId}
                  alt={item.card.info.name}
                  className="w-[150px] h-[100px] rounded-lg object-cover"
                />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className={buttonClasses}
                    onClick={() => handleAddItems(item)}
                  >
                    ADD
                  </motion.button>
                </div>
              </>
            ) : (
              <motion.button
                whileTap={{ scale: 0.95 }}
                className={buttonClasses + " py-2 mt-2"}
                onClick={() => handleAddItems(item)}
              >
                ADD
              </motion.button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ItemList;
