import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import RatingStars from "./RatingStars";

interface ReviewCardProps {
  review: any;
  showProvider?: boolean;
  className?: string;
}

export default function ReviewCard({ review, showProvider = false, className = "" }: ReviewCardProps) {
  return (
    <Card className={`${className}`}>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage 
              src={review.client?.profileImageUrl} 
              alt={`${review.client?.firstName} ${review.client?.lastName}`} 
            />
            <AvatarFallback className="bg-brand-blue-dark text-white">
              {review.client?.firstName?.[0]}{review.client?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-semibold text-gray-900">
                  {review.client?.firstName} {review.client?.lastName}
                </h4>
                <p className="text-sm text-gray-600">
                  {format(new Date(review.createdAt), "MMM d, yyyy")}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {review.isFeatured && (
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                    Featured
                  </Badge>
                )}
                <RatingStars rating={review.rating} />
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-3">
              "{review.comment}"
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Service: {review.service?.name}</span>
              {showProvider && review.provider && (
                <span>
                  Provider: {review.provider.user?.firstName} {review.provider.user?.lastName}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
