import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Loader2, Sparkles, MessageSquare, Zap, Brain } from "lucide-react";

export default function AIHelpSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "Hello! I'm your AI shopping assistant. I can help you with product recommendations, order tracking, sizing questions, and more. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced AI Response Logic
  const generateAIResponse = async (userMessage) => {
    setIsTyping(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));

    let response = "";
    const lowerMessage = userMessage.toLowerCase();

    // Enhanced response logic with more context
    if (lowerMessage.includes("recommend") || lowerMessage.includes("suggestion")) {
      response = "I'd be happy to recommend products! What's your style preference? Are you looking for casual wear, formal attire, or something specific? I can suggest based on your preferences and current trends.";
    } else if (lowerMessage.includes("order") && lowerMessage.includes("track")) {
      response = "To track your order, visit the Track Order page and enter your order ID. You'll get real-time updates on your package location and delivery status. Need help finding your order ID?";
    } else if (lowerMessage.includes("return") || lowerMessage.includes("refund")) {
      response = "Our return policy is customer-friendly! Returns accepted within 7 days for unused items. Custom printed items can only be returned if defective. I can guide you through the return process.";
    } else if (lowerMessage.includes("shipping") || lowerMessage.includes("delivery")) {
      response = "We offer flexible shipping options: Standard (3-5 days), Express (1-2 days), and Free shipping on orders above ₹999. Custom items take 5-7 business days to process.";
    } else if (lowerMessage.includes("payment") || lowerMessage.includes("pay")) {
      response = "We accept all major payment methods: Credit/Debit cards, UPI, Net Banking, and Cash on Delivery. All online payments are secured with SSL encryption for your safety.";
    } else if (lowerMessage.includes("size") || lowerMessage.includes("fit")) {
      response = "Finding the right size is important! We provide detailed size charts for all products. I can help you measure and find your perfect fit. What type of clothing are you looking for?";
    } else if (lowerMessage.includes("custom") || lowerMessage.includes("design")) {
      response = "Our custom printing service lets you create unique designs! Upload your artwork or choose from our templates. Custom items are made to order and take 5-7 business days.";
    } else if (lowerMessage.includes("contact") || lowerMessage.includes("support")) {
      response = "Our support team is here to help! Email: support@designmyfit.com, Phone: +91 98765 43210. Available Monday-Saturday, 9 AM-8 PM IST. You can also use this chat for immediate assistance.";
    } else if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      response = "Hello! I'm your AI shopping assistant. I can help with product recommendations, order tracking, sizing, returns, payments, and more. What would you like to know about our services?";
    } else if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
      response = "Our prices are competitive and transparent! We offer regular discounts and seasonal sales. You can also get 10% off on your first order. Would you like me to show you our current offers?";
    } else if (lowerMessage.includes("quality") || lowerMessage.includes("material")) {
      response = "We use premium quality materials for all our products. Our clothing is made from 100% cotton, polyester blends, and other high-quality fabrics. Each item undergoes quality checks before shipping.";
    } else {
      response = "I'm here to help with any questions about our products, orders, shipping, returns, payments, sizing, or custom designs. Feel free to ask anything specific, and I'll provide detailed information!";
    }

    setIsTyping(false);
    return response;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    const aiResponse = await generateAIResponse(inputMessage);
    
    const botMessage = {
      id: Date.now() + 1,
      type: "bot",
      content: aiResponse,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "How do I track my order?",
    "What's your return policy?",
    "How long does shipping take?",
    "Can I get product recommendations?"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      {/* AI Chat Header */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">AI Shopping Assistant</h2>
              <p className="text-orange-100 text-sm">Powered by AI • Available 24/7</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-sm font-medium">AI Powered</span>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="h-96 flex flex-col">
        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex items-start gap-3 max-w-[85%] ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === "user" 
                    ? "bg-orange-600" 
                    : "bg-gradient-to-r from-orange-500 to-amber-500"
                }`}>
                  {message.type === "user" ? (
                    <MessageSquare className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`px-4 py-3 rounded-2xl ${
                  message.type === "user"
                    ? "bg-orange-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className={`text-xs mt-2 ${
                    message.type === "user" ? "text-orange-100" : "text-gray-500"
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="px-4 py-3 bg-gray-100 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-orange-500 animate-spin" />
                    <span className="text-sm text-gray-600">AI is thinking...</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="px-4 pb-4">
            <p className="text-sm text-gray-500 mb-3">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setInputMessage(question)}
                  className="px-3 py-2 bg-orange-50 text-orange-700 rounded-full text-sm hover:bg-orange-100 transition-colors duration-200 border border-orange-200"
                >
                  {question}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about our products, orders, or services..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="px-4 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl hover:from-orange-700 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
