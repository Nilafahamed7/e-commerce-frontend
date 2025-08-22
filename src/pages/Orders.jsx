import { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const run = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    };
    run();
  }, []);

  if (!orders) return <div className="p-10">Loading...</div>;

  return (
    <div className="max-w-5xl h-screen mx-auto px-4 bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500 py-24">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o._id} className="bg-white rounded-lg shadow p-4">
              <p className="font-semibold">Order #{o._id}</p>
              <p>Total: ₹{o.totalAmount || 0}</p>
              <p>Status: {o.orderStatus || "Placed"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


