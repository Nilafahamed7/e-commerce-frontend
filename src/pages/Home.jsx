// import { useEffect, useState, useRef } from "react";
// import { Link } from "react-router-dom";
// import { FaHeart } from "react-icons/fa";
// import { useWishlist } from "../components/Context/WishlistContext";
// import { motion, useInView } from "framer-motion";
// import axios from "axios";
// import { FaInstagram, FaFacebook, FaWhatsapp, FaLock, FaTruck, FaUndo, FaCheckCircle } from "react-icons/fa";
// import hero from "../assets/hero.jpg";

// export default function Home() {
//   const [featured, setFeatured] = useState([]);
//   const [trending, setTrending] = useState([]);
//   const { toggle, isWished } = useWishlist();

//   // Random products for featured & trending
//   useEffect(() => {
//     const fetchRandom = async () => {
//       const res = await axios.get("http://localhost:3000/api/products");
//       const shuffled = res.data.sort(() => 0.5 - Math.random());

//       setFeatured(shuffled.slice(0, 3)); // first 3
//       setTrending(shuffled.slice(3, 7)); // next 4 (if available)
//     };
//     fetchRandom();
//   }, []);

//   const featureRef = useRef(null);
//   const reviewRef = useRef(null);
//   const featureInView = useInView(featureRef, { once: true });
//   const reviewInView = useInView(reviewRef, { once: true });

//   return (
//     <div>
//       {/* HERO */}
//       <div className="w-full min-h-[85vh] bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 flex items-center justify-center">
//         <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-6">
//           <motion.div
//             initial={{ opacity: 0, x: -40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             className="flex flex-col justify-center text-white"
//           >
//             <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
//               Design Your Own Style
//             </h1>
//             <p className="mb-6 text-lg leading-relaxed max-w-md">
//               Stand out from the crowd. Build clothing that reflects your true
//               personality — from hoodies and tees to jackets and accessories.
//               Choose colors, add text, upload your designs, and make it truly
//               yours.
//             </p>
//             <Link
//               to="/products"
//               className="w-fit px-6 py-3 bg-white text-gray-800 rounded-md font-medium hover:bg-white/90 transition"
//             >
//               Shop Now
//             </Link>
//           </motion.div>

//           <motion.img
//             initial={{ opacity: 0, x: 40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             src={hero}
//             alt="hero"
//             className="rounded-xl object-cover shadow-lg hidden md:block"/>
//         </div>
//       </div>

//       {/* OFFER BANNER */}
//       <div className="w-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white text-center py-10">
//         <h2 className="text-3xl font-bold">🎉 Mega Sale! Flat 30% OFF</h2>
//         <p className="mt-2 text-lg">On all custom hoodies & tees - Limited time only!</p>
//         <Link
//           to="/products"
//           className="inline-block mt-4 px-6 py-2 bg-white text-gray-800 font-medium rounded-md hover:bg-gray-100 transition">
//           Shop the Sale →
//         </Link>
//       </div>

