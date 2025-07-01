import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Stethoscope, Baby, CheckCircle } from "lucide-react";
import { serviceCategories } from "@/data/mockData";

export default function ServiceCategories() {
  const categories = serviceCategories;

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case 'home care':
        return <Heart className="w-8 h-8" />;
      case 'medical services':
        return <Stethoscope className="w-8 h-8" />;
      case 'child care':
        return <Baby className="w-8 h-8" />;
      default:
        return <Heart className="w-8 h-8" />;
    }
  };

  const getCategoryImage = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case 'home care':
        return "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400";
      case 'medical services':
        return "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400";
      case 'child care':
        return "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400";
      default:
        return "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400";
    }
  };

  const getCategoryServices = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case 'home care':
        return [
          "Home Nursing & Private Nurses",
          "Elderly & Respite Care", 
          "Caregivers & Companions",
          "Meal Preparation"
        ];
      case 'medical services':
        return [
          "Doctor Visits & Consultations",
          "Physiotherapy & Occupational Therapy",
          "Pain Management & Recovery", 
          "Massage & Spa Therapy"
        ];
      case 'child care':
        return [
          "Professional Babysitting",
          "Child Healthcare Services",
          "Baby Massage & Therapy",
          "Specialized Baby Care"
        ];
      default:
        return [];
    }
  };

  const getCategoryRoute = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case 'home care':
        return '/home-care';
      case 'medical services':
        return '/medical-services';
      case 'child care':
        return '/child-care';
      default:
        return '/home-care';
    }
  };

  if (!categories || categories.length === 0) {
    return (
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Care Services</h2>
            <p className="text-gray-600">Loading service categories...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Care Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive care solutions delivered by verified professionals with the highest standards of quality and safety.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category: any) => (
            <Card 
              key={category.id} 
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer"
            >
              <img 
                src={getCategoryImage(category.name)} 
                alt={`${category.name} services`}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
              />
              
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-brand-blue-dark">
                    {getCategoryIcon(category.name)}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{category.name}</h3>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {category.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  {getCategoryServices(category.name).map((service, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
                
                <Link href={getCategoryRoute(category.name)}>
                  <Button className="w-full bg-brand-blue-dark hover:bg-blue-600 text-white transition-colors font-medium">
                    Explore {category.name}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
