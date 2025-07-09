"use client"

import { useState, useEffect, useRef } from "react"
import { Send, X, Bot, User } from "lucide-react"

const ChatWidget = ({ closeChat }) => {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "Hi! I'm Dex's AI assistant. Feel free to ask me about his skills, experience, or projects!",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading) return

    const userMessage = inputMessage.trim()
    setInputMessage("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    try {
      // Simulate AI response (replace with actual AI integration)
      setTimeout(() => {
        const aiResponse = generateResponse(userMessage)
        setMessages((prev) => [...prev, { role: "ai", content: aiResponse }])
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "Sorry, I'm having trouble responding right now. Please try again later.",
        },
      ])
      setIsLoading(false)
    }
  }

  const generateResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("skill") || lowerMessage.includes("technology")) {
      return "Dex is skilled in HTML, CSS, JavaScript, PHP, Laravel, PostgreSQL, MySQL, Tailwind CSS, Bootstrap, WebSockets, and Python. He also excels in UI/UX design using tools like Adobe Photoshop, Figma, and Canva. He's passionate about building responsive, user-centric web apps and designing visually engaging digital interfaces.";
    } else if (lowerMessage.includes("experience")) {
      return "Dex has gained experience as a Web Developer and Intern at BatStateU ICT Central. He has built real-time web applications, AI-powered chatbots, and inventory systems. His hands-on experience spans from frontend to backend development, freelancing, and graphic design since 2019.";
    } else if (lowerMessage.includes("project")) {
      return "Dex has worked on diverse projects including the BatStateU AI Chatbot, Dental Ease Mobile & Web System, PT RORO Inventory System, E-commerce platforms, and the Wagayway Equality website. These projects showcase his skills in Laravel, WebSockets, Electron.js, Firebase, and more.";
    } else if (lowerMessage.includes("contact") || lowerMessage.includes("hire")) {
      return "You can reach Dex via email at jdlanot.2003@gmail.com or through phone at 09954894362. He's open to exciting opportunities, collaborative projects, or freelance gigs!";
    } else {
      return "Thanks for your question! I can help you learn more about Dex's skills, experience, projects, or how to contact him. What would you like to know?";
    }
  }


  return (
    <div className="chat-widget">
      <div className="chat-header">
        <div className="chat-header-info">
          <Bot size={20} />
          <div>
            <h3>Dex's AI Assistant</h3>
            <p>Ask me about Dex's work!</p>
          </div>
        </div>
        <button onClick={closeChat} className="chat-close-btn">
          <X size={20} />
        </button>
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <div className="message-avatar">{message.role === "ai" ? <Bot size={16} /> : <User size={16} />}</div>
            <div className="message-content">{message.content}</div>
          </div>
        ))}
        {isLoading && (
          <div className="message ai">
            <div className="message-avatar">
              <Bot size={16} />
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="chat-input-form">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask me about Dex..."
          className="chat-input"
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !inputMessage.trim()} className="chat-send-btn">
          <Send size={18} />
        </button>
      </form>
    </div>
  )
}

export default ChatWidget
