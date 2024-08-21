import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {

    const { resId } = useParams();

    const [expandIndex, setExpandIndex] = useState(null);

    const resInfo = useRestaurantMenu(resId);

    if(resInfo === null) return <Shimmer />

    const { name, cuisines, costForTwo} = 
    resInfo.cards?.[2].card.card.info || {} ;

    const itemCards =
        resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card?.card?.itemCards || [];

    // console.log(itemCards);
    // console.log(resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

    const categories = resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (c) => 
            c.card?.card?.["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
    //console.log(categories);


    return (
        <div className="text-center">
        <h1 className="font-bold text-3xl p-2 m-2">{name}</h1>
        <h3 className="text-2xl p-2 m-2">{cuisines} - {costForTwo/100} For Two</h3>
        {
            categories.map((category, index) => (
                // Controlled Component
                <RestaurantCategory
                 key={category?.card?.card.title} 
                 data={category?.card?.card}
                 showItems={index === expandIndex ? true : false}
                 setExpandIndex = {setExpandIndex}
                 currentIndex={index} 
                />
            ))
        }
        {/* <h2>Menu</h2> */}
        {/* <ul>  
        {itemCards.map(item => (
            <li key={item.card.info.id}>
                {item.card.info.name} -
                {item.card.info.price/100}
            </li>
        ))}  
        </ul> */}
    </div>
    );
}

export default RestaurantMenu;
