import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHeart, FaSearch, FaFilter, FaTimes, FaShoppingCart, FaEye, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { useWishlist } from "../components/Context/WishlistContext";
import { useCart } from "../components/Context/CartContext";

export default function Products() {
    const API_URL = import.meta.env.VITE_BACKEND_URL
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // filters
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  // sidebar toggle
  const [showFilters, setShowFilters] = useState(false);

  const { addToCart } = useCart();
  const { toggle, isWished } = useWishlist();

  // fetch products
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`${API_URL}/api/products`);
        console.log("Products data:", res.data); // Debug: see what data we get
        
        // Check if res.data is an array
        if (Array.isArray(res.data)) {
          console.log("✅ Products loaded:", res.data.length, "items");
          console.log("📷 First product image URL:", res.data[0]?.imageUrl);
          setProducts(res.data);
          setFiltered(res.data);
        } else {
          console.error("Unexpected API response format:", res.data);
          setError("Invalid data format received from server");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Helper function to get image URL - EXACTLY like ProductDetails
  const getImageUrl = (url) => {
    if (!url) return "/placeholder.svg"; // fallback image
    
    // Ensure it's a valid URL
    if (!url.startsWith('http')) {
      return "/placeholder.svg";
    }
    
    // For Cloudinary URLs, try to get the best format
    if (url.includes('cloudinary.com')) {
      // Try to get JPEG format for maximum browser compatibility
      if (url.includes('.avif')) {
        const jpegUrl = url.replace('.avif', '.jpg');
        console.log("🔄 Converting AVIF to JPEG:", url, "→", jpegUrl);
        return jpegUrl;
      }
      // If it's already JPEG or other format, use as-is
      console.log("📷 Using Cloudinary URL:", url);
      return url;
    }
    
    console.log("📷 Using original image URL:", url);
    return url;
  };

  // filter logic
  useEffect(() => {
    let result = products;

    if (search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (typeFilter) {
      result = result.filter((p) => p.category === typeFilter);
    }

    if (colorFilter) {
      result = result.filter((p) => p.colorOptions?.includes(colorFilter));
    }

    if (sizeFilter) {
      result = result.filter((p) => p.sizeOptions?.includes(sizeFilter));
    }

    if (priceFilter) {
      if (priceFilter === "low") {
        result = [...result].sort((a, b) => a.price - b.price);
      }
      if (priceFilter === "high") {
        result = [...result].sort((a, b) => b.price - a.price);
      }
    }

    setFiltered(result);
  }, [search, typeFilter, colorFilter, sizeFilter, priceFilter, products]);

  // clear all filters
  const clearFilters = () => {
    setSearch("");
    setTypeFilter("");
    setColorFilter("");
    setSizeFilter("");
    setPriceFilter("");
  };

  // Quick add to cart
  const handleQuickAdd = async (product) => {
    try {
      await addToCart({
        productId: product._id,
        quantity: 1,
        size: product.sizeOptions?.[0] || "M",
        color: product.colorOptions?.[0] || "Black",
      });
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  // Loading skeleton
  const ProductSkeleton = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-3 bg-gray-300 rounded mb-2 w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500 pt-24">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-gray-800">Loading Products...</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500 pt-24">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Our Products</h1>
          <p className="text-gray-600">Discover our amazing collection of custom clothing</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-lg hover:from-orange-600 hover:to-amber-700 transition"
            >
              <FaFilter />
              {showFilters ? "Hide Filters" : "Filters"}
            </button>

            {/* Clear Filters */}
            {(typeFilter || colorFilter || sizeFilter || priceFilter) && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                <FaTimes />
                Clear
              </button>
            )}
          </div>

          {/* Active Filters */}
          {(typeFilter || colorFilter || sizeFilter || priceFilter) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {typeFilter && (
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                  Type: {typeFilter}
                </span>
              )}
              {colorFilter && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Color: {colorFilter}
                </span>
              )}
              {sizeFilter && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  Size: {sizeFilter}
                </span>
              )}
              {priceFilter && (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                  Price: {priceFilter === "low" ? "Low to High" : "High to Low"}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* FILTER SIDEBAR */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-64 bg-white rounded-xl shadow-lg p-6 h-fit"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-500 hover:text-red-600"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Type */}
              <div className="mb-6">
                <label className="block mb-2 font-medium text-gray-700">Category</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {["T-Shirt", "Hoodie", "Cap", "Shirt", "Pants", "Sweater", "Jacket"].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Color */}
              <div className="mb-6">
                <label className="block mb-2 font-medium text-gray-700">Color</label>
                <select
                  value={colorFilter}
                  onChange={(e) => setColorFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">All Colors</option>
                  {["Black", "White", "Red", "Blue", "Green", "Yellow", "Pink", "Purple"].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Size */}
              <div className="mb-6">
                <label className="block mb-2 font-medium text-gray-700">Size</label>
                <select
                  value={sizeFilter}
                  onChange={(e) => setSizeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">All Sizes</option>
                  {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div className="mb-6">
                <label className="block mb-2 font-medium text-gray-700">Price</label>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Default</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
              </div>
            </motion.div>
          )}

          {/* PRODUCT GRID */}
          <div className="flex-1">
            {error ? (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Try Again
                </button>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                  >
                    {/* Product Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={getImageUrl(product.imageUrl)}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        onLoad={() => console.log("✅ Product image loaded:", getImageUrl(product.imageUrl))}
                        onError={(e) => {
                          console.error("❌ Product image failed to load:", getImageUrl(product.imageUrl));
                          e.target.onerror = null;
                          e.target.src = "/placeholder.svg";
                        }}
                      />
                      
                      {/* Wishlist Button */}
                      <button
                        type="button"
                        className={`absolute top-3 right-3 p-2 rounded-full shadow-lg transition-all ${
                          isWished(product._id) 
                            ? "bg-pink-600 text-white" 
                            : "bg-white text-pink-600 hover:bg-pink-50"
                        }`}
                        onClick={() => toggle(product)}
                        aria-label="Toggle wishlist"
                      >
                        <FaHeart />
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {product.description}
                      </p>
                      
                      {/* Rating */}
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar key={star} className="w-3 h-3" />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">(4.5)</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-lg font-bold text-orange-600">₹{product.price}</p>
                        <Link
                          to={`/products/${product._id}`}
                          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-lg hover:from-orange-600 hover:to-amber-700 transition text-sm font-medium"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Results Count */}
            <div className="mt-8 text-center text-gray-600">
              Showing {filtered.length} of {products.length} products
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
