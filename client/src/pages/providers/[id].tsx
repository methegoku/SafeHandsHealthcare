import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
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

// Mock data for featured providers
const featuredProviders = {
  "rajesh-patel": {
    id: "rajesh-patel",
    firstName: "Rajesh",
    lastName: "Patel",
    title: "Senior Physiotherapist",
    rating: 4.9,
    totalReviews: 127,
    experience: 15,
    hourlyRate: 1200,
    city: { name: "Mumbai", state: "Maharashtra" },
    bio: "Senior physiotherapist with 15 years of experience specializing in sports injuries, post-surgery rehabilitation, and geriatric care. Certified in advanced physiotherapy techniques and committed to providing personalized care for optimal recovery.",
    education: "Masters in Physiotherapy, Sports Medicine Specialization",
    languages: ["English", "Hindi", "Gujarati"],
    isVerified: true,
    services: [
      {
        id: 1,
        name: "Sports Injury Rehabilitation",
        price: 1200,
        description: "Specialized treatment for sports-related injuries and recovery"
      },
      {
        id: 2,
        name: "Post-Surgery Rehabilitation",
        price: 1500,
        description: "Comprehensive rehabilitation programs after surgical procedures"
      },
      {
        id: 3,
        name: "Geriatric Care",
        price: 1000,
        description: "Specialized physiotherapy for elderly patients"
      }
    ]
  },
  "priya-sharma": {
    id: "priya-sharma",
    firstName: "Priya",
    lastName: "Sharma",
    title: "Pediatric Nurse",
    rating: 4.8,
    totalReviews: 98,
    experience: 12,
    hourlyRate: 1000,
    city: { name: "Delhi", state: "Delhi" },
    bio: "Experienced pediatric nurse with 12 years of expertise in child healthcare. Specialized in newborn care, child development monitoring, and pediatric emergency care. Passionate about providing compassionate and professional care to children.",
    education: "Bachelors in Nursing, Pediatric Specialization",
    languages: ["English", "Hindi", "Punjabi"],
    isVerified: true,
    services: [
      {
        id: 1,
        name: "Newborn Care",
        price: 1000,
        description: "Specialized care for newborns including feeding, bathing, and health monitoring"
      },
      {
        id: 2,
        name: "Child Development Monitoring",
        price: 1200,
        description: "Regular health check-ups and development tracking for children"
      },
      {
        id: 3,
        name: "Pediatric Emergency Care",
        price: 1500,
        description: "24/7 emergency care services for children"
      }
    ]
  },
  "anita-reddy": {
    id: "anita-reddy",
    firstName: "Anita",
    lastName: "Reddy",
    title: "Geriatric Care Specialist",
    rating: 4.7,
    totalReviews: 85,
    experience: 10,
    hourlyRate: 900,
    city: { name: "Bangalore", state: "Karnataka" },
    bio: "Dedicated geriatric care specialist with 10 years of experience in elderly care. Expertise in managing chronic conditions, mobility assistance, and providing compassionate care for seniors. Committed to improving the quality of life for elderly patients.",
    education: "Masters in Geriatric Care",
    languages: ["English", "Hindi", "Kannada", "Telugu"],
    isVerified: true,
    services: [
      {
        id: 1,
        name: "Elderly Care",
        price: 900,
        description: "Comprehensive care for elderly patients including daily activities and health monitoring"
      },
      {
        id: 2,
        name: "Chronic Condition Management",
        price: 1100,
        description: "Specialized care for managing chronic health conditions in elderly patients"
      },
      {
        id: 3,
        name: "Mobility Assistance",
        price: 800,
        description: "Support with mobility and physical activities for elderly patients"
      }
    ]
  }
};

export default function ProviderProfilePage() {
  const { id } = useParams<{ id: string }>();
  
  // Check if the provider is a featured provider
  const featuredProvider = featuredProviders[id as keyof typeof featuredProviders];
  
  // If it's a featured provider, use the mock data
  const { data: provider, isLoading } = useQuery({
    queryKey: ["/api/providers", id],
    queryFn: async () => {
      if (featuredProvider) {
        return featuredProvider;
      }
      const response = await fetch(`/api/providers/${id}`);
      if (!response.ok) throw new Error("Failed to fetch provider");
      return response.json();
    },
  });

  const { data: reviews } = useQuery({
    queryKey: ["/api/reviews", { providerId: id }],
    queryFn: async () => {
      const response = await fetch(`/api/reviews?providerId=${id}`);
      if (!response.ok) throw new Error("Failed to fetch reviews");
      return response.json();
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-32 bg-gray-200 rounded-lg"></div>
                <div className="h-48 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="space-y-6">
                <div className="h-64 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Provider Not Found</h1>
            <p className="text-gray-600 mb-8">The provider you're looking for doesn't exist.</p>
            <Link href="/providers">
              <Button className="bg-brand-blue-dark hover:bg-blue-600 text-white">
                Browse Providers
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
                        src={provider.user?.profileImageUrl || provider.profileImage} 
                        alt={`${provider.user?.firstName} ${provider.user?.lastName}`} 
                      />
                      <AvatarFallback className="text-2xl bg-brand-blue-dark text-white">
                        {provider.user?.firstName?.[0]}{provider.user?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h1 className="text-3xl font-bold text-gray-900">
                          {provider.user?.firstName} {provider.user?.lastName}
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
                          <RatingStars rating={parseFloat(provider.rating)} />
                          <span className="font-medium">{provider.rating}</span>
                          <span className="text-gray-600">({provider.totalReviews} reviews)</span>
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{provider.city?.name}, {provider.city?.state}</span>
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
                      ${provider.hourlyRate}
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
                      title={`${provider.user?.firstName} ${provider.user?.lastName} - ${provider.title}`}
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
                      {provider.languages?.map((language: string) => (
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
                  {provider.services?.map((service: any) => (
                    <div key={service.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{service.name}</h4>
                        <span className="font-bold text-brand-blue-dark">
                          ${service.price}
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
                  <span>Reviews ({reviews?.length || 0})</span>
                  <div className="flex items-center space-x-1">
                    <RatingStars rating={parseFloat(provider.rating)} />
                    <span className="font-medium">{provider.rating}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {reviews && reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map((review: any) => (
                      <div key={review.id} className="border-b pb-6 last:border-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={review.user?.profileImageUrl} />
                              <AvatarFallback>
                                {review.user?.firstName?.[0]}{review.user?.lastName?.[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {review.user?.firstName} {review.user?.lastName}
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
                ) : (
                  <p className="text-gray-600 text-center py-8">
                    No reviews yet. Be the first to leave a review!
                  </p>
                )}
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
                  <span className="font-medium">{provider.city?.name}</span>
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