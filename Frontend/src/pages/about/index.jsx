import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import MissionValues from './components/MissionValues';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>About Hi-Tec College | Where Knowledge Meets Innovation</title>
        <meta name="description" content="Discover EduVision Academy's mission to transform lives through exceptional education. Learn about our 15-year journey, world-class faculty, accreditations, and commitment to educational excellence." />
        <meta name="keywords" content="about eduvision academy, educational excellence, accredited university, innovative learning, faculty profiles, campus tour, educational mission" />
        <meta property="og:title" content="About EduVision Academy | Where Knowledge Meets Innovation" />
        <meta property="og:description" content="Discover our mission to transform lives through exceptional education, innovative teaching methods, and commitment to student success." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/about" />
      </Helmet>

      <Header />
      
      <main className="pt-16">
        <HeroSection />
        <MissionValues />
      </main>
    </div>
  );
};

export default About;