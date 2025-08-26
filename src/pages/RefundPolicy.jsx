import { motion } from "framer-motion";
import { Shield, Clock, Package, CreditCard, AlertCircle, CheckCircle, XCircle, Mail, Phone } from "lucide-react";

export default function RefundPolicy() {
  const policySections = [
    {
      icon: Clock,
      title: "Return Window",
      description: "Returns accepted within 7 days of delivery for unused items in original packaging.",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: Package,
      title: "Custom Items",
      description: "Custom printed items are eligible for returns only in case of defects or damage.",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      icon: CreditCard,
      title: "Refund Processing",
      description: "Refunds are processed to original payment method within 5-7 business days.",
      color: "text-green-600",
      bgColor: "bg-green-100"
    }
  ];

  const returnSteps = [
    {
      step: "1",
      title: "Initiate Return",
      description: "Contact our support team within 7 days of delivery",
      icon: Mail,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      step: "2",
      title: "Package Item",
      description: "Securely package the item in its original packaging",
      icon: Package,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      step: "3",
      title: "Ship Back",
      description: "Use the provided return label to ship the item back",
      icon: Shield,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      step: "4",
      title: "Receive Refund",
      description: "Get your refund within 5-7 business days",
      icon: CreditCard,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const nonReturnableItems = [
    "Custom printed items (unless defective)",
    "Items without original packaging",
    "Items showing signs of use or wear",
    "Items purchased more than 7 days ago",
    "Gift cards and digital products"
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Support",
      value: "returns@designmyfit.com",
      description: "For return requests and questions"
    },
    {
      icon: Phone,
      title: "Phone Support",
      value: "+91 98765 43210",
      description: "Call us for immediate assistance"
    }
  ];

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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Refund & Return Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We want you to be completely satisfied with your purchase. Learn about our return and refund process.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Policy Overview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Policy Highlights */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-orange-500" />
                Policy Overview
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {policySections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="text-center p-6 bg-gray-50 rounded-xl"
                  >
                    <div className={`w-12 h-12 ${section.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <section.icon className={`w-6 h-6 ${section.color}`} />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{section.title}</h3>
                    <p className="text-sm text-gray-600">{section.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Return Process */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Package className="w-6 h-6 text-orange-500" />
                Return Process
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {returnSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 relative`}>
                      <step.icon className={`w-8 h-8 ${step.color}`} />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Non-Returnable Items */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <XCircle className="w-6 h-6 text-red-500" />
                Non-Returnable Items
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {nonReturnableItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-red-50 rounded-xl"
                  >
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6" />
                Important Notes
              </h2>
              <div className="space-y-3">
                <p className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <span>All returns must be initiated within 7 days of delivery</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <span>Items must be unused and in original packaging</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <span>Return shipping costs are covered by DesignMyFit</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <span>Refunds are processed to the original payment method</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Mail className="w-6 h-6 text-orange-500" />
                Need Help?
              </h2>
              
              <div className="space-y-4 mb-6">
                {contactInfo.map((contact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors duration-200"
                  >
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <contact.icon className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{contact.title}</h3>
                      <p className="text-orange-600 font-medium">{contact.value}</p>
                      <p className="text-sm text-gray-500">{contact.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl text-white">
                <h3 className="font-semibold mb-2">Quick Return Request</h3>
                <p className="text-orange-100 text-sm mb-3">
                  Start your return process by contacting our support team.
                </p>
                <button className="w-full bg-white text-orange-600 py-2 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200">
                  Start Return
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


