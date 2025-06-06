"use client";
import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, ChevronsRightLeft, Bot } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'model' | 'system'; // 'model' for Gemini's responses
  content: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Generate a unique session ID when the component mounts
    setSessionId(Math.random().toString(36).substring(7));
    // Initial greeting message from the bot
    setMessages([{ role: 'model', content: "Hi! I'm Mahmoud's Portfolio Assistant. How can I help you learn more about him today?" }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);


  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: inputValue };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);
    setInputValue('');

    try {
      const chatHistoryForAPI = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      // Add the current user message to the history being sent
      chatHistoryForAPI.push(userMessage);


      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputValue, history: chatHistoryForAPI.slice(1), sessionId }), // Send history excluding initial greeting
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'API request failed');
      }

      const data = await response.json();
      const botMessage: ChatMessage = { role: 'model', content: data.reply };
      setMessages(prevMessages => [...prevMessages, botMessage]);

    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage: ChatMessage = { role: 'model', content: "Sorry, I'm having trouble connecting. Please try again later." };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Compact View Button */}
      {!isOpen && (
        <button
          onClick={toggleChatbot}
          className="fixed bottom-9 left-9 bg-white hover:bg-opacity-30 text-black p-3 rounded-full shadow-lg z-50 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent-color focus:ring-opacity-50 flex items-center gap-2"
          aria-label="Open chatbot"
        >
          
          <Bot size={28} />
       
          <label htmlFor="chatbot">Chatbot</label> </button>
      )}

      {/* Expanded Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-5 left-5 w-[360px] h-[500px] bg-navy bg-opacity-90 text-neon-green shadow-2xl rounded-xl z-50 flex flex-col transition-all duration-300 ease-in-out transform scale-100 origin-bottom-left">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border-color">
            <div className="flex items-center gap-2">
                <Bot size={24} className="text-accent-color" />
                <h3 className="text-lg font-semibold text-heading-color">Portfolio Chatbot Assistant</h3>
            </div>
            <button
              onClick={toggleChatbot}
              className="text-text-color hover:text-accent-color transition-colors"
              aria-label="Close chatbot"
            >
              <X size={24} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-grow p-4 overflow-y-auto chatbot-messages space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    msg.role === 'user'
                      ? 'bg-accent-color text-white rounded-br-none'
                      : 'bg-border-color text-heading-color rounded-bl-none'
                  }`}
                >
                  {/* For model messages, handle newlines for better formatting */}
                  {msg.role === 'model' ? (
                    msg.content.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < msg.content.split('\n').length - 1 && <br />}
                      </span>
                    ))
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-lg bg-border-color text-heading-color rounded-bl-none text-sm">
                  <span className="animate-pulse">Assistant is typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border-color">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about Mahmoud..."
                className="flex-grow p-2.5 bg-light-navy border border-border-color text-text-color rounded-lg focus:ring-2 focus:ring-accent-color focus:border-accent-color outline-none text-sm placeholder:text-slate"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || inputValue.trim() === ''}
                className="p-2.5 bg-navy text-white rounded-lg hover:bg-opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;