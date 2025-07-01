import { Heart, Users, MapPin, Clock, Award, Target, Eye, Lightbulb } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      value: "10,000+",
      label: "Happy Clients"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      value: "5,000+",
      label: "Care Professionals"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      value: "50+",
      label: "Cities Covered"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      value: "5+",
      label: "Years of Excellence"
    }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Compassion",
      description: "We care deeply about our clients and their well-being"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Trust",
      description: "Building lasting relationships through reliability and transparency"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Excellence",
      description: "Committed to delivering the highest quality of care"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation",
      description: "Continuously improving our services through technology"
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      image: "/team/sarah.jpg"
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image: "/team/michael.jpg"
    },
    {
      name: "Priya Sharma",
      role: "Director of Care Services",
      image: "/team/priya.jpg"
    },
    {
      name: "David Wilson",
      role: "Technology Lead",
      image: "/team/david.jpg"
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
              About SafeHands Healthcare
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to make quality healthcare accessible to everyone, right at their doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-blue-dark">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                To revolutionize healthcare delivery by making quality medical services accessible, affordable, and convenient for everyone. We believe that everyone deserves access to professional healthcare services, regardless of their location or circumstances.
              </p>
              <p className="text-lg text-gray-600">
                Through our innovative platform, we connect patients with verified healthcare professionals, ensuring that quality care is just a click away.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 mb-6">
                To become the most trusted healthcare platform in India, known for our commitment to quality, safety, and patient satisfaction. We envision a future where healthcare is truly accessible to all.
              </p>
              <p className="text-lg text-gray-600">
                By leveraging technology and maintaining the highest standards of care, we aim to transform the healthcare landscape and improve the lives of millions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do at SafeHands Healthcare
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-blue-dark">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the experts behind SafeHands Healthcare
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Join Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Be part of our journey to transform healthcare delivery in India
            </p>
            <Button className="bg-brand-blue-dark hover:bg-blue-600 text-white px-8 py-3">
              View Open Positions
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 