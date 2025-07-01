import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import logoImage from "@assets/ChatGPT Image Jun 17, 2025, 11_45_25 AM_1750148953001.png";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const services = [
    {
      name: "Home Care",
      href: "/home-care",
      description: "Professional home nursing and elderly care services"
    },
    {
      name: "Medical Services",
      href: "/medical-services",
      description: "Doctor visits and medical consultations at home"
    },
    {
      name: "Child Care",
      href: "/child-care",
      description: "Expert childcare and baby care services"
    }
  ];

  const SafeHandsLogo = () => (
    <img src={logoImage} alt="SafeHands Logo" className="w-7 h-7" />
  );

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Tagline */}
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-500 rounded-lg shadow-md">
                <SafeHandsLogo />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SafeHands</h1>
                <p className="text-xs text-gray-600 hidden sm:block">Trusted Care, Right at Your Doorstep</p>
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1">
                  <span>Our Services</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {services.map((service) => (
                  <DropdownMenuItem key={service.href} asChild>
                    <Link href={service.href} className="flex flex-col items-start">
                      <span className="font-medium">{service.name}</span>
                      <span className="text-sm text-gray-500">{service.description}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link href="/about">
              <Button variant="ghost">About Us</Button>
            </Link>
            <Link href="/how-it-works">
              <Button variant="ghost">How It Works</Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost">Contact</Button>
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/become-provider">
              <Button className="bg-brand-blue hover:bg-blue-600 text-white">Become a Service Provider</Button>
            </Link>
            <Link href="/login">
              <Button className="bg-brand-blue hover:bg-blue-600 text-white">Get Started</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col h-full">
                  <div className="flex-1 py-6">
                    <div className="space-y-6">
                      {/* Mobile Navigation Links */}
                      <div className="space-y-2">
                        <h3 className="font-semibold text-gray-900 mb-2">Services</h3>
                        {services.map((service) => (
                          <Link key={service.href} href={service.href}>
                            <Button variant="ghost" className="w-full justify-start">
                              {service.name}
                            </Button>
                          </Link>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-semibold text-gray-900 mb-2">Company</h3>
                        <Link href="/about">
                          <Button variant="ghost" className="w-full justify-start">
                            About Us
                          </Button>
                        </Link>
                        <Link href="/how-it-works">
                          <Button variant="ghost" className="w-full justify-start">
                            How It Works
                          </Button>
                        </Link>
                        <Link href="/contact">
                          <Button variant="ghost" className="w-full justify-start">
                            Contact
                          </Button>
                        </Link>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-semibold text-gray-900 mb-2">Account</h3>
                        <Link href="/become-provider">
                          <Button className="w-full bg-brand-blue hover:bg-blue-600 text-white">
                            Become a Service Provider
                          </Button>
                        </Link>
                        <Link href="/login">
                          <Button className="w-full bg-brand-blue hover:bg-blue-600 text-white">
                            Get Started
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}