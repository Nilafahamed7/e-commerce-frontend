import { createContext, useContext, useEffect, useMemo, useState } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem("wishlist");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(items));
  }, [items]);

  const isWished = (productId) => items.some((p) => p._id === productId);

  const add = (product) => {
    setItems((prev) => (prev.some((p) => p._id === product._id) ? prev : [...prev, product]));
  };

  const remove = (productId) => {
    setItems((prev) => prev.filter((p) => p._id !== productId));
  };

  const toggle = (product) => {
    setItems((prev) =>
      prev.some((p) => p._id === product._id)
        ? prev.filter((p) => p._id !== product._id)
        : [...prev, product]
    );
  };

  const value = useMemo(() => ({ items, count: items.length, add, remove, toggle, isWished }), [items]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export const useWishlist = () => useContext(WishlistContext);


