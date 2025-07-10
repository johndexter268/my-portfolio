"use client"

import { useState, useEffect, useRef } from "react"
import { Send, X, Bot, User } from "lucide-react"
import Markdown from 'react-markdown'

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

    if (
      lowerMessage.includes("skill") ||
      lowerMessage.includes("technology") ||
      lowerMessage.includes("tech stack") ||
      lowerMessage.includes("tools") ||
      lowerMessage.includes("framework")
    ) {
      return `Dex is skilled in modern web and app development technologies including HTML5, CSS3, JavaScript, TypeScript, React, Next.js, Tailwind CSS, Node.js, Express, PHP, Laravel, Electron, Firebase, MySQL, PostgreSQL, and MongoDB. He’s also experienced with tools like Git, GitHub, Postman, VS Code, and Vite. On the creative side, he works with Figma, Canva, Photoshop, and Affinity Designer for UI/UX and graphic design.`;
    } else if (
      lowerMessage.includes("experience") ||
      lowerMessage.includes("background") ||
      lowerMessage.includes("career") ||
      lowerMessage.includes("ojt") ||
      lowerMessage.includes("intern")
    ) {
      return `Dex has hands-on experience as a Web Developer and Intern at BatStateU ICT Central. He has worked on real-world systems involving admin dashboards, AI-powered bots, real-time communication tools, and OJT tracking systems. With freelance experience since 2019, he blends technical expertise with creative design.`;
    } else if (
      lowerMessage.includes("project") ||
      lowerMessage.includes("portfolio") ||
      lowerMessage.includes("work") ||
      lowerMessage.includes("built")
    ) {
      return `Dex has built several notable projects:
- **PT RORO Inventory System**: A desktop app for inventory using Electron, Express, and SQLite.
- **BatStateU AI Chatbot & Admin Dashboard**: A smart assistant with real-time chat and admin panel using Laravel, WebSocket, and Python.
- **Dental Ease App & Dentist Web System**: A cross-platform appointment system using Flutter and Firebase.
- **OJT Tracking System**: Tracks trainee progress and attendance.
- **Lumiere Clothing Shop**: An e-commerce platform with admin tools.
- **Portfolio Website**: Built with React and CSS to showcase projects and personal branding.`;
    } else if (
      lowerMessage.includes("contact") ||
      lowerMessage.includes("hire") ||
      lowerMessage.includes("connect") ||
      lowerMessage.includes("email") ||
      lowerMessage.includes("reach")
    ) {
      return `You can contact Dex via email at **jdlanot.2003@gmail.com** or through phone at **0995 489 4362**. He’s open to freelance work, collaborations, and exciting opportunities!`;
    } else if (
      lowerMessage.includes("about") ||
      lowerMessage.includes("yourself") ||
      lowerMessage.includes("who are you")
    ) {
      return `Dex is a passionate web developer and graphic designer. I specialize in crafting modern, responsive websites and applications. Outside of tech, I love exploring design trends, contributing to open-source, and sharing knowledge. I'm always open to learning and collaborating!`;
    } else if (
      lowerMessage.includes("education") ||
      lowerMessage.includes("school") ||
      lowerMessage.includes("study") ||
      lowerMessage.includes("degree")
    ) {
      return `Dex graduated with a **Bachelor of Science in Information Technology**, specializing in Service Management at Batangas State University. He earned the **Cum Laude** distinction and was a **Dean’s Lister (2023–2025)**.`;
    } else {
      return `Thanks for your question! I can help you learn more about Dex’s skills, experience, projects, education, or how to get in touch. What would you like to know?`;
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
            <div className="message-content">
              <Markdown>{message.content}</Markdown>
            </div>

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
