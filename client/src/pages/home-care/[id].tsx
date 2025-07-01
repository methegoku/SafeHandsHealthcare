import { useLocation, useRoute } from 'wouter';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { useState } from 'react';

// Mock data for services
const servicesData = {
  1: {
    id: 1,
    title: "Elderly Care",
    description: "Professional care for elderly family members",
    icon: "👴",
    price: "₹500/hour",
    rating: 4.8,
    reviews: [
      {
        id: 1,
        name: "Priya Sharma",
        rating: 5,
        comment: "Excellent service! The caregiver was very professional and caring.",
        date: "2024-03-15"
      },
      {
        id: 2,
        name: "Rajesh Patel",
        rating: 4,
        comment: "Very reliable and punctual. Would recommend!",
        date: "2024-03-10"
      }
    ],
    services: [
      "Personal care assistance",
      "Medication reminders",
      "Meal preparation",
      "Light housekeeping",
      "Companionship",
      "Exercise assistance"
    ],
    requirements: [
      "Minimum 2 years of experience",
      "First aid certification",
      "Background check completed",
      "Reference verification"
    ]
  },
  2: {
    id: 2,
    title: "Meal Preparation",
    description: "Healthy and nutritious meals prepared at home",
    icon: "🍳",
    price: "₹400/hour",
    rating: 4.7,
    reviews: [
      {
        id: 1,
        name: "Meera Desai",
        rating: 5,
        comment: "Delicious and healthy meals! Very professional service.",
        date: "2024-03-14"
      }
    ],
    services: [
      "Customized meal planning",
      "Special diet preparation",
      "Nutrition consultation",
      "Grocery shopping",
      "Kitchen cleanup"
    ],
    requirements: [
      "Nutrition certification",
      "Food safety training",
      "Experience in dietary planning",
      "Hygiene certification"
    ]
  }
};

export default function ServiceDetailPage() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute('/home-care/:id');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Get service details based on ID
  const serviceDetails = servicesData[params?.id as keyof typeof servicesData];

  // If service not found, redirect to home care page
  if (!serviceDetails) {
    setLocation('/home-care');
    return null;
  }

  const handleBooking = () => {
    // Here you would typically handle the booking logic
    // For now, we'll just redirect to the confirmation page
    setLocation('/home-care/booking-confirmation');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        onClick={() => setLocation('/home-care')}
        className="mb-6"
      >
        ← Back to Services
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-4">
                <span className="text-4xl">{serviceDetails.icon}</span>
                <div>
                  <CardTitle className="text-2xl">{serviceDetails.title}</CardTitle>
                  <p className="text-gray-600">{serviceDetails.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xl font-semibold">{serviceDetails.price}</span>
                <span className="text-yellow-500">⭐ {serviceDetails.rating}</span>
              </div>
              
              <Tabs defaultValue="services">
                <TabsList>
                  <TabsTrigger value="services">Services</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="services">
                  <ul className="list-disc pl-6 space-y-2">
                    {serviceDetails.services.map((service, index) => (
                      <li key={index}>{service}</li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="requirements">
                  <ul className="list-disc pl-6 space-y-2">
                    {serviceDetails.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="reviews">
                  <div className="space-y-4">
                    {serviceDetails.reviews.map((review) => (
                      <Card key={review.id}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold">{review.name}</h4>
                              <p className="text-sm text-gray-500">{review.date}</p>
                            </div>
                            <span className="text-yellow-500">⭐ {review.rating}</span>
                          </div>
                          <p className="mt-2">{review.comment}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Booking Section */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Book This Service</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Select Date</h4>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Select Time</h4>
                  <select className="w-full p-2 border rounded-md">
                    <option>9:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>12:00 PM</option>
                    <option>2:00 PM</option>
                    <option>3:00 PM</option>
                    <option>4:00 PM</option>
                    <option>5:00 PM</option>
                  </select>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Duration</h4>
                  <select className="w-full p-2 border rounded-md">
                    <option>2 hours</option>
                    <option>4 hours</option>
                    <option>6 hours</option>
                    <option>8 hours</option>
                    <option>12 hours</option>
                    <option>24 hours</option>
                  </select>
                </div>

                <Button className="w-full" onClick={handleBooking}>Book Now</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 