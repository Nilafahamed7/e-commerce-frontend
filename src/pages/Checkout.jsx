// // import { useEffect, useState } from "react";
// // import axios from "axios";

// // export default function Checkout() {
// //     const [cart, setCart] = useState(null);
// //     const [name, setName] = useState("");
// //     const [phone, setPhone] = useState("");
// //     const [address, setAddress] = useState("");

// //     useEffect(() => {
// //         const fetchCart = async () => {
// //             const token = localStorage.getItem("token");
// //             const res = await axios.get("http://localhost:3000/api/cart", {
// //                 headers: { Authorization: `Bearer ${token}` },
// //             });
// //             setCart(res.data);
// //         };
// //         fetchCart();
// //     }, []);

// //     const total = cart
// //         ? cart.items.reduce((sum, i) => sum + i.productId.price * i.quantity, 0)
// //         : 0;

// //     // Razorpay payment
// //     const handlePayment = async () => {
// //         if (!name || !phone || !address) {
// //             alert("Please fill address details");
// //             return;
// //         }

// //         // TODO: hit Razorpay order creation API on backend
// //         // and then call Razorpay JS with the orderId.
// //         alert("Razorpay payment flow will be triggered here (keyId needed)");
// //     };

// //     if (!cart) return <div className="p-10">Loading...</div>;

// //     return (
// //         <div className="max-w-5xl mx-auto px-4 py-20">
// //             <h1 className="text-3xl font-bold mb-6">Checkout</h1>

// //             {/* Address Form */}
// //             <div className="mb-8 space-y-3">
// //                 <input
// //                     type="text"
// //                     placeholder="Full Name"
// //                     value={name}
// //                     onChange={(e) => setName(e.target.value)}
// //                     className="w-full px-3 py-2 border rounded"
// //                 />
// //                 <input
// //                     type="tel"
// //                     placeholder="Phone Number"
// //                     value={phone}
// //                     onChange={(e) => setPhone(e.target.value)}
// //                     className="w-full px-3 py-2 border rounded"
// //                 />
// //                 <textarea
// //                     placeholder="Address"
// //                     value={address}
// //                     onChange={(e) => setAddress(e.target.value)}
// //                     className="w-full px-3 py-2 border rounded"
// //                     rows={3}
// //                 />
// //             </div>

// //             {/* Cart Summary */}
// //             <div className="space-y-4">
// //                 {cart.items.map((item) => (
// //                     <div key={item._id} className="bg-white p-3 rounded shadow">
// //                         <p className="font-semibold">{item.productId.name}</p>
// //                         <p className="text-sm">Qty: {item.quantity}</p>
// //                         <p className="text-sm">
// //                             Price: ₹{item.productId.price * item.quantity}
// //                         </p>
// //                     </div>
// //                 ))}
// //             </div>

// //             <div className="mt-6 font-semibold text-lg">Total: ₹{total}</div>

// //             <button
// //                 onClick={handlePayment}
// //                 className="mt-4 px-5 py-2 rounded
// //             bg-gradient-to-r from-fuchsia-500 via-orange-400 to-yellow-400
// //             text-white font-medium hover:brightness-110 transition"
// //             >
// //                 Pay with Razorpay
// //             </button>

// //         </div>
// //     );
// // }
// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function Checkout() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     address: "",
//     city: "",
//     postalCode: "",
//     phone: "",
//     paymentMethod: "cod",
//   });

//   const [cart, setCart] = useState(null);

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:3000/api/cart", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setCart(res.data);
//       } catch (err) {
//         console.error("Error fetching cart", err);
//       }
//     };
//     fetchCart();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("✅ Order placed successfully!");
//     console.log("Order Data:", form, "Cart:", cart);
//   };

//   if (!cart) return <div className="p-16">Loading...</div>;

//   const total = cart.items.reduce(
//     (sum, item) => sum + item.productId.price * item.quantity,
//     0
//   );

//   return (
//     <div className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">
//       {/* LEFT: Checkout Form */}
//       <div className="md:col-span-2">
//         <h1 className="text-3xl font-bold mb-6">Checkout</h1>

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-6 bg-white shadow p-6 rounded-lg"
//         >
//           {/* Shipping Info */}
//           <div>
//             <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Full Name"
//                 value={form.name}
//                 onChange={handleChange}
//                 required
//                 className="border rounded px-3 py-2 w-full"
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email Address"
//                 value={form.email}
//                 onChange={handleChange}
//                 required
//                 className="border rounded px-3 py-2 w-full"
//               />
//               <input
//                 type="text"
//                 name="address"
//                 placeholder="Street Address"
//                 value={form.address}
//                 onChange={handleChange}
//                 required
//                 className="border rounded px-3 py-2 w-full col-span-2"
//               />
//               <input
//                 type="text"
//                 name="city"
//                 placeholder="City"
//                 value={form.city}
//                 onChange={handleChange}
//                 required
//                 className="border rounded px-3 py-2 w-full"
//               />
//               <input
//                 type="text"
//                 name="postalCode"
//                 placeholder="Postal Code"
//                 value={form.postalCode}
//                 onChange={handleChange}
//                 required
//                 className="border rounded px-3 py-2 w-full"
//               />
//               <input
//                 type="text"
//                 name="phone"
//                 placeholder="Phone Number"
//                 value={form.phone}
//                 onChange={handleChange}
//                 required
//                 className="border rounded px-3 py-2 w-full col-span-2"
//               />
//             </div>
//           </div>

