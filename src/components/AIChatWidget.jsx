import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "Hi! I'm your AI assistant. How can I help you today?",
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

  // AI Response Logic (you can replace this with actual AI API calls)
  const generateAIResponse = async (userMessage) => {
    setIsTyping(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Simple response logic (replace with actual AI integration)
    let response = "";
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("order") || lowerMessage.includes("track")) {
      response = "To track your order, go to the Track Order page and enter your order ID. You can find your order ID in your order confirmation email.";
    } else if (lowerMessage.includes("return") || lowerMessage.includes("refund")) {
      response = "Our return policy allows returns within 7 days of delivery for unused items. Custom printed items can only be returned if defective. Check our Refund Policy page for more details.";
    } else if (lowerMessage.includes("shipping") || lowerMessage.includes("delivery")) {
      response = "Standard shipping takes 3-5 business days. Express shipping (1-2 days) is available for select locations. Custom items may take 5-7 business days.";
    } else if (lowerMessage.includes("payment") || lowerMessage.includes("pay")) {
      response = "We accept all major credit cards, debit cards, UPI payments, and cash on delivery. All online payments are secured with SSL encryption.";
    } else if (lowerMessage.includes("size") || lowerMessage.includes("fit")) {
      response = "We offer detailed size guides for all our products. You can find size charts on each product page. If you need help choosing the right size, I can guide you through our sizing recommendations.";
    } else if (lowerMessage.includes("custom") || lowerMessage.includes("design")) {
      response = "We offer custom printing services! You can upload your own designs or choose from our templates. Custom items are made to order and may take 5-7 business days to process.";
    } else if (lowerMessage.includes("contact") || lowerMessage.includes("support")) {
      response = "You can reach our support team via email at support@designmyfit.com or call us at +91 98765 43210. We're available Monday to Saturday, 9 AM to 8 PM IST.";
    } else if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      response = "Hello! I'm here to help you with any questions about our products, orders, shipping, returns, or anything else. What would you like to know?";
    } else {
      response = "I'm here to help! You can ask me about orders, shipping, returns, payments, sizing, custom designs, or contact information. What would you like to know?";
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

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50 flex items-center justify-center"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Assistant</h3>
                  <p className="text-xs text-orange-100">Online • Ready to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex items-start gap-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === "user" 
                        ? "bg-orange-600" 
                        : "bg-gray-200"
                    }`}>
                      {message.type === "user" ? (
                        <User className="w-3 h-3 text-white" />
                      ) : (
                        <Bot className="w-3 h-3 text-gray-600" />
                      )}
                    </div>
                    <div className={`px-3 py-2 rounded-lg ${
                      message.type === "user"
                        ? "bg-orange-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
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
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                      <Bot className="w-3 h-3 text-gray-600" />
                    </div>
                    <div className="px-3 py-2 bg-gray-100 rounded-lg">
                      <div className="flex items-center gap-1">
                        <Loader2 className="w-4 h-4 text-gray-500 animate-spin" />
                        <span className="text-sm text-gray-600">AI is typing...</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
