import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reordering, setReordering] = useState(false);
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
      navigate("/cart"); // 👉 Redirect to cart after reorder
    } catch (err) {
      console.error("❌ Error reordering:", err);
      alert("Failed to reorder. Please try again.");
    } finally {
      setReordering(false);
    }
  };

  if (loading)
    return <p className="text-center h-full bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500 text-3xl py-20">Loading your orders...</p>;
  if (!orders.length)
    return <p className="text-center h-full text-3xl bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500 py-20">No orders found.</p>;

  return (
    <div className="w-full flex flex-col justify-center items-center mx-auto mt-20 p-6 py-20 bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border w-[90%] sm:w-[60%] rounded-lg p-5 mb-6 shadow-sm bg-white"
        >
          {/* Order header */}
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Order #{order._id.slice(-6)}</h3>
            <span
              className={`px-3 py-1 rounded text-sm ${
                order.orderStatus === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : order.orderStatus === "Shipped"
                  ? "bg-blue-100 text-blue-700"
                  : order.orderStatus === "Cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {order.orderStatus || "Processing"}
            </span>
          </div>

          <p className="text-sm text-gray-600 mt-1">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>

          {/* Products */}
          <div className="mt-4">
            <h4 className="font-medium">Products:</h4>
            {order.products?.length ? (
              order.products.map((p, idx) => {
                // ✅ FIX: use "image" field instead of imageUrl
                const imgUrl =
                  p.customImageUrl || p.productId?.image || "";

                return (
                  <div
                    key={idx}
                    className="flex items-center gap-4 border-b py-2"
                  >
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt={p.title || "Product"}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/80?text=No+Image";
                        }}
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-gray-500 text-sm rounded">
                        No Image
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{p.title}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {p.quantity} × ₹{p.price}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-500">
                No products in this order.
              </p>
            )}
          </div>

          {/* Total */}
          <p className="mt-3 font-semibold">Total: ₹{order.totalAmount}</p>

          {/* Payment */}
          <p className="text-sm">
            Payment: {order.paymentMethod} ({order.paymentStatus})
          </p>

          {/* Shipping */}
          <div className="mt-2">
            <h4 className="font-medium">Shipping:</h4>
            {order.shippingAddress ? (
              <>
                <p className="text-sm">{order.shippingAddress.fullName}</p>
                <p className="text-sm">
                  {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.state} -{" "}
                  {order.shippingAddress.postalCode}
                </p>
                <p className="text-sm">📞 {order.shippingAddress.phone}</p>
              </>
            ) : (
              <p className="text-sm text-gray-500">
                No shipping details available
              </p>
            )}
          </div>

          {/* Reorder Button */}
          {order.products?.length > 0 && (
            <button
              onClick={() => handleReorder(order.products)}
              disabled={reordering}
              className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium transition"
            >
              {reordering ? "Reordering..." : "Reorder"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
