import { motion } from "framer-motion";
import { HelpCircle, Mail, Phone, MessageCircle, Clock, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import AIHelpSection from "../components/AIHelpSection";

export default function Help() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do I place an order?",
      answer: "Browse our products, add items to your cart, and proceed to checkout. You can pay using various payment methods including credit cards, debit cards, and cash on delivery."
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, UPI payments, and cash on delivery. All online payments are secured with SSL encryption."
    },
    {
      id: 3,
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days. Express shipping (1-2 days) is available for select locations. Custom printed items may take 5-7 business days."
    },
    {
      id: 4,
      question: "Can I cancel my order?",
      answer: "Orders can be cancelled within 2 hours of placement. After that, please contact our support team for assistance. Custom printed items cannot be cancelled once production begins."
    },
    {
      id: 5,
      question: "What is your return policy?",
      answer: "We accept returns within 7 days of delivery for unused items in original packaging. Custom printed items are eligible for returns only in case of defects or damage."
    },
    {
      id: 6,
      question: "How do I track my order?",
      answer: "Use the Track Order page to enter your order ID and get real-time updates on your package location and delivery status."
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Support",
      value: "support@designmyfit.com",
      description: "Get help via email"
    },
    {
      icon: Phone,
      title: "Phone Support",
      value: "+91 98765 43210",
      description: "Call us directly"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      value: "Available 24/7",
      description: "Chat with our team"
    },
    {
      icon: Clock,
      title: "Support Hours",
      value: "9 AM - 8 PM IST",
      description: "Monday to Saturday"
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
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Help & Support
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're here to help! Find answers to common questions or get in touch with our support team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-orange-500" />
                Contact Us
              </h2>
              
              <div className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
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

              <div className="mt-6 p-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl text-white">
                <h3 className="font-semibold mb-2">Need Immediate Help?</h3>
                <p className="text-orange-100 text-sm mb-3">
                  Our support team is available to assist you with any questions or concerns.
                </p>
                <button className="w-full bg-white text-orange-600 py-2 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200">
                  Start Live Chat
                </button>
              </div>
            </div>
          </motion.div>

          {/* AI Help Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 mb-8"
          >
            <AIHelpSection />
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-orange-500" />
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                      className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-orange-50 transition-colors duration-200 flex items-center justify-between"
                    >
                      <span className="font-semibold text-gray-800">{faq.question}</span>
                      {openFaq === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-orange-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    
                    {openFaq === faq.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 py-4 bg-white border-t border-gray-100"
                      >
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Additional Help Section */}
              <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Still Need Help?</h3>
                <p className="text-gray-600 mb-4">
                  Can't find what you're looking for? Our support team is here to help you with any questions or concerns.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200 flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    Send Email
                  </button>
                  <button className="flex-1 bg-white text-orange-600 py-3 px-6 rounded-lg font-semibold border border-orange-200 hover:bg-orange-50 transition-colors duration-200 flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    Call Us
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


