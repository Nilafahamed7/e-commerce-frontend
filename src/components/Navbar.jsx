import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useCart } from "../components/Context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
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
      className="w-full bg-gradient-to-r fixed top-0 from-fuchsia-500 via-orange-400 to-yellow-600 shadow-2xl z-50"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl md:text-4xl font-bold tracking-tight text-white drop-shadow"
        >
          DesignMyFit
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <motion.div
              key={l.path}
              whileHover={{ scale: 1.08 }}
              className="px-3 py-[6px] rounded-full text-sm font-medium bg-white/20 text-white"
            >
              <Link to={l.path}>{l.name}</Link>
            </motion.div>
          ))}

          {/* Cart */}
          <Link to="/cart" className="relative flex items-center">
            <FaShoppingCart className="text-2xl text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs text-white rounded-full px-2 py-[2px]">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Profile Menu */}
          {isLoggedIn ? (
            <div className="relative flex items-center">
              <button
                className="flex items-center justify-center"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <FaUserCircle className="text-3xl text-white" />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-80 w-52 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden"
                  >
                    {/* Close button */}
                    <div className="flex justify-between items-center px-4 py-2 border-b">
                      <span className="font-semibold text-gray-700">My Account</span>
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setProfileOpen(false)}
                      >
                        ✕
                      </button>
                    </div>

                    <Link
                      to="/account"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setProfileOpen(false)}
                    >
                      Account Details
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setProfileOpen(false)}
                    >
                      Orders
                    </Link>
                    <Link
                      to="/help"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setProfileOpen(false)}
                    >
                      Help
                    </Link>
                    <Link
                      to="/refund-policy"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setProfileOpen(false)}
                    >
                      Refund Policy
                    </Link>
                    <Link
                      to="/track-order"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setProfileOpen(false)}
                    >
                      Track Order
                    </Link>
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
              className="px-3 py-[6px] rounded-full text-sm font-medium bg-green-700 shadow-2xl text-white"
            >
              <Link to="/login">Login</Link>
            </motion.div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>
    </motion.nav>
  );
}

