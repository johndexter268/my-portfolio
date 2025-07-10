"use client"

import { useState, useEffect } from "react"
import emailjs from "emailjs-com";
import { Download, FolderOpen, Menu, X, Github, Linkedin, Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react"
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaPhp,
  FaLaravel,
  FaGitAlt,
  FaGithub,
  FaNpm,
  FaFigma,
} from "react-icons/fa6"
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri"
import {
  SiVitess,
  SiExpress,
  SiMysql,
  SiTypescript,
  SiPostgresql,
  SiMongodb,
  SiPostman,
  SiCanva,
  SiAdobephotoshop,
  SiAffinitydesigner,
} from "react-icons/si"
import { IoLogoElectron, IoLogoFirebase  } from "react-icons/io5";
import { VscVscode } from "react-icons/vsc"
import ChatWidget from "./components/ChatWidget"
import "./App.css"

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentText, setCurrentText] = useState("")
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  })
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isWidgetVisible, setIsWidgetVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")

  const texts = ["Web Developer", "Graphic Designer", "UI/UX Designer"]

  // Tech stack data
  const techStack = [
    // Frontend
    { name: "html5", label: "HTML5", icon: FaHtml5, color: "#E34F26", category: "Frontend" },
    { name: "css3", label: "CSS3", icon: FaCss3Alt, color: "#1572B6", category: "Frontend" },
    { name: "javascript", label: "JavaScript", icon: FaJs, color: "#F7DF1E", category: "Frontend" },
    { name: "typescript", label: "TypeScript", icon: SiTypescript, color: "#3178C6", category: "Frontend" },
    { name: "react", label: "React", icon: FaReact, color: "#61DAFB", category: "Frontend" },
    { name: "nextjs", label: "Next.js", icon: RiNextjsFill, color: "#ffffff", category: "Frontend" },
    { name: "tailwind", label: "Tailwind CSS", icon: RiTailwindCssFill, color: "#06B6D4", category: "Frontend" },
    { name: "vite", label: "Vite", icon: SiVitess, color: "#646CFF", category: "Frontend" },

    // Backend
    { name: "nodejs", label: "Node.js", icon: FaNodeJs, color: "#339933", category: "Backend" },
    { name: "express", label: "Express", icon: SiExpress, color: "#ffffff", category: "Backend" },
    { name: "php", label: "PHP", icon: FaPhp, color: "#777BB4", category: "Backend" },
    { name: "laravel", label: "Laravel", icon: FaLaravel, color: "#FF2D20", category: "Backend" },
    { name: "electron", label: "Electron", icon: IoLogoElectron, color: "#9beafa", category: "Backend" },

    // Database
    { name: "mysql", label: "MySQL", icon: SiMysql, color: "#4479A1", category: "Database" },
    { name: "postgresql", label: "PostgreSQL", icon: SiPostgresql, color: "#336791", category: "Database" },
    { name: "mongodb", label: "MongoDB", icon: SiMongodb, color: "#47A248", category: "Database" },
    { name: "firebase", label: "Firebase", icon: IoLogoFirebase , color: "#fbc304", category: "Database" },

    // Tools
    { name: "git", label: "Git", icon: FaGitAlt, color: "#F05032", category: "Tools" },
    { name: "github", label: "GitHub", icon: FaGithub, color: "#181717", category: "Tools" },
    { name: "npm", label: "NPM", icon: FaNpm, color: "#CB3837", category: "Tools" },
    { name: "postman", label: "Postman", icon: SiPostman, color: "#FF6C37", category: "Tools" },
    { name: "vscode", label: "VS Code", icon: VscVscode, color: "#007ACC", category: "Tools" },

    // Design
    { name: "figma", label: "Figma", icon: FaFigma, color: "#F24E1E", category: "Design" },
    { name: "canva", label: "Canva", icon: SiCanva, color: "#007ACC", category: "Design" },
    { name: "photoshop", label: "Photoshop", icon: SiAdobephotoshop, color: "#001E36", category: "Design" },
    { name: "affinity", label: "Affinity Designer", icon: SiAffinitydesigner, color: "#007ACC", category: "Design" },
  ]

  // Add this function to get unique categories
  const categories = ["All", ...new Set(techStack.map((tech) => tech.category))]

  // Add this function to filter technologies
  const filteredTechStack =
    activeCategory === "All" ? techStack : techStack.filter((tech) => tech.category === activeCategory)

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

  // Chat functionality
  const toggleChat = () => {
    if (isChatOpen) {
      setIsChatOpen(false)
      setTimeout(() => setIsWidgetVisible(false), 300)
    } else {
      setIsWidgetVisible(true)
      setTimeout(() => setIsChatOpen(true), 10)
    }
  }

  // Allow closing chat with the Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isChatOpen) {
        toggleChat()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isChatOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