//       {/* FEATURED PRODUCTS */}
//       <div ref={featureRef} className="max-w-6xl mx-auto px-4 py-14">
//         <h2
//           className={`text-2xl font-bold mb-6 transition-opacity duration-700 ${featureInView ? "opacity-100" : "opacity-0"
//             }`}>
//           Featured Products
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {featured.map((p, idx) => (
//             <motion.div
//               key={p._id}
//               initial={{ opacity: 0, y: 40 }}
//               animate={featureInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.6, delay: idx * 0.15 }}
//               className="bg-gradient-to-r from-fuchsia-500 via-orange-400 to-yellow-400 rounded-xl p-1 shadow-md hover:shadow-xl transform hover:scale-[1.04] transition">
//               <div className="bg-white rounded-lg p-4 h-full flex flex-col">
//                 <img
//                   src={p.imageUrl}
//                   alt={p.name}
//                   className="h-40 w-full object-cover rounded-md"
//                 />
//                 <span className="font-semibold mt-2 text-gray-800">
//                   {p.name}
//                 </span>
//                 <p className="text-gray-500 text-sm">
//                   {p.description?.slice(0, 60)}...
//                 </p>
//                 <span className="font-bold mt-1">₹{p.price}</span>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* View All Button */}
//         <div className="text-center mt-8">
//           <Link
//             to="/products"
//             className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
//             View All Products
//           </Link>
//         </div>
//       </div>


//       {/* SHOP BY CATEGORIES */}
//       <div className="max-w-6xl mx-auto px-4 py-14">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800">Shop by Categories</h2>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {[
//             {
//               name: "Hoodies",
//               img: "https://images.unsplash.com/photo-1732257119998-b66cda63dcfc?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//               desc: "Soft, comfy, and stylish hoodies for everyday wear.",
//             },
//             {
//               name: "T-Shirts",
//               img: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=500&q=60",
//               desc: "Breathable cotton tees for casual and custom prints.",
//             },
//             {
//               name: "Jackets",
//               img: "https://images.unsplash.com/photo-1542060748-10c28b62716f?w=500&q=60",
//               desc: "Trendy jackets to keep you warm and fashionable.",
//             },
//             {
//               name: "Shirts",
//               img: "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//               desc: "Premium shirts for formal occasions and casual wear.",
//             },
//           ].map((cat, idx) => (
//             <Link
//               key={idx}
//               to={`/products?category=${cat.name}`}
//               className="group relative rounded-xl overflow-hidden shadow hover:shadow-lg transition">
//               <img
//                 src={cat.img}
//                 alt={cat.name}
//                 className="w-full h-44 object-cover group-hover:scale-105 transition" />
//               <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-3">
//                 <p className="text-white font-semibold text-lg">{cat.name}</p>
//                 <p className="text-white text-sm mt-1 opacity-80 hidden md:block">{cat.desc}</p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>


//       {/* TRENDING PRODUCTS */}
//       <div className="max-w-6xl mx-auto px-4 py-14">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800">🔥 Trending Now</h2>
//         {trending.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//             {trending.map((p, idx) => (
//               <motion.div
//                 key={p._id}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: idx * 0.1 }}
//                 className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
//               >
//                 {/* Wrap product card in Link */}
//                 <div className="relative">
//                   <Link to={`/products/${p._id}`}>
//                     <img
//                       src={p.imageUrl}
//                       alt={p.name}
//                       className="h-40 w-full object-cover"
//                     />
//                   </Link>
//                   <button
//                     type="button"
//                     className={`absolute top-2 right-2 p-2 rounded-full ${isWished(p._id) ? "bg-pink-600 text-white" : "bg-white text-pink-600"}`}
//                     onClick={() => toggle(p)}
//                     aria-label="Toggle wishlist"
//                   >
//                     <FaHeart />
//                   </button>
//                 </div>
//                   <div className="p-3">
//                     <p className="font-semibold">{p.name}</p>
//                     <span className="text-gray-500 text-sm">₹{p.price}</span>
//                   </div>
//               </motion.div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No trending products yet.</p>
//         )}
//       </div>


//       {/* CUSTOMER REVIEWS */}
//       <div ref={reviewRef} className="w-full bg-gray-100 py-14">
//         <div className="max-w-6xl mx-auto px-4 text-center">
//           <h2
//             className={`text-2xl font-bold mb-10 transition-opacity duration-700 ${reviewInView ? "opacity-100" : "opacity-0"
//               }`}
//           >
//             ⭐ Customer Reviews
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[{
//               name: "Aarav Sharma",
//               review: "Amazing quality and super comfortable! Will definitely order again.",
//             }, {
//               name: "Priya Verma",
//               review: "Loved the customization options. My hoodie turned out perfect!",
//             }, {
//               name: "Rohan Patel",
//               review: "Fast delivery and excellent customer service. Highly recommended!",
//             }].map((r, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={reviewInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.6, delay: idx * 0.2 }}
//                 className="bg-white p-6 rounded-xl shadow-md text-gray-700"
//               >
//                 <p className="italic mb-4">“{r.review}”</p>
//                 <span className="font-semibold">- {r.name}</span>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>

// import { useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Slider from "react-slick"; // ✅ review carousel
// import { FaLock, FaTruck, FaUndo, FaCheckCircle, FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
// import hero from "../assets/hero.jpg";
// import promo from "../assets/promo-video.mp4"

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// export default function Home() {
//   const [products, setProducts] = useState([]);
//   const reviewRef = useRef(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/api/products");
//         setProducts(res.data.slice(0, 4));
//       } catch (err) {
//         console.error("❌ Error fetching products:", err);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // ✅ Review Carousel Settings
//   const reviewSettings = {
//     dots: true,
//     infinite: true,
//     autoplay: true,
//     autoplaySpeed: 4000,
//     speed: 600,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     responsive: [
//       { breakpoint: 1024, settings: { slidesToShow: 2 } },
//       { breakpoint: 640, settings: { slidesToShow: 1 } },
//     ],
//   };

//   return (
//     <div className="bg-gradient-to-br from-slate-100 via-gray-50 to-blue-50">
//       {/* HERO */}
//       <section className="relative w-full h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 via-slate-800 to-gray-900 text-white">
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//           className="text-center px-6"
//         >
//           <h1 className="text-6xl font-extrabold drop-shadow-lg">
//             Elevate Your Style
//           </h1>
//           <p className="mt-4 text-lg text-gray-200">
//             Premium clothing for every occasion
//           </p>
//           <Link
//             to="/products"
//             className="inline-block mt-8 px-8 py-4 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 transform transition"
//           >
//             Shop Now
//           </Link>
//         </motion.div>
//       </section>

//       {/* OFFER BANNER */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         viewport={{ once: true }}
//         className="relative w-full bg-gradient-to-r from-indigo-900 via-blue-800 to-slate-900 text-white text-center py-20 overflow-hidden"
//       >
//         {/* Glow effect background */}
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.15),transparent_70%)]"></div>

//         <h2 className="text-5xl font-extrabold tracking-wide drop-shadow-lg animate-pulse">
//           ⚡ Mega Sale - 30% OFF
//         </h2>
//         <p className="mt-3 text-lg text-gray-200">
//           Upgrade your wardrobe with premium styles today
//         </p>

//         <Link
//           to="/products"
//           className="inline-block mt-6 px-10 py-4 bg-white/90 backdrop-blur-md text-blue-900 font-semibold rounded-full shadow-xl hover:scale-110 hover:bg-white transition transform"
//         >
//           Grab the Deal →
//         </Link>
//       </motion.div>

//       {/* PROMO VIDEO */}
//       <div className="max-w-6xl mx-auto px-6 py-20 text-center">
//         <h2 className="text-4xl font-extrabold text-slate-800 mb-8">
//           🎬 Fashion Promo
//         </h2>
//         <p className="text-slate-600 mb-10">
//           Step into the world of style — watch our latest fashion film.
//         </p>
//         <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
//           <video
//             src={promo}
//             autoPlay
//             muted
//             loop
//             playsInline
//             className="w-full h-64 md:h-[400px] rounded-xl object-cover"
//           ></video>

//         </div>
//       </div>

//       {/* FEATURED PRODUCTS */}
//       <section className="max-w-6xl mx-auto px-6 py-20">
//         <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
//           Featured Products
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//           {products.map((product) => (
//             <motion.div
//               key={product._id}
//               whileHover={{ scale: 1.05 }}
//               className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
//             >
//               <img
//                 src={product.imageUrl}
//                 alt={product.name}
//                 className="h-56 w-full object-cover rounded-md"
//               />
//               <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
//               <p className="text-gray-600">${product.price}</p>
//               <Link
//                 to={`/products/${product._id}`}
//                 className="inline-block mt-3 text-blue-600 hover:underline"
//               >
//                 View Details
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* BRAND STORY */}
//       <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white py-24">
//         <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -40 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.7 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-4xl font-extrabold mb-6">Our Story</h2>
//             <p className="text-gray-200 leading-relaxed">
//               We craft clothing that merges timeless design with modern comfort.
//               Each piece is made with precision and passion to ensure you look
//               and feel your best.
//             </p>
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, x: 40 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.7 }}
//             viewport={{ once: true }}
//             className="rounded-xl overflow-hidden shadow-xl"
//           >
//             <video
//               className="w-full h-full object-cover"
//               autoPlay
//               muted
//               loop
//               playsInline
//             >
//               <source src="/videos/fashion-promo.mp4" type="video/mp4" />
//             </video>
//           </motion.div>
//         </div>
//       </section>

