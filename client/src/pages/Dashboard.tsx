import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Star,
  CheckCircle,
  XCircle,
  MessageSquare,
  DollarSign
} from "lucide-react";
import { format } from "date-fns";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RatingStars from "@/components/RatingStars";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: "" });

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: bookings, isLoading: bookingsLoading } = useQuery({
    queryKey: ["/api/bookings"],
    enabled: isAuthenticated,
    retry: false,
  });

  const { data: providerProfile } = useQuery({
    queryKey: ["/api/providers", { userId: user?.id }],
    queryFn: async () => {
      const response = await fetch(`/api/providers?userId=${user?.id}`);
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error("Failed to fetch provider profile");
      }
      const providers = await response.json();
      return providers[0] || null;
    },
    enabled: !!user?.id,
  });

  const updateBookingMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await fetch(`/api/bookings/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
        credentials: "include",
      });
      
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to update booking");
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({
        title: "Booking Updated",
        description: "Booking status has been updated successfully.",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const createReviewMutation = useMutation({
    mutationFn: async (reviewData: any) => {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
        credentials: "include",
      });
      
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to create review");
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      setSelectedBooking(null);
      setReviewData({ rating: 5, comment: "" });
      toast({
        title: "Review Submitted",
        description: "Thank you for your feedback!",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Review Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "yellow";
      case "confirmed": return "blue";
      case "in_progress": return "purple";
      case "completed": return "green";
      case "cancelled": return "red";
      default: return "gray";
    }
  };

  const handleStatusUpdate = (bookingId: number, newStatus: string) => {
    updateBookingMutation.mutate({ id: bookingId, status: newStatus });
  };

  const handleReviewSubmit = () => {
    if (!selectedBooking) return;
    
    createReviewMutation.mutate({
      bookingId: selectedBooking.id,
      providerId: selectedBooking.providerId,
      rating: reviewData.rating,
      comment: reviewData.comment,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
          <p className="text-gray-600">Manage your bookings and account settings</p>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            {user?.role === 'provider' && <TabsTrigger value="provider">Provider Dashboard</TabsTrigger>}
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
              <Link href="/booking">
                <Button className="bg-brand-blue-dark hover:bg-blue-600 text-white">
                  Book New Service
                </Button>
              </Link>
            </div>

            {bookingsLoading ? (
              <div className="grid gap-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : bookings && bookings.length > 0 ? (
              <div className="grid gap-6">
                {bookings.map((booking: any) => (
                  <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-4 gap-6 items-center">
                        <div>
                          <h3 className="font-bold text-lg mb-2">{booking.service?.name}</h3>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2" />
                              {format(new Date(booking.scheduledDate), "PPP")}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2" />
                              {booking.duration} hours
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2" />
                              {booking.city?.name}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-1">Provider</h4>
                          <p className="text-gray-600">
                            {booking.provider?.user?.firstName} {booking.provider?.user?.lastName}
                          </p>
                          <div className="flex items-center mt-1">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="text-sm">{booking.provider?.rating}</span>
                          </div>
                        </div>

                        <div className="text-center">
                          <Badge variant="secondary" className={`bg-${getStatusColor(booking.status)}-100 text-${getStatusColor(booking.status)}-700`}>
                            {booking.status}
                          </Badge>
                          <div className="mt-2 font-bold text-lg">
                            ${booking.totalAmount}
                          </div>
                        </div>

                        <div className="space-y-2">
                          {booking.status === 'pending' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                              className="w-full text-red-600 border-red-600 hover:bg-red-50"
                            >
                              Cancel Booking
                            </Button>
                          )}
                          
                          {booking.status === 'completed' && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setSelectedBooking(booking)}
                                  className="w-full"
                                >
                                  <Star className="w-4 h-4 mr-2" />
                                  Leave Review
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Leave a Review</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label>Rating</Label>
                                    <div className="flex space-x-1 mt-2">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                          key={star}
                                          onClick={() => setReviewData({ ...reviewData, rating: star })}
                                          className={`w-8 h-8 ${star <= reviewData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                        >
                                          <Star className="w-full h-full fill-current" />
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <Label htmlFor="comment">Review</Label>
                                    <Textarea
                                      id="comment"
                                      placeholder="Share your experience..."
                                      value={reviewData.comment}
                                      onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                                    />
                                  </div>
                                  
                                  <Button
                                    onClick={handleReviewSubmit}
                                    disabled={createReviewMutation.isPending}
                                    className="w-full bg-brand-blue-dark hover:bg-blue-600 text-white"
                                  >
                                    {createReviewMutation.isPending ? "Submitting..." : "Submit Review"}
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                          
                          <Button variant="outline" size="sm" className="w-full">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Contact Provider
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
                  <p className="text-gray-600 mb-6">Start by booking your first care service</p>
                  <Link href="/booking">
                    <Button className="bg-brand-blue-dark hover:bg-blue-600 text-white">
                      Book Your First Service
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>First Name</Label>
                    <p className="text-gray-900 font-medium">{user?.firstName || "Not provided"}</p>
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <p className="text-gray-900 font-medium">{user?.lastName || "Not provided"}</p>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p className="text-gray-900 font-medium">{user?.email || "Not provided"}</p>
                  </div>
                  <div>
                    <Label>Account Type</Label>
                    <Badge variant="secondary">{user?.role || "client"}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {user?.role === 'provider' && (
            <TabsContent value="provider" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <DollarSign className="w-12 h-12 text-brand-blue-dark mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900">$0</h3>
                    <p className="text-gray-600">Total Earnings</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <Calendar className="w-12 h-12 text-brand-blue-dark mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      {bookings?.filter((b: any) => b.providerId === providerProfile?.id).length || 0}
                    </h3>
                    <p className="text-gray-600">Total Bookings</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <Star className="w-12 h-12 text-brand-blue-dark mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      {providerProfile?.rating || "N/A"}
                    </h3>
                    <p className="text-gray-600">Average Rating</p>
                  </CardContent>
                </Card>
              </div>

              {providerProfile ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Provider Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label>Bio</Label>
                        <p className="text-gray-900">{providerProfile.bio || "No bio provided"}</p>
                      </div>
                      <div>
                        <Label>Experience</Label>
                        <p className="text-gray-900">{providerProfile.experience || 0} years</p>
                      </div>
                      <div>
                        <Label>Hourly Rate</Label>
                        <p className="text-gray-900">${providerProfile.hourlyRate || "Not set"}/hour</p>
                      </div>
                      <div>
                        <Label>Verification Status</Label>
                        <Badge variant={providerProfile.isVerified ? "default" : "secondary"}>
                          {providerProfile.isVerified ? "Verified" : "Pending"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Provider Profile Not Found</h3>
                    <p className="text-gray-600 mb-6">Create your provider profile to start accepting bookings</p>
                    <Button className="bg-brand-blue-dark hover:bg-blue-600 text-white">
                      Create Provider Profile
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          )}
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
