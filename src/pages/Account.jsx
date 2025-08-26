import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Shield, Calendar, MapPin, Phone, Edit, Crown, Settings, CreditCard, Heart, Package } from "lucide-react";
import axios from "axios";

export default function Account() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please login to view your account");
          setLoading(false);
          return;
        }

        const res = await axios.get("https://e-commerce-backend-production-fde7.up.railway.app/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        setError("Failed to load account information");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const accountStats = [
    {
      icon: Package,
      title: "Total Orders",
      value: "12",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: Heart,
      title: "Wishlist Items",
      value: "8",
      color: "text-pink-600",
      bgColor: "bg-pink-100"
    },
    {
      icon: CreditCard,
      title: "Saved Cards",
      value: "2",
      color: "text-green-600",
      bgColor: "bg-green-100"
    }
  ];

  const quickActions = [
    {
      icon: Package,
      title: "View Orders",
      description: "Check your order history",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100"
    },
    {
      icon: Heart,
      title: "My Wishlist",
      description: "View saved items",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      hoverColor: "hover:bg-pink-100"
    },
    {
      icon: Settings,
      title: "Account Settings",
      description: "Update your preferences",
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      hoverColor: "hover:bg-gray-100"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 pt-24 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your account information...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 pt-24 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Required</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200">
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 pt-24 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            My Account
          </h1>
          <p className="text-lg text-gray-600">
            Manage your profile, orders, and preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-6 text-white text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold mb-2">{user?.name || "User"}</h2>
                <div className="flex items-center justify-center gap-2">
                  {user?.isAdmin && (
                    <Crown className="w-5 h-5 text-yellow-300" />
                  )}
                  <span className="text-orange-100">
                    {user?.isAdmin ? "Administrator" : "Customer"}
                  </span>
                </div>
              </div>

              {/* Profile Details */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-800">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium text-gray-800">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 bg-orange-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-orange-700 transition-colors duration-200">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Account Stats */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-orange-500" />
                Account Overview
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {accountStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="p-4 bg-gray-50 rounded-xl text-center"
                  >
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h4>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-orange-500" />
                Quick Actions
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    className={`p-4 ${action.bgColor} rounded-xl text-left ${action.hoverColor} transition-colors duration-200`}
                  >
                    <div className={`w-10 h-10 ${action.bgColor} rounded-full flex items-center justify-center mb-3`}>
                      <action.icon className={`w-5 h-5 ${action.color}`} />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1">{action.title}</h4>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Package className="w-5 h-5 text-orange-500" />
                Recent Activity
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">Order #12345 delivered</p>
                    <p className="text-sm text-gray-500">2 days ago</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">Added item to wishlist</p>
                    <p className="text-sm text-gray-500">1 week ago</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">Profile updated</p>
                    <p className="text-sm text-gray-500">2 weeks ago</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


