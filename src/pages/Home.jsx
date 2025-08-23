import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import Footer from "../components/Footer";
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
        const res = await axios.get("https://e-commerce-backend-af5d.onrender.com/api/products");
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
{/* 
      FOOTER
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
      </footer> */}
      <Footer></Footer>
    </div> 
  );
}
