import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User, ShoppingBag, HelpCircle, FileText, Truck } from "lucide-react";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef();

  // Close menu if clicked outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* User Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300"
      >
        <User className="w-6 h-6 text-gray-700" />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-60 bg-white border rounded-lg shadow-lg z-50">
          <ul className="py-2 text-sm text-gray-700">
            <li
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <User size={18} /> My Account
            </li>
            <li
              onClick={() => navigate("/orders")}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <ShoppingBag size={18} /> Orders
            </li>
            <li
              onClick={() => navigate("/track-order")}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <Truck size={18} /> Track Order
            </li>
            <li
              onClick={() => navigate("/help")}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <HelpCircle size={18} /> Help & Support
            </li>
            <li
              onClick={() => navigate("/refund-policy")}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <FileText size={18} /> Refund Policy
            </li>
            <hr className="my-2" />
            <li
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
            >
              <LogOut size={18} /> Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
