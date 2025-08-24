import { useState } from "react";
import axios from "axios";

export default function UploadImage({ onUpload, endpoint = "https://e-commerce-backend-production-fde7.up.railway.app/api/products/upload-image" }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));

    console.log("📂 Selected file:", selected);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    console.log("📤 Uploading file:", file);

    try {
      const token = localStorage.getItem("token");
      const headers = { "Content-Type": "multipart/form-data" };
      if (token) headers["Authorization"] = `Bearer ${token}`;
      const res = await axios.post(endpoint, formData, { headers });

      console.log("✅ Upload response:", res.data);

      if (res.data?.url) {
        onUpload(res.data.url); // send URL back to parent
        alert("✅ Image uploaded successfully!");
      } else {
        console.warn("⚠️ Upload succeeded but no URL returned:", res.data);
        alert("❌ Upload failed: No URL in response");
      }
    } catch (err) {
      console.error("❌ Upload error:", err);
      alert("❌ Upload error (check console for details)");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <input type="file" onChange={handleFileChange} />
      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-32 h-32 rounded-md object-cover"
        />
      )}
      {file && (
        <button
          type="button"
          onClick={handleUpload}
          className="px-3 py-2 rounded-md bg-indigo-600 text-white w-fit"
        >
          Upload
        </button>
      )}
    </div>
  );
}
