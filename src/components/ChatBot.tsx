import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your WayIn assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses: { [key: string]: string } = {
    'navigation': "I can help you find any product in the store! Just tell me what you're looking for and I'll guide you with step-by-step directions.",
    'stock': "You can check real-time stock levels using our Live Stock Updates feature. Which product are you interested in?",
    'billing': "Our Self-Billing feature lets you scan and pay for products without waiting in line. Just scan the barcode and follow the checkout process!",
    'help': "I can assist you with:\n• Finding products (Navigation)\n• Checking stock levels\n• Self-checkout process\n• Store information\n• General support",
    'hours': "Our store is open:\nMonday - Saturday: 9:00 AM - 9:00 PM\nSunday: 10:00 AM - 7:00 PM",
    'contact': "You can reach our support team at:\n📞 (555) 123-4567\n📧 support@wayin.com\nOr visit our Contact page for more options!",
    'payment': "We accept all major credit cards, debit cards, mobile payments (Apple Pay, Google Pay), and cash at our self-checkout stations.",
    'default': "I understand you need help with that. For detailed assistance, you can contact our support team or visit our Contact page. Is there anything specific about navigation, stock, or billing I can help with?"
  };

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('find') || message.includes('where') || message.includes('location') || message.includes('navigate')) {
      return predefinedResponses.navigation;
    }
    if (message.includes('stock') || message.includes('available') || message.includes('inventory')) {
      return predefinedResponses.stock;
    }
    if (message.includes('pay') || message.includes('checkout') || message.includes('bill') || message.includes('scan')) {
      return predefinedResponses.billing;
    }
    if (message.includes('help') || message.includes('what can you')) {
      return predefinedResponses.help;
    }
    if (message.includes('hours') || message.includes('open') || message.includes('close')) {
      return predefinedResponses.hours;
    }
    if (message.includes('contact') || message.includes('support') || message.includes('phone')) {
      return predefinedResponses.contact;
    }
    if (message.includes('payment') || message.includes('card') || message.includes('cash')) {
      return predefinedResponses.payment;
    }
    
    return predefinedResponses.default;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user' as const,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: generateBotResponse(inputMessage),
        sender: 'bot' as const,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const quickQuestions = [
    "How do I find a product?",
    "Check stock levels",
    "How to use self-checkout",
    "Store hours",
    "Contact support"
  ];

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 shadow-lg z-50"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 h-96 bg-white/95 backdrop-blur-md shadow-2xl z-50 flex flex-col">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-3 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-t-lg">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="h-5 w-5" />
              WayIn Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.sender === 'bot' && (
                        <Bot className="h-4 w-4 mt-0.5 text-blue-600" />
                      )}
                      {message.sender === 'user' && (
                        <User className="h-4 w-4 mt-0.5 text-white" />
                      )}
                      <div className="text-sm whitespace-pre-line">{message.text}</div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4 text-blue-600" />
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="p-4 border-t border-gray-200">
                <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-1">
                  {quickQuestions.slice(0, 3).map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setInputMessage(question)}
                      className="text-xs h-6 px-2"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 h-9"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  size="sm"
                  className="h-9 w-9 p-0 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatBot;