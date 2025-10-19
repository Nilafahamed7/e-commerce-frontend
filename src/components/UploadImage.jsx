import { useState } from "react";
import axios from "axios";

export default function UploadImage({
  onUpload,
  endpoint = "https://e-commerce-backend-ikj9.onrender.com/api/products/upload-image",
}) {
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    // ✅ allow only images
    if (!selected.type.startsWith("image/")) {
      alert("❌ Please select an image file");
      return;
    }

    setPreview(URL.createObjectURL(selected));
    await handleUpload(selected); // ⬅️ auto upload
  };

  const handleUpload = async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);

    try {
      const token = localStorage.getItem("token");
      const headers = { "Content-Type": "multipart/form-data" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      console.log("📤 Uploading file:", file);

      const res = await axios.post(endpoint, formData, { headers });

      console.log("✅ Upload response:", res.data);

      if (res.data?.url) {
        onUpload(res.data.url); // send Cloudinary URL back to parent
      } else {
        alert("❌ Upload failed: No URL returned");
      }
    } catch (err) {
      console.error("❌ Upload error:", err);
      alert("❌ Upload error (check console for details)");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-32 h-32 rounded-md object-cover"
        />
      )}

      {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
    </div>
  );
}
