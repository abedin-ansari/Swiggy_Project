import { useContext, useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";
import LocationSelector from "./LocationSelector";

const Header = () => {
  const [loginBtn, setLoginBtn] = useState("Login");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onlineStatus = useOnlineStatus();

  const { loggedInUser } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Location Section */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center -ml-2">
              <Link to="/">
                <img className="w-16 md:w-20" src={LOGO_URL} alt="Logo" />
              </Link>
              <span className="ml-2 text-xl font-bold text-white hidden md:block">
                𝓕𝓸𝓸𝓭 𝓥𝓲𝓵𝓵𝓪
              </span>
            </div>
            <LocationSelector />
          </div>

          {/* Navigation Menu */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  onlineStatus ? "bg-green-400" : "bg-red-400"
                }`}
              ></div>
              <span className="text-sm text-white">
                {onlineStatus ? "Online" : "Offline"}
              </span>
            </div>

            <Link
              to="/"
              className="text-white hover:text-white/80 transition-colors"
            >
              Home
            </Link>

            <Link
              to="/cart"
              className="relative text-white hover:text-white/80 transition-colors"
            >
              <div className="flex items-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                    {cartItems.length}
                  </span>
                )}
              </div>
            </Link>

            <button
              className="px-6 py-2 bg-white text-orange-500 rounded-lg hover:bg-white/90 transition-colors font-medium"
              onClick={() =>
                setLoginBtn(loginBtn === "Login" ? "Logout" : "Login")
              }
            >
              {loginBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
