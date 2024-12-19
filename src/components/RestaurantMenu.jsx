import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const [expandIndex, setExpandIndex] = useState(null);

  const resInfo = useRestaurantMenu(resId);

  if (resInfo === null) return <Shimmer />;

  const {
    name,
    cuisines,
    costForTwo,
    avgRating,
    totalRatingsString,
    sla,
    areaName,
    city,
  } = resInfo?.cards[2]?.card?.card?.info || {};

  const itemCards =
    resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card
      ?.card?.itemCards || [];

  const categories =
    resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header */}
      <div className="bg-white shadow-md p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-bold text-3xl text-gray-800 mb-2">{name}</h1>
          <div className="text-gray-600 mb-2">
            <p>{cuisines?.join(", ")}</p>
            <p className="text-sm">
              {areaName}, {city}
            </p>
          </div>

          {/* Metrics Row */}
          <div className="flex items-center gap-6 mt-4 mb-4">
            {/* Rating Badge */}
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-white bg-green-500 px-2 py-1 rounded font-medium">
                <span>★</span>
                <span>{avgRating}</span>
              </span>
              <span className="text-sm text-gray-500">
                {totalRatingsString}
              </span>
            </div>

            {/* Delivery Time */}
            {sla?.deliveryTime && (
              <div className="flex items-center gap-2 text-gray-700">
                <span>🕒</span>
                <span>{sla.deliveryTime} mins</span>
              </div>
            )}

            {/* Cost for Two */}
            <div className="flex items-center gap-2 text-gray-700">
              <span>💰</span>
              <span>₹{costForTwo / 100} for two</span>
            </div>
          </div>

          <div className="h-px bg-gray-200"></div>
        </div>
      </div>

      {/* Menu Categories */}
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="space-y-6">
          {categories.map((category, index) => (
            <RestaurantCategory
              key={category?.card?.card.title}
              data={category?.card?.card}
              showItems={index === expandIndex}
              setExpandIndex={setExpandIndex}
              currentIndex={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