//       {/* REVIEWS - CAROUSEL */}
//       <section
//         ref={reviewRef}
//         className="max-w-6xl mx-auto px-6 py-20 text-center"
//       >
//         <h2 className="text-4xl font-bold text-gray-800 mb-12">
//           Customer Reviews
//         </h2>
//         <Slider {...reviewSettings}>
//           {[
//             "Amazing quality and super comfy. Totally worth it!",
//             "Stylish and affordable. I get compliments every time.",
//             "Fast delivery and perfect fit. Highly recommend!",
//             "The fabric feels luxurious and durable. Love it!",
//             "Customer support was excellent, very helpful!",
//             "Truly the best shopping experience I’ve had.",
//           ].map((review, i) => (
//             <div key={i} className="px-4">
//               <div className="bg-white p-6 rounded-lg shadow h-full flex flex-col justify-between">
//                 <p className="text-gray-600 italic">“{review}”</p>
//                 <h4 className="mt-4 font-semibold">— Customer {i + 1}</h4>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </section>



//       {/* NEWSLETTER */}
//       <div className="w-full bg-indigo-600 text-white py-14">
//         <div className="max-w-3xl mx-auto text-center px-4">
//           <h2 className="text-2xl font-bold mb-4">📩 Join Our Newsletter</h2>
//           <p className="mb-6">Be the first to know about new arrivals, sales & exclusive offers.</p>
//           <div className="flex flex-col sm:flex-row gap-3 justify-center">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="px-4 border py-2 rounded-md text-white w-full sm:w-2/3"
//             />
//             <button className="px-6 py-2 bg-white text-indigo-600 font-medium rounded-md hover:bg-gray-100">
//               Subscribe
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* WHY CHOOSE US */}
//       <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-4 gap-8 text-center">
//         {[{ title: "Premium Quality", desc: "Every fabric and print is made to last, so you look good wash after wash.", icon: "🧵", },
//         { title: "Fully Customisable", desc: "Add your own designs, quotes or images to make it uniquely yours.", icon: "🎨", }, { title: "Fast Delivery", desc: "We deliver your custom orders quickly across India.", icon: "⚡", },
//         { title: "Eco-Friendly", desc: "We use sustainable fabrics and eco-friendly printing techniques.", icon: "🌱", },].map((f, idx) => (<div key={idx} className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition" >
//           <div className="text-4xl mb-3">{f.icon}</div> <h3 className="font-semibold text-lg text-gray-800">{f.title}</h3> <p className="text-gray-600 mt-2 text-sm">{f.desc}</p> </div>))}
//       </div>


