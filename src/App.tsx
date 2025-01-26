import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, User, Code, Briefcase, GraduationCap, Moon, Sun, Brain, Database, Award, ChevronRight } from 'lucide-react';

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
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    // Reset form
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
      <header id="home" className={`pt-24 ${isDark ? 'bg-gradient-to-r from-blue-900 to-purple-900' : 'bg-gradient-to-r from-blue-600 to-indigo-700'} text-white`}>
        <div className="container mx-auto px-6 py-24">
          <div className="flex flex-col items-center text-center">
            <User className="w-24 h-24 mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Himavanth Karpurapu</h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-4">
              Master's Student in Computer Science | AI, Machine Learning, and Data Engineering Enthusiast
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://github.com/himavanthkar/himavanthkar/blob/main/README.md" className="hover:text-blue-200 transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/himavanth-karpurapu-6907561b3/" className="hover:text-blue-200 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:himmvanth89@gmail.com" className="hover:text-blue-200 transition-colors">
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
              Hi, I'm Himavanth Karpurapu! I'm currently pursuing my Master's in Computer Science at San Jose State University (SJSU).
              I specialize in Software Development, Artificial Intelligence, and Data Engineering. My passion lies in developing
              AI-driven solutions that can make a real impact in the healthcare and technology sectors.
            </p>
            <p className={`mt-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              With a strong foundation in computer science and a keen interest in cutting-edge technologies,
              I aspire to work on innovative AI projects at companies like NVIDIA. My experience includes
              working on biomedical challenges at Geoparadigm and conducting research in AI and data mining.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={`py-20 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Experience</h2>
          <div className="max-w-4xl mx-auto">
            <div className={`mb-8 p-6 rounded-lg shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-start">
                <Briefcase className="w-8 h-8 text-blue-600 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Internship at Geoparadigm</h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                    Worked on cutting-edge biomedical challenges, developing innovative solutions using AI and machine learning techniques.
                    Collaborated with cross-functional teams to implement and optimize algorithms for medical data analysis.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">AI</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">Machine Learning</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">Python</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={`mb-8 p-6 rounded-lg shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-start">
                <Brain className="w-8 h-8 text-blue-600 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Research Projects</h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                    Led multiple research projects in AI and data mining, focusing on practical applications
                    in healthcare and technology sectors. Published findings in respected academic journals.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">Research</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">Data Mining</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">Healthcare AI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 ${isDark ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className={`rounded-lg shadow-lg overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
              <img 
                src="https://images.unsplash.com/photo-1558244661-d248897f7bc4?auto=format&fit=crop&w=800&q=80" 
                alt="Brain Tumor Detection" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Brain Tumor Detection</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  Developed a CNN-based system for early detection of brain tumors using medical imaging data.
                  Achieved 95% accuracy in tumor classification and segmentation.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">Python</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">TensorFlow</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">CNN</span>
                </div>
                <button className="flex items-center text-blue-600 hover:text-blue-700">
                  View Details <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>

            <div className={`rounded-lg shadow-lg overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
              <img 
                src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80" 
                alt="EEG Visualization" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">EEG Visualization Platform</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  Created an interactive platform for visualizing and analyzing EEG brain activity data.
                  Implemented real-time processing and 3D visualization features.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">React</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">Three.js</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">WebGL</span>
                </div>
                <button className="flex items-center text-blue-600 hover:text-blue-700">
                  View Details <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className={`p-6 rounded-lg shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <Code className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Programming</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>C++</span>
                    <span>90%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Python</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-lg shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <Brain className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">AI & ML</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Neural Networks</span>
                    <span>95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Computer Vision</span>
                    <span>80%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-lg shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <Database className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Data Engineering</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>SQL</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Big Data</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Awards & Achievements</h2>
          <div className="max-w-3xl mx-auto">
            <div className={`p-6 rounded-lg shadow-lg ${isDark ? 'bg-gray-700' : 'bg-white'} mb-6`}>
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
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
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
                  className={`w-full px-4 py-2 rounded-md ${
                    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
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
                  className={`w-full px-4 py-2 rounded-md ${
                    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
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
                  className={`w-full px-4 py-2 rounded-md ${
                    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
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
            <a href="https://github.com" className="hover:text-blue-400 transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" className="hover:text-blue-400 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:himavanth@example.com" className="hover:text-blue-400 transition-colors">
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