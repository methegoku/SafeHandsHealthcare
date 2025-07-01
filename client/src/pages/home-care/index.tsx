import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, Clock, Star, Shield, CheckCircle, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RatingStars from "@/components/RatingStars";

const cities = [
  { name: "Mumbai", lat: 19.0760, lng: 72.8777 },
  { name: "Delhi", lat: 28.6139, lng: 77.2090 },
  { name: "Bangalore", lat: 12.9716, lng: 77.5946 },
  { name: "Hyderabad", lat: 17.3850, lng: 78.4867 },
  { name: "Chennai", lat: 13.0827, lng: 80.2707 },
  { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
  { name: "Pune", lat: 18.5204, lng: 73.8567 },
  { name: "Ahmedabad", lat: 23.0225, lng: 72.5714 }
];

export default function HomeCarePage() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearestCity, setNearestCity] = useState("");

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          
          // Find nearest city
          const nearest = findNearestCity(latitude, longitude);
          setNearestCity(nearest);
          setSearchQuery(nearest);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  const findNearestCity = (lat: number, lng: number) => {
    let nearest = cities[0];
    let minDistance = calculateDistance(lat, lng, cities[0].lat, cities[0].lng);

    cities.forEach(city => {
      const distance = calculateDistance(lat, lng, city.lat, city.lng);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = city;
      }
    });

    return nearest.name;
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const services = [
    {
      id: 1,
      title: "Elderly Care",
      description: "Comprehensive care services for elderly individuals",
      icon: <Home className="w-6 h-6" />,
      price: "₹1500/day",
      rating: 4.9,
      features: [
        "Personal Care Assistance",
        "Medication Management",
        "Mobility Support",
        "Companionship"
      ]
    },
    {
      id: 2,
      title: "Post-Surgery Care",
      description: "Professional care services for post-operative recovery",
      icon: <Home className="w-6 h-6" />,
      price: "₹2000/day",
      rating: 4.8,
      features: [
        "Wound Care",
        "Physical Therapy",
        "Pain Management",
        "Recovery Monitoring"
      ]
    },
    {
      id: 3,
      title: "Chronic Disease Care",
      description: "Specialized care for chronic health conditions",
      icon: <Home className="w-6 h-6" />,
      price: "₹1800/day",
      rating: 4.7,
      features: [
        "Disease Management",
        "Regular Monitoring",
        "Lifestyle Support",
        "Emergency Response"
      ]
    },
    {
      id: 4,
      title: "Palliative Care",
      description: "Compassionate care for individuals with serious illnesses",
      icon: <Home className="w-6 h-6" />,
      price: "₹2500/day",
      rating: 4.9,
      features: [
        "Pain Management",
        "Emotional Support",
        "Family Counseling",
        "Comfort Care"
      ]
    }
  ];

  const handleServiceClick = (serviceId: number) => {
    setLocation(`/home-care/${serviceId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Professional Home Care Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience quality healthcare in the comfort of your home. Our verified caregivers are ready to provide expert care.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Enter your location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Service Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="elderly">Elderly Care</SelectItem>
                  <SelectItem value="post-surgery">Post-Surgery Care</SelectItem>
                  <SelectItem value="chronic">Chronic Disease Care</SelectItem>
                  <SelectItem value="palliative">Palliative Care</SelectItem>
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
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Home Care Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience healthcare excellence with our comprehensive home care solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Licensed Caregivers",
                description: "All our caregivers are fully licensed and certified"
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "24/7 Availability",
                description: "Round-the-clock care and support"
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Quality Care",
                description: "Consistently high-quality home care services"
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "Verified Reviews",
                description: "Real feedback from satisfied clients"
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