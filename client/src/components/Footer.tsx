import { Link } from "wouter";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const SafeHandsLogo = () => (
    <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4V6L13.5 6.5C13.1 6.4 12.6 6.5 12.2 6.7L7 9H9V11L7 12V22H9V14L11 13V22H13V15L15 14V22H17V12L15 11V9H21Z"/>
    </svg>
  );

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center">
                <SafeHandsLogo />
              </div>
              <div>
                <h3 className="text-xl font-bold">SafeHands</h3>
                <p className="text-sm text-gray-400">Trusted Care, Right at Your Doorstep</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Connecting families with trusted, verified care professionals for home nursing, medical services, and child care.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/19Pm4bYgb7/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-blue transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/_safehands__?igsh=aG9naWlrNXJ1ZGc=" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-blue transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/home-care">
                  <a className="text-gray-300 hover:text-white transition-colors">Home Nursing</a>
                </Link>
              </li>
              <li>
                <Link href="/home-care">
                  <a className="text-gray-300 hover:text-white transition-colors">Elderly Care</a>
                </Link>
              </li>
              <li>
                <Link href="/medical-services">
                  <a className="text-gray-300 hover:text-white transition-colors">Doctor Visits</a>
                </Link>
              </li>
              <li>
                <Link href="/medical-services">
                  <a className="text-gray-300 hover:text-white transition-colors">Physiotherapy</a>
                </Link>
              </li>
              <li>
                <Link href="/child-care">
                  <a className="text-gray-300 hover:text-white transition-colors">Child Care</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about">
                  <a className="text-gray-300 hover:text-white transition-colors">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/how-it-works">
                  <a className="text-gray-300 hover:text-white transition-colors">How It Works</a>
                </Link>
              </li>
              <li>
                <Link href="/safety">
                  <a className="text-gray-300 hover:text-white transition-colors">Safety Standards</a>
                </Link>
              </li>
              <li>
                <Link href="/become-provider">
                  <a className="text-gray-300 hover:text-white transition-colors">Become a Provider</a>
                </Link>
              </li>
              <li>
                <Link href="/careers">
                  <a className="text-gray-300 hover:text-white transition-colors">Careers</a>
                </Link>
              </li>
              <li>
                <Link href="/press">
                  <a className="text-gray-300 hover:text-white transition-colors">Press</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/help">
                  <a className="text-gray-300 hover:text-white transition-colors">Help Center</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-300 hover:text-white transition-colors">Contact Us</a>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <a className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <a className="text-gray-300 hover:text-white transition-colors">Terms of Service</a>
                </Link>
              </li>
              <li>
                <Link href="/insurance">
                  <a className="text-gray-300 hover:text-white transition-colors">Insurance</a>
                </Link>
              </li>
              <li>
                <Link href="/emergency">
                  <a className="text-gray-300 hover:text-white transition-colors">Emergency Support</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-brand-blue" />
              <div>
                <p className="font-medium">24/7 Support</p>
                <a href="tel:+91-8999411111 SAFEHANDS" className="text-brand-blue hover:text-white transition-colors">
                +91-8999411111 SAFEHANDS
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-brand-blue" />
              <div>
                <p className="font-medium">Email Support</p>
                <p className="text-sm text-gray-600">Email: safehands.caregivers@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-brand-blue" />
              <div>
                <p className="font-medium">Headquarters</p>
                <p className="text-gray-300">Mumbai, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 SafeHands. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/sitemap">
                <a className="text-gray-400 hover:text-white transition-colors">Sitemap</a>
              </Link>
              <Link href="/accessibility">
                <a className="text-gray-400 hover:text-white transition-colors">Accessibility</a>
              </Link>
              <Link href="/cookie-policy">
                <a className="text-gray-300 hover:text-white transition-colors">Cookie Policy</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
