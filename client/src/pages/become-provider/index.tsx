import { DollarSign, Clock, GraduationCap, Shield, CheckCircle, FileText, Users, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function BecomeProviderPage() {
  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Competitive Earnings",
      description: "Earn what you deserve with our transparent pricing model"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Flexible Schedule",
      description: "Choose your own hours and work-life balance"
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Professional Growth",
      description: "Access to training and development opportunities"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Insurance Coverage",
      description: "Comprehensive insurance for peace of mind"
    }
  ];

  const requirements = [
    {
      title: "Professional Qualifications",
      items: [
        "Valid professional license",
        "Minimum 2 years experience",
        "Clean background check",
        "Professional references"
      ]
    },
    {
      title: "Technical Requirements",
      items: [
        "Smartphone with internet access",
        "Basic computer skills",
        "Reliable transportation",
        "Valid insurance"
      ]
    },
    {
      title: "Personal Qualities",
      items: [
        "Excellent communication skills",
        "Compassionate and caring",
        "Professional demeanor",
        "Reliable and punctual"
      ]
    }
  ];

  const steps = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Complete Application",
      description: "Fill out our online application form with your details"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Document Verification",
      description: "Submit required documents for verification"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Interview Process",
      description: "Meet with our team for a comprehensive assessment"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Onboarding",
      description: "Complete training and start accepting clients"
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
              Become a Healthcare Provider
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our network of trusted healthcare professionals and make a difference in people's lives
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Join Us?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the benefits of being part of our healthcare network
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-blue-dark">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Requirements</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              What you need to join our network of healthcare providers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {requirements.map((requirement, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6">{requirement.title}</h3>
                <div className="space-y-4">
                  {requirement.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Application Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to start your journey with us
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-blue-dark">
                  {step.icon}
                </div>
                <div className="text-2xl font-bold text-brand-blue-dark mb-2">Step {index + 1}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Ready to Join Us?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Start your journey as a healthcare provider with SafeHands Healthcare
            </p>
            <Button className="bg-brand-blue-dark hover:bg-blue-600 text-white px-8 py-3">
              Apply Now
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 