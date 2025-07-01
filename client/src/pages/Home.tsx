import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Star } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceCategories from "@/components/ServiceCategories";
import RatingStars from "@/components/RatingStars";

export default function Home() {
  const { user } = useAuth();
  
  const { data: recentBookings } = useQuery({
    queryKey: ["/api/bookings"],
  });

  const { data: featuredProviders } = useQuery({
    queryKey: ["/api/providers"],
  });

  const { data: featuredReviews } = useQuery({
    queryKey: ["/api/featured-reviews"],
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Welcome Section */}
      <section className="bg-gradient-to-r from-blue-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Welcome back, {user?.firstName}!
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your trusted care professionals are just a click away. What service do you need today?
            </p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/providers">
              <Button className="w-full h-20 flex flex-col space-y-2 bg-brand-blue-dark hover:bg-blue-600 text-white">
                <MapPin className="w-6 h-6" />
                <span>Find Providers</span>
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="w-full h-20 flex flex-col space-y-2 bg-brand-blue-dark hover:bg-blue-600 text-white">
                <Clock className="w-6 h-6" />
                <span>My Bookings</span>
              </Button>
            </Link>
            <Button className="w-full h-20 flex flex-col space-y-2 bg-gray-100 hover:bg-gray-200 text-gray-900">
              <Star className="w-6 h-6" />
              <span>Emergency</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Bookings */}
      {recentBookings && recentBookings.length > 0 && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recent Bookings</h2>
              <Link href="/dashboard">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentBookings.slice(0, 3).map((booking: any) => (
                <Card key={booking.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{booking.service?.name}</span>
                      <Badge variant={booking.status === 'completed' ? 'default' : 'secondary'}>
                        {booking.status}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        <strong>Provider:</strong> {booking.provider?.user?.firstName} {booking.provider?.user?.lastName}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Date:</strong> {new Date(booking.scheduledDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>City:</strong> {booking.city?.name}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Service Categories */}
      <ServiceCategories />

      {/* Featured Providers */}
      {featuredProviders && featuredProviders.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Top-Rated Professionals</h2>
              <Link href="/providers">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProviders.slice(0, 3).map((provider: any) => (
                <Card key={provider.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {provider.user?.firstName} {provider.user?.lastName}
                        </h3>
                        <p className="text-sm text-gray-600">{provider.bio}</p>
                      </div>
                      {provider.isVerified && (
                        <Badge variant="secondary" className="bg-green-100 text-green-600">
                          Verified
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-1 mb-3">
                      <RatingStars rating={parseFloat(provider.rating)} />
                      <span className="text-sm text-gray-600">
                        {provider.rating} ({provider.totalReviews} reviews)
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">${provider.hourlyRate}/hour</span>
                      <span className="text-sm text-gray-600">Featured Provider</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