//       {/* TRUST BADGES */}
//       <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
//         {[
//           { icon: <FaLock />, title: "Secure Payments", desc: "100% safe & encrypted checkout" },
//           { icon: <FaTruck />, title: "Fast Shipping", desc: "Quick delivery across India" },
//           { icon: <FaUndo />, title: "Easy Returns", desc: "Hassle-free 7-day return policy" },
//         ].map((b, idx) => (

//           <div key={idx} className="p-6 bg-white shadow-xl rounded-xl hover:shadow-2xl">
//             <div className="text-3xl mb-3 flex justify-center text-indigo-600">{b.icon}</div>
//             <h3 className="font-semibold text-lg text-gray-800">{b.title}</h3>
//             <p className="text-gray-600 text-sm mt-1">{b.desc}</p>
//           </div>
//         ))}
//       </div>

//       {/* FOOTER */}
//       <footer className="w-full bg-gray-900 text-gray-300 py-8">
//         <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div>
//             <p className="font-semibold text-lg mb-2 text-white">DesignMyFit</p>
//             <p className="text-sm text-gray-400">
//               Express yourself through custom fashion. Designed by you, made for you.
//             </p>
//           </div>
//           <div>
//             <p className="font-semibold mb-2 text-white">Quick Links</p>
//             <ul className="text-sm space-y-1">
//               <li><Link to="/products" className="hover:underline">Products</Link></li>
//               <li><Link to="/cart" className="hover:underline">Cart</Link></li>
//               <li><Link to="/about" className="hover:underline">About Us</Link></li>
//             </ul>
//           </div>
//           <div>
//             <p className="font-semibold mb-2 text-white">Contact</p>
//             <p className="text-sm text-gray-400">support@designmyfit.com</p>
//             <p className="text-sm text-gray-400">+91 98765 43210</p>
//             <div className="flex gap-4 mt-3 text-xl">
//               <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
//               <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
//               <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
//             </div>
//           </div>
//         </div>
//         <div className="mt-6 text-center text-xs text-gray-500">
//           © {new Date().getFullYear()} DesignMyFit. All Rights Reserved.
//         </div>
//       </footer>
//     </div>
//   );
// }





