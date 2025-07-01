import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

export default function RatingStars({ 
  rating, 
  maxRating = 5, 
  size = "md",
  showText = false,
  className = "",
  interactive = false,
  onRatingChange
}: RatingStarsProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4", 
    lg: "w-5 h-5"
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };

  const handleStarClick = (starRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  return (
    <div className={cn("flex items-center space-x-1", className)}>
      <div className="flex items-center">
        {[...Array(maxRating)].map((_, index) => {
          const starRating = index + 1;
          const isFullStar = starRating <= Math.floor(rating);
          const isHalfStar = starRating === Math.ceil(rating) && rating % 1 !== 0;
          
          return (
            <button
              key={index}
              type="button"
              className={cn(
                "relative",
                interactive && "hover:scale-110 transition-transform cursor-pointer",
                !interactive && "cursor-default"
              )}
              onClick={() => handleStarClick(starRating)}
              disabled={!interactive}
            >
              <Star 
                className={cn(
                  sizeClasses[size],
                  "text-gray-300"
                )}
              />
              {(isFullStar || isHalfStar) && (
                <Star 
                  className={cn(
                    sizeClasses[size],
                    "absolute top-0 left-0 text-yellow-400 fill-current",
                    isHalfStar && "overflow-hidden"
                  )}
                  style={isHalfStar ? { 
                    clipPath: `polygon(0 0, ${(rating % 1) * 100}% 0, ${(rating % 1) * 100}% 100%, 0 100%)` 
                  } : undefined}
                />
              )}
            </button>
          );
        })}
      </div>
      
      {showText && (
        <span className={cn("font-medium text-gray-700", textSizeClasses[size])}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
