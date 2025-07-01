import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Shield, MapPin, Clock, Award } from "lucide-react";
import RatingStars from "./RatingStars";

interface ProviderCardProps {
  provider: any;
  showLocation?: boolean;
  className?: string;
}

export default function ProviderCard({ provider, showLocation = true, className = "" }: ProviderCardProps) {
  return (
    <Card className={`hover:shadow-lg transition-shadow duration-300 overflow-hidden ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <Avatar className="w-16 h-16">
            <AvatarImage 
              src={provider.user?.profileImageUrl || provider.profileImage} 
              alt={`${provider.user?.firstName} ${provider.user?.lastName}`} 
            />
            <AvatarFallback className="text-lg bg-brand-blue-dark text-white">
              {provider.user?.firstName?.[0]}{provider.user?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {provider.user?.firstName} {provider.user?.lastName}
                </h3>
                <p className="text-sm text-gray-600">Licensed Professional</p>
              </div>
              {provider.isVerified && (
                <Badge variant="secondary" className="bg-green-100 text-green-600">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-1 mb-3">
              <RatingStars rating={parseFloat(provider.rating)} />
              <span className="text-sm text-gray-600 ml-1">
                {provider.rating} ({provider.totalReviews} reviews)
              </span>
            </div>
            
            <p className="text-sm text-gray-700 mb-4 line-clamp-2">
              {provider.bio || "Experienced care professional dedicated to providing quality service."}
            </p>
            
            <div className="flex items-center space-x-4 text-xs text-gray-600 mb-4">
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                <span>{provider.experience || 0}+ years experience</span>
              </div>
              {showLocation && provider.city && (
                <div className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>{provider.city.name}</span>
                </div>
              )}
              <div className="flex items-center">
                <Award className="w-3 h-3 mr-1" />
                <span>Licensed</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg font-bold text-gray-900">
                  ${provider.hourlyRate}/hour
                </span>
              </div>
              <div className="flex space-x-2">
                <Link href={`/providers/${provider.id}`}>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </Link>
                <Link href={`/booking?providerId=${provider.id}`}>
                  <Button size="sm" className="bg-brand-blue-dark hover:bg-blue-600 text-white">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