import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import {
  FaLock,
  FaTruck,
  FaUndo,
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
} from "react-icons/fa";

import promo from "../assets/promo-video.mp4";
import hero from "../assets/hero.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [trending, setTrending] = useState([]);
  const reviewRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/products");
        setProducts(res.data.slice(0, 4));
        setTrending(res.data.slice(4, 8)); // mock trending products
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Review Carousel Settings
  const reviewSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500">
      {/* HERO */}
      <section className="relative mt-6 max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-left"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Elevate Your Style
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Premium clothing for every occasion — designed with comfort &
            luxury.
          </p>
          <Link
            to="/products"
            className="inline-block mt-8 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 transform transition"
          >
            Shop Now
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={hero}
            alt="Hero fashion"
            className="rounded-2xl shadow-2xl"
          />
        </motion.div>
      </section>

      {/* OFFER BANNER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="relative w-full bg-gradient-to-r from-orange-700 via-amber-600 to-yellow-600 text-white text-center py-16"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg animate-pulse">
          ⚡ Mega Sale - 30% OFF
        </h2>
        <p className="mt-3 text-lg text-amber-100">
          Upgrade your wardrobe with premium styles today
        </p>
        <Link
          to="/products"
          className="inline-block mt-6 px-10 py-4 bg-white/90 text-orange-700 font-semibold rounded-full shadow-xl hover:scale-110 hover:bg-white transition transform"
        >
          Grab the Deal →
        </Link>
      </motion.div>

      {/* PROMO VIDEO */}
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8">
          🎬 Fashion Promo
        </h2>
        <p className="text-gray-600 mb-10">
          Step into the world of style — watch our latest fashion film.
        </p>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
          <video
            src={promo}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-64 md:h-[400px] rounded-xl object-cover"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div
              key={product._id}
              whileHover={{ scale: 1.05 }}
              className="bg-amber-50 p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-56 w-full object-cover rounded-md"
              />
              <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-700 font-medium">₹{product.price}</p>
              <Link
                to={`/products/${product._id}`}
                className="inline-block mt-3 text-orange-600 hover:underline"
              >
                View Details
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TRENDING PRODUCTS */}
      <section className="max-w-6xl mx-auto px-6 py-20  rounded-2xl shadow-inner">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
          🔥 Trending Now
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {trending.map((product) => (
            <motion.div
              key={product._id}
              whileHover={{ scale: 1.05 }}
              className="bg-amber-50 p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-56 w-full object-cover rounded-md"
              />
              <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-700 font-medium">₹{product.price}</p>
              <Link
                to={`/products/${product._id}`}
                className="inline-block mt-3 text-orange-600 hover:underline"
              >
                View Details
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="bg-gradient-to-r from-orange-700 via-amber-600 to-yellow-600 text-white py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-extrabold mb-6">Our Story</h2>
            <p className="text-gray-200 leading-relaxed">
              We craft clothing that merges timeless design with modern comfort.
              Each piece is made with precision and passion to ensure you look
              and feel your best.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden shadow-xl"
          >
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={promo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      </section>

      {/* REVIEWS - CAROUSEL */}
      <section
        ref={reviewRef}
        className="max-w-6xl mx-auto px-6 py-20 text-center"
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-12">
          Customer Reviews
        </h2>
        <div className="overflow-hidden">
          <Slider {...reviewSettings}>
            {[
              "Amazing quality and super comfy. Totally worth it!",
              "Stylish and affordable. I get compliments every time.",
              "Fast delivery and perfect fit. Highly recommend!",
              "The fabric feels luxurious and durable. Love it!",
              "Customer support was excellent, very helpful!",
              "Truly the best shopping experience I’ve had.",
            ].map((review, i) => (
              <div key={i} className="px-4">
                <div className="bg-amber-50 p-6 rounded-lg shadow h-full flex flex-col justify-between">
                  <p className="text-gray-600 italic">“{review}”</p>
                  <h4 className="mt-4 font-semibold">— Customer {i + 1}</h4>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* NEWSLETTER */}
      <div className=" w-full bg-gradient-to-br from-orange-700 via-amber-600  text-amber-50 py-20">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold mb-4">📩 Join Our Newsletter</h2>
          <p className="mb-6">
            Be the first to know about new arrivals, sales & exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border rounded-md text-amber-50 w-full sm:w-2/3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button className="px-6 py-2 bg-amber-50 text-orange-600 font-medium rounded-md hover:bg-gray-100">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-4 gap-8 text-center">
        {[
          {
            title: "Premium Quality",
            desc: "Every fabric and print is made to last, so you look good wash after wash.",
            icon: "🧵",
          },
          {
            title: "Fully Customisable",
            desc: "Add your own designs, quotes or images to make it uniquely yours.",
            icon: "🎨",
          },
          {
            title: "Fast Delivery",
            desc: "We deliver your custom orders quickly across India.",
            icon: "⚡",
          },
          {
            title: "Eco-Friendly",
            desc: "We use sustainable fabrics and eco-friendly printing techniques.",
            icon: "🌱",
          },
        ].map((f, idx) => (
          <div
            key={idx}
            className="bg-amber-50 shadow-md rounded-xl p-6 hover:shadow-lg transition"
          >
            <div className="text-4xl mb-3">{f.icon}</div>
            <h3 className="font-semibold text-lg text-gray-800">{f.title}</h3>
            <p className="text-gray-600 mt-2 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* TRUST BADGES */}
      <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {[
          {
            icon: <FaLock />,
            title: "Secure Payments",
            desc: "100% safe & encrypted checkout",
          },
          {
            icon: <FaTruck />,
            title: "Fast Shipping",
            desc: "Quick delivery across India",
          },
          {
            icon: <FaUndo />,
            title: "Easy Returns",
            desc: "Hassle-free 7-day return policy",
          },
        ].map((b, idx) => (
          <div
            key={idx}
            className="p-6 bg-amber-50 shadow-xl rounded-xl hover:shadow-2xl"
          >
            <div className="text-3xl mb-3 flex justify-center text-orange-600">
              {b.icon}
            </div>
            <h3 className="font-semibold text-lg text-gray-800">{b.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{b.desc}</p>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <footer className="w-full bg-orange-700 text-gray-300 py-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-amber-50">
            <p className="font-semibold text-lg mb-2 ">DesignMyFit</p>
            <p className="text-sm ">
              Express yourself through custom fashion. Designed by you, made for
              you.
            </p>
          </div>
          <div className="text-amber-50">
            <p className="font-semibold mb-2">Quick Links</p>
            <ul className="text-sm space-y-1">
              <li>
                <Link to="/products" className="hover:underline">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:underline">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-amber-50">
            <p className="font-semibold mb-2 ">Contact</p>
            <p className="text-sm">www.designmyfit.com</p>
            <p className="text-sm ">+91 98765 43210</p>
            <div className="flex gap-4 mt-3 text-xl">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-amber-50">
          © {new Date().getFullYear()} DesignMyFit. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
