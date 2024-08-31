import { useContext, useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [loginBtn, setLoginBtn] = useState("Login");
  const onlineStatus = useOnlineStatus();

  const { loggedInUser } = useContext(UserContext);

  // Subscribing to the store using Selector
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="flex justify-between bg-blue-400 shadow-lg">
      <div className="logo-container">
        <img className="w-40" src={LOGO_URL} />
      </div>
      <div className="flex items-center">
        <ul className="flex p-7 m-8 ">
          <li className="px-5">Online Status: {onlineStatus ? "🟢" : "🔴"}</li>
          <li className="px-5">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="px-5">
            <Link to="/about" className="nav-link">
              About-us
            </Link>
          </li>
          <li className="px-5">
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </li>
          <li className="px-5">
            <Link to="/cart" className="nav-link font-bold text-lg">
              cart-({cartItems.length} items)
            </Link>
          </li>
          <button
            className="login-button"
            onClick={() => {
              loginBtn === "Login"
                ? setLoginBtn("Logout")
                : setLoginBtn("Login");
            }}
          >
            {loginBtn}
          </button>
          {/* <li className="px-5">{loggedInUser}</li> */}
        </ul>
      </div>
    </div>
  );
};

export default Header;

// import { useContext, useState } from "react";
// import { LOGO_URL } from "../utils/constants";
// import { Link } from "react-router-dom";
// import useOnlineStatus from "../utils/useOnlineStatus";
// import UserContext from "../utils/UserContext";
// import { useSelector } from "react-redux";

// const Header = () => {
//   const [loginBtn, setLoginBtn] = useState("Login");
//   const onlineStatus = useOnlineStatus();

//   const { loggedInUser } = useContext(UserContext);

//   // Subscribing to the store using Selector
//   const cartItems = useSelector((store) => store.cart.items);

//   return (
//     <div className="flex flex-col md:flex-row justify-between bg-blue-400 shadow-lg">
//       <div className="logo-container">
//         <img className="w-40" src={LOGO_URL} />
//       </div>
//       <div className="flex flex-col md:flex-row items-center">
//         <ul className="flex p-7 m-8 ">
//           <li className="px-5">Online Status: {onlineStatus ? "🟢" : "🔴"}</li>
//           <li className="px-5">
//             <Link to="/" className="nav-link">
//               Home
//             </Link>
//           </li>
//           <li className="px-5">
//             <Link to="/about" className="nav-link">
//               About-us
//             </Link>
//           </li>
//           <li className="px-5">
//             <Link to="/contact" className="nav-link">
//               Contact
//             </Link>
//           </li>
//           <li className="px-5">
//             <Link to="/cart" className="nav-link font-bold text-lg">
//               cart-({cartItems.length} items)
//             </Link>
//           </li>
//           <button
//             className="login-button"
//             onClick={() => {
//               loginBtn === "Login"
//                 ? setLoginBtn("Logout")
//                 : setLoginBtn("Login");
//             }}
//           >
//             {loginBtn}
//           </button>
//           {/* <li className="px-5">{loggedInUser}</li> */}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Header;
