import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Stethoscope, Clock, Star, Shield, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RatingStars from "@/components/RatingStars";

export default function MedicalServicesPage() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState("");

  const services = [
    {
      id: 1,
      title: "Doctor Home Visits",
      description: "Professional medical consultations in the comfort of your home",
      icon: <Stethoscope className="w-6 h-6" />,
      price: "₹1500/visit",
      rating: 4.8,
      features: [
        "General Health Checkup",
        "Specialist Consultations",
        "Prescription Services",
        "Follow-up Care"
      ]
    },
    {
      id: 2,
      title: "Physiotherapy",
      description: "Expert physiotherapy services for rehabilitation and pain management",
      icon: <Stethoscope className="w-6 h-6" />,
      price: "₹1200/session",
      rating: 4.9,
      features: [
        "Post-operative Rehabilitation",
        "Sports Injury Recovery",
        "Chronic Pain Management",
        "Mobility Enhancement"
      ]
    },
    {
      id: 3,
      title: "Medical Massage",
      description: "Therapeutic massage services for pain relief and wellness",
      icon: <Stethoscope className="w-6 h-6" />,
      price: "₹2000/session",
      rating: 4.7,
      features: [
        "Deep Tissue Massage",
        "Sports Massage",
        "Rehabilitation Massage",
        "Wellness Therapy"
      ]
    },
    {
      id: 4,
      title: "Health Monitoring",
      description: "Regular health monitoring and vital signs tracking",
      icon: <Stethoscope className="w-6 h-6" />,
      price: "₹800/session",
      rating: 4.6,
      features: [
        "Vital Signs Monitoring",
        "Health Reports",
        "Regular Check-ups",
        "Emergency Alerts"
      ]
    }
  ];

  const handleServiceClick = (serviceId: number) => {
    setLocation(`/medical-services/${serviceId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Professional Medical Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access quality healthcare services from the comfort of your home. Our verified medical professionals are ready to provide expert care.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder="Search medical services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Service Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="doctor">Doctor Visits</SelectItem>
                  <SelectItem value="physio">Physiotherapy</SelectItem>
                  <SelectItem value="massage">Medical Massage</SelectItem>
                  <SelectItem value="monitoring">Health Monitoring</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card 
                key={service.id}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-brand-blue-dark">
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                        <div className="flex items-center space-x-2">
                          <RatingStars rating={service.rating} />
                          <span className="text-sm text-gray-600">{service.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{service.description}</p>

                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">{service.price}</span>
                    <Button 
                      onClick={() => handleServiceClick(service.id)}
                      className="bg-brand-blue-dark hover:bg-blue-600 text-white"
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Medical Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience healthcare excellence with our comprehensive medical services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Licensed Professionals",
                description: "All our medical professionals are fully licensed and certified"
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "24/7 Availability",
                description: "Round-the-clock medical support for emergencies"
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Quality Care",
                description: "Consistently high-quality medical services"
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "Verified Reviews",
                description: "Real feedback from satisfied patients"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-blue-dark">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 