const handleSubmit = (e) => {
  e.preventDefault();

  // Add loading state
  const submitButton = e.target.querySelector('button[type="submit"]');
  const originalText = submitButton.innerHTML;
  submitButton.innerHTML = '<span>Sending...</span>';
  submitButton.disabled = true;

  // Initialize EmailJS if not already done
  emailjs.init("u92n-2F1k5f75Lv57"); // Your public key

  emailjs
    .send(
      "service_g8wn8wm",      // Your service ID
      "template_86hu32c",     // Your template ID
      {
        // Make sure these match your EmailJS template variables
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: "John Dexter Lanot", // Your name
      },
      "u92n-2F1k5f75Lv57"          // Your public key
    )
    .then(
      (result) => {
        console.log("Success:", result);
        alert("Message sent successfully!");
        setFormData({ email: "", subject: "", message: "" });
      },
      (error) => {
        console.error("EmailJS Error:", error);
        alert(`Failed to send message: ${error.text || error.message}`);
      }
    )
    .finally(() => {
      // Reset button state
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    });
};

  return (
    <div className="App">
      {/* Grid Background */}
      <div className="grid-bg"></div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <a href="/"><img src="/about.png" alt="Logo" /></a>
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
                <img src="/projects/ptroro.jpg?height=200&width=350" alt="project" />
              </div>
              <div className="project-content">
                <h3 className="project-title">PT RORO Inventory System</h3>
                <p className="project-description">
                  A desktop application built with Electron, Express, and SQLite designed to efficiently manage and track office supplies, utilities, and union materials. It provides a streamlined solution for monitoring inventory levels, ensuring accurate stock management, and supporting operational needs.
                </p>
                <div className="tech-stack">
                  <span className="tech-badge">Electron</span>
                  <span className="tech-badge">Javascript</span>
                  <span className="tech-badge">Express</span>
                  <span className="tech-badge">SQLite</span>
                </div>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="project-card">
              <div className="project-image">
                <img src="/projects/AIchatbot.png?height=200&width=350" alt="project" />
              </div>
              <div className="project-content">
                <h3 className="project-title">BatStateU AI Chatbot</h3>
                <p className="project-description">
                  An intelligent conversational assistant developed using JavaScript, Python, Laravel, and WebSocket. It provides real-time responses to user queries, offering seamless communication and support for students and stakeholders of Batangas State University.
                </p>
                <div className="tech-stack">
                  <span className="tech-badge">Python</span>
                  <span className="tech-badge">Javascript</span>
                  <span className="tech-badge">CSS</span>
                </div>
              </div>
            </div>

            {/* Project Card 3 */}
            <div className="project-card">
              <div className="project-image">
                <img src="/projects/AI-admin.png?height=200&width=350" alt="project" />
              </div>
              <div className="project-content">
                <h3 className="project-title">AI Chatbot Admin Dashboard</h3>
                <p className="project-description">
                  A management system built to oversee the chatbot system, allowing administrators to manage API tokens, user permissions, and user accounts.
                </p>
                <div className="tech-stack">
                  <span className="tech-badge">Laravel</span>
                  <span className="tech-badge">Tailwind</span>
                  <span className="tech-badge">PHP</span>
                  <span className="tech-badge">PostgreSQL</span>
                </div>
              </div>
            </div>

            {/* Project Card 4 */}
            <div className="project-card">
              <div className="project-image">
                <img src="/projects/ojt-tracker.png?height=200&width=350" alt="project" />
              </div>
              <div className="project-content">
                <h3 className="project-title">OJT Tracking System</h3>
                <p className="project-description">
                  System for monitoring on-the-job training progress, remaining days, and trainee performance. It also features task management, attendance tracking, and records of holidays and absences.
                </p>
                <div className="tech-stack">
                  <span className="tech-badge">HTML</span>
                  <span className="tech-badge">CSS</span>
                  <span className="tech-badge">Javascript</span>
                  <span className="tech-badge">Firebase</span>
                </div>
              </div>
            </div>

            {/* Project Card 5 */}
            <div className="project-card">
              <div className="project-image">
                <img src="/projects/DE-App.png?height=200&width=350" alt="projects" />
              </div>
              <div className="project-content">
                <h3 className="project-title">Dental Ease App</h3>
                <p className="project-description">
                  A mobile application developed with Flutter and Firebase, designed to enhance patient engagement by enabling appointment booking, and easy access to dental records and submitting feedback.
                </p>
                <div className="tech-stack">
                  <span className="tech-badge">Flutter</span>
                  <span className="tech-badge">Dart</span>
                  <span className="tech-badge">Firebase</span>
                </div>
              </div>
            </div>

            {/* Project Card 6 */}
            <div className="project-card">
              <div className="project-image">
                <img src="/projects/DE-Dentist.png?height=200&width=350" alt="projects" />
              </div>
              <div className="project-content">
                <h3 className="project-title">Dental Ease Dentist Web System</h3>
                <p className="project-description">
                  A real-time web dashboard for dentists, allowing seamless management of appointments, patients, inventory and messaging.
                </p>
                <div className="tech-stack">
                  <span className="tech-badge">Flutter</span>
                  <span className="tech-badge">Dart</span>
                  <span className="tech-badge">Firebase</span>
                </div>
              </div>
            </div>

            {/* Project Card 7 */}
            <div className="project-card">
              <div className="project-image">
                <img src="/projects/lumiere.png?height=200&width=350" alt="projects" />
              </div>
              <div className="project-content">
                <h3 className="project-title">Lumiere Clothing Online Shop</h3>
                <p className="project-description">
                  An e-commerce platform with integrated admin management, allowing customers to browse and order clothing online while enabling administrators to manage products, inventory, and order processing.
                </p>
                <div className="tech-stack">
                  <span className="tech-badge">HTMl</span>
                  <span className="tech-badge">CSSS</span>
                  <span className="tech-badge">PHP</span>
                  <span className="tech-badge">MySQL</span>
                </div>
              </div>
            </div>

            {/* Project Card 8 */}
            <div className="project-card">
              <div className="project-image">
                <img src="/projects/portfolio.png?height=200&width=350" alt="projects" />
              </div>
              <div className="project-content">
                <h3 className="project-title">Personal Portfolio</h3>
                <p className="project-description">
                  A portfolio website that showcase my projects and skills. 
                </p>
                <div className="tech-stack">
                  <span className="tech-badge">React</span>
                  <span className="tech-badge">CSS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="tech-stack" id="skills">
        <div className="container">
          <h2 className="section-title">Tools & Technologies</h2>

          {/* Category Filters */}
          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${activeCategory === category ? "active" : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="tech-grid">
            {filteredTechStack.map((tech, index) => {
              const IconComponent = tech.icon
              return (
                <div key={index} className="tech-item">
                  <div className="tech-icon">
                    <IconComponent
                      size={40}
                      color={tech.color}
                      style={{
                        transition: "transform 0.3s ease",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "scale(1.1)"
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1)"
                      }}
                    />
                  </div>
                  <span className="tech-label">{tech.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-image">
              <img src="/about.png?height=400&width=400" alt="About Me" />
            </div>
            <div className="about-text">
              {/* <h3>Passionate Developer & Creative Designer</h3> */}
              <p>
                Hello! I'm John Dexter Lanot, a passionate web developer and graphic designer with experience in
                creating digital experiences that make a difference. I specialize in building modern, responsive
                websites and applications using cutting-edge technologies.
              </p>
              <p>
                When I'm not coding, you can find me exploring new design trends, contributing to open-source projects,
                or sharing my knowledge with the developer community. I'm always eager to take on new challenges and
                collaborate on exciting projects.
              </p>

              {/* Education Section */}
              <div className="education">
                <h4>Education</h4>
                <div className="education-item">
                  <div className="education-logo">
                    <img src="BatStateU-NEU-Logo.png" alt="University Logo" />
                  </div>
                  <div className="education-details">
                    <h5>Bachelor of Science in Information Technology</h5>
                    <p className="specialization">Specialized in Service Management</p>
                    <p className="honor">Cum Laude</p>
                    <p className="dl">Dean's Lister 2023-2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Let's Work Together</h3>
              <p>
                I'm always interested in new opportunities and exciting projects. Whether you have a project in mind or
                just want to chat about web development, feel free to reach out!
              </p>

              <div className="contact-details">
                <div className="contact-item">
                  <Mail size={20} />
                  <span>jdlanot.2003@gmail.com</span>
                </div>
                <div className="contact-item">
                  <Phone size={20} />
                  <span>09954894362</span>
                </div>
                <div className="contact-item">
                  <MapPin size={20} />
                  <span>Calicanto, Batangas City</span>
                </div>
              </div>

              <div className="social-links">
                <a href="https://github.com/johndexter268/" target="_blank" rel="noopener noreferrer" className="social-link">
                  <Github size={24} />
                </a>
                <a href="https://linkedin.com/in/john-dexter-lanot/" target="_blank" rel="noopener noreferrer" className="social-link">
                  <Linkedin size={24} />
                </a>
              </div>
            </div>

            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="Project Inquiry"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  <Send size={18} />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-left">
              <div className="footer-logo">
                <img src="/about.png" alt="Logo" />
                <span>John Dexter Lanot</span>
              </div>
              <p>Building digital experiences that make a difference.</p>
            </div>
            <div className="footer-links">
              <div className="footer-section">
                <h4>Navigation</h4>
                <ul>
                  <li>
                    <a href="#projects">Projects</a>
                  </li>
                  <li>
                    <a href="#skills">Skills</a>
                  </li>
                  <li>
                    <a href="#about">About</a>
                  </li>
                  <li>
                    <a href="#contact">Contact</a>
                  </li>
                </ul>
              </div>
              <div className="footer-section">
                <h4>Connect</h4>
                <ul>
                  <li>
                    <a href="https://github.com/johndexter268" target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/john-dexter-lanot/" target="_blank" rel="noopener noreferrer">
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 John Dexter Lanot. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      {isWidgetVisible && (
        <div className={`chat-widget-container ${isChatOpen ? "chat-open" : "chat-closed"}`}>
          <ChatWidget closeChat={toggleChat} />
        </div>
      )}

      {/* Chat Toggle Button */}
      <button onClick={toggleChat} className="chat-toggle-btn" aria-label={isChatOpen ? "Close Chat" : "Open Chat"}>
        <MessageCircle size={24} />
      </button>
    </div>
  )
}

export default App
