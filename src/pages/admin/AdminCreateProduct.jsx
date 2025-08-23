import { useState, useEffect } from "react";
import UploadImage from "../../components/UploadImage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminCreateProduct() {
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    sizes: "",
    colors: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ check admin access
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) {
      alert("❌ Access denied. Only admins can create products.");
      navigate("/"); // redirect to home
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("❌ You must be logged in as admin.");
      return;
    }
    if (!imageUrl) {
      alert("Please upload an image first");
      return;
    }

    setLoading(true);
    try {
      // ✅ format data
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        sizeOptions: formData.sizes.split(",").map((s) => s.trim()),
        colorOptions: formData.colors.split(",").map((c) => c.trim()),
        imageUrl,
      };

      await axios.post("https://e-commerce-backend-af5d.onrender.com/api/products", productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ Product created successfully!");
      // reset
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        sizes: "",
        colors: "",
      });
      setImageUrl("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 mt-28 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Create Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category (e.g., Hoodie, T-Shirt)"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="sizes"
          placeholder="Sizes (comma separated: S, M, L, XL)"
          value={formData.sizes}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="colors"
          placeholder="Colors (comma separated: Black, White)"
          value={formData.colors}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* Image Upload */}
        <UploadImage onUpload={(url) => setImageUrl(url)} />
        {imageUrl && (
          <div className="mt-2">
            <img
              src={imageUrl}
              alt="Uploaded"
              className="h-32 object-cover rounded-md"
            />
            <p className="text-sm mt-1 break-all text-gray-500">{imageUrl}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}
