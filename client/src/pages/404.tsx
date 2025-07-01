import { useLocation } from "wouter";
import { Home, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-brand-blue-dark">404</h1>
            <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-2">Page Not Found</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setLocation("/")}
              className="bg-brand-blue-dark hover:bg-blue-600 text-white px-6 py-3"
            >
              <Home className="w-5 h-5 mr-2" />
              Go to Homepage
            </Button>
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="px-6 py-3"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
          </div>

          <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">You might be looking for:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { name: "Home Care", path: "/home-care" },
                { name: "Medical Services", path: "/medical-services" },
                { name: "Child Care", path: "/child-care" },
                { name: "About Us", path: "/about" }
              ].map((link) => (
                <Button
                  key={link.path}
                  variant="ghost"
                  onClick={() => setLocation(link.path)}
                  className="text-gray-600 hover:text-brand-blue-dark"
                >
                  {link.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 