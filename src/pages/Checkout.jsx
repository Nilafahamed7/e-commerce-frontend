import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  CreditCard,
  Smartphone,
  Truck,
  Landmark,
  MapPin,
  Mail,
  User,
  Phone,
  Home,
  Wallet,
  ArrowLeft,
  Shield,
  Clock,
  CheckCircle,
  Lock,
  ShoppingBag
} from "lucide-react";

export default function Checkout() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [landmark, setLandmark] = useState("");
  const [stateField, setStateField] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://e-commerce-backend-production-fde7.up.railway.app/api/cart",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCart(res.data);
      } catch (err) {
        console.error("Cart fetch error:", err.response?.data || err.message);
        toast.error("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const total = cart
    ? (cart.items || []).reduce((sum, item) => {
        const product = item.product || item.productId || {};
        const price = Number(product.price) || 0;
        const qty = Number(item.quantity) || 1;
        return sum + price * qty;
      }, 0)
    : 0;

  const shipping = 50;
  const finalTotal = total + shipping;

  // ✅ COD order placement
  const handleCOD = async () => {
    try {
      setPlacingOrder(true);
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://e-commerce-backend-production-fde7.up.railway.app/api/orders",
        {
          products: cart.items.map((item) => ({
            productId: item.product?._id || item.productId,
            title: item.product?.name || "Product",
            price: item.product?.price || 0,
            quantity: item.quantity,
          })),
          shippingAddress: {
            fullName: name,
            phone: phone,
            address,
            city: landmark || "N/A",
            state: stateField,
            postalCode,
            country: "India",
          },
          paymentMethod: "COD",
          totalAmount: finalTotal,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Order response:", res.data);
      resetForm();
      toast.success("Order placed successfully! 🎉");
      navigate("/order-success");
    } catch (err) {
      console.error("COD Order Error:", err.response?.data || err.message);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  // ✅ Razorpay order placement
  const handleRazorpay = async () => {
    try {
      setPlacingOrder(true);
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://e-commerce-backend-production-fde7.up.railway.app/api/orders/razorpay",
        { amount: finalTotal },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { id: order_id, currency, amount } = res.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "DesignMyFit",
        description: "Order Payment",
        order_id,
        handler: async function (response) {
          try {
            await axios.post(
              "https://e-commerce-backend-production-fde7.up.railway.app/api/orders/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                products: cart.items.map((item) => ({
                  productId: item.product?._id || item.productId,
                  title: item.product?.name || "Product",
                  price: item.product?.price || 0,
                  quantity: item.quantity,
                })),
                shippingAddress: {
                  fullName: name,
                  phone: phone,
                  address,
                  city: landmark || "N/A",
                  state: stateField,
                  postalCode,
                  country: "India",
                },
                paymentMethod: "Razorpay",
                totalAmount: finalTotal,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            resetForm();
            toast.success("Payment successful! Order placed. 🎉");
            navigate("/order-success");
          } catch (verifyErr) {
            console.error(
              "Verification Error:",
              verifyErr.response?.data || verifyErr.message
            );
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name,
          email,
          contact: phone,
        },
        theme: { color: "#f97316" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Razorpay Error:", err.response?.data || err.message);
      toast.error("Payment initialization failed. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  const handlePlaceOrder = () => {
    if (!name || !phone || !address || !stateField || !postalCode) {
      toast.error("Please fill all required fields");
      return;
    }

    if (paymentMethod === "cod") {
      handleCOD();
    } else {
      handleRazorpay();
    }
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setLandmark("");
    setStateField("");
    setPostalCode("");
    setPaymentMethod("cod");
    setCart(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500 pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white rounded-2xl shadow-xl"
          >
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="text-3xl text-orange-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 text-lg mb-8">Add some products to your cart to proceed with checkout.</p>
            <button
              onClick={() => navigate("/products")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-amber-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Continue Shopping
            </button>
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
            <ArrowLeft className="text-sm" />
            Back to Cart
          </button>
          <h1 className="text-4xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your purchase securely</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Address & Payment */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-orange-600" />
                </div>
                Shipping Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors duration-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors duration-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors duration-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Postal Code *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter postal code"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors duration-200"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Address *</label>
                  <div className="relative">
                    <Home className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      placeholder="Enter your complete address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors duration-200 resize-none"
                      rows={3}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Landmark</label>
                  <div className="relative">
                    <Landmark className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Nearby landmark"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors duration-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter your state"
                      value={stateField}
                      onChange={(e) => setStateField(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors duration-200"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Payment Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-orange-600" />
                </div>
                Payment Method
              </h2>
              <div className="space-y-4">
                <label className={`flex items-center gap-4 p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  paymentMethod === "cod" 
                    ? "border-orange-500 bg-orange-50" 
                    : "border-gray-200 hover:border-orange-300"
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-orange-600"
                  />
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Cash on Delivery</p>
                    <p className="text-sm text-gray-600">Pay when you receive your order</p>
                  </div>
                  <CheckCircle className={`w-6 h-6 ${paymentMethod === "cod" ? "text-orange-600" : "text-gray-300"}`} />
                </label>
                
                <label className={`flex items-center gap-4 p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  paymentMethod === "card" 
                    ? "border-orange-500 bg-orange-50" 
                    : "border-gray-200 hover:border-orange-300"
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-orange-600"
                  />
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Credit / Debit Card</p>
                    <p className="text-sm text-gray-600">Secure payment via Razorpay</p>
                  </div>
                  <CheckCircle className={`w-6 h-6 ${paymentMethod === "card" ? "text-orange-600" : "text-gray-300"}`} />
                </label>
                
                <label className={`flex items-center gap-4 p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  paymentMethod === "upi" 
                    ? "border-orange-500 bg-orange-50" 
                    : "border-gray-200 hover:border-orange-300"
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-orange-600"
                  />
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">UPI Payment</p>
                    <p className="text-sm text-gray-600">Google Pay, PhonePe, Paytm</p>
                  </div>
                  <CheckCircle className={`w-6 h-6 ${paymentMethod === "upi" ? "text-orange-600" : "text-gray-300"}`} />
                </label>
              </div>
            </motion.div>
          </div>

          {/* Right: Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Order Summary Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-orange-600" />
                </div>
                Order Summary
              </h2>
              
              <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                {(cart.items || []).map((item, index) => {
                  const product = item.product || item.productId || {};
                  const name = product.name || "Product";
                  const price = Number(product.price) || 0;
                  const qty = Number(item.quantity) || 1;
                  const src = product.imageUrl?.startsWith("http")
                    ? product.imageUrl
                    : "/placeholder.svg";
                  return (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex gap-4 items-center p-4 bg-gray-50 rounded-xl"
                    >
                      <img
                        src={src}
                        alt={name}
                        className="w-16 h-16 rounded-lg object-cover border-2 border-white shadow-sm"
                        onError={(e) => {
                          if (e.currentTarget.src.endsWith("/placeholder.svg")) return;
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 line-clamp-1">{name}</p>
                        <p className="text-sm text-gray-600">Qty: {qty}</p>
                        {item.size && <p className="text-xs text-gray-500">Size: {item.size}</p>}
                        {item.color && <p className="text-xs text-gray-500">Color: {item.color}</p>}
                      </div>
                      <p className="font-bold text-gray-900">₹{price * qty}</p>
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="border-t mt-6 pt-6 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>₹{shipping}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t">
                  <span>Total</span>
                  <span className="text-orange-600">₹{finalTotal}</span>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePlaceOrder}
              disabled={placingOrder}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-3 ${
                placingOrder
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-500 to-amber-600 text-white hover:from-orange-600 hover:to-amber-700 shadow-lg hover:shadow-xl"
              }`}
            >
              {placingOrder ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Place Order - ₹{finalTotal}
                </>
              )}
            </motion.button>

            {/* Security Features */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Secure Checkout
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">SSL encrypted payment</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">Secure payment gateway</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">30-day return policy</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-600">Fast delivery within 3-5 days</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
