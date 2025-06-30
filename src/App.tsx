"use client"

import { useState, useEffect } from "react"
import { Download, FolderOpen, Menu, X } from "lucide-react"
import "./App.css"

// Import your images (you'll need to add these to src/assets/)
// import logo from './assets/logo.png';
// import profileImg from './assets/portfolioimg.png';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentText, setCurrentText] = useState("")
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  const texts = ["Web Developer", "Graphic Designer", "UI/UX Enthusiast"]

  // Typewriter effect
  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (isTyping) {
          if (charIndex < texts[textIndex].length) {
            setCurrentText(texts[textIndex].substring(0, charIndex + 1))
            setCharIndex(charIndex + 1)
          } else {
            setIsTyping(false)
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

      {/* Navbar Component */}
      <nav className="navbar">
        <div className="logo">
          <img src="/placeholder.svg?height=40&width=40" alt="Logo" />
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
            <img src="/placeholder.svg?height=300&width=300" alt="Profile" />
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
    </div>
  )
}

export default App
