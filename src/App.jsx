import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";
import AIChatWidget from "./components/AIChatWidget";
import AdminCreateProduct from "./pages/admin/AdminCreateProduct";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";
import Orders from "./pages/Orders";
import TrackOrder from "./pages/TrackOrder";
import Help from "./pages/Help";
import RefundPolicy from "./pages/RefundPolicy";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./pages/admin/AdminDashboard";
import OrderSuccess from "./pages/OrderSuccess";


function App() {
  return (
    <BrowserRouter>
      <nav>
        <Navbar />
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/admin/create-product" element={<AdminCreateProduct />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account" element={<Account />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/help" element={<Help />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/order-success" element={<OrderSuccess/>}></Route>
      </Routes>
      <AIChatWidget />
      <ToastContainer position="top-right" />
    </BrowserRouter>
  );
}

export default App;
