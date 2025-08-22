import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../components/Context/WishlistContext";
import { useCart } from "../components/Context/CartContext"; // import cart context

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // filters
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  // sidebar toggle
  const [showFilters, setShowFilters] = useState(false);

  const { addToCart } = useCart(); // ✅ use context
  const { toggle, isWished } = useWishlist();

  // fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("http://localhost:3000/api/products");
      setProducts(res.data);
      setFiltered(res.data);
    };
    fetchProducts();
  }, []);

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

  return (
    <div className="w-full h-full mx-auto px-4 py-20 bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Products</h1>

      {/* Search */}
      <div className="mb-6 flex items-center gap-3">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md"
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 rounded-md bg-indigo-600 text-white"
        >
          {showFilters ? "Hide Filters" : "Filters"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* FILTER SIDEBAR */}
        {showFilters && (
          <div className="w-full md:w-52 p-3 rounded-lg bg-gradient-to-br from-fuchsia-300 via-orange-200 to-yellow-200 shadow text-sm space-y-4 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowFilters(false)}
              className="absolute top-2 right-2 text-gray-700 hover:text-red-600 font-bold text-lg"
            >
              ✕
            </button>

            <h2 className="font-semibold text-gray-800">Filters</h2>

            {/* Type */}
            <div>
              <label className="block mb-1 font-medium">Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-2 py-1 rounded-md border text-sm"
              >
                <option value="">All</option>
                {["T-Shirt", "Hoodie", "Cap", "Shirt", "Pants", "Sweater", "Jacket"].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Color */}
            <div>
              <label className="block mb-1 font-medium">Color</label>
              <select
                value={colorFilter}
                onChange={(e) => setColorFilter(e.target.value)}
                className="w-full px-2 py-1 rounded-md border text-sm"
              >
                <option value="">All</option>
                {["Black", "White", "Red", "Blue"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Size */}
            <div>
              <label className="block mb-1 font-medium">Size</label>
              <select
                value={sizeFilter}
                onChange={(e) => setSizeFilter(e.target.value)}
                className="w-full px-2 py-1 rounded-md border text-sm"
              >
                <option value="">All</option>
                {["S", "M", "L", "XL"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block mb-1 font-medium">Price</label>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full px-2 py-1 rounded-md border text-sm"
              >
                <option value="">Default</option>
                <option value="low">Low to High</option>
                <option value="high">High to Low</option>
              </select>
            </div>

            {/* Clear Filters */}
            {(typeFilter || colorFilter || sizeFilter || priceFilter) && (
              <button
                onClick={clearFilters}
                className="mt-2 w-full px-2 py-1 rounded-md bg-red-500 text-white"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* PRODUCT GRID */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <div
              key={p._id}
              className="bg-gradient-to-r from-fuchsia-500 via-orange-400 to-yellow-400 rounded-xl p-1 shadow-lg transform transition duration-200 hover:scale-[1.04] hover:shadow-2xl"
            >
              <div className="bg-amber-50 rounded-lg p-4 h-full flex flex-col">
                <div className="relative">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full h-40 object-cover rounded-md"
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
                <h3 className="mt-2 font-semibold text-gray-800">{p.name}</h3>
                <p className="text-sm text-gray-500">
                  {p.description.slice(0, 40)}...
                </p>
                <p className="mt-1 font-bold text-gray-700">₹{p.price}</p>

                <div className="mt-auto flex gap-2">
                  <Link
                    to={`/products/${p._id}`}
                    className="flex-1 text-center px-3 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition">
                    View Details
                  </Link>

                  {/* ✅ Add to Cart
                  <button
                    onClick={() => addToCart(p._id)}
                    className="px-3 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
                  >
                    Add
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
