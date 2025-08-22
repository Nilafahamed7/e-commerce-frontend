import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      // ✅ Save token
      localStorage.setItem("token", res.data.token);

      // ✅ Save user info
      // if (res.data?.user) {
      //   // localStorage.setItem("userName", res.data.user.name);
      //   // localStorage.setItem("isAdmin", res.data.user.isAdmin); // 🔑 store admin flag
      // }

      if (res.data?.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user)); // save whole object
      }


      navigate("/");
    } catch {
      setError("Invalid credentials");
    }
  };


  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500 h-screen">
      <div className="max-w-sm w-full bg-amber-50 p-6 rounded-lg shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-2">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
