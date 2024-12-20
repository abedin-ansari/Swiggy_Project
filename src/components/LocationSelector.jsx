import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../slice/locationSlice";
import toast from "react-hot-toast";

const LocationSelector = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const location = useSelector((store) => store.location);

  const getLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Using reverse geocoding with nominatim (OpenStreetMap)
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();

            if (data.display_name) {
              const address = data.display_name;
              dispatch(
                setLocation({
                  address,
                  coordinates: { latitude, longitude },
                })
              );
              setShowDropdown(false);
              toast.success("Location updated successfully!");
            } else {
              toast.error("Couldn't fetch location details");
            }
          } catch (error) {
            console.error("Error fetching location:", error);
            toast.error("Error fetching location details");
          } finally {
            setIsLoading(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setIsLoading(false);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              toast.error("Please allow location access");
              break;
            case error.POSITION_UNAVAILABLE:
              toast.error("Location information unavailable");
              break;
            case error.TIMEOUT:
              toast.error("Location request timed out");
              break;
            default:
              toast.error("Error getting location");
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      setIsLoading(false);
      toast.error("Geolocation is not supported by your browser");
    }
  };

  const handleManualLocation = (e) => {
    e.preventDefault();
    if (searchText.length < 3) {
      toast.error("Please enter a valid address");
      return;
    }
    dispatch(
      setLocation({
        address: searchText,
        coordinates: null,
      })
    );
    setShowDropdown(false);
    toast.success("Location updated!");
  };

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-2 text-white hover:text-white/90 transition-colors"
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
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span className="max-w-[150px] truncate">
          {location?.address || "Add Location"}
        </span>
      </button>

      {showDropdown && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4 z-50">
          <div className="space-y-4">
            <button
              onClick={getLocation}
              disabled={isLoading}
              className="w-full flex items-center space-x-2 text-orange-500 hover:text-orange-600 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
                  <span>Getting location...</span>
                </div>
              ) : (
                <>
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
                  <span>Use current location</span>
                </>
              )}
            </button>

            <div className="border-t border-gray-200 pt-4">
              <form onSubmit={handleManualLocation}>
                <input
                  type="text"
                  placeholder="Enter your delivery location"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button
                  type="submit"
                  className="w-full mt-2 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Confirm Location
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
