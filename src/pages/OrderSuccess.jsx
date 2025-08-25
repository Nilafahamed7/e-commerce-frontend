import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  ShoppingBag, 
  Package, 
  Truck, 
  Home, 
  Clock, 
  Mail,
  Phone,
  ArrowRight,
  Star,
  Gift,
  Heart
} from "lucide-react";

export default function OrderSuccess() {
  const location = useLocation();
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    // If backend redirects with ?orderId=xxxx
    const params = new URLSearchParams(location.search);
    const id = params.get("orderId");
    if (id) setOrderId(id);
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Success Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 w-20 h-20 border-2 border-white rounded-full"></div>
              <div className="absolute top-12 right-8 w-12 h-12 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-8 left-12 w-16 h-16 border-2 border-white rounded-full"></div>
            </div>
            
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="relative z-10"
            >
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            {/* Success Message */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl font-bold mb-3"
            >
              Order Placed Successfully! 🎉
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-lg opacity-90"
            >
              Thank you for shopping with DesignMyFit
            </motion.p>
          </div>

          {/* Order Details */}
          <div className="p-8">
            {/* Order ID */}
            {orderId && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-gray-50 rounded-xl p-6 mb-8"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Package className="w-5 h-5 text-orange-600" />
                  <h3 className="font-semibold text-gray-900">Order Details</h3>
                </div>
                <p className="text-gray-600">
                  <span className="font-medium">Order ID:</span>{" "}
                  <span className="font-mono bg-white px-2 py-1 rounded text-orange-600">
                    {orderId}
                  </span>
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  We've sent a confirmation email with your order details.
                </p>
              </motion.div>
            )}

            {/* What's Next */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mb-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6 text-orange-600" />
                What happens next?
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-orange-50 rounded-xl">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-6 h-6 text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Order Processing</h4>
                  <p className="text-sm text-gray-600">We're preparing your order for shipment</p>
                </div>
                
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Fast Delivery</h4>
                  <p className="text-sm text-gray-600">Your order will arrive in 3-5 business days</p>
                </div>
                
                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Easy Returns</h4>
                  <p className="text-sm text-gray-600">30-day return policy for your peace of mind</p>
                </div>
              </div>
            </motion.div>

            {/* Customer Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 mb-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-orange-600" />
                Need Help?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-600">support@designmyfit.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-600">+91 98765 43210</span>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/"
                className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-amber-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Home className="w-5 h-5" />
                Continue Shopping
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                to="/orders"
                className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-orange-500 text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <ShoppingBag className="w-5 h-5" />
                View My Orders
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="fixed bottom-8 right-8 flex flex-col gap-4"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-lg"
          >
            <Gift className="w-6 h-6 text-white" />
          </motion.div>
          
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg"
          >
            <Star className="w-5 h-5 text-white" />
          </motion.div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-8"
        >
          <p className="text-gray-600 text-lg">
            🎊 <span className="font-semibold text-orange-600">Congratulations!</span> Your order is on its way! 🎊
          </p>
        </motion.div>
      </div>
    </div>
  );
}
