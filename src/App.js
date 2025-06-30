"use client"

import { useState, useEffect } from "react"
import { Download, FolderOpen, Menu, X } from "lucide-react"
import "./App.css"

// Import your images (add these to src/assets/ or public/ folder)
// import logo from './assets/logo.png';
// import profileImg from './assets/portfolioimg.png';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentText, setCurrentText] = useState("")
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  const texts = ["Web Developer", "Graphic Designer", "UI/UX Designer"]

  // Typewriter effect
  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (isTyping) {
          if (charIndex < texts[textIndex].length) {
            setCurrentText(texts[textIndex].substring(0, charIndex + 1))
            setCharIndex(charIndex + 1)
          } else {
            setTimeout(() => setIsTyping(false), 2000)
          }
        } else {
          if (charIndex > 0) {
            setCurrentText(texts[textIndex].substring(0, charIndex - 1))
            setCharIndex(charIndex - 1)
          } else {
            setIsTyping(true)
            setTextIndex((textIndex + 1) % texts.length)
          }
        }
      },
      isTyping ? 100 : 50,
    )

    return () => clearTimeout(timeout)
  }, [charIndex, textIndex, isTyping, texts])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <div className="App">
      {/* Grid Background */}
      <div className="grid-bg"></div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
        </div>
        <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <a href="#projects" onClick={closeMenu}>
            Projects
          </a>
          <a href="#skills" onClick={closeMenu}>
            Skills
          </a>
          <a href="#about" onClick={closeMenu}>
            About
          </a>
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="background-text">Dex</div>
        <div className="hero-content">
          <div className="hero-image">
            <img src="/portfolioimg.png" alt="Profile" />
          </div>
          <div className="hero-text">
            <h1>Hello, I'm Dex!</h1>
            <div className="animated-text">
              {currentText}
              <span className="cursor">|</span>
            </div>
            <div className="hero-buttons">
              <a href="/files/JDL.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <Download size={18} />
                <span>Download CV</span>
              </a>
              <a href="#projects" className="btn btn-secondary">
                <FolderOpen size={18} />
                <span>View Projects</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects" id="projects">
        <div className="container">
          <h2 className="section-title">My Projects</h2>
          <div className="projects-grid">
            {/* Project Card 1 */}
            <div className="project-card">
              <div className="project-image">
                <img src="/projects/ptroro.jpg" alt="PT RORO" />
              </div>
              <div className="project-content">
                <h3 className="project-title">PT RORO Inventory System</h3>
                <p className="project-description">
                  The PT RORO Inventory System is a desktop application built with Electron, Express, and SQLite designed to efficiently manage and track office supplies, utilities, and union materials.
                </p>
                <div className="tech-stack">
                  <span className="tech-badge">Electron</span>
                  <span className="tech-badge">Express</span>
                  <span className="tech-badge">SQLite</span>
                </div>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="project-card">
              <div className="project-image">
                <img src="/projects/AIchatbot.png" alt="BatStateU AI Chatbot" />
              </div>
              <div className="project-content">
                <h3 className="project-title">BatStateU AI Chatbot</h3>
                <p className="project-description">
                  IT Internship Project. An AI Chatbot for conversational assistance for Batangas State University - TNEU.
                </p>
                <div className="tech-stack">
                  <span className="tech-badge">JavaScript</span>
                  <span className="tech-badge">Laravel</span>
                  <span className="tech-badge">Python</span>
                  <span className="tech-badge">Websocket</span>
                  <span className="tech-badge">PostgreSQL</span>
                </div>
              </div>
            </div>

            {/* Project Card 3 */}
            <div className="project-card">
              <div className="project-image">
                <img src="/projects/AI-admin.png" alt="AI Chatbot Admin" />
              </div>
              <div className="project-content">
                <h3 className="project-title">AI Chatbot Admin</h3>
                <p className="project-description">
                  Oversee the chatbot system, allowing administrators to manage API tokens, user permissions, and user accounts. It also supports knowledge uploads and retrieval-augmented generation (RAG).
                </p>
                <div className="tech-stack">
                  <span className="tech-badge">Laravel</span>
                  <span className="tech-badge">Livewire</span>
                  <span className="tech-badge">PHP</span>
                  <span className="tech-badge">PostgreSQL</span>
                </div>
              </div>
            </div>

            {/* Project Card 4 */}
            <div className="project-card">
              <div className="project-image">
                <img src="/projects/ojt-tracker.png" alt="OJT Tracker" />
              </div>
              <div className="project-content">
                <h3 className="project-title">On-The-Job Tracker</h3>
                <p className="project-description">
                  Monitoring on-the-job training progress, remaining days, and trainee performance. It also features task management, attendance tracking, and records of holidays and absences to ensure organized and efficient OJT supervision.
                </p>
                <div className="tech-stack">
                  <span className="tech-badge">HTML</span>
                  <span className="tech-badge">CSS</span>
                  <span className="tech-badge">JavaScript</span>
                  <span className="tech-badge">Firebase</span>
                </div>
              </div>
            </div>

            {/* Project Card 5 */}
            <div className="project-card">
              <div className="project-image">
                <img src="/projects/DE-App.png" alt="Mobile App" />
              </div>
              <div className="project-content">
                <h3 className="project-title">Dental Ease Mobile App</h3>
                <p className="project-description">
                  An online learning management system with course creation tools, progress tracking, interactive
                  quizzes, video streaming, and certification system. Designed for educators and students worldwide.
                </p>
                <div className="tech-stack">
                  <span className="tech-badge">Next.js</span>
                  <span className="tech-badge">Prisma</span>
                  <span className="tech-badge">MySQL</span>
                  <span className="tech-badge">Cloudinary</span>
                </div>
              </div>
            </div>

            {/* Project Card 6 */}
            <div className="project-card">
              <div className="project-image">
                <img src="/projects/DE-Dentist.png" alt="Web App" />
              </div>
              <div className="project-content">
                <h3 className="project-title">Dentist Management System</h3>
                <p className="project-description">
                  A comprehensive fitness tracking application with workout planning, nutrition logging, progress
                  analytics, and social features. Integrates with wearable devices for accurate health monitoring.
                </p>
                <div className="tech-stack">
                  <span className="tech-badge">Flutter</span>
                  <span className="tech-badge">Dart</span>
                  <span className="tech-badge">Firebase</span>
                  <span className="tech-badge">Health API</span>
                </div>
              </div>
            </div>

            {/* Project Card 8 */}
            <div className="project-card">
              <div className="project-image">
                <img src="/placeholder.svg?height=200&width=350" alt="Crypto Dashboard" />
              </div>
              <div className="project-content">
                <h3 className="project-title">Crypto Dashboard</h3>
                <p className="project-description">
                  A real-time cryptocurrency tracking dashboard with portfolio management, price alerts, market analysis
                  tools, and trading insights. Features beautiful charts and comprehensive market data.
                </p>
                <div className="tech-stack">
                  <span className="tech-badge">TypeScript</span>
                  <span className="tech-badge">D3.js</span>
                  <span className="tech-badge">WebSocket</span>
                  <span className="tech-badge">Redis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
