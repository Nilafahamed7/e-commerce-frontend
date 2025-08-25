import { Link } from "react-router-dom";
import { useWishlist } from "../components/Context/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  ShoppingBag, 
  Trash2, 
  Eye, 
  Star, 
  ArrowRight,
  Package,
  Sparkles
} from "lucide-react";

export default function Wishlist() {
  const { items, remove } = useWishlist();

  return (
    <>
      {!items.length ? (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 pt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              {/* Empty State Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full flex items-center justify-center mx-auto mb-8"
              >
                <Heart className="w-12 h-12 text-white" fill="white" />
              </motion.div>

              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Your Wishlist is Empty
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Start building your dream wardrobe! Add products to your wishlist and keep track of your favorite items.
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                {[
                  {
                    icon: <Heart className="w-8 h-8" />,
                    title: "Save Favorites",
                    desc: "Heart products you love"
                  },
                  {
                    icon: <Eye className="w-8 h-8" />,
                    title: "Quick Access",
                    desc: "View your saved items anytime"
                  },
                  {
                    icon: <ShoppingBag className="w-8 h-8" />,
                    title: "Easy Shopping",
                    desc: "Add to cart with one click"
                  }
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-100"
                  >
                    <div className="text-orange-500 mb-3 flex justify-center">{feature.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link
                  to="/products"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Browse Products
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mr-4">
                  <Heart className="w-6 h-6 text-white" fill="white" />
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                  My Wishlist
                </h1>
              </div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                You have <span className="font-semibold text-orange-600">{items.length}</span> items in your wishlist
              </p>
            </motion.div>

            {/* Wishlist Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {items.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -30, scale: 0.9 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    {/* Product Image */}
                    <div className="relative overflow-hidden">
                      <Link to={`/products/${product._id}`}>
                        <img
                          src={product.imageUrl?.startsWith('http') ? product.imageUrl : "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/placeholder.svg";
                          }}
                        />
                      </Link>
                      
                      {/* Overlay Actions */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex space-x-3">
                          <Link
                            to={`/products/${product._id}`}
                            className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                          >
                            <Eye className="w-5 h-5 text-gray-700" />
                          </Link>
                          <button
                            onClick={() => remove(product._id)}
                            className="w-12 h-12 bg-red-500/90 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                          >
                            <Trash2 className="w-5 h-5 text-white" />
                          </button>
                        </div>
                      </div>

                      {/* Badge */}
                      <div className="absolute top-3 left-3">
                        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Wishlisted
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <Link to={`/products/${product._id}`}>
                        <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>
                      
                                           <div className="flex items-center justify-between mb-4">
                       <div className="flex items-center justify-center space-x-1">
                         {[...Array(5)].map((_, i) => (
                           <Star
                             key={i}
                             className={`w-4 h-4 ${
                               i < Math.floor(Math.random() * 3) + 3
                                 ? "text-yellow-400 fill-current"
                                 : "text-gray-300"
                             }`}
                           />
                         ))}
                         <span className="text-sm text-gray-500 ml-1">
                           ({Math.floor(Math.random() * 50) + 10})
                         </span>
                       </div>
                       <div className="text-2xl font-bold text-orange-600">
                         ₹{product.price}
                       </div>
                     </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        <Link
                          to={`/products/${product._id}`}
                          className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-200 text-center flex items-center justify-center"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Link>
                        <button
                          onClick={() => remove(product._id)}
                          className="px-4 py-3 border border-red-300 text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-12"
            >
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-orange-100">
                <Package className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Ready to Shop?
                </h3>
                <p className="text-gray-600 mb-6">
                  Discover more amazing products and add them to your wishlist
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-200"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Browse More Products
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
}


