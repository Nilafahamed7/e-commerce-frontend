import { useEffect, useState } from "react";
import axios from "axios";

export default function Account() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const run = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://e-commerce-backend-production-fde7.up.railway.app/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch{}
    };
    run();
  }, []);

  return (
    <div className="bg-gradient-to-br from-amber-100 via-orange-100 h-screen to-yellow-500 mx-auto px-4 py-24">
      <h1 className="text-2xl font-bold mb-4">Account Details</h1>
      {user ? (
        <div className="bg-amber-50 rounded-lg shadow-2xl p-4">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}


