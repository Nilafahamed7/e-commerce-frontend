import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useCart } from "../components/Context/CartContext";
import { FaArrowLeft, FaShoppingCart, FaTrash, FaTruck, FaShieldAlt, FaCreditCard, FaHeart } from "react-icons/fa";

const getImageUrl = (url) => {
  if (!url) return "/placeholder.svg";
  return url.startsWith("http") ? url : "/placeholder.svg";
};

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, fetchCart, updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Safely compute totals for either shape (item.product?.price or item.price)
  const subtotal = useMemo(() => {
    return (cartItems || []).reduce((acc, item) => {
      const price = item?.product?.price ?? item?.price ?? 0;
      const qty = item?.quantity ?? 1;
      return acc + price * qty;
    }, 0);
  }, [cartItems]);

  const shipping = cartItems?.length ? 50 : 0;
  const total = subtotal + shipping;

  const handleMinus = async (item) => {
    const id = item?._id;
    if (!id) {
      toast.error("Invalid item ID");
      return;
    }
    const qty = Math.max(1, (item?.quantity ?? 1) - 1);
    try {
      await updateQuantity(id, qty);
      toast.success("Quantity updated");
    } catch (error) {
      console.error("Failed to update quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  const handlePlus = async (item) => {
    const id = item?._id;
    if (!id) {
      toast.error("Invalid item ID");
      return;
    }
    const qty = (item?.quantity ?? 1) + 1;
    try {
      await updateQuantity(id, qty);
      toast.success("Quantity updated");
    } catch (error) {
      console.error("Failed to update quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  const handleRemove = async (item) => {
    const id = item?._id;
    if (!id) {
      toast.error("Invalid item ID");
      return;
    }
    try {
      await removeFromCart(id);
      toast.success("Removed from cart");
    } catch (error) {
      console.error("Failed to remove item:", error);
      toast.error("Failed to remove item");
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500 pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors duration-200 font-medium"
            >
              <FaArrowLeft className="text-sm" />
              Back
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white rounded-2xl shadow-xl"
          >
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaShoppingCart className="text-3xl text-orange-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Let's find something amazing!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-amber-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <FaHeart className="text-sm" />
              Start Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors duration-200 font-medium mb-4"
          >
            <FaArrowLeft className="text-sm" />
            Back
          </button>
          <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">You have {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, index) => {
              const key = item?._id || item?.id;
              const product = item?.product || item;
              const name = product?.name || "Product";
              const image = getImageUrl(product?.imageUrl || product?.image);
              const price = product?.price ?? item?.price ?? 0;
              const size = item?.size;
              const color = item?.color;
              const qty = item?.quantity ?? 1;

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Product Image */}
                    <div className="sm:w-48 h-48 sm:h-auto">
                      <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          if (e.currentTarget.src.endsWith("/placeholder.svg")) return;
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            {size && (
                              <span className="bg-gray-100 px-3 py-1 rounded-full">Size: {size}</span>
                            )}
                            {color && (
                              <span className="bg-gray-100 px-3 py-1 rounded-full">Color: {color}</span>
                            )}
                          </div>
                          <p className="text-2xl font-bold text-orange-600">₹{price}</p>
                        </div>
                        
                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemove(item)}
                          className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-2"
                          title="Remove item"
                        >
                          <FaTrash className="text-lg" />
                        </button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium text-gray-700">Quantity:</span>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleMinus(item)}
                              className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:border-orange-300 flex items-center justify-center transition-colors duration-200"
                            >
                              -
                            </button>
                            <span className="text-xl font-semibold text-gray-900 min-w-[3rem] text-center">{qty}</span>
                            <button
                              onClick={() => handlePlus(item)}
                              className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:border-orange-300 flex items-center justify-center transition-colors duration-200"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Total</p>
                          <p className="text-xl font-bold text-gray-900">₹{price * qty}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Summary Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                  <span className="font-semibold text-gray-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-gray-900">₹{shipping}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-orange-600">₹{total}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Including all taxes</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/checkout")}
                className="w-full mt-6 py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-amber-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                <FaCreditCard />
                Proceed to Checkout
              </motion.button>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Shop With Us?</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaTruck className="text-orange-500 text-xl" />
                  <div>
                    <p className="font-medium text-gray-900">Free Shipping</p>
                    <p className="text-sm text-gray-600">On orders above ₹999</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaShieldAlt className="text-orange-500 text-xl" />
                  <div>
                    <p className="font-medium text-gray-900">Secure Payment</p>
                    <p className="text-sm text-gray-600">100% secure checkout</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaHeart className="text-orange-500 text-xl" />
                  <div>
                    <p className="font-medium text-gray-900">Quality Guarantee</p>
                    <p className="text-sm text-gray-600">Premium products only</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
