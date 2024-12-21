import { useContext, useState, useEffect } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector, useDispatch } from "react-redux";
import LocationSelector from "./LocationSelector";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { removeUser, addUser } from "../slice/userSlice";
import toast from "react-hot-toast";

const Header = () => {
  const [loginBtn, setLoginBtn] = useState("Login");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const onlineStatus = useOnlineStatus();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const { loggedInUser } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart.items);
  const userState = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          addUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        );
      } else {
        dispatch(removeUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleAuth = async () => {
    if (userState) {
      try {
        const loadingToast = toast.loading("Signing out...");
        await signOut(auth);
        dispatch(removeUser());
        toast.dismiss(loadingToast);
        toast.success("Signed out successfully!");
        navigate("/login");
      } catch (error) {
        toast.error("Error signing out");
        console.error("Error signing out:", error);
      }
    } else {
      navigate("/register");
    }
  };

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
            {/* Hide LocationSelector on mobile, show in menu */}
            <div className="hidden md:block">
              <LocationSelector />
            </div>
          </div>

          {/* Desktop Navigation - Unchanged */}
          <div className="hidden md:flex items-center space-x-8">
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
              onClick={handleAuth}
            >
              {userState ? "Logout" : "Sign up"}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link to="/cart" className="relative text-white">
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
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
            >
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden">
              <div className="p-4 space-y-4">
                <LocationSelector />
                <Link
                  to="/"
                  className="block py-2 text-gray-800 hover:text-orange-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <button
                  className="w-full py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  onClick={() => {
                    handleAuth();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {userState ? "Logout" : "Sign up"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
