import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  CreditCard,
  CheckCircle
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingFlow from "@/components/BookingFlow";

const bookingSchema = z.object({
  providerId: z.number().min(1, "Please select a provider"),
  serviceId: z.number().min(1, "Please select a service"),
  cityId: z.number().min(1, "Please select a city"),
  scheduledDate: z.date({ required_error: "Please select a date" }),
  duration: z.number().min(1, "Duration must be at least 1 hour"),
  address: z.string().min(10, "Please provide a detailed address"),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function Booking() {
  const [step, setStep] = useState(1);
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      duration: 2,
      notes: "",
    },
  });

  const { data: cities } = useQuery({
    queryKey: ["/api/cities"],
  });

  const { data: serviceCategories } = useQuery({
    queryKey: ["/api/service-categories"],
  });

  const { data: services } = useQuery({
    queryKey: ["/api/services"],
  });

  const { data: providers } = useQuery({
    queryKey: ["/api/providers", form.watch("cityId"), form.watch("serviceId")],
    queryFn: async () => {
      const cityId = form.getValues("cityId");
      const serviceId = form.getValues("serviceId");
      if (!cityId || !serviceId) return [];
      
      const params = new URLSearchParams();
      params.append("cityId", cityId.toString());
      params.append("serviceId", serviceId.toString());
      
      const response = await fetch(`/api/providers?${params}`);
      if (!response.ok) throw new Error("Failed to fetch providers");
      return response.json();
    },
    enabled: !!form.watch("cityId") && !!form.watch("serviceId"),
  });

  const createBookingMutation = useMutation({
    mutationFn: async (bookingData: BookingFormData) => {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...bookingData,
          totalAmount: calculateTotal(),
        }),
        credentials: "include",
      });
      
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to create booking");
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      setStep(5); // Success step
      toast({
        title: "Booking Confirmed!",
        description: "Your booking has been successfully created.",
      });
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const selectedService = services?.find((s: any) => s.id === form.watch("serviceId"));
  const selectedProvider = providers?.find((p: any) => p.id === form.watch("providerId"));

  const calculateTotal = () => {
    if (!selectedProvider || !form.watch("duration")) return 0;
    return parseFloat(selectedProvider.hourlyRate) * form.watch("duration");
  };

  const onSubmit = (data: BookingFormData) => {
    createBookingMutation.mutate(data);
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const getStepTitle = () => {
    switch (step) {
      case 1: return "Select Location & Service";
      case 2: return "Choose Provider";
      case 3: return "Schedule & Details";
      case 4: return "Review & Confirm";
      case 5: return "Booking Confirmed";
      default: return "Book Service";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{getStepTitle()}</h1>
          <Progress value={(step / 4) * 100} className="w-full" />
          <div className="flex justify-between mt-2">
            {[1, 2, 3, 4].map((stepNum) => (
              <span 
                key={stepNum}
                className={cn(
                  "text-sm",
                  step >= stepNum ? "text-brand-blue-dark font-medium" : "text-gray-400"
                )}
              >
                Step {stepNum}
              </span>
            ))}
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Location & Service
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="cityId">Select City</Label>
                  <Select onValueChange={(value) => form.setValue("cityId", Number(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities?.map((city: any) => (
                        <SelectItem key={city.id} value={city.id.toString()}>
                          {city.name}, {city.state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Service Category</Label>
                  <div className="grid md:grid-cols-3 gap-4 mt-2">
                    {serviceCategories?.map((category: any) => (
                      <Card 
                        key={category.id} 
                        className="cursor-pointer hover:border-brand-blue-dark transition-colors"
                      >
                        <CardContent className="p-4 text-center">
                          <h3 className="font-medium mb-2">{category.name}</h3>
                          <p className="text-sm text-gray-600">{category.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="serviceId">Select Service</Label>
                  <Select onValueChange={(value) => form.setValue("serviceId", Number(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services?.map((service: any) => (
                        <SelectItem key={service.id} value={service.id.toString()}>
                          {service.name} - ${service.basePrice}/{service.unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  type="button" 
                  onClick={nextStep}
                  disabled={!form.watch("cityId") || !form.watch("serviceId")}
                  className="w-full bg-brand-blue-dark hover:bg-blue-600 text-white"
                >
                  Continue to Providers
                </Button>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Choose Your Provider
                  </div>
                  <Select 
                    defaultValue="rating"
                    onValueChange={(value) => {
                      const sortedProviders = [...providers].sort((a, b) => {
                        switch (value) {
                          case 'price-low':
                            return a.hourlyRate - b.hourlyRate;
                          case 'price-high':
                            return b.hourlyRate - a.hourlyRate;
                          case 'rating':
                            return b.rating - a.rating;
                          case 'reviews':
                            return b.totalReviews - a.totalReviews;
                          default:
                            return 0;
                        }
                      });
                      // Update the providers list with sorted data
                      queryClient.setQueryData(
                        ["/api/providers", form.watch("cityId"), form.watch("serviceId")],
                        sortedProviders
                      );
                    }}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="reviews">Most Reviews</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {providers && providers.length > 0 ? (
                  <div className="space-y-4">
                    {providers.map((provider: any) => (
                      <Card 
                        key={provider.id}
                        className={cn(
                          "cursor-pointer transition-colors",
                          form.watch("providerId") === provider.id 
                            ? "border-brand-blue-dark bg-blue-50" 
                            : "hover:border-gray-300"
                        )}
                        onClick={() => form.setValue("providerId", provider.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <img 
                              src={provider.user?.profileImageUrl || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"}
                              alt={`${provider.user?.firstName} ${provider.user?.lastName}`}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-bold text-lg">
                                  {provider.user?.firstName} {provider.user?.lastName}
                                </h3>
                                <span className="text-lg font-bold text-brand-blue-dark">
                                  ₹{provider.hourlyRate}/hour
                                </span>
                              </div>
                              <p className="text-gray-600 mb-2">{provider.bio}</p>
                              <div className="flex items-center space-x-4">
                                <Badge variant="secondary">
                                  ⭐ {provider.rating} ({provider.totalReviews} reviews)
                                </Badge>
                                {provider.isVerified && (
                                  <Badge className="bg-green-100 text-green-700">
                                    Verified
                                  </Badge>
                                )}
                                <Badge variant="outline">
                                  {provider.experience}+ years experience
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-600 py-8">
                    No providers available for the selected service and location.
                  </p>
                )}

                <div className="flex space-x-4 mt-6">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                  <Button 
                    type="button" 
                    onClick={nextStep}
                    disabled={!form.watch("providerId")}
                    className="flex-1 bg-brand-blue-dark hover:bg-blue-600 text-white"
                  >
                    Continue to Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  Schedule & Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Select Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !form.watch("scheduledDate") && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {form.watch("scheduledDate") ? 
                          format(form.watch("scheduledDate"), "PPP") : 
                          <span>Pick a date</span>
                        }
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={form.watch("scheduledDate")}
                        onSelect={(date) => date && form.setValue("scheduledDate", date)}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="duration">Duration (hours)</Label>
                  <Select onValueChange={(value) => form.setValue("duration", Number(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 8].map((hours) => (
                        <SelectItem key={hours} value={hours.toString()}>
                          {hours} hour{hours > 1 ? "s" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="address">Service Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter the complete address where service is needed..."
                    {...form.register("address")}
                  />
                  {form.formState.errors.address && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.address.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="notes">Special Instructions (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special requirements or notes for the provider..."
                    {...form.register("notes")}
                  />
                </div>

                <div className="flex space-x-4">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                  <Button 
                    type="button" 
                    onClick={nextStep}
                    disabled={!form.watch("scheduledDate") || !form.watch("duration") || !form.watch("address")}
                    className="flex-1 bg-brand-blue-dark hover:bg-blue-600 text-white"
                  >
                    Review Booking
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Review & Confirm
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">Service Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Service:</span>
                        <span>{selectedService?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Provider:</span>
                        <span>{selectedProvider?.user?.firstName} {selectedProvider?.user?.lastName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span>{form.watch("scheduledDate") && format(form.watch("scheduledDate"), "PPP")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>{form.watch("duration")} hours</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Pricing</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Hourly Rate:</span>
                        <span>₹{selectedProvider?.hourlyRate}/hour</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>{form.watch("duration")} hours</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Total:</span>
                        <span>₹{calculateTotal()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Service Address</h3>
                  <p className="text-sm text-gray-600">{form.watch("address")}</p>
                </div>

                {form.watch("notes") && (
                  <div>
                    <h3 className="font-semibold mb-2">Special Instructions</h3>
                    <p className="text-sm text-gray-600">{form.watch("notes")}</p>
                  </div>
                )}

                <div className="flex space-x-4">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                  <Button 
                    type="submit"
                    disabled={createBookingMutation.isPending}
                    className="flex-1 bg-brand-blue-dark hover:bg-blue-600 text-white"
                  >
                    {createBookingMutation.isPending ? "Confirming..." : "Confirm Booking"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 5 && (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Booking Confirmed!
                </h2>
                <p className="text-gray-600 mb-6">
                  Your booking has been successfully created. You will receive a confirmation email shortly.
                </p>
                <div className="space-y-3">
                  <Button 
                    onClick={() => navigate("/dashboard")}
                    className="w-full bg-brand-blue-dark hover:bg-blue-600 text-white"
                  >
                    View My Bookings
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate("/")}
                    className="w-full"
                  >
                    Back to Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </div>

      <Footer />
    </div>
  );
}
