import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef(null);

  const quickStats = [
    { number: "50,000+", label: "Active Students", icon: "Users" },
    { number: "500+", label: "Expert Instructors", icon: "GraduationCap" },
    { number: "1,200+", label: "Courses Available", icon: "BookOpen" },
    { number: "95%", label: "Job Placement Rate", icon: "TrendingUp" }
  ];

  const ctaOptions = [
    {
      title: "Start Learning Today",
      description: "Browse our comprehensive course catalog and begin your transformation journey",
      icon: "BookOpen",
      buttonText: "Explore Courses",
      buttonVariant: "default",
      link: "/courses",
      highlight: true
    },
    {
      title: "Schedule a Consultation",
      description: "Get personalized guidance from our education counselors",
      icon: "MessageCircle",
      buttonText: "Book Consultation",
      buttonVariant: "outline",
      link: "/contact",
      highlight: false
    },
    {
      title: "Download Brochure",
      description: "Get detailed information about our programs and facilities",
      icon: "Download",
      buttonText: "Get Brochure",
      buttonVariant: "ghost",
      link: "#",
      highlight: false
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(statsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-primary via-primary to-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2523ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/20 rounded-full animate-float" style={{animationDelay: '4s'}}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Content */}
        <div ref={contentRef} className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-1 bg-white/50 rounded-full"></div>
            <span className="text-sm font-semibold text-white/90 tracking-wider uppercase">
              Ready to Transform Your Future?
            </span>
            <div className="w-12 h-1 bg-white/50 rounded-full"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="font-accent">Your Success Journey</span>
            <br />
            <span className="text-accent">Starts Here</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-12">
            Join thousands of successful graduates who have transformed their careers through our world-class education programs. Take the first step towards unlocking your potential today.
          </p>

          {/* CTA Options Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {ctaOptions.map((option, index) => (
              <div
                key={index}
                className={`relative p-6 rounded-2xl border transition-all duration-300 hover-lift ${
                  option.highlight 
                    ? 'bg-white text-foreground border-white shadow-brand-lg' 
                    : 'bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20'
                }`}
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto ${
                    option.highlight ? 'bg-gradient-primary' : 'bg-white/20'
                  }`}>
                    <Icon 
                      name={option.icon} 
                      size={24} 
                      color={option.highlight ? "white" : "currentColor"} 
                    />
                  </div>
                  
                  <h3 className={`text-lg font-bold ${
                    option.highlight ? 'text-foreground' : 'text-white'
                  }`}>
                    {option.title}
                  </h3>
                  
                  <p className={`text-sm leading-relaxed ${
                    option.highlight ? 'text-muted-foreground' : 'text-white/80'
                  }`}>
                    {option.description}
                  </p>
                  
                  <Button
                    variant={option.highlight ? "default" : option.buttonVariant}
                    size="sm"
                    fullWidth
                    className={option.highlight ? "bg-gradient-accent" : ""}
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    {option.link.startsWith('/') ? (
                      <Link to={option.link} className="flex items-center justify-center w-full">
                        {option.buttonText}
                      </Link>
                    ) : (
                      option.buttonText
                    )}
                  </Button>
                </div>

                {option.highlight && (
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                    <Icon name="Star" size={14} color="white" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/80">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={20} />
              <span className="text-sm font-medium">Accredited Institution</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={20} />
              <span className="text-sm font-medium">Industry Recognized</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={20} />
              <span className="text-sm font-medium">50,000+ Alumni Network</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={20} />
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name={stat.icon} size={24} color="white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-sm text-white/80 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <Icon name="Phone" size={16} color="white" />
            <span className="text-white font-medium">Need help choosing? Call us at</span>
            <a href="tel:+1-800-EDU-VISION" className="text-accent font-bold hover:text-white transition-colors duration-300">
           +94770044268
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;