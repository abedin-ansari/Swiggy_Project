import RestrourantCard, { withPromotedLabel } from "./RestaurantCard";
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

  // console.log(listOfRestaurant);

  const RestaurantCardPromoted = withPromotedLabel(RestrourantCard); // A component Which shows the
  // Higher Order Component Data. Which is in the
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
    <div className="body">
      <div className="filter flex">
        <div className="search p-4 m-4">
          <input
            type="text"
            className="border border-solid border-black"
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
            onKeyDown={(event) => {
              // for Enter Key
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button
            className="px-4 py-2 bg-green-200 m-4"
            onClick={() => {
              const filteredRestaurant = listOfRestaurant.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <div className="search p-4 m-4 flex items-center">
          <button
            className="px-4 py-2 bg-green-200"
            onClick={() => {
              const filteredRestaurant = listOfRestaurant.filter(
                (res) => res.info.avgRating > 4.2
              );
              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Top Rated Restaurant
          </button>
        </div>
      </div>
      <div className="res-container flex flex-wrap">
        {" "}
        {/* this makes the cards to be flex and up and down wraped */}
        {filteredRestaurant.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurant/" + restaurant.info.id}
            className="res-card-link"
          >
            {restaurant.info.avgRating > 4.3 ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestrourantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;

// import RestrourantCard, { withPromotedLabel } from "./RestaurantCard";
// import { useEffect, useState } from "react";
// import Shimmer from "./Shimmer";
// import { Link } from "react-router-dom";
// import { Body_URL } from "../utils/constants";
// import useOnlineStatus from "../utils/useOnlineStatus";

// const Body = () => {
//   // Local state Variable
//   const [listOfRestaurant, setListOfRestaurant] = useState([]);
//   const [filteredRestaurant, setFilteredRestaurant] = useState([]);

//   const [searchText, setSearchText] = useState("");

//   // console.log(listOfRestaurant);

//   const RestaurantCardPromoted = withPromotedLabel(RestrourantCard); // A component Which shows the
//   // Higher Order Component Data. Which is in the
//   useEffect(() => {
//     // RestaurantCard Component.
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const data = await fetch(Body_URL);

//     const json = await data.json();
//     setListOfRestaurant(
//       json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
//     );
//     setFilteredRestaurant(
//       json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
//     );
//   };

//   const onlineStatus = useOnlineStatus();

//   if (onlineStatus === false)
//     return (
//       <h1>
//         Looks like you coonection isn't stable. Kindly check your internet
//         Connection!
//       </h1>
//     );

//   const handleSearch = () => {
//     // This handleSearch used for enter key results same as search click.
//     const filteredRestaurant = listOfRestaurant.filter((res) =>
//       res.info.name.toLowerCase().includes(searchText.toLowerCase())
//     );
//     setFilteredRestaurant(filteredRestaurant);
//   };

//   return listOfRestaurant.length === 0 ? (
//     <Shimmer />
//   ) : (
//     <div className="body">
//       <div className="filter flex flex-col md:flex-row">
//         <div className="search p-4 m-4">
//           <input
//             type="text"
//             className="border border-solid border-black"
//             value={searchText}
//             onChange={(event) => {
//               setSearchText(event.target.value);
//             }}
//             onKeyDown={(event) => {
//               // for Enter Key
//               if (event.key === "Enter") {
//                 handleSearch();
//               }
//             }}
//           />
//           <button
//             className="px-4 py-2 bg-green-200 m-4"
//             onClick={() => {
//               const filteredRestaurant = listOfRestaurant.filter((res) =>
//                 res.info.name.toLowerCase().includes(searchText.toLowerCase())
//               );
//               setFilteredRestaurant(filteredRestaurant);
//             }}
//           >
//             Search
//           </button>
//         </div>
//         <div className="search p-4 m-4 flex items-center">
//           <button
//             className="px-4 py-2 bg-green-200"
//             onClick={() => {
//               const filteredRestaurant = listOfRestaurant.filter(
//                 (res) => res.info.avgRating > 4.2
//               );
//               setFilteredRestaurant(filteredRestaurant);
//             }}
//           >
//             Top Rated Restaurant
//           </button>
//         </div>
//       </div>
//       <div className="res-container flex flex-wrap justify-center md:justify-start">
//         {" "}
//         {/* this makes the cards to be flex and up and down wraped */}
//         {filteredRestaurant.map((restaurant) => (
//           <Link
//             key={restaurant.info.id}
//             to={"/restaurant/" + restaurant.info.id}
//             className="res-card-link"
//           >
//             {restaurant.info.avgRating > 4.3 ? (
//               <RestaurantCardPromoted resData={restaurant} />
//             ) : (
//               <RestrourantCard resData={restaurant} />
//             )}
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Body;
