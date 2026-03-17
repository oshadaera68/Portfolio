import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Palette, 
  Terminal, 
  Cpu, 
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Sun,
  Moon,
  Briefcase,
  GraduationCap
} from 'lucide-react';

// --- Theme Context ---

const ThemeContext = createContext({
  isDark: true,
  toggleTheme: () => {},
});

const useTheme = () => useContext(ThemeContext);

// --- Components ---

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      onAnimationComplete={() => onComplete()}
      className="fixed inset-0 z-[100] bg-[var(--bg-primary)] flex items-center justify-center"
    >
      <div className="relative">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-display font-bold tracking-tighter"
        >
          OSHADA<span className="text-emerald-500">.</span>
        </motion.div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
          className="absolute -bottom-2 left-0 h-1 bg-emerald-500 rounded-full"
        />
      </div>
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[var(--nav-bg)] backdrop-blur-lg py-4 border-b border-[var(--card-border)]' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-display font-bold tracking-tighter"
        >
          OSHADA<span className="text-emerald-500">.</span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] hover:bg-[var(--card-border)] transition-all duration-300 group"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Moon size={18} className="text-indigo-400" />
            ) : (
              <Sun size={18} className="text-yellow-400" />
            )}
          </button>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-5 py-2 bg-emerald-500 text-[var(--text-primary)] text-sm font-bold rounded-full hover:bg-emerald-400 transition-colors"
          >
            Resume
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)]"
            aria-label="Toggle theme"
          >
            {isDark ? <Moon size={18} className="text-indigo-400" /> : <Sun size={18} className="text-yellow-400" />}
          </button>
          <button className="text-[var(--text-primary)]" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[var(--bg-primary)] border-b border-[var(--card-border)] overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="relative w-fit text-lg font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
              <button className="w-full py-3 bg-emerald-500 text-[var(--text-primary)] font-bold rounded-xl mt-2">
                Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
      
      <div className="max-w-7xl mx-auto px-6 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] text-emerald-500 text-xs font-bold tracking-widest uppercase mb-6">
            Full Stack Developer
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-extrabold leading-[0.9] tracking-tighter mb-8">
            OSHADA <br />
            <span className="text-gradient">ERANGA</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-[var(--text-secondary)] mb-10 leading-relaxed">
            Aspiring Full Stack Developer | B.Eng (Hons) Software Engineering @ IIT | Building Modern Applications | Youtuber | Subtitle Contributer at Baiscope.lk
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold rounded-full flex items-center gap-2 group"
            >
              View Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <div className="flex items-center gap-4">
              <a href="#" className="p-3 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] hover:bg-[var(--card-border)] transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="p-3 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] hover:bg-[var(--card-border)] transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="p-3 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] hover:bg-[var(--card-border)] transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-[var(--text-secondary)]"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-[var(--section-bg)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
              Turning complex problems into <span className="text-emerald-500 italic">elegant</span> solutions.
            </h2>
            <div className="space-y-6 text-[var(--text-secondary)] text-lg leading-relaxed">
              <p>
                I am Oshada Eranga, an aspiring Full Stack Developer currently pursuing a B.Eng (Hons) in Software Engineering at the Informatics Institute of Technology (IIT). 
                I am dedicated to building modern, high-performance applications that solve real-world problems.
              </p>
              <p>
                Beyond coding, I am a YouTuber and a Subtitle Contributor at Baiscope.lk, blending my technical skills with a passion for creative content and community contribution.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mt-12">
              <div>
                <h4 className="text-3xl font-display font-bold text-[var(--text-primary)] mb-1">5+</h4>
                <p className="text-sm text-[var(--text-secondary)] uppercase tracking-widest">Years Experience</p>
              </div>
              <div>
                <h4 className="text-3xl font-display font-bold text-[var(--text-primary)] mb-1">50+</h4>
                <p className="text-sm text-[var(--text-secondary)] uppercase tracking-widest">Projects Completed</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-[var(--card-border)]">
              <img 
                src="https://picsum.photos/seed/oshada/800/800" 
                alt="Oshada Eranga" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-500 rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-[var(--card-border)] rounded-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Education = () => {
  const educationData = [
    {
      year: '2025 - Present',
      degree: 'Junior Full Stack Developer',
      institution: 'Cypso Labs',
      description: 'Started My journey in full stack development',
      icon: <Briefcase className="text-emerald-400" />
    },
    {
      year: '2024 - Present',
      degree: 'B.Eng(Hons) Software Engineering',
      institution: 'Informatics Institute of Technology (IIT)',
      description: 'Started My Degree in Software Engineering.',
      icon: <GraduationCap className="text-cyan-400" />
    },
    {
      year: '2021 - 2023',
      degree: 'Diploma in GDSE',
      institution: 'Institute of Java and Software Engineering (IJSE)',
      description: 'Started Foundation of Software Engineering Journey.',
      icon: <Code2 className="text-purple-400" />
    }
  ];

  return (
    <section id="education" className="py-24 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">My Journey</h2>
          <p className="text-[var(--text-secondary)]">My academic foundation and professional milestones.</p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[var(--card-border)] -translate-x-1/2 hidden md:block" />
          
          <div className="space-y-12">
            {educationData.map((item, i) => (
              <motion.div
                key={item.degree}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Dot on Line */}
                <div className="absolute left-4 md:left-1/2 top-6 md:top-1/2 w-4 h-4 bg-emerald-500 rounded-full -translate-x-1/2 border-4 border-[var(--bg-primary)] z-10 hidden md:block" />

                {/* Content Card */}
                <div className="w-full md:w-[45%] glass-card p-8 hover:bg-[var(--card-border)] transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 bg-[var(--card-bg)] rounded-lg">
                      {item.icon}
                    </div>
                    <span className="text-emerald-500 font-mono text-sm font-bold">{item.year}</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-2">{item.degree}</h3>
                  <h4 className="text-[var(--text-secondary)] font-medium mb-4">{item.institution}</h4>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Spacer for Desktop */}
                <div className="hidden md:block md:w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Palette className="text-emerald-400" />,
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"]
    },
    {
      title: "Backend",
      icon: <Terminal className="text-cyan-400" />,
      skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis", "GraphQL"]
    },
    {
      title: "Cloud & DevOps",
      icon: <Cpu className="text-purple-400" />,
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Firebase", "Vercel"]
    },
    {
      title: "Tools",
      icon: <Code2 className="text-orange-400" />,
      skills: ["Git", "Figma", "Postman", "Jest", "Vite", "Webpack"]
    }
  ];

  return (
    <section id="skills" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Technical Arsenal</h2>
          <p className="text-[var(--text-secondary)]">The tools and technologies I use to bring ideas to life.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 hover:bg-[var(--card-border)] transition-colors group"
            >
              <div className="mb-6 p-3 bg-[var(--card-bg)] rounded-xl w-fit group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-[var(--card-bg)] rounded-full text-xs text-[var(--text-secondary)] border border-[var(--card-border)]">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Nexus AI Platform",
      category: "SaaS / AI",
      image: "https://picsum.photos/seed/nexus/800/500",
      description: "A collaborative AI workspace for teams to build and deploy custom models.",
      tags: ["React", "Python", "TensorFlow", "AWS"],
      link: "#"
    },
    {
      title: "CryptoFlow Dashboard",
      category: "Fintech",
      image: "https://picsum.photos/seed/crypto/800/500",
      description: "Real-time cryptocurrency tracking and portfolio management system.",
      tags: ["Next.js", "Web3.js", "Tailwind", "Node.js"],
      link: "#"
    },
    {
      title: "EcoSphere Mobile",
      category: "Mobile App",
      image: "https://picsum.photos/seed/eco/800/500",
      description: "A community-driven platform for tracking and reducing carbon footprints.",
      tags: ["React Native", "Firebase", "Google Maps"],
      link: "#"
    }
  ];

  return (
    <section id="projects" className="py-24 bg-[var(--section-bg)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Selected Work</h2>
            <p className="text-[var(--text-secondary)]">A collection of projects that define my craft.</p>
          </div>
          <button className="flex items-center gap-2 text-emerald-500 font-bold hover:text-emerald-400 transition-colors">
            View All Projects <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-[var(--card-border)]">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <a href={project.link} className="p-3 bg-[var(--bg-primary)] text-[var(--text-primary)] rounded-full hover:bg-emerald-500 hover:text-[var(--bg-primary)] transition-colors">
                    <ExternalLink size={20} />
                  </a>
                  <a href="#" className="p-3 bg-[var(--bg-primary)] text-[var(--text-primary)] rounded-full hover:bg-emerald-500 hover:text-[var(--bg-primary)] transition-colors">
                    <Github size={20} />
                  </a>
                </div>
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2 block">
                  {project.category}
                </span>
                <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm mb-6 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono text-[var(--text-secondary)] uppercase border border-[var(--card-border)] px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter">
            LET'S BUILD <br /> SOMETHING <span className="text-gradient">GREAT</span>.
          </h2>
          <p className="text-xl text-[var(--text-secondary)] mb-12">
            Currently open to new opportunities and interesting collaborations. 
            Have a project in mind? Let's talk.
          </p>
          
          <a 
            href="mailto:hello@oshada.dev"
            className="inline-block px-12 py-6 bg-emerald-500 text-[var(--text-primary)] text-xl font-bold rounded-full hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20"
          >
            Get in Touch
          </a>

          <div className="flex items-center justify-center gap-8 mt-20">
            <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Twitter</a>
            <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">LinkedIn</a>
            <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">GitHub</a>
            <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Dribbble</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[70] p-4 bg-emerald-500 text-[var(--text-primary)] rounded-full shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-colors group"
          aria-label="Scroll to top"
        >
          <ChevronDown size={24} className="rotate-180 group-hover:-translate-y-1 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-[var(--card-border)]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[var(--text-secondary)] text-sm">
          © {new Date().getFullYear()} Oshada Eranga. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-xs font-mono text-[var(--text-secondary)] uppercase tracking-widest">
          <a href="#" className="hover:text-[var(--text-primary)] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[var(--text-primary)] transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <AnimatePresence mode="wait">
        {isLoading && <SplashScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className="min-h-screen bg-[var(--bg-primary)] selection:bg-emerald-500 selection:text-black custom-scrollbar">
        {/* Scroll Progress Bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 z-[60] origin-left"
          style={{ scaleX }}
        />

        <Navbar />
        
        <main>
          <Hero />
          <About />
          <Education />
          <Skills />
          <Projects />
          <Contact />
        </main>

        <ScrollToTop />
        
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}
