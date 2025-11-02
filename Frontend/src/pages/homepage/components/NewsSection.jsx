import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

gsap?.registerPlugin(ScrollTrigger);

const NewsSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  const upcomingEvents = [
    {
      id: 1,
      title: "Virtual Career Fair 2024",
      date: "2024-11-15",
      time: "10:00 AM - 4:00 PM EST",
      type: "Virtual Event",
      description: "Connect with top employers and explore career opportunities across various industries.",
      registrations: 2847,
      image: "https://images.unsplash.com/photo-1551830410-95f3f2ce0b5a",
      imageAlt: "Virtual career fair with professionals networking online"
    },
    {
      id: 2,
      title: "AI in Education Webinar",
      date: "2024-11-08",
      time: "2:00 PM - 3:30 PM EST",
      type: "Webinar",
      description: "Learn how artificial intelligence is transforming modern education and career development.",
      registrations: 1523,
      image: "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4",
      imageAlt: "AI technology presentation in educational setting"
    },
   
  ];

  useEffect(() => {
    const ctx = gsap?.context(() => {
      gsap?.fromTo(titleRef?.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef?.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      cardsRef?.current?.forEach((card, index) => {
        if (card) {
          gsap?.fromTo(card,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx?.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef?.current?.includes(el)) {
      cardsRef?.current?.push(el);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'Virtual Event':
        return 'bg-blue-100 text-blue-800';
      case 'Webinar':
        return 'bg-purple-100 text-purple-800';
      case 'In-Person':
        return 'bg-green-100 text-green-800';
      case 'Hybrid Event':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-1 bg-gradient-primary rounded-full"></div>
            <span className="text-sm font-semibold text-primary tracking-wider uppercase">
              Upcoming Events
            </span>
            <div className="w-12 h-1 bg-gradient-primary rounded-full"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            <span className="text-gradient font-accent">Join Our Events</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover upcoming workshops, webinars, and networking events designed to enhance your learning experience and career growth.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents?.map((event, index) => (
            <div
              key={event?.id}
              ref={addToRefs}
              className="bg-card rounded-2xl overflow-hidden shadow-brand-md border border-border hover:shadow-brand-lg transition-all duration-300 hover-lift group"
            >
              {/* Event Image */}
              <div className="relative overflow-hidden">
                <Image
                  src={event?.image}
                  alt={event?.imageAlt}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getEventTypeColor(event?.type)}`}>
                    {event?.type}
                  </span>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Icon name="Calendar" size={16} />
                    <span>{formatDate(event?.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={16} />
                    <span>{event?.registrations} registered</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 cursor-pointer line-clamp-2">
                  {event?.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed line-clamp-2">
                  {event?.description}
                </p>

                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Clock" size={16} />
                  <span>{event?.time}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <Button variant="outline" size="sm">
                    Add to Calendar
                  </Button>
                  <Button variant="primary" size="sm" iconName="ArrowRight" iconPosition="right">
                    Register Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div ref={addToRefs} className="text-center mt-16">
          <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-white">
            <Icon name="Calendar" size={48} color="white" className="mx-auto mb-6" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Never Miss an Event</h3>
        
    
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;