import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);

  const heroSlides = [
  {
    id: 1,
    title: "Unlock Your Potential",
    subtitle: "Transform your future with world-class education and cutting-edge learning experiences",
    description: "Join thousands of successful graduates who have accelerated their careers through our innovative programs designed for the modern learner.",
    image: "https://images.unsplash.com/photo-1592303637753-ce1e6b8a0ffb",
    imageAlt: "Diverse group of students collaborating on laptops in modern classroom with natural lighting",
  },
  {
    id: 2,
    title: "Excellence in Education",
    subtitle: "Learn from industry experts and world-renowned faculty members",
    description: "Our distinguished faculty brings real-world experience and academic excellence to create transformative learning experiences that prepare you for success.",
    image: "https://images.unsplash.com/photo-1701777508358-833de8c614ec",
    imageAlt: "Professional instructor teaching engaged students in modern lecture hall with interactive whiteboard",
  },
  {
    id: 3,
    title: "Your Success is Our Mission",
    subtitle: "Join a community of achievers and unlock limitless possibilities",
    description: "With 95% job placement rate and alumni working at top companies worldwide, we're committed to your success every step of the way.",
    image: "https://images.unsplash.com/photo-1665567031505-49c536110178",
    imageAlt: "Happy graduates in caps and gowns celebrating at outdoor graduation ceremony with university building in background",
  }];


  const [currentSlide, setCurrentSlide] = React.useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(titleRef.current,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    ).
    fromTo(subtitleRef.current,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
    "-=0.5"
    ).
    fromTo(ctaRef.current,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
    "-=0.3"
    );

    gsap.fromTo(imageRef.current,
    { opacity: 0, scale: 1.1 },
    { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
    );

    // Auto-slide functionality
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section ref={heroRef} className="relative min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content Section */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-1 bg-gradient-primary rounded-full"></div>
                <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                  Transform Your Future
                </span>
              </div>
              
              <h1 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                <span className="text-gradient font-accent">{currentSlideData.title}</span>
              </h1>
              
              <p ref={subtitleRef} className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed">
                {currentSlideData.subtitle}
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                {currentSlideData.description}
              </p>
            </div>
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-border">
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={20} className="text-primary" />
                <span className="text-sm font-semibold text-foreground">50,000+ Students</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={20} className="text-accent" />
                <span className="text-sm font-semibold text-foreground">95% Success Rate</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={20} className="text-accent" />
                <span className="text-sm font-semibold text-foreground">4.9/5 Rating</span>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div ref={imageRef} className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={currentSlideData.image}
                alt={currentSlideData.imageAlt}
                className="w-full h-[500px] object-cover" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-full animate-float"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>

        {/* Slide Controls */}
        <div className="flex items-center justify-center space-x-6 mt-12">

          <div className="flex space-x-3">
            {heroSlides.map((_, index) =>
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ?
              'bg-primary w-8' : 'bg-border hover:bg-muted-foreground'}`
              }
              aria-label={`Go to slide ${index + 1}`} />

            )}
          </div>
        </div>
      </div>
    </section>);

};

export default HeroSection;