import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MapPin, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface CitySelectorProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function CitySelector({ 
  value, 
  onValueChange, 
  placeholder = "Select City",
  className = "" 
}: CitySelectorProps) {
  const [isDetecting, setIsDetecting] = useState(false);

  const { data: cities, isLoading } = useQuery({
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
        
        // Find the nearest city based on coordinates
        // For now, we'll just select the first city as a placeholder
        if (cities && cities.length > 0 && onValueChange) {
          onValueChange(cities[0].id.toString());
        }
        
        setIsDetecting(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to detect your location. Please select your city manually.");
        setIsDetecting(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  if (isLoading) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm text-gray-600">Loading cities...</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="min-w-[150px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {cities?.map((city: any) => (
            <SelectItem key={city.id} value={city.id.toString()}>
              {city.name}, {city.state}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleLocationDetection}
        disabled={isDetecting}
        className="flex items-center space-x-1"
      >
        {isDetecting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <MapPin className="w-4 h-4" />
        )}
        <span className="hidden sm:inline">
          {isDetecting ? "Detecting..." : "Use Location"}
        </span>
      </Button>
    </div>
  );
}
