import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  FaShoppingBag, 
  FaTruck, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaClock, 
  FaEye, 
  FaArrowLeft,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaCreditCard,
  FaBox,
  FaStar,
  FaHeart
} from "react-icons/fa";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reordering, setReordering] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("⚠️ No user token found");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          "https://e-commerce-backend-production-fde7.up.railway.app/api/orders/myorders",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setOrders(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // 👉 Function to reorder items
  const handleReorder = async (products) => {
    try {
      setReordering(true);
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      // Send each product to cart API
      await Promise.all(
        products.map((p) =>
          axios.post(
            "https://e-commerce-backend-production-fde7.up.railway.app/api/cart/add",
            {
              productId: p.productId?._id,
              quantity: p.quantity || 1,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
        )
      );

      alert("✅ Items added back to cart!");
      navigate("/cart");
    } catch (err) {
      console.error("❌ Error reordering:", err);
      alert("Failed to reorder. Please try again.");
    } finally {
      setReordering(false);
    }
  };

  // Get status icon and color
  const getStatusInfo = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return { icon: <FaCheckCircle />, color: "text-green-600", bg: "bg-green-100", text: "Delivered" };
      case "shipped":
        return { icon: <FaTruck />, color: "text-blue-600", bg: "bg-blue-100", text: "Shipped" };
      case "cancelled":
        return { icon: <FaTimesCircle />, color: "text-red-600", bg: "bg-red-100", text: "Cancelled" };
      case "processing":
        return { icon: <FaClock />, color: "text-yellow-600", bg: "bg-yellow-100", text: "Processing" };
      default:
        return { icon: <FaClock />, color: "text-gray-600", bg: "bg-gray-100", text: "Processing" };
    }
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    if (filter === "all") return true;
    return order.orderStatus?.toLowerCase() === filter;
  });

  // Loading component
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading your orders...</p>
        </div>
      </div>
    );
  }

  // Individual Order View
  if (selectedOrder) {
    const statusInfo = getStatusInfo(selectedOrder.orderStatus);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500 py-8 pt-24">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setSelectedOrder(null)}
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
            >
              <FaArrowLeft /> Back to Orders
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
          </div>

          {/* Order Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* Order Header */}
            <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">Order #{selectedOrder._id.slice(-8).toUpperCase()}</h2>
                  <p className="text-orange-100 mt-1">
                    <FaCalendarAlt className="inline mr-2" />
                    Placed on {new Date(selectedOrder.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusInfo.bg} ${statusInfo.color}`}>
                  {statusInfo.icon}
                  <span className="font-medium">{statusInfo.text}</span>
                </div>
              </div>
            </div>

            {/* Order Content */}
            <div className="p-6">
              {/* Products */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FaBox /> Products ({selectedOrder.products?.length || 0})
                </h3>
                <div className="space-y-4">
                  {selectedOrder.products?.map((product, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <img
                        src={product.customImageUrl || product.productId?.imageUrl || "/placeholder.svg"}
                        alt={product.productId?.name || "Product"}
                        className="w-20 h-20 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/placeholder.svg";
                        }}
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{product.productId?.name || "Product"}</h4>
                        <p className="text-sm text-gray-600">
                          Quantity: {product.quantity} × ₹{product.productId?.price || product.price}
                        </p>
                        {product.customText && (
                          <p className="text-sm text-orange-600">Custom Text: "{product.customText}"</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{(product.quantity || 1) * (product.productId?.price || product.price || 0)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Shipping Address */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-orange-600" /> Shipping Address
                  </h3>
                  {selectedOrder.shippingAddress ? (
                    <div className="space-y-1 text-sm">
                      <p className="font-medium">{selectedOrder.shippingAddress.name || selectedOrder.shippingAddress.fullName}</p>
                      <p>{selectedOrder.shippingAddress.address}</p>
                      <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.postalCode}</p>
                      <p className="flex items-center gap-1">
                        <FaPhone className="text-orange-600" />
                        {selectedOrder.shippingAddress.phone}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500">No shipping details available</p>
                  )}
                </div>

                {/* Payment Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <FaCreditCard className="text-orange-600" /> Payment Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Method:</span> {selectedOrder.paymentMethod || "Not specified"}</p>
                    <p><span className="font-medium">Status:</span> 
                      <span className={`ml-2 px-2 py-1 rounded text-xs ${
                        selectedOrder.paymentStatus === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {selectedOrder.paymentStatus || "Pending"}
                      </span>
                    </p>
                    <p className="text-lg font-bold text-orange-600">
                      Total: ₹{selectedOrder.totalAmount}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                {selectedOrder.products?.length > 0 && (
                  <button
                    onClick={() => handleReorder(selectedOrder.products)}
                    disabled={reordering}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-amber-600 text-white py-3 px-6 rounded-lg font-medium hover:from-orange-600 hover:to-amber-700 transition disabled:opacity-50"
                  >
                    {reordering ? "Adding to Cart..." : "Reorder Items"}
                  </button>
                )}
                <Link
                  to="/products"
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition text-center"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Main Orders List View
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500 py-8 pt-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Orders</h1>
          <p className="text-gray-600">Track your orders and reorder your favorites</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            {[
              { key: "all", label: "All Orders", count: orders.length },
              { key: "processing", label: "Processing", count: orders.filter(o => o.orderStatus?.toLowerCase() === "processing").length },
              { key: "shipped", label: "Shipped", count: orders.filter(o => o.orderStatus?.toLowerCase() === "shipped").length },
              { key: "delivered", label: "Delivered", count: orders.filter(o => o.orderStatus?.toLowerCase() === "delivered").length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  filter === tab.key
                    ? "bg-orange-500 text-white"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <FaShoppingBag className="text-6xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No orders found</h3>
            <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
            <Link
              to="/products"
              className="inline-block bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:from-orange-600 hover:to-amber-700 transition"
            >
              Browse Products
            </Link>
          </motion.div>
        ) : (
          <div className="grid gap-6">
            {filteredOrders.map((order, index) => {
              const statusInfo = getStatusInfo(order.orderStatus);
              const totalItems = order.products?.reduce((sum, p) => sum + (p.quantity || 1), 0) || 0;
              
              return (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Order #{order._id.slice(-8).toUpperCase()}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          <FaCalendarAlt className="inline mr-1" />
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusInfo.bg} ${statusInfo.color}`}>
                        {statusInfo.icon}
                        <span className="font-medium text-sm">{statusInfo.text}</span>
                      </div>
                    </div>

                    {/* Order Preview */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex -space-x-2">
                        {order.products?.slice(0, 3).map((product, idx) => (
                          <img
                            key={idx}
                            src={product.customImageUrl || product.productId?.imageUrl || "/placeholder.svg"}
                            alt={product.productId?.name || "Product"}
                            className="w-12 h-12 rounded-full border-2 border-white object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/placeholder.svg";
                            }}
                          />
                        ))}
                        {order.products?.length > 3 && (
                          <div className="w-12 h-12 rounded-full border-2 border-white bg-orange-500 text-white flex items-center justify-center text-xs font-bold">
                            +{order.products.length - 3}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">
                          {totalItems} item{totalItems !== 1 ? 's' : ''} • {order.products?.length || 0} product{order.products?.length !== 1 ? 's' : ''}
                        </p>
                        <p className="font-semibold text-orange-600">₹{order.totalAmount}</p>
                      </div>
                      <FaEye className="text-gray-400" />
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOrder(order);
                        }}
                        className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-orange-600 transition"
                      >
                        View Details
                      </button>
                      {order.products?.length > 0 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReorder(order.products);
                          }}
                          disabled={reordering}
                          className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-300 transition disabled:opacity-50"
                        >
                          Reorder
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
