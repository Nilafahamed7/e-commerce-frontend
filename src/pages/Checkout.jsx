// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function Checkout() {
//     const [cart, setCart] = useState(null);
//     const [name, setName] = useState("");
//     const [phone, setPhone] = useState("");
//     const [address, setAddress] = useState("");
//     const [email, setEmail] = useState("");
//     const [landmark, setLandmark] = useState("");
//     const [stateField, setStateField] = useState(""); // ✅ added state
//     const [postalCode, setPostalCode] = useState("");
//     const [paymentMethod, setPaymentMethod] = useState("cod"); // default COD

//     useEffect(() => {
//         const fetchCart = async () => {
//             const token = localStorage.getItem("token");
//             const res = await axios.get("http://localhost:3000/api/cart", {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setCart(res.data);
//         };
//         fetchCart();
//     }, []);

//     const total = cart
//         ? (cart.items || []).reduce((sum, item) => {
//               const product = item.product || item.productId || {};
//               const price = Number(product.price) || 0;
//               const qty = Number(item.quantity) || 1;
//               return sum + price * qty;
//           }, 0)
//         : 0;

//     const handleCOD = async () => {
//         try {
//             const token = localStorage.getItem("token");

//             await axios.post(
//                 "http://localhost:3000/api/orders",
//                 {
//                     products: cart.items.map((item) => ({
//                         productId: item.product._id || item.productId,
//                         quantity: item.quantity,
//                     })),
//                     shippingAddress: {
//                         fullName: name,
//                         phone: phone,
//                         address,
//                         city: landmark || "N/A",
//                         state: stateField, // ✅ required field
//                         postalCode,
//                         country: "India",
//                     },
//                     paymentMethod: "COD",
//                 },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             alert("Order placed successfully ✅ (Cash on Delivery)");
//         } catch (err) {
//             console.error("COD Order Error:", err.response?.data || err.message);
//             alert("Failed to place COD order ❌");
//         }
//     };

//     // Razorpay → for Card & UPI
//     const handleRazorpay = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             const res = await axios.post(
//                 "http://localhost:3000/api/create-order",
//                 { amount: total, currency: "INR" },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             const { id: order_id, currency, amount } = res.data;

//             const options = {
//                 key: "YOUR_RAZORPAY_KEY_ID", // replace with your key
//                 amount,
//                 currency,
//                 name: "My Store",
//                 description: "Order Payment",
//                 order_id,
//                 handler: async function (response) {
//                     await axios.post(
//                         "http://localhost:3000/api/verify-payment",
//                         {
//                             razorpay_order_id: response.razorpay_order_id,
//                             razorpay_payment_id: response.razorpay_payment_id,
//                             razorpay_signature: response.razorpay_signature,
//                             name,
//                             phone,
//                             address,
//                             items: cart.items,
//                             total,
//                             paymentMethod,
//                         },
//                         { headers: { Authorization: `Bearer ${token}` } }
//                     );

//                     alert("Payment successful ✅ Order placed!");
//                 },
//                 prefill: {
//                     name,
//                     contact: phone,
//                 },
//                 theme: {
//                     color: "#6366f1",
//                 },
//             };

//             const rzp = new window.Razorpay(options);
//             rzp.open();
//         } catch (err) {
//             console.error(err);
//             alert("Payment initialization failed ❌");
//         }
//     };

//     const handlePlaceOrder = () => {
//         if (!name || !phone || !address || !stateField || !postalCode) {
//             alert("Please fill all address fields");
//             return;
//         }

//         if (paymentMethod === "cod") {
//             handleCOD();
//         } else {
//             handleRazorpay();
//         }

//         setName("");
//         setPhone("");
//         setEmail("")
//         setAddress("");
//         setLandmark("")
//         setStateField("");
//         setPostalCode("");
//         setPaymentMethod("cod");
//         setCart(null)
//     };

//     if (!cart) return <div className="p-10">Loading...</div>;

