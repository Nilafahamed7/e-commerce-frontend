import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UploadImage from "../components/UploadImage";
import { useCart } from "../components/Context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [customText, setCustomText] = useState("");
  const [customImage, setCustomImage] = useState("");
  const { addToCart } = useCart(); // ✅ use context method

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://e-commerce-backend-af5d.onrender.com/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
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
      await addToCart({
        productId: product._id,
        quantity,
        size,
        color,
        customText,
        customImage,
      });
      toast.success("Added to cart!");
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to add to cart";
      toast.error(msg);
    }
  };

  if (!product) return <div className="p-10">Loading...</div>;

  return (
    <div className="w-full h-full bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500 mx-auto px-4 py-20">
      <Link
        to="/products"
        className="mb-4 inline-block text-gray-600 hover:text-red-600 text-lg"
      >
        ✕ Close
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full rounded-lg object-cover"
        />

        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="font-semibold mt-4 text-lg">₹{product.price}</p>

          {/* Size */}
          <label className="block mt-6 font-medium">Size</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full px-3 py-2 rounded border"
          >
            <option value="">Select Size</option>
            {product.sizeOptions?.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Color */}
          <label className="block mt-4 font-medium">Color</label>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full px-3 py-2 rounded border"
          >
            <option value="">Select Color</option>
            {product.colorOptions?.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Quantity */}
          <label className="block mt-4 font-medium">Quantity</label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              -
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              +
            </button>
          </div>

          {/* Custom Text */}
          <label className="block mt-4 font-medium">
            Custom Text (optional)
          </label>
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="w-full px-3 py-2 rounded border"
            placeholder="Enter custom text"
          />

          {/* Custom Image Upload */}
          <div className="mt-5">
            <p className="font-medium mb-1">Upload Design (optional)</p>
            <UploadImage onUpload={(url) => setCustomImage(url)} />
            {customImage && (
              <img
                src={customImage}
                alt="custom"
                className="mt-2 h-24 rounded-md object-cover"
              />
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-6 w-full bg-orange-600 text-white py-3 rounded hover:bg-indigo-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
