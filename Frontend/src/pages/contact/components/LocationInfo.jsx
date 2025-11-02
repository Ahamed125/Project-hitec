import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationInfo = () => {
  const campusLocations = [
    {
      id: 1,
      name: "Main Campus",
      address: "7/2, Waragashinna, Akurana-06, Kandy, Sri Lanka, 20850",
      phone: "0770044268",
      email: "ainudeen@gmail.com",
      hours: {
        weekdays: "Monday - Friday: 9.00 A.M to 5.00 P.M",
        saturday: "Saturday: 9.00 A.M to 5.00 P.M",
        sunday: "Sunday: Closed"
      },
      services: [
        "Admissions Office",
        "Student Services",
        "Library",
        "Computer Labs",
        "Cafeteria"
      ],
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.444193312178!2d80.6174838!3d7.3654368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3431a62170153%3A0xbd83f5eb0d99c647!2sHi-Tec%20College%20Akurana!5e0!3m2!1sen!2slk!4v1730270000000!5m2!1sen!2slk",
      isPrimary: true
    },
  ];

  const transportationOptions = [
    {
      icon: "Car",
      title: "Driving",
      description: "Free parking available on campus",
      details: "500+ parking spaces, visitor parking near main entrance"
    },
    {
      icon: "Bus",
      title: "Public Transit",
      description: "Multiple bus routes serve our campus",
      details: "Routes 15, 23, 42 stop directly at campus entrance"
    },
    {
      icon: "Train",
      title: "Metro Rail",
      description: "Education Station - 5 minute walk",
      details: "Blue and Green lines, accessible platform"
    },
    {
      icon: "Bike",
      title: "Cycling",
      description: "Bike-friendly campus with secure storage",
      details: "Covered bike racks and repair station available"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 text-primary mb-4">
            <Icon name="MapPin" size={20} />
            <span className="text-sm font-medium uppercase tracking-wider">Visit Us</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Campus Locations & Directions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We have multiple convenient locations to serve you better. Visit us in person or take a virtual tour.
          </p>
        </div>

        {/* Campus Locations */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {campusLocations.map((campus) => (
            <div key={campus.id} className="bg-card rounded-xl border border-border overflow-hidden">
              {/* Map */}
              <div className="h-64 bg-muted relative">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title={campus.name}
                  referrerPolicy="no-referrer-when-downgrade"
                  src={campus.mapEmbedUrl}
                  className="border-0"
                />
                {campus.isPrimary && (
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Main Campus
                  </div>
                )}
              </div>

              {/* Campus Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-card-foreground mb-4">{campus.name}</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <Icon name="MapPin" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-card-foreground font-medium">Address</p>
                      <p className="text-muted-foreground text-sm">{campus.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Icon name="Phone" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-card-foreground font-medium">Phone</p>
                      <p className="text-muted-foreground text-sm">{campus.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Icon name="Mail" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-card-foreground font-medium">Email</p>
                      <p className="text-muted-foreground text-sm">{campus.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Icon name="Clock" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-card-foreground font-medium">Hours</p>
                      <div className="text-muted-foreground text-sm space-y-1">
                        <p>{campus.hours.weekdays}</p>
                        <p>{campus.hours.saturday}</p>
                        <p>{campus.hours.sunday}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-6">
                  <p className="text-card-foreground font-medium mb-2">Available Services</p>
                  <div className="flex flex-wrap gap-2">
                    {campus.services.map((service, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() =>
                      window.open(
                        "https://www.google.com/maps/dir/?api=1&destination=Hi-Tec+College+Akurana,+Kandy,+Sri+Lanka",
                        "_blank"
                      )
                    }
                  >
                    <Icon name="Navigation" size={16} className="mr-2" />
                    Get Directions
                  </Button>
                  <Button variant="default" size="sm" className="flex-1">
                    <Icon name="Eye" size={16} className="mr-2" />
                    Virtual Tour
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationInfo;