//     return (
//         <div className="max-w-6xl mx-auto px-4 mt-6 py-18 grid grid-cols-1 md:grid-cols-3 gap-10 bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500">
//             {/* Left: Address & Payment */}
//             <div className="md:col-span-2 space-y-8">
//                 {/* Shipping Address */}
//                 <div className="bg-white p-6 rounded-xl shadow">
//                     <h2 className="text-2xl font-bold mb-4 text-gray-800">
//                         Shipping Details
//                     </h2>
//                     <div className="space-y-3">
//                         <input
//                             type="text"
//                             placeholder="Full Name"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"
//                         />
//                         <input
//                             type="email"
//                             placeholder="Email Address"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"
//                         />
//                         <input
//                             type="tel"
//                             placeholder="Phone Number"
//                             value={phone}
//                             onChange={(e) => setPhone(e.target.value)}
//                             className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"
//                         />
//                         <textarea
//                             placeholder="Full Address"
//                             value={address}
//                             onChange={(e) => setAddress(e.target.value)}
//                             className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"
//                             rows={3}
//                         />
//                         <input
//                             type="text"
//                             placeholder="Landmark"
//                             value={landmark}
//                             onChange={(e) => setLandmark(e.target.value)}
//                             className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"
//                         />
//                         <input
//                             type="text"
//                             placeholder="State" // ✅ added state input
//                             value={stateField}
//                             onChange={(e) => setStateField(e.target.value)}
//                             className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"
//                         />
//                         <input
//                             type="text"
//                             placeholder="Postal Code"
//                             value={postalCode}
//                             onChange={(e) => setPostalCode(e.target.value)}
//                             className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"
//                         />
//                     </div>
//                 </div>

//                 {/* Payment Options */}
//                 <div className="bg-white p-6 rounded-xl shadow">
//                     <h2 className="text-2xl font-bold mb-4 text-gray-800">
//                         Payment Method
//                     </h2>
//                     <div className="space-y-3">
//                         <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
//                             <input
//                                 type="radio"
//                                 name="payment"
//                                 value="cod"
//                                 checked={paymentMethod === "cod"}
//                                 onChange={(e) => setPaymentMethod(e.target.value)}
//                             />
//                             <span className="font-medium">Cash on Delivery</span>
//                         </label>
//                         <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
//                             <input
//                                 type="radio"
//                                 name="payment"
//                                 value="card"
//                                 checked={paymentMethod === "card"}
//                                 onChange={(e) => setPaymentMethod(e.target.value)}
//                             />
//                             <span className="font-medium">Credit / Debit Card</span>
//                         </label>
//                         <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
//                             <input
//                                 type="radio"
//                                 name="payment"
//                                 value="upi"
//                                 checked={paymentMethod === "upi"}
//                                 onChange={(e) => setPaymentMethod(e.target.value)}
//                             />
//                             <span className="font-medium">UPI (Google Pay / PhonePe / Paytm)</span>
//                         </label>
//                     </div>
//                 </div>
//             </div>

