// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaShoppingCart, FaUserCircle, FaHeart } from "react-icons/fa";
// import { useCart } from "../components/Context/CartContext";
// import { useWishlist } from "../components/Context/WishlistContext";
// import logo from "../assets/store-logo.png"; // ✅ Make sure your logo has transparent bg

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const { cartCount } = useCart();
//   const { count: wishlistCount } = useWishlist();
//   const navigate = useNavigate();

//   const isLoggedIn = Boolean(localStorage.getItem("token"));
//   const userName = localStorage.getItem("userName");

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "Products", path: "/products" },
//   ];

//   return (
//     <motion.nav
//       initial={{ opacity: 0, y: -15 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//       className="w-full fixed top-0 bg-gradient-to-r from-orange-700 via-amber-600 to-yellow-600 backdrop-blur-lg shadow-xl z-50"
//     >
//       <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
//         {/* ✅ Logo */}
//         <Link
//           to="/"
//           className="flex items-center gap-2 text-2xl md:text-3xl font-extrabold tracking-tight text-white drop-shadow-lg"
//         >
//           <img
//             src={logo}
//             alt="DesignMyFit Logo"
//             className="h-10 w-10 rounded-full shadow-lg border-2 border-white/60 bg-gradient-to-r from-orange-700 via-amber-600 to-yellow-600" 
//           />
//           <span className="inline text-amber-50">DesignMyFit</span>
//         </Link>

//         {/* ✅ Desktop Links */}
//         <div className="hidden md:flex items-center gap-6">
//           {navLinks.map((l) => (
//             <motion.div
//               key={l.path}
//               whileHover={{ scale: 1.1 }}
//               className="px-3 py-[6px] rounded-full text-sm font-medium bg-white/20 text-amber-50 hover:bg-white/30 transition"
//             >
//               <Link to={l.path}>{l.name}</Link>
//             </motion.div>
//           ))}

//           {/* Cart */}
//           <Link to="/cart" className="relative flex items-center hover:scale-110 transition">
//             <FaShoppingCart className="text-2xl text-amber-50 drop-shadow" />
//             {cartCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-orange-600 text-xs text-amber-50 rounded-full px-2 py-[2px] shadow-md">
//                 {cartCount}
//               </span>
//             )}
//           </Link>

//           {/* Wishlist */}
//           <Link to="/wishlist" className="relative flex items-center hover:scale-110 transition">
//             <FaHeart className="text-2xl text-amber-50 drop-shadow" />
//             {wishlistCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-orange-600 text-xs text-amber-50 rounded-full px-2 py-[2px] shadow-md">
//                 {wishlistCount}
//               </span>
//             )}
//           </Link>

//           {/* Profile */}
//           {isLoggedIn ? (
//             <div className="relative flex items-center">
//               <button
//                 className="flex items-center justify-center hover:scale-110 transition"
//                 onClick={() => setProfileOpen(!profileOpen)}
//               >
//                 <FaUserCircle className="text-3xl text-white drop-shadow" />
//                 {userName && (
//                   <span className="ml-2 text-white font-medium hidden md:inline">
//                     {userName}
//                   </span>
//                 )}
//               </button>

//               <AnimatePresence>
//                 {profileOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     transition={{ duration: 0.2 }}
//                     className="absolute right-0 mt-72 w-52 bg-amber-50 text-gray-800 rounded-lg shadow-lg overflow-hidden"
//                   >
//                     <div className="flex justify-between items-center px-4 py-2 border-b">
//                       <span className="font-semibold text-gray-700">My Account</span>
//                       <button
//                         className="text-gray-500 hover:text-gray-700"
//                         onClick={() => setProfileOpen(false)}
//                       >
//                         ✕
//                       </button>
//                     </div>

//                     <Link to="/account" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setProfileOpen(false)}>Account Details</Link>
//                     <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setProfileOpen(false)}>Orders</Link>
//                     <Link to="/help" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setProfileOpen(false)}>Help</Link>
//                     <Link to="/refund-policy" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setProfileOpen(false)}>Refund Policy</Link>
//                     <Link to="/track-order" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setProfileOpen(false)}>Track Order</Link>
//                     <button
//                       onClick={() => {
//                         handleLogout();
//                         setProfileOpen(false);
//                       }}
//                       className="w-full text-left bg-red-500 text-white px-4 py-2 hover:bg-red-600"
//                     >
//                       Logout
//                     </button>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           ) : (
//             <motion.div
//               whileHover={{ scale: 1.08 }}
//               className="px-3 py-[6px] rounded-full text-sm font-medium bg-orange-600 shadow-lg text-amber-50 hover:bg-orange-700 transition"
//             >
//               <Link to="/login">Login</Link>
//             </motion.div>
//           )}
//         </div>

//         {/* ✅ Mobile Hamburger */}
//         <button
//           className="md:hidden text-white"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-7 w-7"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
//             />
//           </svg>
//         </button>
//       </div>

//       {/* ✅ Mobile Dropdown */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.3 }}
//             className="md:hidden bg-gradient-to-b from-orange-700 via-amber-600 to-yellow-600 px-6 py-4 space-y-4 shadow-lg"
//           >
//             {navLinks.map((l) => (
//               <Link
//                 key={l.path}
//                 to={l.path}
//                 onClick={() => setIsOpen(false)}
//                 className="block text-white text-lg font-medium hover:text-yellow-200"
//               >
//                 {l.name}
//               </Link>
//             ))}

//             <Link to="/cart" onClick={() => setIsOpen(false)} className="block text-white text-lg">
//               Cart ({cartCount})
//             </Link>
//             <Link to="/wishlist" onClick={() => setIsOpen(false)} className="block text-white text-lg">
//               Wishlist ({wishlistCount})
//             </Link>

