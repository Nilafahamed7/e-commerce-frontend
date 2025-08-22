import { Link } from "react-router-dom";
import { useWishlist } from "../components/Context/WishlistContext";

export default function Wishlist() {
  const { items, remove } = useWishlist();

  if (!items.length) {
    return (
      <div className="max-w-6xl bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500 h-screen mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-2">Your wishlist is empty</h1>
        <Link to="/products" className="text-orange-600">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-24 bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500 h-screen">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((p) => (
          <div key={p._id} className="bg-amber-50 rounded-lg shadow p-4">
            <Link to={`/products/${p._id}`}>
              <img src={p.imageUrl} alt={p.name} className="h-40 w-full object-cover rounded" />
            </Link>
            <div className="mt-2 flex items-center justify-between">
              <div>
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-gray-600">₹{p.price}</p>
              </div>
              <button
                className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                onClick={() => remove(p._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


