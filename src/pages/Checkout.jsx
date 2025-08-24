// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Checkout() {
//     const [cart, setCart] = useState(null);
//     const [name, setName] = useState("");
//     const [phone, setPhone] = useState("");
//     const [address, setAddress] = useState("");
//     const [email, setEmail] = useState("");
//     const [landmark, setLandmark] = useState("");
//     const [stateField, setStateField] = useState("");
//     const [postalCode, setPostalCode] = useState("");
//     const [paymentMethod, setPaymentMethod] = useState("cod");

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchCart = async () => {
//             try {
//                 const token = localStorage.getItem("token");
//                 const res = await axios.get(
//                     "https://e-commerce-backend-production-fde7.up.railway.app/api/cart",
//                     { headers: { Authorization: `Bearer ${token}` } }
//                 );
//                 setCart(res.data);
//             } catch (err) {
//                 console.error("Cart fetch error:", err.response?.data || err.message);
//             }
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

//     // ✅ COD order placement
//     const handleCOD = async () => {
//         try {
//             const token = localStorage.getItem("token");

//             const res = await axios.post(
//                 "https://e-commerce-backend-production-fde7.up.railway.app/api/orders",
//                 {
//                     products: cart.items.map((item) => ({
//                         productId: item.product?._id || item.productId,
//                         title: item.product?.name || "Product",
//                         price: item.product?.price || 0,
//                         quantity: item.quantity,
//                     })),
//                     shippingAddress: {
//                         fullName: name,
//                         phone: phone,
//                         address,
//                         city: landmark || "N/A",
//                         state: stateField,
//                         postalCode,
//                         country: "India",
//                     },
//                     paymentMethod: "COD",
//                     totalAmount: total,
//                 },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             console.log("Order response:", res.data);
//             resetForm();
//             navigate("/order-success");
//         } catch (err) {
//             console.error("COD Order Error:", err.response?.data || err.message);
//             alert("Failed to place COD order ❌");
//         }
//     };

//     // ✅ Razorpay order placement
//     const handleRazorpay = async () => {
//         try {
//             const token = localStorage.getItem("token");

//             const res = await axios.post(
//                 "https://e-commerce-backend-production-fde7.up.railway.app/api/orders/razorpay",
//                 { amount: total },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             const { id: order_id, currency, amount } = res.data;

//             const options = {
//                 key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//                 amount,
//                 currency,
//                 name: "DesignMyFit",
//                 description: "Order Payment",
//                 order_id,
//                 handler: async function (response) {
//                     try {
//                         await axios.post(
//                             "https://e-commerce-backend-production-fde7.up.railway.app/api/orders/verify",
//                             {
//                                 razorpay_order_id: response.razorpay_order_id,
//                                 razorpay_payment_id: response.razorpay_payment_id,
//                                 razorpay_signature: response.razorpay_signature,
//                                 products: cart.items.map((item) => ({
//                                     productId: item.product?._id || item.productId,
//                                     title: item.product?.name || "Product",
//                                     price: item.product?.price || 0,
//                                     quantity: item.quantity,
//                                 })),
//                                 shippingAddress: {
//                                     fullName: name,
//                                     phone: phone,
//                                     address,
//                                     city: landmark || "N/A",
//                                     state: stateField,
//                                     postalCode,
//                                     country: "India",
//                                 },
//                                 paymentMethod: "Razorpay",
//                                 totalAmount: total,
//                             },
//                             { headers: { Authorization: `Bearer ${token}` } }
//                         );

//                         resetForm();
//                         navigate("/order-success");
//                     } catch (verifyErr) {
//                         console.error("Verification Error:", verifyErr.response?.data || verifyErr.message);
//                         alert("Payment verification failed ❌");
//                     }
//                 },
//                 prefill: {
//                     name,
//                     email,
//                     contact: phone,
//                 },
//                 theme: { color: "#6366f1" },
//             };

//             const rzp = new window.Razorpay(options);
//             rzp.open();
//         } catch (err) {
//             console.error("Razorpay Error:", err.response?.data || err.message);
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
//     };

//     const resetForm = () => {
//         setName("");
//         setPhone("");
//         setEmail("");
//         setAddress("");
//         setLandmark("");
//         setStateField("");
//         setPostalCode("");
//         setPaymentMethod("cod");
//         setCart(null);
//     };

//     if (!cart) return <div className="p-10">Loading...</div>;

//     return (
//         <div className="w-full h-full mx-auto px-4 mt-6 py-18 grid grid-cols-1 md:grid-cols-3 gap-10  bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500">
//             {/* Left: Address & Payment */}
//             <div className="md:col-span-2 max-w-3xl space-y-8">
//                 {/* Shipping Address */}
//                 <div className="bg-white p-6 rounded-xl shadow">
//                     <h2 className="text-2xl font-bold mb-4 text-gray-800">Shipping Details</h2>
//                     <div className="space-y-3">
//                         <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"/>
//                         <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"/>
//                         <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"/>
//                         <textarea placeholder="Full Address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200" rows={3}/>
//                         <input type="text" placeholder="Landmark" value={landmark} onChange={(e) => setLandmark(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"/>
//                         <input type="text" placeholder="State" value={stateField} onChange={(e) => setStateField(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"/>
//                         <input type="text" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"/>
//                     </div>
//                 </div>

//                 {/* Payment Options */}
//                 <div className="bg-white p-6 rounded-xl shadow">
//                     <h2 className="text-2xl font-bold mb-4 text-gray-800">Payment Method</h2>
//                     <div className="space-y-3">
//                         <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
//                             <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={(e) => setPaymentMethod(e.target.value)}/>
//                             <span className="font-medium">Cash on Delivery</span>
//                         </label>
//                         <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
//                             <input type="radio" name="payment" value="card" checked={paymentMethod === "card"} onChange={(e) => setPaymentMethod(e.target.value)}/>
//                             <span className="font-medium">Credit / Debit Card (Razorpay)</span>
//                         </label>
//                         <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
//                             <input type="radio" name="payment" value="upi" checked={paymentMethod === "upi"} onChange={(e) => setPaymentMethod(e.target.value)}/>
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
//                         // ✅ Use Cloudinary image if available
//                         const src = product.imageUrl?.startsWith("http")
//                             ? product.imageUrl
//                             : "/placeholder.svg";
//                         return (
//                             <div key={item._id} className="flex gap-3 items-center">
//                                 <img src={src} alt={name} className="w-16 h-16 rounded-md object-cover" 
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
//                 <button onClick={handlePlaceOrder} className="w-full mt-6 px-6 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition">
//                     Place Order
//                 </button>
//             </div>
//         </div>
//     );
// }

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  Smartphone,
  Truck,
  Landmark,
  MapPin,
  Mail,
  User,
  Phone,
  Home,
  Wallet,
} from "lucide-react";

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

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://e-commerce-backend-production-fde7.up.railway.app/api/cart",
          { headers: { Authorization: `Bearer ${token}` } }
        );
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

  // ✅ COD order placement
  const handleCOD = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://e-commerce-backend-production-fde7.up.railway.app/api/orders",
        {
          products: cart.items.map((item) => ({
            productId: item.product?._id || item.productId,
            title: item.product?.name || "Product",
            price: item.product?.price || 0,
            quantity: item.quantity,
          })),
          shippingAddress: {
            fullName: name,
            phone: phone,
            address,
            city: landmark || "N/A",
            state: stateField,
            postalCode,
            country: "India",
          },
          paymentMethod: "COD",
          totalAmount: total,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Order response:", res.data);
      resetForm();
      navigate("/order-success");
    } catch (err) {
      console.error("COD Order Error:", err.response?.data || err.message);
      alert("Failed to place COD order ❌");
    }
  };

  // ✅ Razorpay order placement
  const handleRazorpay = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://e-commerce-backend-production-fde7.up.railway.app/api/orders/razorpay",
        { amount: total },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { id: order_id, currency, amount } = res.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "DesignMyFit",
        description: "Order Payment",
        order_id,
        handler: async function (response) {
          try {
            await axios.post(
              "https://e-commerce-backend-production-fde7.up.railway.app/api/orders/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                products: cart.items.map((item) => ({
                  productId: item.product?._id || item.productId,
                  title: item.product?.name || "Product",
                  price: item.product?.price || 0,
                  quantity: item.quantity,
                })),
                shippingAddress: {
                  fullName: name,
                  phone: phone,
                  address,
                  city: landmark || "N/A",
                  state: stateField,
                  postalCode,
                  country: "India",
                },
                paymentMethod: "Razorpay",
                totalAmount: total,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            resetForm();
            navigate("/order-success");
          } catch (verifyErr) {
            console.error(
              "Verification Error:",
              verifyErr.response?.data || verifyErr.message
            );
            alert("Payment verification failed ❌");
          }
        },
        prefill: {
          name,
          email,
          contact: phone,
        },
        theme: { color: "#f97316" },
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
  };

  const resetForm = () => {
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
    <div className="w-full h-full mx-auto px-6 mt-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10 bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500">
      {/* Left: Address & Payment */}
      <div className="md:col-span-2 max-w-3xl space-y-8">
        {/* Shipping Address */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <Truck className="w-6 h-6 text-orange-600" /> Shipping Details
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 border rounded-lg px-4 py-2">
              <User className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-center gap-3 border rounded-lg px-4 py-2">
              <Mail className="w-5 h-5 text-gray-500" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-center gap-3 border rounded-lg px-4 py-2">
              <Phone className="w-5 h-5 text-gray-500" />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-start gap-3 border rounded-lg px-4 py-2">
              <Home className="w-5 h-5 text-gray-500 mt-1" />
              <textarea
                placeholder="Full Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full outline-none resize-none"
                rows={3}
              />
            </div>
            <div className="flex items-center gap-3 border rounded-lg px-4 py-2">
              <Landmark className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Landmark"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-center gap-3 border rounded-lg px-4 py-2">
              <MapPin className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="State"
                value={stateField}
                onChange={(e) => setStateField(e.target.value)}
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-center gap-3 border rounded-lg px-4 py-2">
              <Wallet className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Postal Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full outline-none"
              />
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-orange-600" /> Payment Method
          </h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <Wallet className="w-5 h-5 text-green-600" />
              <span className="font-medium">Cash on Delivery</span>
            </label>
            <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <CreditCard className="w-5 h-5 text-blue-600" />
              <span className="font-medium">Credit / Debit Card (Razorpay)</span>
            </label>
            <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <Smartphone className="w-5 h-5 text-purple-600" />
              <span className="font-medium">UPI (Google Pay / PhonePe / Paytm)</span>
            </label>
          </div>
        </div>
      </div>

      {/* Right: Order Summary */}
      <div className="bg-white p-6 mt-12 rounded-2xl shadow-xl h-fit sticky top-6">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
          {(cart.items || []).map((item) => {
            const product = item.product || item.productId || {};
            const name = product.name || "Product";
            const price = Number(product.price) || 0;
            const qty = Number(item.quantity) || 1;
            const src = product.imageUrl?.startsWith("http")
              ? product.imageUrl
              : "/placeholder.svg";
            return (
              <div key={item._id} className="flex gap-3 items-center border-b pb-3">
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
          className="w-full mt-6 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
