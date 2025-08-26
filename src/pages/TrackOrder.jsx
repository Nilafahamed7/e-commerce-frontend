import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, Truck, CheckCircle, Clock, AlertCircle, MapPin, Calendar, DollarSign } from "lucide-react";
import axios from "axios";

export default function TrackOrder() {
  const [id, setId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!id.trim()) {
      setError("Please enter an order ID");
      return;
    }

    setError("");
    setOrder(null);
    setLoading(true);
    
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`https://e-commerce-backend-production-fde7.up.railway.app/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const found = (res.data || []).find((o) => o._id === id.trim());
      if (!found) {
        setError("Order not found. Please check your order ID and try again.");
        return;
      }
      setOrder(found);
    } catch (err) {
      setError("Failed to fetch orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return <CheckCircle className="w-5 h-5" />;
      case 'shipped': return <Truck className="w-5 h-5" />;
      case 'processing': return <Package className="w-5 h-5" />;
      case 'cancelled': return <AlertCircle className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 pt-24 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Track Your Order
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter your order ID to track the status and location of your package
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-lg"
                placeholder="Enter your Order ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSearch}
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl font-semibold hover:from-orange-700 hover:to-amber-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Track Order
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Order Details */}
        <AnimatePresence>
          {order && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Order Header */}
              <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Order #{order._id.slice(-8)}</h2>
                    <p className="text-orange-100">Order placed successfully</p>
                  </div>
                  <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${getStatusColor(order.orderStatus)} bg-white`}>
                    {getStatusIcon(order.orderStatus)}
                    <span className="font-semibold capitalize">{order.orderStatus || "Placed"}</span>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Order Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Package className="w-5 h-5 text-orange-500" />
                      Order Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Order Date: {new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Total Amount: ₹{order.totalAmount || 0}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Delivery Address: {order.shippingAddress?.address || "Not specified"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Timeline */}
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Truck className="w-5 h-5 text-orange-500" />
                      Order Status
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Order Placed</p>
                          <p className="text-sm text-gray-500">Your order has been confirmed</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${order.orderStatus === 'processing' || order.orderStatus === 'shipped' || order.orderStatus === 'delivered' ? 'bg-blue-500' : 'bg-gray-300'}`}>
                          <Package className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Processing</p>
                          <p className="text-sm text-gray-500">Your order is being prepared</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${order.orderStatus === 'shipped' || order.orderStatus === 'delivered' ? 'bg-blue-500' : 'bg-gray-300'}`}>
                          <Truck className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Shipped</p>
                          <p className="text-sm text-gray-500">Your order is on its way</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${order.orderStatus === 'delivered' ? 'bg-green-500' : 'bg-gray-300'}`}>
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Delivered</p>
                          <p className="text-sm text-gray-500">Your order has been delivered</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


