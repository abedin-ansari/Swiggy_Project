import { CDN_url } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  const {
    name,
    cuisines,
    avgRating,
    costForTwo,
    sla,
    cloudinaryImageId,
    areaName,
    aggregatedDiscountInfoV3,
  } = resData?.info;

  return (
    <div className="h-[450px] p-4 hover:scale-95 transition-all duration-200">
      <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-md h-full flex flex-col">
        <div className="relative h-[200px]">
          <img
            className="w-full h-full rounded-t-2xl object-cover"
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
            alt={name}
          />
          <div className="absolute inset-0 rounded-t-2xl bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded-lg shadow-md">
            <span className="text-sm font-medium">
              {sla?.deliveryTime ? `${sla.deliveryTime} mins` : "30-40 mins"}
            </span>
          </div>
        </div>
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-xl mb-2 truncate text-gray-800">
              {name}
            </h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {cuisines.join(", ")}
            </p>
            <div className="flex items-center justify-between mb-3">
              <span
                className={`px-2 py-1 rounded-lg text-sm font-medium ${
                  avgRating >= 4.0
                    ? "bg-green-500 text-white"
                    : avgRating >= 3.0
                    ? "bg-orange-400 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                ⭐ {avgRating}
              </span>
              {aggregatedDiscountInfoV3?.header && (
                <span className="text-sm font-medium text-orange-500 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                  </svg>
                  {aggregatedDiscountInfoV3.header}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 mb-3">
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="text-base font-medium text-gray-600">{areaName}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-100">
            <div className="flex justify-between w-full">
              {sla?.lastMileTravel && (
                <span className="text-sm text-gray-500">
                  {sla.lastMileTravel.toFixed(1)} km
                </span>
              )}
              <span className="text-sm font-medium text-gray-700">
                {costForTwo}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Higher Order Component
export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="relative">
        <label className="absolute z-10 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-2.5 py-1 rounded-lg left-4 top-4 text-sm font-medium shadow-md">
          Promoted
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
