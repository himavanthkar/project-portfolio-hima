import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, User, Code, Briefcase, GraduationCap, Moon, Sun, Brain, Database, Award, ChevronRight, ExternalLink } from 'lucide-react';
import { ExperienceCard } from './components/ExperienceCard';
import { ResumeDownload } from './components/Resume';

// Dark mode hook
const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return [isDark, setIsDark] as const;
};

// Project data
const projectData = [
  {
    title: "Peer Support Website",
    period: "Jan 2024 - Present",
    description: "A real-time distributed system for peer support and communication",
    details: {
      situation: "Users needed a platform to connect and communicate in real-time.",
      task: "Build a real-time peer support platform using WebSockets and SignalR.",
      action: "Deployed the application on Azure App Service, used Azure SQL Database for storage, and implemented Redis for distributed caching. Designed a Power BI dashboard to visualize user engagement metrics.",
      result: "Improved system performance by 25% and enabled real-time communication for over 1,000 users."
    },
    technologies: ["React", "SignalR", "Azure", "Redis", "Power BI"],
    githubUrl: "https://github.com/himavanthkar/peer-support-platform",
    demoUrl: "https://peer-support.azurewebsites.net"
  },
  {
    title: "Distributed Task Scheduler",
    period: "Feb 2024 - Aug 2024",
    description: "A Kubernetes-based distributed task scheduler using C# and .NET Core",
    details: {
      situation: "Needed a scalable solution to manage and distribute tasks across multiple nodes.",
      task: "Build a distributed task scheduler using C# and .NET Core.",
      action: "Deployed the scheduler on Azure Kubernetes Service (AKS), used Azure Service Bus for task distribution, and implemented Prometheus/Grafana for monitoring.",
      result: "Achieved high availability and scalability, with a 30% improvement in task execution efficiency."
    },
    technologies: ["C#", ".NET Core", "Kubernetes", "Azure Service Bus", "Prometheus"],
    githubUrl: "https://github.com/himavanthkar/distributed-task-scheduler",
    demoUrl: "https://task-scheduler.azurewebsites.net"
  },
  {
    title: "AI Movie Recommendation System",
    period: "Aug 2024 - Dec 2024",
    description: "Real-time movie recommendation system with analytics",
    details: {
      situation: "Needed a scalable recommendation system with real-time analytics for user engagement.",
      task: "Develop a recommendation system using collaborative filtering and deep learning models.",
      action: "Built scalable data pipelines with Kafka for streaming and Spark for batch processing.",
      result: "Improved recommendation accuracy by 20% and enabled real-time analytics for over 10,000 users."
    },
    technologies: ["Python", "Kafka", "Spark", "Kubernetes", "Deep Learning"],
    githubUrl: "https://github.com/himavanthkar/movie-recommender",
    demoUrl: "https://movie-recommender.azurewebsites.net"
  }
];

// Experience data
const experienceData = [
  {
    title: "Software Engineer Intern",
    company: "WINIT TECHNOLOGY PRIVATE SOLUTIONS LIMITED",
    period: "Apr 2023 - Aug 2024",
    description: [
      "Automated Azure infrastructure provisioning using Terraform, reducing cloud migration time by 25% and increasing infrastructure automation by 20%.",
      "Optimized resource allocation using auto-scaling, reducing computational costs by 30%.",
      "Designed and implemented CI/CD pipelines using Jenkins and GitHub Actions.",
      "Containerized applications using Docker and orchestrated deployments with Kubernetes."
    ],
    starDetails: {
      situation: "The company needed to migrate its infrastructure to the cloud with minimal downtime and manual intervention.",
      task: "Automate cloud infrastructure provisioning and optimize resource allocation.",
      action: "Used Terraform to automate Azure infrastructure provisioning, managed services like Azure VMs, Azure SQL, Blob Storage, and Azure Functions.",
      result: "Reduced cloud migration time by 25%, increased automation by 20%, and cut computational costs by 30%."
    }
  },
  {
    title: "Undergraduate Research Assistant",
    company: "UDAAN AI AND ML RESEARCH LAB, KMIT",
    period: "Mar 2020 - Aug 2022",
    description: [
      "Developed a full-stack web application for medical imaging analysis with 97% accuracy.",
      "Built frontend using React.js and backend with Flask.",
      "Deployed CNN models using TensorFlow Serving and Docker.",
      "Created data preprocessing pipelines with Python and OpenCV."
    ],
    starDetails: {
      situation: "Doctors needed a faster and more accurate way to detect cancer from CT scans.",
      task: "Develop a full-stack web application for medical imaging analysis.",
      action: "Built the frontend using React.js, backend with Flask, and deployed CNN models.",
      result: "Achieved 97% accuracy in cancer detection and reduced diagnosis time by 40%."
    }
  }
];

