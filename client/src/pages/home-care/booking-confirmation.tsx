import { useLocation } from 'wouter';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function BookingConfirmationPage() {
  const [, setLocation] = useLocation();

  // Mock booking data
  const bookingDetails = {
    serviceName: "Elderly Care",
    date: "March 20, 2024",
    time: "10:00 AM",
    duration: "4 hours",
    totalAmount: "₹2,000",
    bookingId: "SH-2024-0320-001",
    caregiver: {
      name: "Anita Patel",
      experience: "5 years",
      rating: 4.8
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <div>
              <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
              <p className="text-gray-600">Your service has been successfully booked</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Booking Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-4">Booking Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Service</p>
                  <p className="font-medium">{bookingDetails.serviceName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-medium">{bookingDetails.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-medium">{bookingDetails.time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-medium">{bookingDetails.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="font-medium">{bookingDetails.totalAmount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Booking ID</p>
                  <p className="font-medium">{bookingDetails.bookingId}</p>
                </div>
              </div>
            </div>

            {/* Caregiver Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-4">Your Caregiver</h3>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👩</span>
                </div>
                <div>
                  <p className="font-medium">{bookingDetails.caregiver.name}</p>
                  <p className="text-sm text-gray-600">{bookingDetails.caregiver.experience} experience</p>
                  <p className="text-sm text-yellow-500">⭐ {bookingDetails.caregiver.rating}</p>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Next Steps</h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>You'll receive a confirmation email with all booking details</li>
                <li>Our caregiver will contact you 1 hour before the scheduled time</li>
                <li>You can track your booking status in your dashboard</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button 
                className="flex-1"
                onClick={() => setLocation('/home-care')}
              >
                Book Another Service
              </Button>
              <Button 
                variant="outline"
                className="flex-1"
                onClick={() => setLocation('/dashboard')}
              >
                View in Dashboard
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 