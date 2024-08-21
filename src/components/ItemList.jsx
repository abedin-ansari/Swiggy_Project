import { useDispatch } from "react-redux";
import { CDN_url } from "../utils/constants";
import { addItems } from "../slice/CartSlice";

const ItemList = ({items}) => {

  const dispatch = useDispatch();

  const handleAddItems = (item) => {
    // basically dispatch action
    dispatch(addItems(item)); // This is action.payload (action.payload = pizza)
  }

    return(
      <div>
         {items.map((item) => (
          <div 
            key={item.card.info.id} 
            className="p-2 m-2 border-gray-400 border-b-2 text-left flex justify-between"
          >
          <div className="w-9/12 mb-8">
            <div className="py-2 my-2">
              <span>{item.card.info.name}</span>
              <span> - ₹
                {item.card.info.price ?
                  (item.card.info.price/100
                    ) : (
                       item.card.info.defaultPrice/100)
                }
              </span>
            </div>
              <p className="text-xs">{item.card.info.description}</p>
          </div>
          <div className="w-3/12 p-4 mb-6 relative">
             <img
             src={item.card.info.imageId ? `${CDN_url + item.card.info.imageId}` : ""} 
             className="w-full" />
          <div className="ml-12">
               <button 
                className="absolute bottom-[-5px] bg-black text-white shadow-lg border 
                                border-white rounded-xl p-[6px] hover:bg-gray-800"
                onClick={() => handleAddItems(item)}
                > Add + </button>
          </div>
          </div>
        </div>
        ))}
    </div>
);
}

export default ItemList;


// return(
//     <div>
//         {items.map(item =>
//         <div 
//           key={item.card.info.id} 
//           className="w-9/12 p-2 m-2 border-gray-400 border-b-2 text-left flex"
//         >

//             <div className="flex justify-center py-2 mt-4 mb-4 mr-8">
//               <span>{item.card.info.name}</span>
//               <span>₹
//                 {item.card.info.price ?
//                   (item.card.info.price/100
//                     ) : (
//                        item.card.info.defaultPrice/100)
//                 }
//               </span>
//             </div>
//             <p className="text-xs mt-8">{item.card.info.description}</p>

//         {item.card.info.imageId ? (
//            <div className="w-3/12 p-4 mb-8 ml-auto flex flex-col items-center relative">
//              <img 
//                 src={CDN_url + item.card.info.imageId} 
//                 alt="MenuItem" 
//                 className=" h-16 object-contain" // Adjust the size as needed
//             />
//              <button 
//                 className="mt-2 cursor-pointer absolute bottom-[-6px] bg-gray-300 border 
//                            border-black text-black px-2 py-1 hover:bg-blue-300 rounded-lg">
//                Add
//              </button>
//            </div>
//            ) : (
//             <div className="ml-auto flex justify-center  mr-[89px]">
//               <button 
//                 className="mt-8 bg-gray-300 border border-black text-black px-2 h-9 hover:bg-blue-300 rounded-lg">
//                   Add
//               </button>
//             </div>
//     )}

//         </div>
//         )}
//     </div>
// );