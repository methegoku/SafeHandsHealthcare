import { Shield, CheckCircle, AlertCircle, Clock, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function SafetyPage() {
  const safetyMeasures = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Provider Verification",
      description: "Thorough background checks and credential verification for all healthcare professionals",
      details: [
        "Identity verification",
        "Professional license validation",
        "Background criminal checks",
        "Reference verification"
      ]
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Quality Standards",
      description: "Rigorous quality control measures to ensure service excellence",
      details: [
        "Service quality monitoring",
        "Regular performance reviews",
        "Client feedback analysis",
        "Continuous improvement programs"
      ]
    },
    {
      icon: <AlertCircle className="w-8 h-8" />,
      title: "Care Protocols",
      description: "Standardized care protocols for consistent service delivery",
      details: [
        "Evidence-based practices",
        "Safety guidelines",
        "Emergency procedures",
        "Infection control measures"
      ]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Data Security",
      description: "Advanced security measures to protect your information",
      details: [
        "Encrypted data storage",
        "Secure communication",
        "Privacy compliance",
        "Regular security audits"
      ]
    }
  ];

  const safetyFeatures = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Emergency Support",
      description: "Round-the-clock assistance for emergencies or concerns"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Insurance Coverage",
      description: "Comprehensive insurance for both providers and clients"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Quality Guarantee",
      description: "Satisfaction guarantee with all our services"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Regular Monitoring",
      description: "Continuous monitoring of service quality and safety"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Safety Standards
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your safety and well-being are our top priorities. Learn about our comprehensive safety measures and protocols.
            </p>
          </div>
        </div>
      </section>

      {/* Safety Measures Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {safetyMeasures.map((measure, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-brand-blue-dark mb-6">
                  {measure.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{measure.title}</h3>
                <p className="text-lg text-gray-600 mb-6">{measure.description}</p>
                <div className="space-y-3">
                  {measure.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Features Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Additional Safety Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Extra measures we take to ensure your safety and peace of mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-blue-dark">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Commitment to Safety</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We are committed to maintaining the highest standards of safety and quality in healthcare delivery. Our comprehensive safety protocols and continuous monitoring ensure that you receive the best possible care in a secure environment.
            </p>
            <Button className="bg-brand-blue-dark hover:bg-blue-600 text-white px-8 py-3">
              Learn More About Our Services
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 