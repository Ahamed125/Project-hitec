import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import CTASection from './components/CTASection';
import NewsSection from './components/NewsSection';

const Homepage = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Hi-Tec College - Unlock Your Potential | Excellence in Education</title>
        <meta name="description" content="Transform your future with EduVision Academy's world-class education programs. Join 50,000+ successful graduates with 95% job placement rate. Start your learning journey today." />
        <meta name="keywords" content="online education, career development, professional courses, skill training, certification programs, EduVision Academy" />
        <meta property="og:title" content="EduVision Academy - Unlock Your Potential" />
        <meta property="og:description" content="Transform your future with world-class education and cutting-edge learning experiences. Join thousands of successful graduates." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://eduvision.academy" />
        <link rel="canonical" href="https://eduvision.academy" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="relative">
          {/* Hero Section - Multi-layered entry experience */}
          <HeroSection />
          <NewsSection/>
          <CTASection />
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Brand Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">H</span>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gradient font-accent">Hi-Tec</div>
                    <div className="text-xs text-muted-foreground tracking-wider">College</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Transforming lives through world-class education and innovative learning experiences.
                </p>
                <div className="flex space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors duration-300 cursor-pointer">
                    <span className="text-primary text-sm font-bold">f</span>
                  </div>
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors duration-300 cursor-pointer">
                    <span className="text-primary text-sm font-bold">t</span>
                  </div>
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors duration-300 cursor-pointer">
                    <span className="text-primary text-sm font-bold">in</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/courses" className="text-muted-foreground hover:text-primary transition-colors duration-300">All Courses</a></li>
                  <li><a href="/faculty" className="text-muted-foreground hover:text-primary transition-colors duration-300">Our Faculty</a></li>
                  <li><a href="/facilities" className="text-muted-foreground hover:text-primary transition-colors duration-300">Facilities</a></li>
                  <li><a href="/about" className="text-muted-foreground hover:text-primary transition-colors duration-300">About Us</a></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Support</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/contact" className="text-muted-foreground hover:text-primary transition-colors duration-300">Contact Us</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Help Center</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Student Portal</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Career Services</a></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Contact Info</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>📍 7/2, waragashinna, Akurana-06, Kandy, Sri Lanka, 20850</div>
                  <div>📞 Verification: 0773066411</div>
                  <div>📞 General: 0770044268</div>
                  <div>✉️ ainudeen@gmail.com</div>
                  <div>🕒 Mon-Sun: 9.00 A.M to 5.00 P.M</div>
                </div>
              </div>
            </div>

            <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
              <div className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear() } Hi-Tec College. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm text-muted-foreground mt-4 md:mt-0">
                <a href="#" className="hover:text-primary transition-colors duration-300">Privacy Policy</a>
                <a href="#" className="hover:text-primary transition-colors duration-300">Terms of Service</a>
                <a href="#" className="hover:text-primary transition-colors duration-300">Accessibility</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Homepage;