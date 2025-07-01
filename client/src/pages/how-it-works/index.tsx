import { Search, CheckCircle, Calendar, MessageSquare, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function HowItWorksPage() {
  const steps = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Search & Select",
      description: "Browse through our verified healthcare professionals and select the service you need",
      details: [
        "Filter by service type, location, and availability",
        "View detailed provider profiles",
        "Compare different providers",
        "Check pricing and packages"
      ]
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Verify & Book",
      description: "Review provider credentials and book your appointment",
      details: [
        "Check provider certifications",
        "Read reviews and ratings",
        "Select preferred time slot",
        "Confirm booking details"
      ]
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Schedule & Prepare",
      description: "Receive appointment confirmation and prepare for your service",
      details: [
        "Get appointment confirmation",
        "Receive preparation instructions",
        "Access provider contact details",
        "Review service requirements"
      ]
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Connect & Communicate",
      description: "Stay connected with your healthcare provider",
      details: [
        "Direct messaging with provider",
        "Receive appointment updates",
        "Modify service requirements",
        "Get real-time support"
      ]
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Review & Rate",
      description: "Share your experience and help others make informed decisions",
      details: [
        "Rate your experience",
        "Provide detailed feedback",
        "Share your story",
        "Suggest improvements"
      ]
    }
  ];

  const faqs = [
    {
      question: "How do I book a service?",
      answer: "Simply browse our services, select a provider, choose your preferred time slot, and complete the booking process. You'll receive a confirmation email with all the details."
    },
    {
      question: "How are providers verified?",
      answer: "All our providers undergo a thorough verification process including background checks, license verification, and reference checks to ensure the highest standards of care."
    },
    {
      question: "Can I cancel or reschedule my appointment?",
      answer: "Yes, you can cancel or reschedule your appointment up to 24 hours before the scheduled time. Please check our cancellation policy for more details."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept various payment methods including credit/debit cards, UPI, net banking, and digital wallets. All payments are secure and encrypted."
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer: "We have a satisfaction guarantee policy. If you're not satisfied with the service, please contact our support team within 24 hours of the service, and we'll address your concerns."
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
              How It Works
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started with SafeHands Healthcare in just a few simple steps
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-brand-blue-dark flex-shrink-0">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-2xl font-bold text-brand-blue-dark">Step {index + 1}</span>
                    <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-lg text-gray-600 mb-6">{step.description}</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our services
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Join thousands of satisfied customers who trust SafeHands Healthcare
            </p>
            <Button className="bg-brand-blue-dark hover:bg-blue-600 text-white px-8 py-3">
              Book Your First Service
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 