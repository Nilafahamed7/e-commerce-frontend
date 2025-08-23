// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Orders() {
//   const [orders, setOrders] = useState(null);

//   useEffect(() => {
//     const run = async () => {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("http://localhost:3000/api/orders", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setOrders(res.data);
//     };
//     run();
//   }, []);

//   if (!orders) return <div className="p-10">Loading...</div>;

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-24">
//       <h1 className="text-2xl font-bold mb-4">My Orders</h1>
//       {orders.length === 0 ? (
//         <p>No orders yet.</p>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((o) => (
//             <div key={o._id} className="bg-white rounded-lg shadow p-4">
//               <p className="font-semibold">Order #{o._id}</p>
//               <p>Total: ₹{o.totalAmount || 0}</p>
//               <p>Status: {o.orderStatus || "Placed"}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const { data } = await axios.get("/api/orders/myorders");
//         setOrders(data);
//       } catch (err) {
//         console.error("❌ Error fetching orders:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   if (loading) return <p className="text-center py-10">Loading orders...</p>;

//   if (orders.length === 0)
//     return <p className="text-center py-10">No orders found.</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">My Orders</h2>

//       <div className="space-y-6">
//         {orders.map((order) => (
//           <div
//             key={order._id}
//             className="border rounded-xl p-4 shadow-md bg-white"
//           >
//             <h3 className="text-lg font-semibold mb-2">
//               Order ID: {order._id}
//             </h3>
//             <p className="text-gray-600">
//               Total: ₹{order.totalAmount} • Status: {order.orderStatus}
//             </p>

//             <div className="mt-3 space-y-3">
//               {order.products.map((p, idx) => {
//                 const product = p.productId; // populated product
//                 return (
//                   <div key={idx} className="flex items-center gap-4">
//                     {/* Image */}
//                     <img
//                       src={product?.image || p.customImageUrl || "/placeholder.png"}
//                       alt={product?.title || p.title}
//                       className="w-16 h-16 object-cover rounded-md border"
//                     />

//                     {/* Details */}
//                     <div>
//                       <p className="font-medium">
//                         {product?.title || p.title}
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         Qty: {p.quantity} • ₹{product?.price || p.price}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             <p className="text-sm text-gray-500 mt-3">
//               Ordered on: {new Date(order.createdAt).toLocaleDateString()}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }





import { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("⚠️ No user token found");
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:3000/api/orders/myorders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center py-10">Loading your orders...</p>;
  if (!orders.length) return <p className="text-center py-10">No orders found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 py-18">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border rounded-lg p-5 mb-6 shadow-sm bg-white"
        >
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
              order.products.map((p, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 border-b py-2"
                >
                  {p.customImageUrl ? (
                    <img
                      src={p.customImageUrl}
                      alt={p.title}
                      className="w-16 h-16 object-cover rounded"
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
              ))
            ) : (
              <p className="text-sm text-gray-500">No products in this order.</p>
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
        </div>
      ))}
    </div>
  );
}


// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           console.warn("⚠️ No user token found");
//           setLoading(false);
//           return;
//         }

//         const res = await axios.get("http://localhost:3000/api/orders/myorders", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setOrders(res.data.orders || []);
//       } catch (err) {
//         console.error("❌ Error fetching orders:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p>Loading your orders...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">My Orders</h1>

//       {orders.length === 0 ? (
//         <p className="text-gray-600">You have no orders yet.</p>
//       ) : (
//         <div className="space-y-6">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="border rounded-lg p-4 shadow-sm bg-white"
//             >
//               {/* Order Header */}
//               <div className="flex justify-between items-center border-b pb-2 mb-3">
//                 <h2 className="font-semibold">
//                   Order ID: <span className="text-gray-600">{order._id}</span>
//                 </h2>
//                 <span
//                   className={`px-3 py-1 text-sm rounded-full ${
//                     order.orderStatus === "Delivered"
//                       ? "bg-green-100 text-green-700"
//                       : order.orderStatus === "Shipped"
//                       ? "bg-blue-100 text-blue-700"
//                       : order.orderStatus === "Cancelled"
//                       ? "bg-red-100 text-red-700"
//                       : "bg-yellow-100 text-yellow-700"
//                   }`}
//                 >
//                   {order.orderStatus}
//                 </span>
//               </div>

//               {/* Products */}
//               <div className="space-y-2">
//                 {order.products?.length ? (
//                   order.products.map((p, idx) => (
//                     <div
//                       key={idx}
//                       className="flex items-center gap-4 border-b py-2"
//                     >
//                       {p.customImageUrl ? (
//                         <img
//                           src={p.customImageUrl}
//                           alt={p.title}
//                           className="w-16 h-16 object-cover rounded"
//                         />
//                       ) : p.productId?.imageUrl ? (
//                         <img
//                           src={p.productId.imageUrl}
//                           alt={p.title}
//                           className="w-16 h-16 object-cover rounded"
//                         />
//                       ) : (
//                         <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-gray-500 text-sm rounded">
//                           No Image
//                         </div>
//                       )}
//                       <div>
//                         <p className="font-medium">{p.title}</p>
//                         <p className="text-sm text-gray-600">
//                           Qty: {p.quantity} × ₹{p.price}
//                         </p>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-sm text-gray-500">
//                     No products in this order.
//                   </p>
//                 )}
//               </div>

//               {/* Footer */}
//               <div className="mt-4">
//                 <p className="font-semibold">Total: ₹{order.totalAmount}</p>
//                 <p className="text-sm text-gray-600">
//                   Payment: {order.paymentMethod} ({order.paymentStatus})
//                 </p>
//                 <p className="text-sm text-gray-600 mt-2">
//                   Shipping To:{" "}
//                   <span className="font-medium">
//                     {order.shippingAddress?.fullName},{" "}
//                     {order.shippingAddress?.address},{" "}
//                     {order.shippingAddress?.city},{" "}
//                     {order.shippingAddress?.state} -{" "}
//                     {order.shippingAddress?.postalCode},{" "}
//                     {order.shippingAddress?.country}
//                   </span>
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
