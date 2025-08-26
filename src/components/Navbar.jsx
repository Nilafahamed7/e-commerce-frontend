import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingCart, 
  User, 
  Heart, 
  Menu, 
  X, 
  Home, 
  Package, 
  Settings, 
  FileText, 
  HelpCircle, 
  Truck, 
  LogOut,
  Crown,
  Plus
} from "lucide-react";
import { useCart } from "../components/Context/CartContext";
import { useWishlist } from "../components/Context/WishlistContext";
import logo from "../assets/store-logo.png";

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
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Products", path: "/products", icon: Package },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full fixed top-0 bg-gradient-to-r from-orange-700 via-amber-600 to-yellow-600 backdrop-blur-xl shadow-lg z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <img
                src={logo}
                alt="DesignMyFit Logo"
                className="h-10 w-10 rounded-xl shadow-md border-2 border-orange-200 group-hover:border-orange-400 transition-colors duration-200" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
            </motion.div>
            <span className="text-2xl font-bold text-white">
              DesignMyFit
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Nav Links */}
            <div className="flex items-center gap-2">
              {navLinks.map((link) => (
                <motion.div
                  key={link.path}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                                     <Link
                     to={link.path}
                     className="flex items-center gap-2 px-4 py-2 rounded-xl text-white hover:text-yellow-200 hover:bg-white/20 transition-all duration-200 font-medium"
                   >
                    <link.icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-4">
              {/* Cart */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                                 <Link 
                   to="/cart" 
                   className="relative p-2 rounded-xl hover:bg-white/20 transition-colors duration-200"
                 >
                   <ShoppingCart className="w-6 h-6 text-white" />
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </Link>
              </motion.div>

              {/* Wishlist */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                                 <Link 
                   to="/wishlist" 
                   className="relative p-2 rounded-xl hover:bg-white/20 transition-colors duration-200"
                 >
                   <Heart className="w-6 h-6 text-white" />
                  {wishlistCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </Link>
              </motion.div>

              {/* Profile Dropdown */}
              {isLoggedIn ? (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setProfileOpen(!profileOpen)}
                                         className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/20 transition-colors duration-200"
                   >
                     <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                       <User className="w-4 h-4 text-white" />
                     </div>
                     <span className="text-white font-medium hidden lg:block">
                       {userName || "User"}
                     </span>
                    {isAdmin && (
                      <Crown className="w-4 h-4 text-yellow-500" />
                    )}
                  </motion.button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                      >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 text-white">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-semibold">{userName || "User"}</p>
                              <p className="text-sm opacity-90">
                                {isAdmin ? "Administrator" : "Customer"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                          <Link 
                            to="/account" 
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors duration-200 text-gray-700"
                          >
                            <Settings className="w-4 h-4" />
                            Account Details
                          </Link>
                          
                          <Link 
                            to="/orders" 
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors duration-200 text-gray-700"
                          >
                            <FileText className="w-4 h-4" />
                            Orders
                          </Link>
                          
                          <Link 
                            to="/track-order" 
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors duration-200 text-gray-700"
                          >
                            <Truck className="w-4 h-4" />
                            Track Order
                          </Link>
                          
                          <Link 
                            to="/help" 
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors duration-200 text-gray-700"
                          >
                            <HelpCircle className="w-4 h-4" />
                            Help
                          </Link>

                          {/* Admin Links */}
                          {isAdmin && (
                            <>
                              <div className="border-t border-gray-100 my-2"></div>
                              <Link 
                                to="/admin/dashboard" 
                                onClick={() => setProfileOpen(false)}
                                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-yellow-50 transition-colors duration-200 text-yellow-700"
                              >
                                <Crown className="w-4 h-4" />
                                Admin Dashboard
                              </Link>
                              <Link 
                                to="/admin/create-product" 
                                onClick={() => setProfileOpen(false)}
                                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-yellow-50 transition-colors duration-200 text-yellow-700"
                              >
                                <Plus className="w-4 h-4" />
                                Create Product
                              </Link>
                            </>
                          )}

                          <div className="border-t border-gray-100 my-2"></div>
                          
                          <button
                            onClick={() => {
                              handleLogout();
                              setProfileOpen(false);
                            }}
                            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-50 transition-colors duration-200 text-red-600 w-full text-left"
                          >
                            <LogOut className="w-4 h-4" />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                                     <Link
                     to="/login"
                     className="px-6 py-2 bg-white/90 text-orange-700 rounded-xl font-semibold hover:bg-white transition-all duration-200 shadow-md hover:shadow-lg"
                   >
                     Sign In
                   </Link>
                </motion.div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
                         className="md:hidden p-2 rounded-xl hover:bg-white/20 transition-colors duration-200"
            onClick={() => setIsOpen(!isOpen)}
          >
                         {isOpen ? (
               <X className="w-6 h-6 text-white" />
             ) : (
               <Menu className="w-6 h-6 text-white" />
             )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-b from-orange-700 via-amber-600 to-yellow-600 border-t border-white/20 shadow-lg"
          >
            <div className="px-4 py-4 space-y-3">
              {/* User Info (if logged in) */}
              {isLoggedIn && (
                <div className="bg-white/10 rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{userName || "User"}</p>
                      <p className="text-white/80 text-sm">
                        {isAdmin ? "Administrator" : "Customer"}
                      </p>
                    </div>
                    {isAdmin && (
                      <Crown className="w-5 h-5 text-yellow-300 ml-auto" />
                    )}
                  </div>
                </div>
              )}

              {/* Nav Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/20 transition-colors duration-200 text-white font-medium"
                >
                  <link.icon className="w-5 h-5" />
                  {link.name}
                </Link>
              ))}

              {/* Action Items */}
              <div className="border-t border-white/20 pt-4 space-y-4">
                {/* Cart */}
                <Link 
                  to="/cart" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-4 py-2 rounded-xl hover:bg-white/20 transition-colors duration-200 text-white"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="w-5 h-5" />
                    <span className="font-medium">Cart</span>
                  </div>
                  {cartCount > 0 && (
                    <span className="bg-orange-500 text-white text-xs rounded-full px-2 py-1 font-bold min-w-[20px] text-center">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* Wishlist */}
                <Link 
                  to="/wishlist" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-4 py-2 rounded-xl hover:bg-white/20 transition-colors duration-200 text-white"
                >
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5" />
                    <span className="font-medium">Wishlist</span>
                  </div>
                  {wishlistCount > 0 && (
                    <span className="bg-pink-500 text-white text-xs rounded-full px-2 py-1 font-bold min-w-[20px] text-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {/* User Menu Items */}
                {isLoggedIn ? (
                  <>
                    <div className="border-t border-white/20 pt-3 space-y-1">
                      <Link 
                        to="/account" 
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/20 transition-colors duration-200 text-white"
                      >
                        <Settings className="w-5 h-5" />
                        <span className="font-medium">Account Details</span>
                      </Link>
                      
                      <Link 
                        to="/orders" 
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/20 transition-colors duration-200 text-white"
                      >
                        <FileText className="w-5 h-5" />
                        <span className="font-medium">Orders</span>
                      </Link>
                      
                      <Link 
                        to="/track-order" 
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/20 transition-colors duration-200 text-white"
                      >
                        <Truck className="w-5 h-5" />
                        <span className="font-medium">Track Order</span>
                      </Link>
                      
                      <Link 
                        to="/help" 
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/20 transition-colors duration-200 text-white"
                      >
                        <HelpCircle className="w-5 h-5" />
                        <span className="font-medium">Help</span>
                      </Link>

                      {/* Admin Links */}
                      {isAdmin && (
                        <>
                          <div className="border-t border-white/20 pt-3 space-y-1">
                            <Link 
                              to="/admin/dashboard" 
                              onClick={() => setIsOpen(false)}
                              className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/20 transition-colors duration-200 text-yellow-200"
                            >
                              <Crown className="w-5 h-5" />
                              <span className="font-medium">Admin Dashboard</span>
                            </Link>
                            <Link 
                              to="/admin/create-product" 
                              onClick={() => setIsOpen(false)}
                              className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/20 transition-colors duration-200 text-yellow-200"
                            >
                              <Plus className="w-5 h-5" />
                              <span className="font-medium">Create Product</span>
                            </Link>
                          </div>
                        </>
                      )}

                      <button
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/20 transition-colors duration-200 text-red-200 w-full text-left text-sm"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full px-4 py-3 bg-white/90 text-orange-700 rounded-xl font-semibold text-center hover:bg-white transition-all duration-200"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
