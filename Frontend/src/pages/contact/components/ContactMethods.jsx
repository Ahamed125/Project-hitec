import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactMethods = () => {
  const contactMethods = [
    {
      id: 1,
      icon: "Phone",
      title: "Call Us Directly",
      description: "Speak with our admissions counselors for immediate assistance",
      primary: "+94770044268",
      secondary: "0773066411",
      hours: "Mon-Fri: (9AM-5PM)",
      action: "Call Now",
      color: "bg-blue-50 border-blue-200 text-blue-700",
      actionType: "phone"
    },
    {
      id: 2,
      icon: "Mail",
      title: "Email Support",
      description: "Get detailed responses to your questions within 24 hours",
      primary: "ainudeen@gmail.com",
      hours: "Response within 24 hours",
      action: "Send Email",
      color: "bg-green-50 border-green-200 text-green-700",
      actionType: "email"
    },
  ];

  const socialChannels = [
    { 
      name: "Facebook", 
      icon: "Facebook", 
      handle: "@Hi-Tec College", 
      color: "text-blue-600",
      url: "https://web.facebook.com/hiteccollegelk" 
    },
    { 
      name: "Twitter", 
      icon: "Twitter", 
      handle: "@EduVision_Edu", 
      color: "text-blue-400",
      url: "https://twitter.com/EduVision_Edu" 
    },
    { 
      name: "LinkedIn", 
      icon: "Linkedin", 
      handle: "EduVision Academy", 
      color: "text-blue-700",
      url: "https://linkedin.com/company/eduvision-academy" 
    },
    { 
      name: "Instagram", 
      icon: "Instagram", 
      handle: "@eduvisionacademy", 
      color: "text-pink-600",
      url: "https://instagram.com/eduvisionacademy" 
    },
    { 
      name: "YouTube", 
      icon: "Youtube", 
      handle: "@Hi-Tec College", 
      color: "text-red-600",
      url: "https://youtube.com/@ainudeenizzadeen8915?si=99dW00Y2gQL4y0mt" 
    }
  ];

  // Handle contact method actions
  const handleContactAction = (method) => {
    switch (method.actionType) {
      case 'phone':
        window.open(`tel:${method.primary}`, '_self');
        break;
      case 'email':
        window.open(`mailto:${method.primary}`, '_self');
        break;
      default:
        break;
    }
  };

  // Handle social media navigation
  const handleSocialClick = (social) => {
    switch (social.name) {
      case 'Facebook':
        window.open('https://web.facebook.com/hiteccollegelk', '_blank', 'noopener,noreferrer');
        break;
      case 'Twitter':
        window.open('https://twitter.com/EduVision_Edu', '_blank', 'noopener,noreferrer');
        break;
      case 'LinkedIn':
        window.open('https://linkedin.com/company/eduvision-academy', '_blank', 'noopener,noreferrer');
        break;
      case 'Instagram':
        window.open('https://instagram.com/eduvisionacademy', '_blank', 'noopener,noreferrer');
        break;
      case 'YouTube':
        window.open('https://youtube.com/@ainudeenizzadeen8915?si=99dW00Y2gQL4y0mt', '_blank', 'noopener,noreferrer');
        break;
      default:
        break;
    }
  };


  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 text-primary mb-4">
            <Icon name="Headphones" size={20} />
            <span className="text-sm font-medium uppercase tracking-wider">Multiple Ways to Connect</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Choose Your Preferred Contact Method
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We believe in making communication easy and accessible. Reach out through any channel that works best for you.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods?.map((method) => (
            <div key={method?.id} className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-300 hover-lift">
              <div className={`w-12 h-12 rounded-lg ${method?.color} flex items-center justify-center mb-4`}>
                <Icon name={method?.icon} size={24} />
              </div>
              
              <h3 className="text-lg font-semibold text-card-foreground mb-2">{method?.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{method?.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="text-sm font-medium text-card-foreground">{method?.primary}</div>
                {method?.secondary && (
                  <div className="text-sm text-muted-foreground">{method?.secondary}</div>
                )}
                <div className="text-xs text-muted-foreground flex items-center">
                  <Icon name="Clock" size={12} className="mr-1" />
                  {method?.hours}
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                fullWidth
                onClick={() => handleContactAction(method)}
              >
                {method?.action}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h3 className="text-xl font-semibold text-foreground mb-6">Follow Us on Social Media</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {socialChannels?.map((social) => (
              <div 
                key={social?.name} 
                className="flex items-center space-x-3 bg-card rounded-lg px-4 py-3 border border-border hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105"
                onClick={() => handleSocialClick(social)}
              >
                <Icon name={social?.icon} size={20} className={social?.color} />
                <div className="text-left">
                  <div className="text-sm font-medium text-card-foreground">{social?.name}</div>
                  <div className="text-xs text-muted-foreground">{social?.handle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMethods;