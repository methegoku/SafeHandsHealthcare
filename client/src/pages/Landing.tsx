import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Shield, Star, Clock, Heart, Baby, Stethoscope, Home, UserCheck, Calendar, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceCategories from "@/components/ServiceCategories";
import RatingStars from "@/components/RatingStars";
import { getFeaturedReviews, cities } from "@/data/mockData";
import logoImage from "@assets/ChatGPT Image Jun 17, 2025, 11_45_25 AM_1750148953001.png";

export default function Landing() {
  const [, setLocation] = useLocation();
  const featuredReviews = getFeaturedReviews();
  const indianCities = cities;

  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Location detected:", position.coords);
          // TODO: Find nearest city based on coordinates
        },
        (error) => {
          console.error("Location access denied:", error);
        }
      );
    }
  };

  const handleServiceClick = (service: string) => {
    switch (service) {
      case 'elderly':
      case 'nursing':
      case 'physiotherapy':
        setLocation('/home-care');
        break;
      case 'childcare':
        setLocation('/child-care');
        break;
      case 'doctor':
      case 'massage':
        setLocation('/medical-services');
        break;
      default:
        setLocation('/home-care');
    }
  };

  const featuredProviders = [
    {
      id: "priya-sharma",
      name: "Priya Sharma",
      title: "Registered Nurse",
      experience: "8+ years experience in home nursing and elderly care",
      services: ["Home Nursing", "Elderly Care", "Patient Care"],
      rating: 4.9,
      reviews: 127,
      hourlyRate: "₹800/hour",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    },
    {
      id: "rajesh-patel",
      name: "Dr. Rajesh Patel",
      title: "Licensed Physiotherapist", 
      experience: "12+ years in post-operative rehabilitation and chronic pain management",
      services: ["Physiotherapy", "Health Monitoring", "Home Nursing"],
      rating: 4.8,
      reviews: 203,
      hourlyRate: "₹800/session",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    },
    {
      id: "anita-reddy",
      name: "Anita Reddy",
      title: "Certified Childcare Specialist",
      experience: "6+ years in early childhood education and newborn care",
      services: ["Full-time Nanny", "Child Development", "Newborn Care"],
      rating: 4.7,
      reviews: 89,
      hourlyRate: "₹700/hour",
      image: "https://images.unsplash.com/photo-1594824388853-2c5899d65ddc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    }
  ];

  const quickServices = [
    { name: "Home Nursing", icon: <Stethoscope className="w-5 h-5" />, service: "nursing" },
    { name: "Elderly Care", icon: <Heart className="w-5 h-5" />, service: "elderly" },
    { name: "Child Care", icon: <Baby className="w-5 h-5" />, service: "childcare" },
    { name: "Physiotherapy", icon: <UserCheck className="w-5 h-5" />, service: "physiotherapy" },
    { name: "Doctor Visit", icon: <Stethoscope className="w-5 h-5" />, service: "doctor" },
    { name: "Massage", icon: <Heart className="w-5 h-5" />, service: "massage" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Find <span className="text-brand-blue-dark">Trusted Care</span> Professionals
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Connect with verified home care, medical, and childcare professionals. Quality care services delivered right to your doorstep with complete peace of mind.
                </p>
                <div className="pt-4">
                  <Button 
                    size="lg" 
                    className="bg-brand-blue-dark hover:bg-blue-600 text-white px-8 py-6 text-lg"
                    onClick={() => navigate('/login')}
                  >
                    Get Started
                  </Button>
                </div>
              </div>

              {/* Location Permission Prompt */}
              <Card className="p-6 shadow-lg border border-gray-200">
                <div className="flex items-center space-x-4 mb-4">
                  <MapPin className="text-brand-blue-dark w-6 h-6" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Choose Your Location</h3>
                    <p className="text-sm text-gray-600">We'll find care professionals near you</p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    onClick={handleLocationRequest}
                    className="flex-1 bg-brand-blue-dark hover:bg-blue-600 text-white"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Use My Location
                  </Button>
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent>
                      {indianCities?.map((city: any) => (
                        <SelectItem key={city.id} value={city.id.toString()}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </Card>

              {/* Quick Search */}
              <Card className="p-6 shadow-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">What type of care do you need?</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {quickServices.map((service) => (
                    <Button
                      key={service.service}
                      variant="outline"
                      className="p-3 h-auto border-gray-200 hover:border-brand-blue-dark hover:bg-blue-50 transition-all"
                      onClick={() => handleServiceClick(service.service)}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <div className="text-brand-blue-dark">
                          {service.icon}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{service.name}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </Card>
            </div>

            <div className="hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Healthcare professional providing home care" 
                className="rounded-2xl shadow-2xl w-full h-auto" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <ServiceCategories />

      {/* Featured Providers */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Top-Rated Care Professionals</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet our most trusted and experienced care professionals, verified and rated by hundreds of satisfied clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProviders.map((provider) => (
              <Card key={provider.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <img 
                  src={provider.image} 
                  alt={provider.name}
                  className="w-full h-48 object-cover" 
                />
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{provider.name}</h3>
                      <p className="text-sm text-gray-600">{provider.title}</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-600">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-1 mb-3">
                    <RatingStars rating={provider.rating} />
                    <span className="text-sm text-gray-600">{provider.rating} ({provider.reviews} reviews)</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{provider.experience}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {provider.services.map((service, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50">
                        {service}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">{provider.hourlyRate}</span>
                    <Link href={`/providers/${provider.id}`}>
                      <Button 
                        variant="default"
                        className="bg-brand-blue-dark hover:bg-blue-600 text-white"
                      >
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How SafeHands Works */}
      <section className="py-16 lg:py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How SafeHands Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, transparent, and secure. Book trusted care professionals in just a few easy steps.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: 1, icon: <MapPin className="w-8 h-8" />, title: "Choose Location", description: "Select your city or let us auto-detect your location to find nearby care professionals." },
              { step: 2, icon: <Home className="w-8 h-8" />, title: "Select Service", description: "Browse our three main categories and choose the specific care service you need." },
              { step: 3, icon: <UserCheck className="w-8 h-8" />, title: "Pick Provider", description: "Review verified professionals, their ratings, experience, and choose the best fit for you." },
              { step: 4, icon: <Calendar className="w-8 h-8" />, title: "Book & Confirm", description: "Select your preferred date and time, review booking details, and confirm your appointment." }
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-20 h-20 bg-brand-blue-dark rounded-full flex items-center justify-center mx-auto mb-6 relative text-white">
                  {step.icon}
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-white text-brand-blue-dark rounded-full flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-brand-blue-dark hover:bg-blue-600 text-white shadow-lg"
              onClick={() => window.location.href = '/providers'}
            >
              Start Booking Now
            </Button>
          </div>
        </div>
      </section>

      {/* Client Reviews */}
      {featuredReviews && featuredReviews.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Real experiences from families who trusted SafeHands for their care needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredReviews.slice(0, 3).map((review: any) => (
                <Card key={review.id} className="p-8 shadow-lg">
                  <div className="flex mb-4">
                    <RatingStars rating={review.rating} />
                  </div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    "{review.comment}"
                  </p>
                  
                  <div className="flex items-center space-x-3">
                    <img 
                      src={review.client?.profileImageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"} 
                      alt={`${review.client?.firstName} ${review.client?.lastName}`}
                      className="w-12 h-12 rounded-full object-cover" 
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {review.client?.firstName} {review.client?.lastName}
                      </h4>
                      <p className="text-sm text-gray-600">{review.service?.name} Service</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust Signals */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Your Safety is Our Priority</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every care professional on SafeHands undergoes rigorous verification and background checks for your peace of mind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Shield className="w-8 h-8" />, title: "Background Verified", description: "Comprehensive background checks and identity verification for all professionals.", color: "green" },
              { icon: <Star className="w-8 h-8" />, title: "Licensed & Certified", description: "All providers hold valid licenses and certifications in their respective fields.", color: "blue" },
              { icon: <Star className="w-8 h-8" />, title: "Client Rated", description: "Transparent rating system with verified reviews from real clients.", color: "purple" },
              { icon: <Phone className="w-8 h-8" />, title: "24/7 Support", description: "Round-the-clock customer support for any concerns or emergencies.", color: "red" }
            ].map((signal, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 bg-${signal.color}-100 rounded-full flex items-center justify-center mx-auto mb-4 text-${signal.color}-600`}>
                  {signal.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{signal.title}</h3>
                <p className="text-gray-600 text-sm">{signal.description}</p>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-gray-200">
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-blue-dark mb-2">500+</div>
              <p className="text-gray-600">Verified Professionals</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-blue-dark mb-2">10,000+</div>
              <p className="text-gray-600">Successful Bookings</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-blue-dark mb-2">98%</div>
              <p className="text-gray-600">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
