import { useState } from "react";

const LocationSelector = () => {
  const [location, setLocation] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
          setShowDropdown(false);
        },
        (error) => {
          setLocation("Location access denied");
          console.error("Error getting location:", error);
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
  };

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-2 text-white hover:text-white/80"
        onClick={() => setShowDropdown(!showDropdown)}
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
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
        </svg>
        <span className="max-w-[150px] truncate">
          {location || "Select Location"}
        </span>
      </button>

      {showDropdown && (
        <div className="absolute top-full mt-4 w-72 bg-white rounded-lg shadow-lg p-4 z-50">
          <button
            className="flex items-center text-gray-700 hover:text-orange-500 mb-4 w-full"
            onClick={getLocation}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
            </svg>
            Use Current Location
          </button>

          <input
            type="text"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setShowDropdown(false);
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
