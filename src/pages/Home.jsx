import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../components/Context/WishlistContext";
import { motion, useInView } from "framer-motion";
import axios from "axios";
import { FaInstagram, FaFacebook, FaWhatsapp, FaLock, FaTruck, FaUndo, FaCheckCircle, FaPalette, FaRuler, FaStar, FaUsers, FaTshirt, FaPlay } from "react-icons/fa";
import hero from "../assets/hero.jpg";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toggle, isWished } = useWishlist();

  // Helper function to get image URL with fallback
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return "/placeholder.svg";
    
    // Convert .avif to .webp for better browser compatibility
    if (imageUrl.includes('.avif')) {
      return imageUrl.replace('.avif', '.webp');
    }
    
    return imageUrl.startsWith('http') ? imageUrl : "/placeholder.svg";
  };

  // Fetch products for featured & trending
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await axios.get("https://e-commerce-backend-production-fde7.up.railway.app/api/products");
        
        if (res.data && res.data.length > 0) {
          const shuffled = res.data.sort(() => 0.5 - Math.random());
          const featuredProducts = shuffled.slice(0, 3);
          const trendingProducts = shuffled.slice(3, 7);
          
          setFeatured(featuredProducts);
          setTrending(trendingProducts);
        } else {
          setError("No products available");
        }
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const featureRef = useRef(null);
  const reviewRef = useRef(null);
  const processRef = useRef(null);
  const featureInView = useInView(featureRef, { once: true });
  const reviewInView = useInView(reviewRef, { once: true });
  const processInView = useInView(processRef, { once: true });

  // Loading component
  const ProductSkeleton = () => (
    <div className="bg-amber-50 p-4 rounded-lg shadow animate-pulse">
      <div className="bg-gray-300 h-48 rounded-md mb-3"></div>
      <div className="bg-gray-300 h-4 rounded mb-2"></div>
      <div className="bg-gray-300 h-4 rounded w-2/3"></div>
    </div>
  );

  // Error component
  const ErrorMessage = ({ message }) => (
    <div className="text-center py-8">
      <p className="text-gray-600 mb-4">{message}</p>
      <button 
        onClick={() => window.location.reload()} 
        className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500">
      {/* HERO */}
      <section className="relative mt-6 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-left"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Elevate Your  Style
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-700">
            Stand out from the crowd. Build clothing that reflects your true
            personality — from hoodies and tees to jackets and accessories.
            Choose colors, add text, upload your designs, and make it truly
            yours.
          </p>
          <Link
            to="/products"
            className="inline-block mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 transform transition"
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
            className="rounded-2xl shadow-2xl w-full h-auto object-cover"
          />
        </motion.div>
      </section>

      {/* OFFER BANNER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="relative w-full bg-gradient-to-r from-orange-700 via-amber-600 to-yellow-600 text-white text-center py-12 sm:py-16 px-4"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-lg animate-pulse">
          🎉 Mega Sale - 30% OFF
        </h2>
        <p className="mt-3 text-base sm:text-lg text-amber-100">
          On all custom hoodies & tees - Limited time only!
        </p>
        <Link
          to="/products"
          className="inline-block mt-6 px-8 sm:px-10 py-3 sm:py-4 bg-white/90 text-orange-700 font-semibold rounded-full shadow-xl hover:scale-110 hover:bg-white transition transform"
        >
          Grab the Deal →
        </Link>
      </motion.div>

      {/* PROMO VIDEO SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            🎬 See How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Watch our quick demo to see how easy it is to create your own custom clothing
          </p>
        </div>
        
                 <div className="relative max-w-4xl mx-auto">
           <div className="aspect-video bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl shadow-2xl overflow-hidden">
             {/* Actual Promo Video */}
             <video 
               className="w-full h-full object-cover rounded-2xl"
               autoPlay
               muted
               loop
               playsInline
               controls
             >
               <source src="https://res.cloudinary.com/dpakwdvuc/video/upload/v1756018330/promo-video_kza6fb.mp4" type="video/mp4" />
               Your browser does not support the video tag.
             </video>
             
             {/* Video Features */}
             <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4">
               <div className="flex items-center justify-between text-sm text-gray-600">
                 <span>🎨 Easy Design Upload</span>
                 <span>⚡ Quick Customization</span>
                 <span>🚚 Fast Delivery</span>
               </div>
             </div>
           </div>
         </div>
      </motion.section>

      {/* HOW IT WORKS */}
      <div ref={processRef} className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-10 sm:mb-12 transition-opacity duration-700 ${processInView ? "opacity-100" : "opacity-0"}`}>
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {[
            { icon: <FaTshirt className="text-4xl" />, title: "Choose Product", desc: "Select from hoodies, t-shirts, jackets and more" },
            { icon: <FaPalette className="text-4xl" />, title: "Customize Design", desc: "Add your text, upload images, or choose from templates" },
            { icon: <FaRuler className="text-4xl" />, title: "Select Size", desc: "Pick your perfect fit from S to XXL" },
            { icon: <FaTruck className="text-4xl" />, title: "Get Delivered", desc: "Your custom creation arrives at your doorstep" }
          ].map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={processInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="text-center bg-amber-50 p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 text-orange-600">
                {step.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <section ref={featureRef} className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-10 sm:mb-12">
          ⭐ Featured Products
        </h2>


        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <ErrorMessage message={error} />
        ) : featured.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {featured.map((p, idx) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={featureInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="bg-amber-50 p-4 rounded-lg shadow hover:shadow-lg transition group"
                >
                  <div className="relative">
                    <img
                      src={getImageUrl(p.imageUrl)}
                      alt={p.name}
                      className="h-48 sm:h-56 w-full object-cover rounded-md group-hover:scale-105 transition"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder.svg";
                      }}
                    />
                    <button
                      type="button"
                      className={`absolute top-2 right-2 p-2 rounded-full ${isWished(p._id) ? "bg-pink-600 text-white" : "bg-white text-pink-600"}`}
                      onClick={() => toggle(p)}
                      aria-label="Toggle wishlist"
                    >
                      <FaHeart />
                    </button>
                  </div>
                  <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-gray-800">
                    {p.name}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {p.description?.slice(0, 60)}...
                  </p>
                  <p className="text-gray-700 font-medium text-sm sm:text-base mt-2">
                    ₹{p.price}
                  </p>
                  <Link
                    to={`/products/${p._id}`}
                    className="inline-block mt-2 sm:mt-3 text-orange-600 hover:underline text-sm sm:text-base"
                  >
                    View Details
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-8">
              <Link
                to="/products"
                className="px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition">
                View All Products
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No featured products available.</p>
            <Link
              to="/products"
              className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition">
              Browse All Products
            </Link>
          </div>
        )}
      </section>

      {/* CUSTOMIZATION PROCESS */}
      <div className="w-full bg-amber-50 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-12 text-gray-900">Customization Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Design Upload",
                desc: "Upload your own artwork, logos, or photos. We support JPG, PNG, and SVG formats up to 10MB.",
                icon: "🎨"
              },
              {
                title: "Text Customization", 
                desc: "Add custom text with 50+ fonts. Choose colors, sizes, and positioning exactly as you want.",
                icon: "✏️"
              },
              {
                title: "Quality Printing",
                desc: "Premium DTG printing technology ensures vibrant colors and long-lasting designs that won't fade.",
                icon: "🖨️"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-3 text-gray-800">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SHOP BY CATEGORIES */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-10 sm:mb-12">Shop by Categories</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
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
                className="w-full h-44 sm:h-56 object-cover group-hover:scale-105 transition" />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-3">
                <p className="text-white font-semibold text-lg">{cat.name}</p>
                <p className="text-white text-sm mt-1 opacity-80 hidden md:block">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* SIZE GUIDE */}
      <div className="w-full bg-amber-50 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-10 text-gray-900">Size Guide</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-orange-600 to-amber-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Size</th>
                    <th className="px-4 py-3 text-left">Chest (inches)</th>
                    <th className="px-4 py-3 text-left">Length (inches)</th>
                    <th className="px-4 py-3 text-left">Shoulder (inches)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { size: "S", chest: "36-38", length: "26", shoulder: "16" },
                    { size: "M", chest: "38-40", length: "27", shoulder: "17" },
                    { size: "L", chest: "40-42", length: "28", shoulder: "18" },
                    { size: "XL", chest: "42-44", length: "29", shoulder: "19" },
                    { size: "XXL", chest: "44-46", length: "30", shoulder: "20" }
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-amber-50" : "bg-white"}>
                      <td className="px-4 py-3 font-semibold">{row.size}</td>
                      <td className="px-4 py-3">{row.chest}</td>
                      <td className="px-4 py-3">{row.length}</td>
                      <td className="px-4 py-3">{row.shoulder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* TRENDING PRODUCTS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-10 sm:mb-12">
          🔥 Trending Now
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <ErrorMessage message={error} />
        ) : trending.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {trending.map((p, idx) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-amber-50 p-4 rounded-lg shadow hover:shadow-lg transition overflow-hidden group"
              >
                {/* Wrap product card in Link */}
                <div className="relative">
                  <Link to={`/products/${p._id}`}>
                    <img
                      src={getImageUrl(p.imageUrl)}
                      alt={p.name}
                      className="h-48 sm:h-56 w-full object-cover rounded-md group-hover:scale-105 transition"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder.svg";
                      }}
                    />
                  </Link>
                  <button
                    type="button"
                    className={`absolute top-2 right-2 p-2 rounded-full ${isWished(p._id) ? "bg-pink-600 text-white" : "bg-white text-pink-600"}`}
                    onClick={() => toggle(p)}
                    aria-label="Toggle wishlist"
                  >
                    <FaHeart />
                  </button>
                </div>
                <div className="mt-3 sm:mt-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    {p.name}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {p.description?.slice(0, 40)}...
                  </p>
                  <p className="text-gray-700 font-medium text-sm sm:text-base mt-2">
                    ₹{p.price}
                  </p>
                  <Link
                    to={`/products/${p._id}`}
                    className="inline-block mt-2 sm:mt-3 text-orange-600 hover:underline text-sm sm:text-base"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No trending products available.</p>
            <Link
              to="/products"
              className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition">
              Browse All Products
            </Link>
          </div>
        )}
      </section>

      {/* CUSTOMER REVIEWS */}
      <section ref={reviewRef} className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
        <h2 className={`text-3xl sm:text-4xl font-bold text-gray-800 mb-10 sm:mb-12 transition-opacity duration-700 ${reviewInView ? "opacity-100" : "opacity-0"}`}>
          ⭐ Customer Reviews
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {[{
            name: "Aarav Sharma",
            review: "Amazing quality and super comfortable! Will definitely order again.",
            rating: 5,
            location: "Mumbai"
          }, {
            name: "Priya Verma",
            review: "Loved the customization options. My hoodie turned out perfect!",
            rating: 5,
            location: "Delhi"
          }, {
            name: "Rohan Patel",
            review: "Fast delivery and excellent customer service. Highly recommended!",
            rating: 5,
            location: "Bangalore"
          }].map((r, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={reviewInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="bg-amber-50 p-6 rounded-xl shadow-md text-gray-700"
            >
              <div className="flex justify-center mb-3">
                {[...Array(r.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">"{r.review}"</p>
              <p className="font-semibold text-gray-800">{r.name}</p>
              <p className="text-sm text-gray-500">{r.location}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <div ref={featureRef} className="w-full bg-amber-50 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-12 text-gray-900 transition-opacity duration-700 ${featureInView ? "opacity-100" : "opacity-0"}`}>
            Why Choose DesignMyFit?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <FaTruck className="text-3xl" />,
                title: "Fast Delivery",
                desc: "Get your custom clothing delivered within 3-5 business days"
              },
              {
                icon: <FaUndo className="text-3xl" />,
                title: "Easy Returns",
                desc: "30-day return policy for your peace of mind"
              },
              {
                icon: <FaCheckCircle className="text-3xl" />,
                title: "Quality Guarantee",
                desc: "Premium materials and printing technology"
              },
              {
                icon: <FaLock className="text-3xl" />,
                title: "Secure Payment",
                desc: "Multiple payment options with secure transactions"
              },
              {
                icon: <FaUsers className="text-3xl" />,
                title: "24/7 Support",
                desc: "Our customer service team is always here to help"
              },
              {
                icon: <FaStar className="text-3xl" />,
                title: "Premium Quality",
                desc: "Only the best materials and printing techniques"
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={featureInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition"
              >
                <div className="text-orange-600 mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* SOCIAL MEDIA */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Follow Us</h2>
        <p className="text-gray-600 mb-8">Stay updated with our latest designs and offers</p>
        <div className="flex justify-center gap-6">
          <a href="#" className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition">
            <FaInstagram className="text-xl" />
          </a>
          <a href="#" className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition">
            <FaFacebook className="text-xl" />
          </a>
          <a href="#" className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition">
            <FaWhatsapp className="text-xl" />
          </a>
        </div>
      </div>
      
      {/* FOOTER */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">D</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                  DesignMyFit
                </span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Your one-stop destination for custom clothing and personalized fashion. 
                Create, design, and wear your unique style with confidence.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-orange-400">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/products" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                    Shopping Cart
                  </Link>
                </li>
                <li>
                  <Link to="/wishlist" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link to="/orders" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link to="/account" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                    Account Details
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Support */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-orange-400">Customer Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/help" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/track-order" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                    Track Order
                  </Link>
                </li>
                <li>
                  <Link to="/refund-policy" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <a href="mailto:support@designmyfit.com" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                    Contact Support
                  </a>
                </li>
                <li>
                  <a href="tel:+91-9876543210" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                    +91 98765 43210
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-orange-400">Stay Updated</h3>
              <p className="text-gray-300 text-sm">
                Subscribe to our newsletter for the latest updates, exclusive offers, and fashion tips.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-colors"
                />
                <button className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © 2024 DesignMyFit. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