//             {/* Right: Order Summary */}
//             <div className="bg-gray-50 p-6 mt-12 rounded-xl shadow-xl h-fit">
//                 <h2 className="text-xl font-bold mb-4">Order Summary</h2>
//                 <div className="space-y-4">
//                     {(cart.items || []).map((item) => {
//                         const product = item.product || item.productId || {};
//                         const name = product.name || "Product";
//                         const price = Number(product.price) || 0;
//                         const qty = Number(item.quantity) || 1;
//                         const rawSrc = product.imageUrl || "";
//                         const src = rawSrc
//                             ? rawSrc.startsWith("http")
//                                 ? rawSrc
//                                 : `http://localhost:3000${rawSrc}`
//                             : "/placeholder.svg";
//                         return (
//                             <div key={item._id} className="flex gap-3 items-center">
//                                 <img
//                                     src={src}
//                                     alt={name}
//                                     className="w-16 h-16 rounded-md object-cover"
//                                     onError={(e) => {
//                                         if (e.currentTarget.src.endsWith("/placeholder.svg")) return;
//                                         e.currentTarget.src = "/placeholder.svg";
//                                     }}
//                                 />
//                                 <div className="flex-1">
//                                     <p className="font-semibold">{name}</p>
//                                     <p className="text-sm text-gray-500">Qty: {qty}</p>
//                                 </div>
//                                 <p className="font-medium">₹{price * qty}</p>
//                             </div>
//                         );
//                     })}
//                 </div>
//                 <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
//                     <span>Total</span>
//                     <span>₹{total}</span>
//                 </div>
//                 <button
//                     onClick={handlePlaceOrder}
//                     className="w-full mt-6 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
//                 >
//                     Place Order
//                 </button>
//             </div>
//         </div>
//     );
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
    const [stateField, setStateField] = useState(""); 
    const [postalCode, setPostalCode] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("cod"); 

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:3000/api/cart", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCart(res.data);
            } catch (err) {
                console.error("Cart fetch error:", err.response?.data || err.message);
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

    const handleCOD = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.post(
                "http://localhost:3000/api/orders",
                {
                    products: cart.items.map((item) => ({
                        productId: item.product?._id || item.productId,
                        quantity: item.quantity,
                    })),
                    shippingAddress: {
                        fullName: name,
                        phone: phone,
                        email: email || "N/A",   // ✅ added fallback email
                        address,
                        city: landmark || "N/A",
                        state: stateField,
                        postalCode,
                        country: "India",
                    },
                    paymentMethod: "COD",
                    totalPrice: total,   // ✅ backend usually expects this
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("Order placed successfully ✅ (Cash on Delivery)");
            console.log("Order response:", res.data);
        } catch (err) {
            console.error("COD Order Error:", err.response?.data || err.message);
            alert("Failed to place COD order ❌ (check console for details)");
        }
    };

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
                key: "YOUR_RAZORPAY_KEY_ID", 
                amount,
                currency,
                name: "My Store",
                description: "Order Payment",
                order_id,
                handler: async function (response) {
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
            console.error("Razorpay Error:", err.response?.data || err.message);
            alert("Payment initialization failed ❌");
        }
    };

    const handlePlaceOrder = () => {
        if (!name || !phone || !address || !stateField || !postalCode) {
            alert("Please fill all address fields");
            return;
        }

        if (paymentMethod === "cod") {
            handleCOD();
        } else {
            handleRazorpay();
        }

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

    if (!cart) return <div className="p-10">Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto px-4 mt-6 py-18 grid grid-cols-1 md:grid-cols-3 gap-10 bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500">
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
                            placeholder="State"
                            value={stateField}
                            onChange={(e) => setStateField(e.target.value)}
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
                    {(cart.items || []).map((item) => {
                        const product = item.product || item.productId || {};
                        const name = product.name || "Product";
                        const price = Number(product.price) || 0;
                        const qty = Number(item.quantity) || 1;
                        const rawSrc = product.imageUrl || "";
                        const src = rawSrc
                            ? rawSrc.startsWith("http")
                                ? rawSrc
                                : `http://localhost:3000${rawSrc}`
                            : "/placeholder.svg";
                        return (
                            <div key={item._id} className="flex gap-3 items-center">
                                <img
                                    src={src}
                                    alt={name}
                                    className="w-16 h-16 rounded-md object-cover"
                                    onError={(e) => {
                                        if (e.currentTarget.src.endsWith("/placeholder.svg")) return;
                                        e.currentTarget.src = "/placeholder.svg";
                                    }}
                                />
                                <div className="flex-1">
                                    <p className="font-semibold">{name}</p>
                                    <p className="text-sm text-gray-500">Qty: {qty}</p>
                                </div>
                                <p className="font-medium">₹{price * qty}</p>
                            </div>
                        );
                    })}
                </div>
                <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{total}</span>
                </div>
                <button
                    onClick={handlePlaceOrder}
                    className="w-full mt-6 px-6 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition"
                >
                    Place Order
                </button>
            </div>
        </div>
    );
}