// Recognition data
const recognitionData = [
  {
    title: "Stanford TreeHacks Winner 2024",
    description: "Awarded for developing an AI-powered privacy policy summarizer."
  },
  {
    title: "Top 4 Finalist – Mozilla Hackathon 2024",
    description: "Created a real-time collaborative platform using distributed systems."
  },
  {
    title: "Top 20% LeetCode Community",
    description: "Demonstrated strong proficiency in data structures and algorithms."
  },
  {
    title: "Research Associate",
    description: "Leading a team of 3 researchers to improve computer vision models at SJSU (Jan 2025-Present)"
  }
];

// Skills data
const skillsData = {
  languages: ["Python", "JavaScript", "Java", "C++", "Go", "C#"],
  frameworks: ["React.js", "Flask", "FastAPI", ".NET", "PyTorch", "TensorFlow"],
  cloud: ["Azure", "AWS", "Docker", "Kubernetes", "Terraform"],
  databases: ["MongoDB", "Azure SQL", "Redis", "Firebase", "RDS"],
  tools: ["Jenkins", "GitHub Actions", "Azure DevOps", "Power BI", "Tableau"]
};

function App() {
  const [isDark, setIsDark] = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
    alert('Thank you for your message! I will get back to you soon.');
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              <a href="#home" className={`${isDark ? 'text-white' : 'text-gray-900'}`}>HK</a>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className={`${isDark ? 'text-gray-300' : 'text-gray-600'} hover:text-blue-600`}>About</a>
              <a href="#experience" className={`${isDark ? 'text-gray-300' : 'text-gray-600'} hover:text-blue-600`}>Experience</a>
              <a href="#projects" className={`${isDark ? 'text-gray-300' : 'text-gray-600'} hover:text-blue-600`}>Projects</a>
              <a href="#skills" className={`${isDark ? 'text-gray-300' : 'text-gray-600'} hover:text-blue-600`}>Skills</a>
              <a href="#contact" className={`${isDark ? 'text-gray-300' : 'text-gray-600'} hover:text-blue-600`}>Contact</a>
              <ResumeDownload />
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-full ${isDark ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'}`}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className={`pt-24 ${isDark ? 'bg-gradient-to-r from-blue-900 to-purple-900' : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600'} text-white`}>
        <div className="container mx-auto px-6 py-24">
          <div className="flex flex-col items-center text-center">
            <div className="w-48 h-48 mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src="/profile.png"
                alt="Himavanth Karpurapu"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Himavanth Karpurapu</h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-4">
              Master's Student in Computer Science | AI, Machine Learning, and Data Engineering Enthusiast
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://github.com/himavanthkar" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/himavanth-karpurapu-6907561b3/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:himvanth89@gmail.com" className="hover:text-blue-200 transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className={`py-20 ${isDark ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
          <div className="max-w-3xl mx-auto text-lg leading-relaxed">
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              I specialize in Software Development, Artificial Intelligence, and Data Engineering. With a strong academic foundation in Computer Science, I bring a passion for leveraging Artificial Intelligence to address meaningful challenges. Currently pursuing my Master's degree in Computer Science at San Jose State University, I have completed my first semester, focusing on Machine Learning, Data Mining, and Neural Networks. These areas have shaped my understanding of how AI can be applied to solve complex, real-world problems.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={`py-20 ${isDark ? 'bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900' : 'bg-gradient-to-br from-gray-100 via-indigo-50 to-gray-100'}`}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Experience</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-600 opacity-30"></div>
            <div className="space-y-12">
              {experienceData.map((experience, index) => (
                <div key={index} className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -mt-2">
                    <div className="w-4 h-4 rounded-full bg-blue-600"></div>
                  </div>
                  <div className={`${index % 2 === 0 ? 'pr-8 md:ml-auto md:pr-0 md:pl-8 md:w-1/2' : 'pl-8 md:mr-auto md:pl-0 md:pr-8 md:w-1/2'}`}>
                    <ExperienceCard {...experience} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 ${isDark ? 'bg-gradient-to-tl from-gray-800 via-blue-900 to-gray-800' : 'bg-gradient-to-tl from-white via-blue-50 to-white'}`}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectData.map((project, index) => (
              <div key={index} className={`rounded-lg shadow-lg overflow-hidden ${isDark ? 'bg-gray-700 hover:bg-gray-600 transition-colors' : 'bg-white hover:bg-gray-50 transition-colors'}`}>
                <img 
                  src={
                    index === 0 ? "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=2894&ixlib=rb-4.0.3"
                    : index === 1 ? "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?auto=format&fit=crop&q=80&w=2925&ixlib=rb-4.0.3"
                    : "https://images.unsplash.com/photo-1594904351111-a072f80b1a71?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3"
                  }
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-700"
                    >
                      <Github className="w-4 h-4 mr-1" />
                      Code
                    </a>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-700"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 ${isDark ? 'bg-gradient-to-tr from-gray-900 via-purple-900 to-gray-900' : 'bg-gradient-to-tr from-gray-50 via-purple-50 to-gray-50'}`}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className={`p-6 rounded-lg shadow-lg ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} transition-colors duration-300`}>
              <div className="flex items-center mb-4">
                <Code className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold">Programming Languages</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillsData.languages.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm hover:bg-blue-200 transition-colors duration-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className={`p-6 rounded-lg shadow-lg ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} transition-colors duration-300`}>
              <div className="flex items-center mb-4">
                <Briefcase className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold">Frameworks</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillsData.frameworks.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm hover:bg-blue-200 transition-colors duration-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className={`p-6 rounded-lg shadow-lg ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} transition-colors duration-300`}>
              <div className="flex items-center mb-4">
                <Brain className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold">Cloud</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillsData.cloud.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm hover:bg-blue-200 transition-colors duration-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className={`p-6 rounded-lg shadow-lg ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} transition-colors duration-300`}>
              <div className="flex items-center mb-4">
                <Database className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold">Databases</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillsData.databases.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm hover:bg-blue-200 transition-colors duration-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className={`p-6 rounded-lg shadow-lg ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} transition-colors duration-300`}>
              <div className="flex items-center mb-4">
                <ChevronRight className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold">Tools</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillsData.tools.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm hover:bg-blue-200 transition-colors duration-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className={`py-20 ${isDark ? 'bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900' : 'bg-gradient-to-r from-gray-50 via-indigo-50 to-gray-50'}`}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Awards & Recognition</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className={`p-6 rounded-lg shadow-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600 transition-colors' : 'bg-white hover:bg-gray-50 transition-colors'}`}>
              <div className="flex items-start">
                <Award className="w-8 h-8 text-blue-600 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">WINIR Award</h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Recognized for outstanding contribution to research in AI and healthcare applications.
                  </p>
                </div>
              </div>
            </div>
            {recognitionData.map((item, index) => (
              <div key={index} className={`p-6 rounded-lg shadow-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600 transition-colors' : 'bg-white hover:bg-gray-50 transition-colors'}`}>
                <div className="flex items-start">
                  <Award className="w-8 h-8 text-blue-600 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 ${isDark ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900' : 'bg-gradient-to-br from-gray-100 via-blue-50 to-gray-100'}`}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Get In Touch</h2>
          <div className="max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-2 rounded-md border ${
                    isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-2 rounded-md border ${
                    isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full px-4 py-2 rounded-md border ${
                    isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${isDark ? 'bg-gray-800' : 'bg-gray-900'} text-white py-8`}>
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="https://github.com/himavanthkar" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/himavanth-karpurapu-6907561b3/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:himvanth89@gmail.com" className="hover:text-blue-400 transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </div>
          <p>© 2024 Himavanth Karpurapu. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;