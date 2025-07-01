import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { 
  Users, 
  Calendar, 
  Star, 
  DollarSign,
  Shield,
  TrendingUp,
  Activity,
  Eye,
  CheckCircle,
  XCircle
} from "lucide-react";
import { format } from "date-fns";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RatingStars from "@/components/RatingStars";
import { useEffect } from "react";

export default function AdminPanel() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Redirect if not admin
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'admin')) {
      toast({
        title: "Unauthorized",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, user, toast]);

  const { data: stats } = useQuery({
    queryKey: ["/api/admin/stats"],
    queryFn: async () => {
      // Since we don't have admin stats endpoint, we'll fetch individual data
      const [bookings, providers, reviews] = await Promise.all([
        fetch("/api/bookings", { credentials: "include" }).then(r => r.json()),
        fetch("/api/providers", { credentials: "include" }).then(r => r.json()),
        fetch("/api/reviews", { credentials: "include" }).then(r => r.json()),
      ]);
      
      return {
        totalBookings: bookings?.length || 0,
        totalProviders: providers?.length || 0,
        totalReviews: reviews?.length || 0,
        totalRevenue: bookings?.reduce((sum: number, b: any) => sum + parseFloat(b.totalAmount || 0), 0) || 0,
        averageRating: reviews?.length ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length : 0,
      };
    },
    enabled: isAuthenticated && user?.role === 'admin',
  });

  const { data: recentBookings } = useQuery({
    queryKey: ["/api/bookings"],
    enabled: isAuthenticated && user?.role === 'admin',
  });

  const { data: providers } = useQuery({
    queryKey: ["/api/providers"],
    enabled: isAuthenticated && user?.role === 'admin',
  });

  const { data: reviews } = useQuery({
    queryKey: ["/api/reviews"],
    enabled: isAuthenticated && user?.role === 'admin',
  });

  const updateProviderVerificationMutation = useMutation({
    mutationFn: async ({ providerId, isVerified }: { providerId: number; isVerified: boolean }) => {
      const response = await fetch(`/api/admin/providers/${providerId}/verify`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isVerified }),
        credentials: "include",
      });
      
      if (!response.ok) {
        throw new Error("Failed to update provider verification");
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/providers"] });
      toast({
        title: "Provider Updated",
        description: "Provider verification status has been updated.",
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

  const toggleReviewFeaturedMutation = useMutation({
    mutationFn: async ({ reviewId, isFeatured }: { reviewId: number; isFeatured: boolean }) => {
      const response = await fetch(`/api/admin/reviews/${reviewId}/featured`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured }),
        credentials: "include",
      });
      
      if (!response.ok) {
        throw new Error("Failed to update review featured status");
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reviews"] });
      toast({
        title: "Review Updated",
        description: "Review featured status has been updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
          <p className="text-gray-600">Platform management and analytics</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-3xl font-bold text-gray-900">{stats?.totalBookings || 0}</p>
                </div>
                <Calendar className="w-8 h-8 text-brand-blue-dark" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Providers</p>
                  <p className="text-3xl font-bold text-gray-900">{stats?.totalProviders || 0}</p>
                </div>
                <Users className="w-8 h-8 text-brand-blue-dark" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">${stats?.totalRevenue?.toFixed(2) || "0.00"}</p>
                </div>
                <DollarSign className="w-8 h-8 text-brand-blue-dark" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Rating</p>
                  <p className="text-3xl font-bold text-gray-900">{stats?.averageRating?.toFixed(1) || "0.0"}</p>
                </div>
                <Star className="w-8 h-8 text-brand-blue-dark" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="providers">Providers</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {recentBookings && recentBookings.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentBookings.slice(0, 10).map((booking: any) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">{booking.service?.name}</TableCell>
                          <TableCell>{booking.client?.firstName} {booking.client?.lastName}</TableCell>
                          <TableCell>{booking.provider?.user?.firstName} {booking.provider?.user?.lastName}</TableCell>
                          <TableCell>{format(new Date(booking.scheduledDate), "PP")}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className={`bg-${booking.status === 'completed' ? 'green' : booking.status === 'cancelled' ? 'red' : 'blue'}-100`}>
                              {booking.status}
                            </Badge>
                          </TableCell>
                          <TableCell>${booking.totalAmount}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center text-gray-600 py-8">No bookings found</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="providers">
            <Card>
              <CardHeader>
                <CardTitle>Provider Management</CardTitle>
              </CardHeader>
              <CardContent>
                {providers && providers.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Reviews</TableHead>
                        <TableHead>Verified</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {providers.map((provider: any) => (
                        <TableRow key={provider.id}>
                          <TableCell className="font-medium">
                            {provider.user?.firstName} {provider.user?.lastName}
                          </TableCell>
                          <TableCell>{provider.user?.email}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <RatingStars rating={parseFloat(provider.rating)} size="sm" />
                              <span>{provider.rating}</span>
                            </div>
                          </TableCell>
                          <TableCell>{provider.totalReviews}</TableCell>
                          <TableCell>
                            <Badge variant={provider.isVerified ? "default" : "secondary"}>
                              {provider.isVerified ? "Verified" : "Pending"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateProviderVerificationMutation.mutate({
                                  providerId: provider.id,
                                  isVerified: !provider.isVerified
                                })}
                              >
                                {provider.isVerified ? (
                                  <XCircle className="w-4 h-4 text-red-600" />
                                ) : (
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                )}
                              </Button>
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center text-gray-600 py-8">No providers found</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Review Management</CardTitle>
              </CardHeader>
              <CardContent>
                {reviews && reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.slice(0, 10).map((review: any) => (
                      <div key={review.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <RatingStars rating={review.rating} size="sm" />
                              <span className="font-medium">{review.client?.firstName} {review.client?.lastName}</span>
                              <span className="text-sm text-gray-500">
                                {format(new Date(review.createdAt), "PP")}
                              </span>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {review.isFeatured && (
                              <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                                Featured
                              </Badge>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleReviewFeaturedMutation.mutate({
                                reviewId: review.id,
                                isFeatured: !review.isFeatured
                              })}
                            >
                              {review.isFeatured ? "Unfeature" : "Feature"}
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          Service: {review.service?.name}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-600 py-8">No reviews found</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Platform Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">This Month</span>
                      <span className="font-bold text-green-600">+12%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">New Providers</span>
                      <span className="font-bold">{providers?.filter((p: any) => {
                        const createdAt = new Date(p.createdAt);
                        const oneMonthAgo = new Date();
                        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
                        return createdAt > oneMonthAgo;
                      }).length || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Completion Rate</span>
                      <span className="font-bold text-green-600">95%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Service Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Most Popular</span>
                      <span className="font-bold">Home Nursing</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Highest Rated</span>
                      <span className="font-bold">Child Care</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Average Rating</span>
                      <span className="font-bold">{stats?.averageRating?.toFixed(1) || "N/A"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
