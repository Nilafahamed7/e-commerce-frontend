import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import axios from "axios";
import { FaInstagram, FaFacebook, FaWhatsapp, FaLock, FaTruck, FaUndo, FaCheckCircle } from "react-icons/fa";
import hero from "../assets/hero.jpg";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [trending, setTrending] = useState([]);

  // Random products for featured & trending
  useEffect(() => {
    const fetchRandom = async () => {
      const res = await axios.get("http://localhost:3000/api/products");
      const shuffled = res.data.sort(() => 0.5 - Math.random());

      setFeatured(shuffled.slice(0, 3)); // first 3
      setTrending(shuffled.slice(3, 7)); // next 4 (if available)
    };
    fetchRandom();
  }, []);

  const featureRef = useRef(null);
  const reviewRef = useRef(null);
  const featureInView = useInView(featureRef, { once: true });
  const reviewInView = useInView(reviewRef, { once: true });

  return (
    <div>
      {/* HERO */}
      <div className="w-full min-h-[85vh] bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Design Your Own Style
            </h1>
            <p className="mb-6 text-lg leading-relaxed max-w-md">
              Stand out from the crowd. Build clothing that reflects your true
              personality — from hoodies and tees to jackets and accessories.
              Choose colors, add text, upload your designs, and make it truly
              yours.
            </p>
            <Link
              to="/products"
              className="w-fit px-6 py-3 bg-white text-gray-800 rounded-md font-medium hover:bg-white/90 transition"
            >
              Shop Now
            </Link>
          </motion.div>

          <motion.img
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            src={hero}
            alt="hero"
            className="rounded-xl object-cover shadow-lg hidden md:block"/>
        </div>
      </div>

      {/* OFFER BANNER */}
      <div className="w-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white text-center py-10">
        <h2 className="text-3xl font-bold">🎉 Mega Sale! Flat 30% OFF</h2>
        <p className="mt-2 text-lg">On all custom hoodies & tees - Limited time only!</p>
        <Link
          to="/products"
          className="inline-block mt-4 px-6 py-2 bg-white text-gray-800 font-medium rounded-md hover:bg-gray-100 transition">
          Shop the Sale →
        </Link>
      </div>

      {/* FEATURED PRODUCTS */}
      <div ref={featureRef} className="max-w-6xl mx-auto px-4 py-14">
        <h2
          className={`text-2xl font-bold mb-6 transition-opacity duration-700 ${featureInView ? "opacity-100" : "opacity-0"
            }`}>
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featured.map((p, idx) => (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 40 }}
              animate={featureInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-gradient-to-r from-fuchsia-500 via-orange-400 to-yellow-400 rounded-xl p-1 shadow-md hover:shadow-xl transform hover:scale-[1.04] transition">
              <div className="bg-white rounded-lg p-4 h-full flex flex-col">
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="h-40 w-full object-cover rounded-md"
                />
                <span className="font-semibold mt-2 text-gray-800">
                  {p.name}
                </span>
                <p className="text-gray-500 text-sm">
                  {p.description?.slice(0, 60)}...
                </p>
                <span className="font-bold mt-1">₹{p.price}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link
            to="/products"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
            View All Products
          </Link>
        </div>
      </div>

      {/* SHOP BY CATEGORIES */}
      <div className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Shop by Categories</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              name: "Hoodies",
              img: "https://images.unsplash.com/photo-1732257119998-b66cda63dcfc?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              desc: "Soft, comfy, and stylish hoodies for everyday wear.",
            },
            {
              name: "T-Shirts",
              img: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=500&q=60",
              desc: "Breathable cotton tees for casual and custom prints.",
            },
            {
              name: "Jackets",
              img: "https://images.unsplash.com/photo-1542060748-10c28b62716f?w=500&q=60",
              desc: "Trendy jackets to keep you warm and fashionable.",
            },
            {
              name: "Shirts",
              img: "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              desc: "Premium shirts for formal occasions and casual wear.",
            },
          ].map((cat, idx) => (
            <Link
              key={idx}
              to={`/products?category=${cat.name}`}
              className="group relative rounded-xl overflow-hidden shadow hover:shadow-lg transition">
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-44 object-cover group-hover:scale-105 transition" />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-3">
                <p className="text-white font-semibold text-lg">{cat.name}</p>
                <p className="text-white text-sm mt-1 opacity-80 hidden md:block">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>


      {/* TRENDING PRODUCTS */}
      <div className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">🔥 Trending Now</h2>
        {trending.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {trending.map((p, idx) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                {/* Wrap product card in Link */}
                <Link to={`/products/${p._id}`}>
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-3">
                    <p className="font-semibold">{p.name}</p>
                    <span className="text-gray-500 text-sm">₹{p.price}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No trending products yet.</p>
        )}
      </div>


      {/* CUSTOMER REVIEWS */}
      <div ref={reviewRef} className="w-full bg-gray-100 py-14">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2
            className={`text-2xl font-bold mb-10 transition-opacity duration-700 ${reviewInView ? "opacity-100" : "opacity-0"
              }`}
          >
            ⭐ Customer Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{
              name: "Aarav Sharma",
              review: "Amazing quality and super comfortable! Will definitely order again.",
            }, {
              name: "Priya Verma",
              review: "Loved the customization options. My hoodie turned out perfect!",
            }, {
              name: "Rohan Patel",
              review: "Fast delivery and excellent customer service. Highly recommended!",
            }].map((r, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                animate={reviewInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-md text-gray-700"
              >
                <p className="italic mb-4">“{r.review}”</p>
                <span className="font-semibold">- {r.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      

      {/* NEWSLETTER */}
      <div className="w-full bg-indigo-600 text-white py-14">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold mb-4">📩 Join Our Newsletter</h2>
          <p className="mb-6">Be the first to know about new arrivals, sales & exclusive offers.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 border py-2 rounded-md text-white w-full sm:w-2/3"
            />
            <button className="px-6 py-2 bg-white text-indigo-600 font-medium rounded-md hover:bg-gray-100">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-4 gap-8 text-center">
        {[{ title: "Premium Quality", desc: "Every fabric and print is made to last, so you look good wash after wash.", icon: "🧵", },
        { title: "Fully Customisable", desc: "Add your own designs, quotes or images to make it uniquely yours.", icon: "🎨", }, { title: "Fast Delivery", desc: "We deliver your custom orders quickly across India.", icon: "⚡", },
        { title: "Eco-Friendly", desc: "We use sustainable fabrics and eco-friendly printing techniques.", icon: "🌱", },].map((f, idx) => (<div key={idx} className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition" >
          <div className="text-4xl mb-3">{f.icon}</div> <h3 className="font-semibold text-lg text-gray-800">{f.title}</h3> <p className="text-gray-600 mt-2 text-sm">{f.desc}</p> </div>))}
      </div>


      {/* TRUST BADGES */}
      <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {[
          { icon: <FaLock />, title: "Secure Payments", desc: "100% safe & encrypted checkout" },
          { icon: <FaTruck />, title: "Fast Shipping", desc: "Quick delivery across India" },
          { icon: <FaUndo />, title: "Easy Returns", desc: "Hassle-free 7-day return policy" },
        ].map((b, idx) => (

          <div key={idx} className="p-6 bg-white shadow-xl rounded-xl hover:shadow-2xl">
            <div className="text-3xl mb-3 flex justify-center text-indigo-600">{b.icon}</div>
            <h3 className="font-semibold text-lg text-gray-800">{b.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{b.desc}</p>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <footer className="w-full bg-gray-900 text-gray-300 py-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="font-semibold text-lg mb-2 text-white">DesignMyFit</p>
            <p className="text-sm text-gray-400">
              Express yourself through custom fashion. Designed by you, made for you.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-2 text-white">Quick Links</p>
            <ul className="text-sm space-y-1">
              <li><Link to="/products" className="hover:underline">Products</Link></li>
              <li><Link to="/cart" className="hover:underline">Cart</Link></li>
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2 text-white">Contact</p>
            <p className="text-sm text-gray-400">support@designmyfit.com</p>
            <p className="text-sm text-gray-400">+91 98765 43210</p>
            <div className="flex gap-4 mt-3 text-xl">
              <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} DesignMyFit. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
