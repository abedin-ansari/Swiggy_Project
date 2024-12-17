import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { Body_URL } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  // Local state Variable
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
  useEffect(() => {
    // RestaurantCard Component.
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(Body_URL);

    const json = await data.json();
    setListOfRestaurant(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return (
      <h1>
        Looks like you coonection isn't stable. Kindly check your internet
        Connection!
      </h1>
    );

  const handleSearch = () => {
    // This handleSearch used for enter key results same as search click.
    const filteredRestaurant = listOfRestaurant.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurant(filteredRestaurant);
  };

  return listOfRestaurant.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="min-h-screen bg-gradient-to-b bg-gray-300">
      {/* Search and Filter Section */}
      <div className="sticky top-[64px] z-10 bg-gray-300 shadow-sm">
        <div className="max-w-7xl mx-auto py-4">
          <div className="px-4">
            {/* Title and Top Rated Button */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Restaurants near you
              </h1>
              <button
                className="px-6 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
                onClick={() => {
                  const filteredRestaurant = listOfRestaurant.filter(
                    (res) => res.info.avgRating > 4.2
                  );
                  setFilteredRestaurant(filteredRestaurant);
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
                Top Rated
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center bg-gray-50 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors">
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-l-lg bg-transparent focus:outline-none"
                    placeholder="Search for restaurants and food..."
                    value={searchText}
                    onChange={(event) => {
                      setSearchText(event.target.value);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleSearch();
                      }
                    }}
                  />
                  <button
                    className="px-6 py-3 bg-orange-500 text-white rounded-r-lg hover:bg-orange-600 transition-colors flex items-center"
                    onClick={handleSearch}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant List */}
      <div className="max-w-[1500px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredRestaurant.map((restaurant) => (
            <Link
              key={restaurant.info.id}
              to={"/restaurant/" + restaurant.info.id}
              className="res-card-link"
            >
              {restaurant.info.avgRating > 4.3 ? (
                <RestaurantCardPromoted resData={restaurant} />
              ) : (
                <RestaurantCard resData={restaurant} />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Body;
