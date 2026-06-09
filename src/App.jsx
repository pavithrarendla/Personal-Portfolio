import { useState, useEffect, useRef } from 'react'
import { 
  Home, 
  User, 
  GraduationCap, 
  Cpu, 
  Briefcase, 
  Award, 
  Code2, 
  MessageSquare, 
  Sun, 
  Moon, 
  ExternalLink, 
  Send,
  CheckCircle2,
  Download
} from 'lucide-react'
import './App.css'
import profileImg from './assets/profile.jpg'
import kluLogo from './assets/klu_logo.png'
import sriChaitanyaLogo from './assets/sri_chaitanya_logo.png'

function App() {
  // Theme state: default to dark for professional look, check localStorage first
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'dark';
  });

  // Active section for sidebar navigation highlight
  const [activeSection, setActiveSection] = useState('home');

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Refs for each section to implement smooth scrolling and scroll spy
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const educationRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const certificationsRef = useRef(null);
  const codingRef = useRef(null);
  const contactRef = useRef(null);

  // Apply theme class to body
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle theme handler
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Scroll spy: highlight sidebar items based on current scroll position
  useEffect(() => {
    const sections = [
      { id: 'home', ref: homeRef },
      { id: 'about', ref: aboutRef },
      { id: 'education', ref: educationRef },
      { id: 'skills', ref: skillsRef },
      { id: 'projects', ref: projectsRef },
      { id: 'certifications', ref: certificationsRef },
      { id: 'coding', ref: codingRef },
      { id: 'contact', ref: contactRef }
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for better detection

      for (const section of sections) {
        const element = section.ref.current;
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll helper
  const scrollToSection = (ref, sectionId) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
  };

  // Form submission handler
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormError('Please fill out all fields.');
      return;
    }
    setFormError('');
    setIsSending(true);

    fetch("https://formsubmit.co/ajax/rendlapavithra@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        _subject: `New Portfolio Message from ${formData.name}`,
        _captcha: "false"
      })
    })
    .then(response => response.json())
    .then(data => {
      setIsSending(false);
      if (data.success === "true" || data.success === true) {
        setFormSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormError('Something went wrong. Please try again.');
      }
    })
    .catch(error => {
      setIsSending(false);
      setFormError('Connection error. Please try again.');
    });
  };

  return (
    <div className="app-container">
      {/* LEFT SIDEBAR / TASKBAR */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <img src={profileImg} alt="Deepikareddy Profile" />
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeSection === 'home' ? 'active' : ''}`}
            onClick={() => scrollToSection(homeRef, 'home')}
            aria-label="Home"
          >
            <Home size={22} />
            <span className="tooltip">Home</span>
          </button>
          
          <button 
            className={`nav-item ${activeSection === 'about' ? 'active' : ''}`}
            onClick={() => scrollToSection(aboutRef, 'about')}
            aria-label="About"
          >
            <User size={22} />
            <span className="tooltip">About Me</span>
          </button>
          
          <button 
            className={`nav-item ${activeSection === 'education' ? 'active' : ''}`}
            onClick={() => scrollToSection(educationRef, 'education')}
            aria-label="Education"
          >
            <GraduationCap size={22} />
            <span className="tooltip">Education</span>
          </button>
          
          <button 
            className={`nav-item ${activeSection === 'skills' ? 'active' : ''}`}
            onClick={() => scrollToSection(skillsRef, 'skills')}
            aria-label="Skills"
          >
            <Cpu size={22} />
            <span className="tooltip">Skills</span>
          </button>
          
          <button 
            className={`nav-item ${activeSection === 'projects' ? 'active' : ''}`}
            onClick={() => scrollToSection(projectsRef, 'projects')}
            aria-label="Projects"
          >
            <Briefcase size={22} />
            <span className="tooltip">Projects</span>
          </button>
          
          <button 
            className={`nav-item ${activeSection === 'certifications' ? 'active' : ''}`}
            onClick={() => scrollToSection(certificationsRef, 'certifications')}
            aria-label="Certifications"
          >
            <Award size={22} />
            <span className="tooltip">Certifications</span>
          </button>
          
          <button 
            className={`nav-item ${activeSection === 'coding' ? 'active' : ''}`}
            onClick={() => scrollToSection(codingRef, 'coding')}
            aria-label="Coding Platforms"
          >
            <Code2 size={22} />
            <span className="tooltip">Coding Profiles</span>
          </button>
          
          <button 
            className={`nav-item ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={() => scrollToSection(contactRef, 'contact')}
            aria-label="Contact"
          >
            <MessageSquare size={22} />
            <span className="tooltip">Let's Chat</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Toggle Brightness Mode"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="main-content">
        
        {/* 1. HOME SECTION */}
        <section id="home" ref={homeRef} className="section-container home-section">
          <div className="grid-2">
            <div className="home-content animate-fade-in">
              <span className="home-tag">Cloud Native Software Engineering</span>
              <h1 className="home-title">
                Hi, I'm <br />
                <span>RENDLA PAVITHRA</span>
              </h1>
              <p className="home-subtitle">
                A passionate Computer Science & Information Technology student at KL University specializing in building modern web applications, scalable microservices, and robust cloud deployments.
              </p>
              <div className="home-cta">
                <button onClick={() => scrollToSection(contactRef, 'contact')} className="btn btn-primary">
                  Let's Chat <Send size={16} />
                </button>
                <button onClick={() => scrollToSection(projectsRef, 'projects')} className="btn btn-secondary">
                  View Projects
                </button>
              </div>
            </div>
            
            <div className="home-image-container animate-fade-in">
              <div className="home-img-wrapper">
                <img src={profileImg} alt="Deepikareddy Profile Portrait" />
              </div>
            </div>
          </div>
        </section>

        {/* 2. ABOUT ME SECTION */}
        <section id="about" ref={aboutRef} className="section-container">
          <div className="section-header">
            <h2>About Me</h2>
          </div>
          <div className="about-card">
            <p className="about-intro-text">
              I am a dedicated Computer Science & Information Technology (CSIT) student at KL University, specializing in <strong>Cloud Native Software Engineering</strong>. I am passionate about learning, exploring, and building scalable tech solutions that run seamlessly in the cloud.
            </p>
            <p className="about-intro-text">
              My core academic interests lie in modern full-stack development, cloud environments, automated deployment pipelines, and microservices architecture. I thrive at the intersection of coding and cloud orchestration.
            </p>
            
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">9.7</div>
                <div className="stat-label">B.Tech CGPA</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">8</div>
                <div className="stat-label">Cloud/Tech Certifications</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">Active</div>
                <div className="stat-label">CodeChef & HackerRank</div>
              </div>
            </div>

            <div className="about-action" style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
              <a href="/Rendla_Pavithra_Resume.html" download="Rendla_Pavithra_Resume.html" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                Download Resume <Download size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* 3. EDUCATION SECTION (Matching layout of the second image) */}
        <section id="education" ref={educationRef} className="section-container">
          <div className="section-header">
            <h2>Education</h2>
          </div>
          
          <div className="education-grid">
            {/* Card 1: B.Tech */}
            <div className="education-card">
              <div className="edu-logo-wrapper" style={{ overflow: 'hidden' }}>
                <img src={kluLogo} alt="KL University Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              
              <h3 className="edu-title">
                Bachelor of Technology (B.Tech) in Computer Science and Engineering
              </h3>
              
              <p className="edu-subtitle">
                K L University
              </p>
              
              <div className="edu-meta">
                Aug 2023 - May 2027 | Guntur, AP
              </div>
              
              <div className="edu-divider"></div>
              
              <div className="edu-score">
                GPA: 9.7 CGPA
              </div>
            </div>

            {/* Card 2: Intermediate */}
            <div className="education-card">
              <div className="edu-logo-wrapper" style={{ overflow: 'hidden' }}>
                <img src={sriChaitanyaLogo} alt="Sri Chaitanya Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              
              <h3 className="edu-title">
                Intermediate
              </h3>
              
              <p className="edu-subtitle">
                Sri Chaitanya College
              </p>
              
              <div className="edu-meta">
                Vijayawada, AP
              </div>
              
              <div className="edu-divider"></div>
              
              <div className="edu-score">
                Marks: 96%
              </div>
            </div>
          </div>
        </section>

        {/* 4. SKILLS SECTION */}
        <section id="skills" ref={skillsRef} className="section-container">
          <div className="section-header">
            <h2>Skills & Technologies</h2>
          </div>
          


          <div className="grid-3">
            {/* Category 1: Cloud & DevOps */}
            <div className="skills-category">
              <h3 className="category-title">
                <Cpu size={20} /> Cloud & DevOps
              </h3>
              <div className="skills-list">
                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">AWS Services (EC2, S3, IAM)</span>
                    <span className="skill-percent">85%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">Docker & Containerization</span>
                    <span className="skill-percent">80%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill" style={{ width: '80%' }}></div>
                  </div>
                </div>

                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">Kubernetes Orchestration</span>
                    <span className="skill-percent">70%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill" style={{ width: '70%' }}></div>
                  </div>
                </div>

                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">CI/CD Pipelines (Jenkins, Actions)</span>
                    <span className="skill-percent">75%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Category 2: Web Development */}
            <div className="skills-category">
              <h3 className="category-title">
                <Code2 size={20} /> Web Development
              </h3>
              <div className="skills-list">
                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">React.js Frontend</span>
                    <span className="skill-percent">90%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill" style={{ width: '90%' }}></div>
                  </div>
                </div>

                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">Spring Boot Backend</span>
                    <span className="skill-percent">85%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">MySQL Database</span>
                    <span className="skill-percent">80%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill" style={{ width: '80%' }}></div>
                  </div>
                </div>

                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">JavaScript & ES6+</span>
                    <span className="skill-percent">85%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Category 3: Coding & Methodologies */}
            <div className="skills-category">
              <h3 className="category-title">
                <User size={20} /> Concepts & Tools
              </h3>
              <div className="skills-list">
                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">Java Programming</span>
                    <span className="skill-percent">90%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill" style={{ width: '90%' }}></div>
                  </div>
                </div>

                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">Git & GitHub</span>
                    <span className="skill-percent">85%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">RESTful APIs Design</span>
                    <span className="skill-percent">85%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">Microservices Architecture</span>
                    <span className="skill-percent">75%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. PROJECTS SECTION */}
        <section id="projects" ref={projectsRef} className="section-container">
          <div className="section-header">
            <h2>Projects</h2>
          </div>
          
          <div className="grid-3">
            {/* Project 1 */}
            <div className="project-card">
              <div className="project-img-wrapper">
                <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="400" height="200" fill="#3b0764"/>
                  <circle cx="200" cy="100" r="50" fill="#a855f7" fillOpacity="0.4"/>
                  <path d="M120 120 L280 120 M150 90 L250 90 M180 60 L220 60" stroke="#c084fc" strokeWidth="4" strokeLinecap="round"/>
                  <text x="20" y="40" fill="#e9d5ff" fontSize="14" fontWeight="bold">Django & Python</text>
                  <text x="380" y="170" fill="#e9d5ff" fontSize="12" textAnchor="end">Employee Finance</text>
                </svg>
                <div className="project-overlay">Finance Platform</div>
              </div>
              <div className="project-info">
                <h3 className="project-title">Employee Finance Management System</h3>
                <p className="project-desc">
                  Developed a scalable online platform for employees to track and manage their salaries, ensuring a 30 percent increase in financial planning efficiency. Built backend using MySQL.
                </p>
                <div className="project-tags">
                  <span className="project-tag">Python</span>
                  <span className="project-tag">Django</span>
                  <span className="project-tag">MySQL</span>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="project-card">
              <div className="project-img-wrapper">
                <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="400" height="200" fill="#065f46"/>
                  <rect x="120" y="60" width="160" height="100" rx="8" fill="#10b981" fillOpacity="0.4"/>
                  <circle cx="200" cy="110" r="30" fill="#34d399"/>
                  <path d="M185 110 C185 100 215 100 215 110 C215 120 185 120 185 110 Z" fill="#ffffff"/>
                  <circle cx="192" cy="108" r="3" fill="#047857"/>
                  <circle cx="208" cy="108" r="3" fill="#047857"/>
                  <path d="M197 114 Q200 117 203 114" stroke="#047857" strokeWidth="2" fill="none"/>
                  <text x="20" y="40" fill="#a7f3d0" fontSize="14" fontWeight="bold">Full Stack</text>
                  <text x="380" y="170" fill="#a7f3d0" fontSize="12" textAnchor="end">React.js + MySQL</text>
                </svg>
                <div className="project-overlay">Pet Adoption App</div>
              </div>
              <div className="project-info">
                <h3 className="project-title">Pet Adoption Application</h3>
                <p className="project-desc">
                  Developing a pet adoption application using full stack to streamline the adoption process. Integrated MySQL to store and manage user data, pet details, and adoption information.
                </p>
                <div className="project-tags">
                  <span className="project-tag">React.js</span>
                  <span className="project-tag">Fullstack</span>
                  <span className="project-tag">MySQL</span>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="project-card">
              <div className="project-img-wrapper">
                <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="400" height="200" fill="#1e3a8a"/>
                  <circle cx="200" cy="100" r="50" fill="#3b82f6" fillOpacity="0.4"/>
                  <path d="M120 130 C150 70 250 70 280 130" stroke="#60a5fa" strokeWidth="4" strokeLinecap="round" fill="none"/>
                  <text x="20" y="40" fill="#93c5fd" fontSize="14" fontWeight="bold">React & MERN</text>
                  <text x="380" y="170" fill="#93c5fd" fontSize="12" textAnchor="end">Travel Booking</text>
                </svg>
                <div className="project-overlay">Travel Booking App</div>
              </div>
              <div className="project-info">
                <h3 className="project-title">Travel Booking System</h3>
                <p className="project-desc">
                  Developing a website for users to make their journey plans in an effective way. Designing the database schema in MySQL for managing users.
                </p>
                <div className="project-tags">
                  <span className="project-tag">React.js</span>
                  <span className="project-tag">MERN Stack</span>
                  <span className="project-tag">MySQL</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. CERTIFICATIONS SECTION */}
        <section id="certifications" ref={certificationsRef} className="section-container">
          <div className="section-header">
            <h2>Certifications</h2>
          </div>
          
          <div className="grid-4">
            {/* Cert 1 */}
            <a href="https://www.credly.com/badges/fcb1ee59-28bd-4b4b-8e0a-eb68fa5f0bf3/public_url" target="_blank" rel="noopener noreferrer" className="cert-card">
              <div className="cert-icon-box" style={{ color: '#ff9900', backgroundColor: 'rgba(255, 153, 0, 0.1)', borderColor: 'rgba(255, 153, 0, 0.2)' }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a6 6 0 0 0 0-12z" />
                  <path d="M7 16c2 2 5.5 2 8 0" stroke="#ff9900" />
                </svg>
              </div>
              <div className="cert-info">
                <h4 className="cert-name">AWS Certified Cloud Practitioner</h4>
                <span className="cert-issuer">Amazon Web Services</span>
              </div>
            </a>

            {/* Cert 2 */}
            <a href="https://www.credly.com/badges/4f423290-529f-4b13-a449-d11d95e1b993/public_url" target="_blank" rel="noopener noreferrer" className="cert-card">
              <div className="cert-icon-box" style={{ color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2c0 0-5 4.5-5 9.5 0 2.5 2 4.5 5 4.5s5-2 5-4.5C17 6.5 12 2 12 2z" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" />
                  <path d="M12 2v19" stroke="#10b981" />
                </svg>
              </div>
              <div className="cert-info">
                <h4 className="cert-name">MongoDB Certified Developer</h4>
                <span className="cert-issuer">MongoDB Inc</span>
              </div>
            </a>

            {/* Cert 3 */}
            <a href="https://www.credly.com/badges/ee0bc189-f1ef-4046-8228-5671073f1c39/public_url" target="_blank" rel="noopener noreferrer" className="cert-card">
              <div className="cert-icon-box" style={{ color: '#0089d6', backgroundColor: 'rgba(0, 137, 214, 0.1)', borderColor: 'rgba(0, 137, 214, 0.2)' }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 18L12 4l6 14H6z" fill="rgba(0, 137, 214, 0.2)" stroke="#0089d6" />
                  <path d="M12 4v14" stroke="#0089d6" />
                  <path d="M9 11h6" stroke="#0089d6" />
                </svg>
              </div>
              <div className="cert-info">
                <h4 className="cert-name">Microsoft Azure (AZ-900)</h4>
                <span className="cert-issuer">Microsoft</span>
              </div>
            </a>

            {/* Cert 4 */}
            <div className="cert-card">
              <div className="cert-icon-box" style={{ color: '#00a1e0', backgroundColor: 'rgba(0, 161, 224, 0.1)', borderColor: 'rgba(0, 161, 224, 0.2)' }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19.5 9.5c.3-1.9-1-3.8-3-4.2-2.2-.4-4.3.7-4.9 2.8-.8-1-2.2-1.5-3.5-1.2-1.6.4-2.8 1.9-2.8 3.6-.9-.4-1.9-.3-2.7.2-1.1.8-1.6 2.3-1.2 3.6.4 1.1 1.5 1.7 2.7 1.7h14c1.9 0 3.5-1.6 3.5-3.5 0-1.6-1.1-3-2.6-3.3z" fill="rgba(0, 161, 224, 0.2)" stroke="#00a1e0" />
                </svg>
              </div>
              <div className="cert-info">
                <h4 className="cert-name">Salesforce Certified Associate</h4>
                <span className="cert-issuer">Salesforce</span>
              </div>
            </div>

            {/* Cert 5 */}
            <div className="cert-card">
              <div className="cert-icon-box" style={{ color: '#0d2b4b', backgroundColor: 'rgba(13, 43, 75, 0.1)', borderColor: 'rgba(13, 43, 75, 0.2)' }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="rgba(13, 43, 75, 0.2)" stroke="#0d2b4b" />
                  <path d="M12 8v8M9 11h6" stroke="#0d2b4b" />
                </svg>
              </div>
              <div className="cert-info">
                <h4 className="cert-name">Linguaskills</h4>
                <span className="cert-issuer">Cambridge Assessment English</span>
              </div>
            </div>

            {/* Cert 6 */}
            <a href="https://www.linkedin.com/feed/update/urn:li:activity:7305616681974861824/" target="_blank" rel="noopener noreferrer" className="cert-card">
              <div className="cert-icon-box" style={{ color: '#f07121', backgroundColor: 'rgba(240, 113, 33, 0.1)', borderColor: 'rgba(240, 113, 33, 0.2)' }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="10" rx="2" fill="rgba(240, 113, 33, 0.2)" stroke="#f07121" />
                  <circle cx="12" cy="5" r="2" stroke="#f07121" />
                  <path d="M12 7v4M8 15h.01M16 15h.01" stroke="#f07121" />
                </svg>
              </div>
              <div className="cert-info">
                <h4 className="cert-name">Automation Anywhere RPA</h4>
                <span className="cert-issuer">Automation Anywhere</span>
              </div>
            </a>

            {/* Cert 7 */}
            <a href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=6548A550C245061D370EC41B561B45215F1A534C7F441A996F53EE2C2813F0FF" target="_blank" rel="noopener noreferrer" className="cert-card">
              <div className="cert-icon-box" style={{ color: '#e62828', backgroundColor: 'rgba(230, 40, 40, 0.1)', borderColor: 'rgba(230, 40, 40, 0.2)' }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1" stroke="#e62828" />
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" fill="rgba(230, 40, 40, 0.2)" stroke="#e62828" />
                  <path d="M6 2c0 2-2 2-2 4M10 2c0 2-2 2-2 4M14 2c0 2-2 2-2 4" stroke="#e62828" />
                </svg>
              </div>
              <div className="cert-info">
                <h4 className="cert-name">Java Programmer Certification</h4>
                <span className="cert-issuer">Oracle</span>
              </div>
            </a>

            {/* Cert 8 */}
            <div className="cert-card">
              <div className="cert-icon-box" style={{ color: '#a855f7', backgroundColor: 'rgba(168, 85, 247, 0.1)', borderColor: 'rgba(168, 85, 247, 0.2)' }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="5" r="3" fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" />
                  <circle cx="5" cy="18" r="3" fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" />
                  <circle cx="19" cy="18" r="3" fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" />
                  <path d="M10 7.5L6.5 15.5M14 7.5l3.5 8M8 18h8" stroke="#a855f7" />
                </svg>
              </div>
              <div className="cert-info">
                <h4 className="cert-name">Graph Theory</h4>
                <span className="cert-issuer">Computer Science Department</span>
              </div>
            </div>
          </div>
        </section>

        {/* 7. CODING PLATFORMS PROFILE SECTION */}
        <section id="coding" ref={codingRef} className="section-container">
          <div className="section-header">
            <h2>Coding Profiles</h2>
          </div>
          <div className="platform-grid">
            {/* Codechef */}
            <a 
              href="https://www.codechef.com/users/klu_2300090355" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="platform-card platform-card-codechef"
            >
              <div className="platform-left">
                <span className="platform-badge">CodeChef</span>
                <span className="platform-name">CodeChef Profile</span>
                <span className="platform-meta">Algorithms & live contest rankings</span>
              </div>
              <div className="platform-right">
                <span className="platform-stat-number">1 Star</span>
                <span className="platform-stat-label">Current Rating</span>
              </div>
            </a>

            {/* Hackerrank */}
            <a 
              href="https://www.hackerrank.com/profile/klu2300090355" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="platform-card platform-card-hackerrank"
              style={{ background: 'linear-gradient(135deg, #2ec866 0%, #1ba04c 100%)', boxShadow: '0 10px 20px rgba(46, 200, 102, 0.2)' }}
            >
              <div className="platform-left">
                <span className="platform-badge">HackerRank</span>
                <span className="platform-name">HackerRank Profile</span>
                <span className="platform-meta">Algorithms, data structures & sql coding</span>
              </div>
              <div className="platform-right">
                <span className="platform-stat-number">Active</span>
                <span className="platform-stat-label">Problem Solving</span>
              </div>
            </a>
          </div>
        </section>

        {/* 8. LET'S CHAT CONTACT SECTION (Matches layout of the third image) */}
        <section id="contact" ref={contactRef} className="section-container contact-section-wrapper">
          <div className="section-header">
            <h2>Let's Chat</h2>
          </div>
          
          <div className="contact-layout">
            {/* Left side info */}
            <div className="contact-left">
              <h3 className="contact-subtitle">Let's Talk!</h3>
              <p className="contact-desc">
                I'm always open to new connections and conversations. Whether it's a project, a question, or just a quick hello — feel free to reach out. I believe great ideas start with a simple message. Collaboration and learning excite me, and I'm here for both. Let's make something cool together!
              </p>
            </div>
            
            {/* Right side form */}
            <div className="contact-form-side">
              {formSubmitted ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '30px',
                  backgroundColor: 'var(--bg-sidebar-active)',
                  borderRadius: '20px',
                  border: '1px solid var(--accent-color)'
                }}>
                  <CheckCircle2 color="var(--accent-color)" size={48} />
                  <h4 style={{ color: 'var(--text-heading)', fontWeight: 700 }}>Message Sent!</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', textAlign: 'center' }}>
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="contact-form-side">
                  <div className="contact-row-inputs">
                    <div className="form-group">
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Enter your name" 
                        className="form-control"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="Enter your email" 
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <textarea 
                      name="message" 
                      value={formData.message}
                      onChange={handleFormChange}
                      placeholder="Write your message" 
                      className="form-control"
                      required
                    ></textarea>
                  </div>

                  {formError && (
                    <span style={{ color: '#ff2a5f', fontSize: '13px', fontWeight: 600 }}>
                      {formError}
                    </span>
                  )}
                  
                  <button type="submit" className="btn-contact-submit" disabled={isSending}>
                    {isSending ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
          
          {/* Footer centered bottom */}
          <footer className="contact-footer">
            <div className="footer-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <span className="footer-name">RENDLA PAVITHRA</span>
              <div className="footer-socials" style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <a href="https://github.com/pavithrarendla" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="GitHub" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/pavithrarendla" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="https://instagram.com/pavithrarendla" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
          </footer>
        </section>

      </main>
    </div>
  )
}

export default App