//             {isLoggedIn ? (
//               <>
//                 <Link to="/account" onClick={() => setIsOpen(false)} className="block text-white text-lg">Account</Link>
//                 <Link to="/orders" onClick={() => setIsOpen(false)} className="block text-white text-lg">Orders</Link>
//                 <button
//                   onClick={() => {
//                     handleLogout();
//                     setIsOpen(false);
//                   }}
//                   className="w-full text-left text-red-200 font-semibold"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <Link to="/login" onClick={() => setIsOpen(false)} className="block text-white text-lg font-semibold">
//                 Login
//               </Link>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.nav>
//   );
// }

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaUserCircle, FaHeart } from "react-icons/fa";
import { useCart } from "../components/Context/CartContext";
import { useWishlist } from "../components/Context/WishlistContext";
import logo from "../assets/store-logo.png"; // ✅ Make sure your logo has transparent bg

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const navigate = useNavigate();

  // ✅ Auth & User
  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(token);
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.name;
  const isAdmin = user?.isAdmin;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full fixed top-0 bg-gradient-to-r from-orange-700 via-amber-600 to-yellow-600 backdrop-blur-lg shadow-xl z-50"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* ✅ Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl md:text-3xl font-extrabold tracking-tight text-white drop-shadow-lg"
        >
          <img
            src={logo}
            alt="DesignMyFit Logo"
            className="h-10 w-10 rounded-full shadow-lg border-2 border-white/60 bg-gradient-to-r from-orange-700 via-amber-600 to-yellow-600" 
          />
          <span className="inline text-amber-50">DesignMyFit</span>
        </Link>

        {/* ✅ Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <motion.div
              key={l.path}
              whileHover={{ scale: 1.1 }}
              className="px-3 py-[6px] rounded-full text-sm font-medium bg-white/20 text-amber-50 hover:bg-white/30 transition"
            >
              <Link to={l.path}>{l.name}</Link>
            </motion.div>
          ))}

          {/* Cart */}
          <Link to="/cart" className="relative flex items-center hover:scale-110 transition">
            <FaShoppingCart className="text-2xl text-amber-50 drop-shadow" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-600 text-xs text-amber-50 rounded-full px-2 py-[2px] shadow-md">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Wishlist */}
          <Link to="/wishlist" className="relative flex items-center hover:scale-110 transition">
            <FaHeart className="text-2xl text-amber-50 drop-shadow" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-600 text-xs text-amber-50 rounded-full px-2 py-[2px] shadow-md">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Profile Dropdown */}
          {isLoggedIn ? (
            <div className="relative  flex items-center">
              <button
                className="flex items-center justify-center hover:scale-110 transition"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <FaUserCircle className="text-3xl text-white drop-shadow" />
                {userName && (
                  <span className="ml-2 text-white font-medium hidden md:inline">
                    {userName}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-[420px] w-52 bg-amber-50 text-gray-800 rounded-lg shadow-lg overflow-hidden"
                  >
                    <div className="flex justify-between  items-center px-4 py-2 border-b">
                      <span className="font-semibold text-gray-700">My Account</span>
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setProfileOpen(false)}
                      >
                        ✕
                      </button>
                    </div>

                    <Link to="/account" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setProfileOpen(false)}>Account Details</Link>
                    <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setProfileOpen(false)}>Orders</Link>
                    <Link to="/help" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setProfileOpen(false)}>Help</Link>
                    <Link to="/refund-policy" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setProfileOpen(false)}>Refund Policy</Link>
                    <Link to="/track-order" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setProfileOpen(false)}>Track Order</Link>

                    {/* ✅ Admin-only Links inside Profile */}
                    {isAdmin && (
                      <>
                        <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setProfileOpen(false)}>Admin Dashboard</Link>
                        <Link to="/admin/create-product" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setProfileOpen(false)}>Create Product</Link>
                      </>
                    )}

                    <button
                      onClick={() => {
                        handleLogout();
                        setProfileOpen(false);
                      }}
                      className="w-full text-left bg-red-500 text-white px-4 py-2 hover:bg-red-600"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.08 }}
              className="px-3 py-[6px] rounded-full text-sm font-medium bg-orange-600 shadow-lg text-amber-50 hover:bg-orange-700 transition"
            >
              <Link to="/login">Login</Link>
            </motion.div>
          )}
        </div>

        {/* ✅ Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* ✅ Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-b from-orange-700 via-amber-600 to-yellow-600 px-6 py-4 space-y-4 shadow-lg"
          >
            {navLinks.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                onClick={() => setIsOpen(false)}
                className="block text-white text-lg font-medium hover:text-yellow-200"
              >
                {l.name}
              </Link>
            ))}

            {/* ✅ Admin-only buttons (Mobile) */}
            {isLoggedIn && isAdmin && (
              <>
                <Link
                  to="/admin/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="block text-yellow-200 text-lg font-semibold"
                >
                  Admin Dashboard
                </Link>
                <Link
                  to="/admin/create-product"
                  onClick={() => setIsOpen(false)}
                  className="block text-green-200 text-lg font-semibold"
                >
                  Create Product
                </Link>
              </>
            )}

            <Link to="/cart" onClick={() => setIsOpen(false)} className="block text-white text-lg">
              Cart ({cartCount})
            </Link>
            <Link to="/wishlist" onClick={() => setIsOpen(false)} className="block text-white text-lg">
              Wishlist ({wishlistCount})
            </Link>

            {isLoggedIn ? (
              <>
                <Link to="/account" onClick={() => setIsOpen(false)} className="block text-white text-lg">Account</Link>
                <Link to="/orders" onClick={() => setIsOpen(false)} className="block text-white text-lg">Orders</Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left text-red-200 font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)} className="block text-white text-lg font-semibold">
                Login
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
