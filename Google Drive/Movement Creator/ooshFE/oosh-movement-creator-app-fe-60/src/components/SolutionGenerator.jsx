import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const SolutionGenerator = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    setMessages([
      { text: "How can I serve you?", sender: 'ai' }
    ]);
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    // TODO: Integrate with OpenAI API
    setTimeout(() => {
      setIsTyping(false);
      setMessages([...newMessages, {
        text: "I'm here to help! What specific challenge are you facing?",
        sender: 'ai'
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-grow p-4" ref={chatRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.sender === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-2 rounded ${
                message.sender === 'user'
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="text-left">
            <div className="inline-block p-2 rounded bg-gray-200 text-gray-800">
              <span className="typing-indicator">AI is typing<span>.</span><span>.</span><span>.</span></span>
            </div>
          </div>
        )}
      </ScrollArea>
      <div className="p-4 flex">
        <Input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="flex-grow mr-2"
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
};

export default SolutionGenerator;
