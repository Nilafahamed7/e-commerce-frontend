import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UploadImage from "../components/UploadImage";
import { useCart } from "../components/Context/CartContext";
import { motion } from "framer-motion";
import { FaArrowLeft, FaShoppingCart, FaHeart, FaStar, FaTruck, FaShieldAlt, FaUndo, FaCheck } from "react-icons/fa";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [customText, setCustomText] = useState("");
  const [customImage, setCustomImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const { addToCart } = useCart();

  const getImageUrl = (url) => {
    if (!url) return "/placeholder.svg";
    return url;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://e-commerce-backend-production-fde7.up.railway.app/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!size || !color) {
      return toast.error("Please select size and color");
    }
    const token = localStorage.getItem("token");
    if (!token) return toast.info("Please login first");

    try {
      setAddingToCart(true);
      await addToCart({
        productId: product._id,
        quantity,
        size,
        color,
        customText,
        customImage,
      });
      toast.success("Added to cart successfully! 🛒");
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || err?.message || "Failed to add to cart";
      toast.error(msg);
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500 pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Product not found</p>
          <Link to="/products" className="text-orange-600 hover:text-orange-700">← Back to Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors duration-200 font-medium"
          >
            <FaArrowLeft className="text-sm" />
            Back to Products
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <div className="bg-white w-[90%] rounded-2xl shadow-xl overflow-hidden">
              <img
                src={getImageUrl(product.imageUrl)}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 w-[90%]"
          >
            {/* Product Header */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="space-y-4">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{product.name}</h1>
                
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar key={star} className="w-4 h-4" />
                    ))}
                  </div>
                  <span className="text-gray-600">(4.5) • 128 reviews</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-orange-600">₹{product.price}</span>
                  <span className="text-lg text-gray-500 line-through">₹{Math.round(product.price * 1.2)}</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">20% OFF</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
              </div>
            </div>

            {/* Product Options */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="space-y-6">
                {/* Size Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Select Size</label>
                  <div className="flex flex-wrap gap-3">
                    {product.sizeOptions?.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`py-3 px-6 rounded-lg border-2 font-medium transition-all duration-200 min-w-[60px] text-center ${
                          size === s
                            ? "border-orange-500 bg-orange-50 text-orange-700"
                            : "border-gray-200 hover:border-orange-300 text-gray-700"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Select Color</label>
                  <div className="flex flex-wrap gap-3">
                    {product.colorOptions?.map((c) => (
                      <button
                        key={c}
                        onClick={() => setColor(c)}
                        className={`py-3 px-6 rounded-lg border-2 font-medium transition-all duration-200 min-w-[80px] text-center ${
                          color === c
                            ? "border-orange-500 bg-orange-50 text-orange-700"
                            : "border-gray-200 hover:border-orange-300 text-gray-700"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Quantity</label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:border-orange-300 flex items-center justify-center transition-colors duration-200"
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold text-gray-900 min-w-[3rem] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:border-orange-300 flex items-center justify-center transition-colors duration-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Custom Text */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Custom Text <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors duration-200"
                    placeholder="Enter custom text for your design"
                  />
                </div>

                {/* Custom Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Upload Design <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <UploadImage onUpload={(url) => setCustomImage(url)} />
                  {customImage && (
                    <div className="mt-3">
                      <img
                        src={customImage}
                        alt="Custom design"
                        className="h-24 rounded-lg object-cover border-2 border-gray-200"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={addingToCart || !size || !color}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-3 ${
                addingToCart || !size || !color
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-500 to-amber-600 text-white hover:from-orange-600 hover:to-amber-700 shadow-lg hover:shadow-xl"
              }`}
            >
              {addingToCart ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Adding to Cart...
                </>
              ) : (
                <>
                  <FaShoppingCart />
                  Add to Cart - ₹{product.price * quantity}
                </>
              )}
            </motion.button>

            {/* Features */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Choose This Product?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <FaTruck className="text-orange-500 text-xl" />
                  <div>
                    <p className="font-medium text-gray-900">Free Shipping</p>
                    <p className="text-sm text-gray-600">On orders above ₹999</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaShieldAlt className="text-orange-500 text-xl" />
                  <div>
                    <p className="font-medium text-gray-900">Quality Guarantee</p>
                    <p className="text-sm text-gray-600">Premium materials</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaUndo className="text-orange-500 text-xl" />
                  <div>
                    <p className="font-medium text-gray-900">Easy Returns</p>
                    <p className="text-sm text-gray-600">30-day return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
