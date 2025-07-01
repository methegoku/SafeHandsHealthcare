import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Loader2, CheckCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import CitySelector from "./CitySelector";

interface LocationSelectorProps {
  onLocationSelect?: (location: { cityId: string; coordinates?: { lat: number; lng: number } }) => void;
  selectedCityId?: string;
  className?: string;
}

export default function LocationSelector({ 
  onLocationSelect, 
  selectedCityId,
  className = "" 
}: LocationSelectorProps) {
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedLocation, setDetectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  const { data: cities } = useQuery({
    queryKey: ["/api/cities"],
  });

  const handleLocationDetection = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }

    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setDetectedLocation({ lat: latitude, lng: longitude });
        
        // Find nearest city based on coordinates
        // For now, we'll use a simple distance calculation
        if (cities && cities.length > 0) {
          let nearestCity = cities[0];
          let minDistance = Number.MAX_VALUE;
          
          cities.forEach((city: any) => {
            if (city.latitude && city.longitude) {
              const distance = Math.sqrt(
                Math.pow(parseFloat(city.latitude) - latitude, 2) +
                Math.pow(parseFloat(city.longitude) - longitude, 2)
              );
              if (distance < minDistance) {
                minDistance = distance;
                nearestCity = city;
              }
            }
          });
          
          onLocationSelect?.({
            cityId: nearestCity.id.toString(),
            coordinates: { lat: latitude, lng: longitude }
          });
        }
        
        setIsDetecting(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        let errorMessage = "Unable to detect your location. Please select your city manually.";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access was denied. Please select your city manually.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable. Please select your city manually.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out. Please select your city manually.";
            break;
        }
        
        alert(errorMessage);
        setIsDetecting(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const handleCityChange = (cityId: string) => {
    onLocationSelect?.({ cityId });
  };

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <MapPin className="text-brand-blue-dark w-6 h-6" />
          <div>
            <h3 className="font-semibold text-gray-900">Choose Your Location</h3>
            <p className="text-sm text-gray-600">We'll find care professionals near you</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Button
              onClick={handleLocationDetection}
              disabled={isDetecting}
              className="flex-1 bg-brand-blue-dark hover:bg-blue-600 text-white flex items-center justify-center space-x-2"
            >
              {isDetecting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : detectedLocation ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <MapPin className="w-4 h-4" />
              )}
              <span>
                {isDetecting ? "Detecting..." : detectedLocation ? "Location Detected" : "Use My Location"}
              </span>
            </Button>
            
            <div className="flex-1">
              <CitySelector
                value={selectedCityId}
                onValueChange={handleCityChange}
                placeholder="Or select city manually"
                className="w-full"
              />
            </div>
          </div>
          
          {detectedLocation && (
            <div className="text-sm text-green-600 flex items-center space-x-1">
              <CheckCircle className="w-4 h-4" />
              <span>Location detected successfully!</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
