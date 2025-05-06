import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import companyLogo from '../assets/Images/CompanyLogo.png';

const Home = () => {
  const [activeTab, setActiveTab] = useState('reviews');
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const reviews = [
    {
      name: 'Sarah Johnson',
      role: 'HR Manager',
      company: 'TechCorp',
      text: 'ERS has revolutionized our employee management process. The automation features have saved us countless hours of manual work.'
    },
    {
      name: 'Michael Chen',
      role: 'Operations Director',
      company: 'Innovate Solutions',
      text: 'The performance tracking system is incredibly intuitive. It has helped us identify high-potential employees and areas for improvement.'
    }
  ];

  const features = [
    {
      title: 'Smart Performance Tracking',
      description: 'Automated performance metrics with real-time analytics',
      icon: '🚀'
    },
    {
      title: 'Comprehensive Analytics',
      description: 'Detailed insights into team performance and growth',
      icon: '📊'
    },
    {
      title: 'Customizable Workflows',
      description: 'Tailor-made processes for different departments',
      icon: '⚙️'
    },
    {
      title: 'Real-time Collaboration',
      description: 'Seamless team communication and task management',
      icon: '👥'
    }
  ];

  const solutions = [
    {
      title: 'Employee Onboarding',
      description: 'Streamline the onboarding process with automated workflows and training modules'
    },
    {
      title: 'Performance Management',
      description: 'Track and improve employee performance with real-time analytics and feedback'
    },
    {
      title: 'Workforce Planning',
      description: 'Optimize your workforce with predictive analytics and resource allocation tools'
    }
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    if (activeTab === 'reviews') {
      return (
        <div className="grid gap-8 sm:grid-cols-2 p-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl p-6"
              style={{ animationDelay: `${(index + 1) * 0.2}s` }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#4361ee] to-[#4895ef] flex items-center justify-center text-white text-xl">
                  {review.name[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{review.name}</h3>
                  <p className="text-gray-500 text-sm">{review.role} at {review.company}</p>
                </div>
              </div>
              <hr className="border-t-2 border-[#4361ee]/20 mb-4" />
              <p className="text-gray-600 leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="text-center p-8 text-gray-500 text-lg">
          ....NO UPDATES...STAY TUNED
        </div>
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f7fa] to-[#e5e7eb]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#4361ee]"></div>
      </div>
    );
  }

  return (
    <div className="font-montserrat text-[#1a1a1a] bg-[#f5f7fa] min-h-screen antialiased overflow-x-hidden">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#fcfdff] to-[#eeebeb] shadow-lg fixed w-full top-0 z-[1000]">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={companyLogo}
              alt="Company Logo"
              className="h-10 w-10 transition-transform duration-400 hover:scale-110"
            />
            <h1 className="text-xl font-bold text-[#212529]">Employee Management System</h1>
          </Link>
          <div className="flex space-x-4">
            <Link to="/LoginasEmployee">
              <button className="bg-[#1e3a8a] text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-400 hover:bg-[#2b4db5] hover:scale-105">
                Login as Employee
              </button>
            </Link>
            <Link to="/create-organization">
              <button className="bg-[#1e3a8a] text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-400 hover:bg-[#2b4db5] hover:scale-105">
                Create Organization
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex justify-center items-center p-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a35]/90 to-[#0f0f23]/95">
          <div className="absolute inset-0 bg-[url('https://imgcdn.stablediffusionweb.com/2024/5/4/05d40a4d-aa4a-46dd-9325-f9eec372598f.jpg')] bg-cover bg-center opacity-20"></div>
        </div>
        <div className="relative max-w-6xl z-10">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#4361ee] to-[#4895ef]">
              Transform Your Organization
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Modern employee management system that streamlines processes and enhances productivity
            </p>
          </div>
          <div className="flex justify-center gap-6">
            <Link to="/PricingPlan">
              <button className="bg-white text-[#1e3a8a] px-8 py-4 rounded-full font-semibold text-lg transition-all duration-400 hover:bg-[#f0f4ff] hover:shadow-lg">
                Get Started
              </button>
            </Link>
            
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Solutions</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              >
                <div className="text-4xl text-[#4361ee] mb-4">{index + 1}</div>
                <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
                <p className="text-gray-600">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              >
                <div className="text-4xl text-[#4361ee] mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">What Our Clients Say</h2>
          <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg">
            <div className="flex justify-center space-x-4 mb-8">
              <button
                onClick={() => handleTabClick('reviews')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-400 ${
                  activeTab === 'reviews'
                    ? 'bg-gradient-to-r from-[#4361ee] to-[#4895ef] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Reviews
              </button>
              <button
                onClick={() => handleTabClick('updates')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-400 ${
                  activeTab === 'updates'
                    ? 'bg-gradient-to-r from-[#4361ee] to-[#4895ef] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Updates
              </button>
            </div>
            {renderContent()}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#212529] text-white pt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Employee Management System</h2>
              <p className="text-gray-400 mb-6">
                Simplifying workforce management with intuitive tools and efficient solutions.
              </p>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'linkedin', 'instagram'].map((social, index) => (
                  <a
                    key={index}
                    href={`#${social}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <i className={`fab fa-${social} text-xl`} />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li><a href="#home" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-6">Contact Us</h3>
              <div className="space-y-4">
                <p className="text-gray-400">
                  <i className="fas fa-envelope mr-2" /> support@employeemanagement.com
                </p>
                <p className="text-gray-400">
                  <i className="fas fa-phone mr-2" /> +1 (234) 567-890
                </p>
                <p className="text-gray-400">
                  <i className="fas fa-map-marker-alt mr-2" /> 123 Corporate Way, Business City
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p> 2024 Employee Management System. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .hero-image {
          animation: float 6s ease-in-out infinite;
        }
        
        .section-header {
          animation: fadeInUp 1s ease-out forwards;
        }
        
        .feature-card {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Home;