//           {/* Payment Method */}
//           <div>
//             <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
//             <div className="space-y-2">
//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="paymentMethod"
//                   value="cod"
//                   checked={form.paymentMethod === "cod"}
//                   onChange={handleChange}
//                 />
//                 Cash on Delivery
//               </label>
//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="paymentMethod"
//                   value="card"
//                   checked={form.paymentMethod === "card"}
//                   onChange={handleChange}
//                 />
//                 Credit / Debit Card (Coming Soon)
//               </label>
//             </div>
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="px-5 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
//           >
//             Place Order
//           </button>
//         </form>
//       </div>

//       {/* RIGHT: Cart Summary */}
//       <div>
//         <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//         <div className="bg-white shadow rounded-lg p-4 space-y-4">
//           {cart.items.map((item) => (
//             <div
//               key={item._id}
//               className="flex items-center justify-between border-b pb-2"
//             >
//               <div className="flex items-center gap-3">
//                 {item.productId.imageUrl && (
//                   <img
//                     src={item.productId.imageUrl}
//                     alt={item.productId.name}
//                     className="h-14 w-14 object-cover rounded"
//                   />
//                 )}
//                 <div>
//                   <p className="font-medium">{item.productId.name}</p>
//                   <p className="text-sm text-gray-600">
//                     Qty: {item.quantity} × ₹{item.productId.price}
//                   </p>
//                 </div>
//               </div>
//               <p className="font-semibold">
//                 ₹{item.productId.price * item.quantity}
//               </p>
//             </div>
//           ))}

//           {/* Grand Total */}
//           <div className="flex justify-between font-bold text-lg pt-2">
//             <span>Total:</span>
//             <span>₹{total}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import axios from "axios";

export default function Checkout() {
    const [cart, setCart] = useState(null);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [landmark, setLandmark] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("cod"); // default COD

    useEffect(() => {
        const fetchCart = async () => {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:3000/api/cart", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCart(res.data);
        };
        fetchCart();
    }, []);

    const total = cart
        ? cart.items.reduce((sum, i) => sum + i.productId.price * i.quantity, 0)
        : 0;

    // COD → simple order placement
    const handleCOD = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                "http://localhost:3000/api/orders",
                {
                    name,
                    phone,
                    address,
                    paymentMethod: "COD",
                    items: cart.items,
                    total,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Order placed successfully ✅ (Cash on Delivery)");
        } catch (err) {
            console.error(err);
            alert("Failed to place COD order ❌");
        }
    };

    // Razorpay → for Card & UPI
    const handleRazorpay = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(
                "http://localhost:3000/api/create-order",
                { amount: total, currency: "INR" },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const { id: order_id, currency, amount } = res.data;

            const options = {
                key: "YOUR_RAZORPAY_KEY_ID", // replace with your key
                amount,
                currency,
                name: "My Store",
                description: "Order Payment",
                order_id,
                handler: async function (response) {
                    // Verify payment in backend
                    await axios.post(
                        "http://localhost:3000/api/verify-payment",
                        {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            name,
                            phone,
                            address,
                            items: cart.items,
                            total,
                            paymentMethod,
                        },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );

                    alert("Payment successful ✅ Order placed!");
                },
                prefill: {
                    name,
                    contact: phone,
                },
                theme: {
                    color: "#6366f1",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error(err);
            alert("Payment initialization failed ❌");
        }
    };

    const handlePlaceOrder = () => {
        if (!name || !phone || !address) {
            alert("Please fill all address fields");
            return;
        }

        if (paymentMethod === "cod") {
            handleCOD();
        } else {
            handleRazorpay();
        }
    };

    if (!cart) return <div className="p-10">Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-18 grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* Left: Address & Payment */}
            <div className="md:col-span-2 space-y-8">

                {/* Shipping Address */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        Shipping Details
                    </h2>
                    <div className="space-y-3">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"
                        />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"
                        />
                        <textarea
                            placeholder="Full Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"
                            rows={3}
                        />
                        <input
                            type="text"
                            placeholder="Landmark"
                            value={landmark}
                            onChange={(e) => setLandmark(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"
                        />
                        <input
                            type="text"
                            placeholder="Postal Code"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"
                        />
                    </div>
                </div>

                {/* Payment Options */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        Payment Method
                    </h2>

                    <div className="space-y-3">
                        {/* COD */}
                        <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                                type="radio"
                                name="payment"
                                value="cod"
                                checked={paymentMethod === "cod"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span className="font-medium">Cash on Delivery</span>
                        </label>

                        {/* Card */}
                        <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                                type="radio"
                                name="payment"
                                value="card"
                                checked={paymentMethod === "card"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span className="font-medium">Credit / Debit Card</span>
                        </label>

                        {/* UPI */}
                        <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                                type="radio"
                                name="payment"
                                value="upi"
                                checked={paymentMethod === "upi"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span className="font-medium">UPI (Google Pay / PhonePe / Paytm)</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Right: Order Summary */}
            <div className="bg-gray-50 p-6 mt-12 rounded-xl shadow-xl h-fit">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-4">
                    {cart.items.map((item) => (
                        <div key={item._id} className="flex gap-3 items-center">
                            <img
                                src={item.productId.imageUrl}
                                alt={item.productId.name}
                                className="w-16 h-16 rounded-md object-cover"
                            />
                            <div className="flex-1">
                                <p className="font-semibold">{item.productId.name}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-medium">
                                ₹{item.productId.price * item.quantity}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{total}</span>
                </div>
                <button
                    onClick={handlePlaceOrder}
                    className="w-full mt-6 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                >
                    Place Order
                </button>
            </div>
        </div>
    );
}
