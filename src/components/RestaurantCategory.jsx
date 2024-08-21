import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showItems, setExpandIndex, currentIndex }) => {

  // const [showItems, setShowItems] = useState(false);  // Uncontrolled component

  const handleClick = () => {
    if(showItems){         // this if else is written becouse previously accordian were opened but not -
      setExpandIndex(null);  // - not closes but after this condition when we click on accordian it will close.
    } else {
      setExpandIndex(currentIndex);
    }

    // setShowItems(true);    // After clicking on this items will shown but it only work one after clicked
    //setShowItems(!showItems); // this will work for savral times after clicks
  }

    // console.log(data);
    return(
        <div>
        {/* Header */}
            <div className="w-6/12 mx-auto my-2 bg-gray-300 p-2 shadow-lg">
              <div className="flex justify-between cursor-pointer" onClick={handleClick}>
                <span className="font-semibold text-lg">
                 {data.title}
                 ({data.itemCards.length}) {/* It show how many data in specific itemcard ex->Recommended""(6)""*/}
                </span>
                <span>⬇️</span>
              </div>

                {showItems && <ItemList items={data.itemCards} />}
            </div>
        {/* Accordion Body */}
        </div>
    )
}
export default RestaurantCategory;