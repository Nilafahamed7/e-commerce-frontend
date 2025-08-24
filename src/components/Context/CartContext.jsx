import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

const CartContext = createContext(null);
const API = "https://e-commerce-backend-production-fde7.up.railway.app/api";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const getToken = () => localStorage.getItem("token");
  const buildAuth = () => {
    const token = getToken();
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  };

  const fetchCart = async () => {
    const token = getToken();
    if (!token) {
      setCartItems([]);
      setCartCount(0);
      return;
    }
    try {
      const res = await axios.get(`${API}/cart`, buildAuth());
      const items = res.data?.items || []; // ✅ handles empty cart
      setCartItems(items);
      setCartCount(items.length);
    } catch (e) {
      console.error("fetchCart failed:", e);
    }
  };

  const addToCart = async ({
    productId,
    quantity = 1,
    size,
    color,
    customText = "",
    customImage = "",
  }) => {
    const token = getToken();
    if (!token) throw new Error("Please login first");
    await axios.post(
      `${API}/cart/add`,
      { productId, quantity, size, color, customText, customImage },
      buildAuth()
    );
    fetchCart(); // sync after add
  };

  const updateQuantity = async (cartItemId, quantity) => {
    const token = getToken();
    if (!token) return;
    await axios.patch(`${API}/cart/${cartItemId}`, { quantity }, buildAuth()); // ✅ fixed URL
    fetchCart(); // refresh after update
  };

  const removeFromCart = async (cartItemId) => {
    const token = getToken();
    if (!token) return;
    await axios.delete(`${API}/cart/${cartItemId}`, buildAuth()); // ✅ fixed URL
    fetchCart(); // refresh after delete
  };

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    cartItems,
    cartCount,
    setCartCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
