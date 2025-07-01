import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function SearchBar({ 
  placeholder = "Search for services...",
  value = "",
  onSearch,
  onClear,
  className = "",
  size = "md"
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState(value);

  const sizeClasses = {
    sm: "h-8 text-sm",
    md: "h-10",
    lg: "h-12 text-lg"
  };

  const buttonSizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8", 
    lg: "h-10 w-10"
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery.trim());
  };

  const handleClear = () => {
    setSearchQuery("");
    onClear?.();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative flex items-center", className)}>
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          className={cn(
            "pr-20",
            sizeClasses[size]
          )}
        />
        
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className={cn("p-0", buttonSizeClasses[size])}
            >
              <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </Button>
          )}
          
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className={cn("p-0", buttonSizeClasses[size])}
          >
            <Search className="w-4 h-4 text-gray-400 hover:text-gray-600" />
          </Button>
        </div>
      </div>
    </form>
  );
}
