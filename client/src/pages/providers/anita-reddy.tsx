import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Shield, 
  Star, 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar,
  Phone,
  Mail,
  Award,
  MessageSquare,
  GraduationCap,
  Languages
} from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RatingStars from "@/components/RatingStars";
import ShareModal from "@/components/ShareModal";

export default function AnitaReddyProfile() {
  const provider = {
    id: "anita-reddy",
    firstName: "Anita",
    lastName: "Reddy",
    title: "Geriatric Care Specialist",
    rating: 4.9,
    totalReviews: 156,
    experience: 18,
    hourlyRate: 1300,
    city: { name: "Bangalore", state: "Karnataka" },
    bio: "Dedicated geriatric care specialist with 18 years of experience in elderly care. Expert in managing chronic conditions, providing companionship, and ensuring the well-being of senior citizens. Committed to delivering compassionate and professional care.",
    education: "Masters in Geriatric Care, Certified Dementia Care Specialist",
    languages: ["English", "Hindi", "Kannada", "Telugu"],
    isVerified: true,
    services: [
      {
        id: 1,
        name: "Elderly Care",
        price: 1300,
        description: "Comprehensive care for elderly individuals including daily activities and health monitoring"
      },
      {
        id: 2,
        name: "Dementia Care",
        price: 1500,
        description: "Specialized care for patients with dementia and memory-related conditions"
      },
      {
        id: 3,
        name: "Chronic Disease Management",
        price: 1400,
        description: "Expert management of chronic conditions in elderly patients"
      }
    ],
    reviews: [
      {
        id: 1,
        user: {
          firstName: "Vikram",
          lastName: "Malhotra",
          profileImageUrl: null
        },
        rating: 5,
        comment: "Excellent care for my mother. Very patient and understanding.",
        createdAt: "2024-03-14"
      },
      {
        id: 2,
        user: {
          firstName: "Sunita",
          lastName: "Kumar",
          profileImageUrl: null
        },
        rating: 5,
        comment: "Professional and caring. My father's health has improved significantly.",
        createdAt: "2024-03-09"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Provider Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                  <div className="flex items-start space-x-6">
                    <Avatar className="w-24 h-24">
                      <AvatarImage 
                        src="/images/providers/anita-reddy.jpg" 
                        alt="Anita Reddy" 
                      />
                      <AvatarFallback className="text-2xl bg-brand-blue-dark text-white">
                        AR
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h1 className="text-3xl font-bold text-gray-900">
                          {provider.firstName} {provider.lastName}
                        </h1>
                        {provider.isVerified && (
                          <Badge className="bg-green-100 text-green-700">
                            <Shield className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center space-x-1">
                          <RatingStars rating={provider.rating} />
                          <span className="font-medium">{provider.rating}</span>
                          <span className="text-gray-600">({provider.totalReviews} reviews)</span>
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{provider.city.name}, {provider.city.state}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{provider.bio}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{provider.experience}+ years experience</span>
                        </div>
                        <div className="flex items-center">
                          <Award className="w-4 h-4 mr-1" />
                          <span>Licensed Professional</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center md:text-right">
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-gray-900">
                      ₹{provider.hourlyRate}
                    </div>
                    <div className="text-gray-600">per hour</div>
                  </div>
                  
                  <div className="space-y-3">
                    <Link href={`/booking?providerId=${provider.id}`}>
                      <Button className="w-full bg-brand-blue-dark hover:bg-blue-600 text-white">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Now
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    <ShareModal 
                      url={window.location.href}
                      title={`Anita Reddy - Geriatric Care Specialist`}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">{provider.bio}</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Education</h4>
                    <div className="flex items-center text-gray-700">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      <span>{provider.education}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {provider.languages.map((language) => (
                        <Badge key={language} variant="secondary">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle>Services Offered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {provider.services.map((service) => (
                    <div key={service.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{service.name}</h4>
                        <span className="font-bold text-brand-blue-dark">
                          ₹{service.price}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Reviews ({provider.reviews.length})</span>
                  <div className="flex items-center space-x-1">
                    <RatingStars rating={provider.rating} />
                    <span className="font-medium">{provider.rating}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {provider.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={review.user.profileImageUrl} />
                            <AvatarFallback>
                              {review.user.firstName[0]}{review.user.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {review.user.firstName} {review.user.lastName}
                            </p>
                            <p className="text-sm text-gray-600">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <RatingStars rating={review.rating} />
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-medium">{provider.experience}+ years</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Response Time</span>
                  <span className="font-medium">Within 1 hour</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium">{provider.city.name}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Availability</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Available
                  </Badge>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Provider
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Safety Features */}
            <Card>
              <CardHeader>
                <CardTitle>Safety Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Background Verified</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span className="text-sm">Licensed Professional</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm">Client Rated</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span className="text-sm">24/7 Support</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 