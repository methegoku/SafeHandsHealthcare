import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, MapPin, User, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingFlowProps {
  currentStep: number;
  totalSteps: number;
  onStepChange?: (step: number) => void;
  className?: string;
}

export default function BookingFlow({ 
  currentStep, 
  totalSteps, 
  onStepChange,
  className = "" 
}: BookingFlowProps) {
  const steps = [
    {
      id: 1,
      title: "Location & Service",
      description: "Select your city and the service you need",
      icon: <MapPin className="w-5 h-5" />,
      isCompleted: currentStep > 1,
      isCurrent: currentStep === 1,
    },
    {
      id: 2,
      title: "Choose Provider",
      description: "Browse and select from verified professionals",
      icon: <User className="w-5 h-5" />,
      isCompleted: currentStep > 2,
      isCurrent: currentStep === 2,
    },
    {
      id: 3,
      title: "Schedule & Details",
      description: "Pick your preferred date, time, and add details",
      icon: <Calendar className="w-5 h-5" />,
      isCompleted: currentStep > 3,
      isCurrent: currentStep === 3,
    },
    {
      id: 4,
      title: "Review & Confirm",
      description: "Review your booking and confirm payment",
      icon: <CheckCircle className="w-5 h-5" />,
      isCompleted: currentStep > 4,
      isCurrent: currentStep === 4,
    },
  ];

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Booking Progress</span>
          <Badge variant="secondary">{currentStep} of {totalSteps}</Badge>
        </CardTitle>
        <Progress value={progressPercentage} className="w-full" />
      </CardHeader>
      <CardContent className="space-y-4">
        {steps.map((step, index) => (
          <div 
            key={step.id}
            className={cn(
              "flex items-start space-x-3 p-3 rounded-lg cursor-pointer transition-colors",
              step.isCurrent && "bg-blue-50 border border-brand-blue-dark",
              step.isCompleted && "bg-green-50",
              !step.isCurrent && !step.isCompleted && "hover:bg-gray-50"
            )}
            onClick={() => onStepChange?.(step.id)}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
              step.isCompleted && "bg-green-600 text-white",
              step.isCurrent && "bg-brand-blue-dark text-white",
              !step.isCurrent && !step.isCompleted && "bg-gray-200 text-gray-600"
            )}>
              {step.isCompleted ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                step.icon
              )}
            </div>
            
            <div className="flex-1">
              <h4 className={cn(
                "font-medium",
                step.isCurrent && "text-brand-blue-dark",
                step.isCompleted && "text-green-700",
                !step.isCurrent && !step.isCompleted && "text-gray-900"
              )}>
                {step.title}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {step.description}
              </p>
            </div>
            
            {step.isCompleted && (
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
