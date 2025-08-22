import { useState } from "react";
import axios from "axios";

export default function TrackOrder() {
  const [id, setId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setOrder(null);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:3000/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const found = (res.data || []).find((o) => o._id === id.trim());
      if (!found) return setError("Order not found");
      setOrder(found);
    } catch {
      setError("Failed to fetch orders");
    }
  };

  return (
    <div className=" mx-auto px-4 bg-gradient-to-br from-amber-100  via-orange-100 to-yellow-500 h-screen py-24">
      <h1 className="text-2xl font-bold mb-4">Track Order</h1>
      <div className="flex gap-2">
        <input className="border rounded px-3 py-2 flex-1" placeholder="Enter Order ID" value={id} onChange={(e)=>setId(e.target.value)} />
        <button className="px-4 py-2 bg-orange-600 text-white rounded" onClick={handleSearch}>Search</button>
      </div>
      {error && <p className="text-red-600 mt-3">{error}</p>}
      {order && (
        <div className="bg-white rounded shadow p-4 mt-4">
          <p className="font-semibold">Order #{order._id}</p>
          <p>Status: {order.orderStatus || "Placed"}</p>
          <p>Total: ₹{order.totalAmount || 0}</p>
        </div>
      )}
    </div>
  );
}


