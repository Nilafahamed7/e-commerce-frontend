import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      {/* Success icon */}
      <div className="bg-green-100 p-6 rounded-full mb-6 animate-bounce">
        <svg
          className="w-16 h-16 text-green-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold text-green-700 mb-2">
        Order Placed Successfully 🎉
      </h1>
      <p className="text-gray-600 mb-6">
        Thank you for shopping with us. Your order is being processed.
      </p>

      {/* Order ID */}
      {orderId && (
        <p className="text-sm text-gray-500 mb-6">
          <span className="font-semibold">Order ID:</span> {orderId}
        </p>
      )}

      {/* Buttons */}
      <div className="flex gap-4">
        <Link
          to="/"
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Continue Shopping
        </Link>
        <Link
          to="/my-orders"
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          View My Orders
        </Link>
      </div>
    </div>
  );
}
