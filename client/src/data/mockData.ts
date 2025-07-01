// Hardcoded Indian data for SafeHands platform

export interface City {
  id: number;
  name: string;
  state: string;
  country: string;
}

export interface ServiceCategory {
  id: number;
  name: string;
  description: string;
  icon: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  basePrice: number;
}

export interface Provider {
  id: number;
  name: string;
  email: string;
  phone: string;
  experience: number;
  rating: number;
  reviewCount: number;
  bio: string;
  cityId: number;
  services: number[];
  availability: string[];
  profileImage: string;
  verified: boolean;
  languages: string[];
  education: string;
}

export interface Review {
  id: number;
  providerId: number;
  customerName: string;
  customerEmail: string;
  rating: number;
  comment: string;
  date: string;
  serviceType: string;
}

export interface Booking {
  id: number;
  providerId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceId: number;
  date: string;
  time: string;
  duration: number;
  address: string;
  cityId: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes: string;
  totalAmount: number;
}

// Indian Cities
export const cities: City[] = [
  { id: 1, name: "Mumbai", state: "Maharashtra", country: "India" },
  { id: 2, name: "Delhi", state: "Delhi", country: "India" },
  { id: 3, name: "Bangalore", state: "Karnataka", country: "India" },
  { id: 4, name: "Hyderabad", state: "Telangana", country: "India" },
  { id: 5, name: "Chennai", state: "Tamil Nadu", country: "India" },
  { id: 6, name: "Kolkata", state: "West Bengal", country: "India" },
  { id: 7, name: "Pune", state: "Maharashtra", country: "India" },
  { id: 8, name: "Ahmedabad", state: "Gujarat", country: "India" },
  { id: 9, name: "Jaipur", state: "Rajasthan", country: "India" },
  { id: 10, name: "Surat", state: "Gujarat", country: "India" },
  { id: 11, name: "Lucknow", state: "Uttar Pradesh", country: "India" },
  { id: 12, name: "Kanpur", state: "Uttar Pradesh", country: "India" },
  { id: 13, name: "Nagpur", state: "Maharashtra", country: "India" },
  { id: 14, name: "Indore", state: "Madhya Pradesh", country: "India" },
  { id: 15, name: "Thane", state: "Maharashtra", country: "India" },
];

// Service Categories
export const serviceCategories: ServiceCategory[] = [
  {
    id: 1,
    name: "Home Care",
    description: "Professional home care services including elderly care, patient care, and daily assistance",
    icon: "🏠"
  },
  {
    id: 2,
    name: "Medical Services",
    description: "Licensed medical professionals providing nursing, physiotherapy, and medical assistance",
    icon: "🏥"
  },
  {
    id: 3,
    name: "Child Care",
    description: "Certified childcare providers including nannies, babysitters, and child development specialists",
    icon: "👶"
  }
];

// Services
export const services: Service[] = [
  // Home Care Services
  { id: 1, name: "Elderly Care", description: "Compassionate care for elderly family members", categoryId: 1, basePrice: 800 },
  { id: 2, name: "Patient Care", description: "Post-surgery and recovery care at home", categoryId: 1, basePrice: 1000 },
  { id: 3, name: "Daily Living Assistance", description: "Help with daily activities and household tasks", categoryId: 1, basePrice: 600 },
  { id: 4, name: "Companion Care", description: "Social companionship and emotional support", categoryId: 1, basePrice: 500 },
  
  // Medical Services
  { id: 5, name: "Home Nursing", description: "Licensed nurses for medical care at home", categoryId: 2, basePrice: 1200 },
  { id: 6, name: "Physiotherapy", description: "Professional physiotherapy sessions at home", categoryId: 2, basePrice: 800 },
  { id: 7, name: "Injections & Dressing", description: "Medical injections and wound dressing", categoryId: 2, basePrice: 400 },
  { id: 8, name: "Health Monitoring", description: "Regular health checkups and monitoring", categoryId: 2, basePrice: 600 },
  
  // Child Care Services
  { id: 9, name: "Full-time Nanny", description: "Dedicated full-time childcare professional", categoryId: 3, basePrice: 1500 },
  { id: 10, name: "Babysitting", description: "Occasional babysitting services", categoryId: 3, basePrice: 300 },
  { id: 11, name: "Child Development", description: "Educational activities and development programs", categoryId: 3, basePrice: 700 },
  { id: 12, name: "Newborn Care", description: "Specialized care for newborns and infants", categoryId: 3, basePrice: 1200 },
];

// Indian Service Providers
export const providers: Provider[] = [
  {
    id: 1,
    name: "Priya Sharma",
    email: "priya.sharma@safehands.in",
    phone: "+91 9876543210",
    experience: 8,
    rating: 4.9,
    reviewCount: 127,
    bio: "Certified elderly care specialist with 8 years of experience. Dedicated to providing compassionate care for your loved ones.",
    cityId: 1, // Mumbai
    services: [1, 2, 4],
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    profileImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    verified: true,
    languages: ["Hindi", "English", "Marathi"],
    education: "Bachelor's in Nursing, Certified Geriatric Care"
  },
  {
    id: 2,
    name: "Dr. Rajesh Patel",
    email: "dr.rajesh@safehands.in",
    phone: "+91 9876543211",
    experience: 12,
    rating: 4.8,
    reviewCount: 203,
    bio: "Licensed physiotherapist specializing in post-operative rehabilitation and chronic pain management.",
    cityId: 2, // Delhi
    services: [5, 6, 8],
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    profileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    verified: true,
    languages: ["Hindi", "English", "Gujarati"],
    education: "MBBS, MPT in Orthopedics"
  },
  {
    id: 3,
    name: "Anita Reddy",
    email: "anita.reddy@safehands.in",
    phone: "+91 9876543212",
    experience: 6,
    rating: 4.7,
    reviewCount: 89,
    bio: "Professional nanny with early childhood education background. Experienced in newborn to toddler care.",
    cityId: 3, // Bangalore
    services: [9, 11, 12],
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    profileImage: "https://images.unsplash.com/photo-1594824388853-2c5899d65ddc?w=150&h=150&fit=crop&crop=face",
    verified: true,
    languages: ["Telugu", "English", "Kannada"],
    education: "Bachelor's in Early Childhood Education"
  },
  {
    id: 4,
    name: "Sister Mary Joseph",
    email: "mary.joseph@safehands.in",
    phone: "+91 9876543213",
    experience: 15,
    rating: 4.9,
    reviewCount: 156,
    bio: "Senior nursing professional with extensive experience in home healthcare and patient recovery.",
    cityId: 5, // Chennai
    services: [5, 7, 8],
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    profileImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
    verified: true,
    languages: ["Tamil", "English", "Malayalam"],
    education: "B.Sc Nursing, Critical Care Certification"
  },
  {
    id: 5,
    name: "Kavya Iyer",
    email: "kavya.iyer@safehands.in",
    phone: "+91 9876543214",
    experience: 4,
    rating: 4.6,
    reviewCount: 72,
    bio: "Young and energetic childcare provider specializing in creative learning and child development activities.",
    cityId: 1, // Mumbai
    services: [10, 11],
    availability: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
    profileImage: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face",
    verified: true,
    languages: ["Hindi", "English", "Tamil"],
    education: "Bachelor's in Child Psychology"
  },
  {
    id: 6,
    name: "Suresh Kumar",
    email: "suresh.kumar@safehands.in",
    phone: "+91 9876543215",
    experience: 10,
    rating: 4.8,
    reviewCount: 134,
    bio: "Male caregiver specializing in elderly male patient care and daily living assistance.",
    cityId: 4, // Hyderabad
    services: [1, 3, 4],
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    profileImage: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face",
    verified: true,
    languages: ["Telugu", "Hindi", "English"],
    education: "Diploma in Healthcare, Certified Caregiver"
  },
  {
    id: 7,
    name: "Meera Joshi",
    email: "meera.joshi@safehands.in",
    phone: "+91 9876543216",
    experience: 7,
    rating: 4.7,
    reviewCount: 98,
    bio: "Experienced home nurse with expertise in diabetes management and elderly care.",
    cityId: 7, // Pune
    services: [2, 5, 8],
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    profileImage: "https://images.unsplash.com/photo-1551601651-e632946d3e8e?w=150&h=150&fit=crop&crop=face",
    verified: true,
    languages: ["Marathi", "Hindi", "English"],
    education: "B.Sc Nursing, Diabetes Care Certification"
  },
  {
    id: 8,
    name: "Fatima Khan",
    email: "fatima.khan@safehands.in",
    phone: "+91 9876543217",
    experience: 9,
    rating: 4.8,
    reviewCount: 121,
    bio: "Multilingual caregiver with specialization in companion care and emotional support for elderly.",
    cityId: 2, // Delhi
    services: [1, 4],
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    profileImage: "https://images.unsplash.com/photo-1670272505340-d906d8d77d03?w=150&h=150&fit=crop&crop=face",
    verified: true,
    languages: ["Urdu", "Hindi", "English"],
    education: "Master's in Social Work"
  }
];

// Customer Reviews
export const reviews: Review[] = [
  {
    id: 1,
    providerId: 1,
    customerName: "Ramesh Gupta",
    customerEmail: "ramesh.gupta@gmail.com",
    rating: 5,
    comment: "Priya didi took excellent care of my mother. Very professional and caring. Highly recommend!",
    date: "2024-12-15",
    serviceType: "Elderly Care"
  },
  {
    id: 2,
    providerId: 2,
    customerName: "Sunita Agarwal",
    customerEmail: "sunita.agarwal@yahoo.in",
    rating: 5,
    comment: "Dr. Rajesh helped my father recover completely after his knee surgery. Outstanding physiotherapy sessions.",
    date: "2024-12-10",
    serviceType: "Physiotherapy"
  },
  {
    id: 3,
    providerId: 3,
    customerName: "Vikram Rao",
    customerEmail: "vikram.rao@hotmail.com",
    rating: 4,
    comment: "Anita is wonderful with children. My 2-year-old daughter loves spending time with her.",
    date: "2024-12-08",
    serviceType: "Child Care"
  },
  {
    id: 4,
    providerId: 4,
    customerName: "Lakshmi Krishnan",
    customerEmail: "lakshmi.k@gmail.com",
    rating: 5,
    comment: "Sister Mary provided exceptional nursing care after my surgery. Very knowledgeable and gentle.",
    date: "2024-12-05",
    serviceType: "Home Nursing"
  },
  {
    id: 5,
    providerId: 1,
    customerName: "Arjun Mehta",
    customerEmail: "arjun.mehta@rediffmail.com",
    rating: 5,
    comment: "My grandmother feels much happier and healthier with Priya's care. Thank you SafeHands!",
    date: "2024-12-02",
    serviceType: "Elderly Care"
  },
  {
    id: 6,
    providerId: 5,
    customerName: "Deepika Sharma",
    customerEmail: "deepika.sharma@gmail.com",
    rating: 4,
    comment: "Kavya is very creative with activities for my son. He learns so much and has fun too.",
    date: "2024-11-28",
    serviceType: "Child Development"
  },
  {
    id: 7,
    providerId: 6,
    customerName: "Madhuri Devi",
    customerEmail: "madhuri.devi@yahoo.in",
    rating: 5,
    comment: "Suresh bhai takes great care of my husband. Very reliable and understanding.",
    date: "2024-11-25",
    serviceType: "Patient Care"
  },
  {
    id: 8,
    providerId: 7,
    customerName: "Rohit Patil",
    customerEmail: "rohit.patil@gmail.com",
    rating: 4,
    comment: "Meera provided excellent nursing care for my diabetic mother. Very professional service.",
    date: "2024-11-20",
    serviceType: "Health Monitoring"
  }
];

// Sample Bookings
export const bookings: Booking[] = [
  {
    id: 1,
    providerId: 1,
    customerName: "Sanjay Malhotra",
    customerEmail: "sanjay.malhotra@gmail.com",
    customerPhone: "+91 9988776655",
    serviceId: 1,
    date: "2024-12-20",
    time: "09:00",
    duration: 4,
    address: "304, Silver Heights, Andheri West, Mumbai",
    cityId: 1,
    status: 'confirmed',
    notes: "Patient is diabetic, needs medication reminders",
    totalAmount: 3200
  },
  {
    id: 2,
    providerId: 3,
    customerName: "Neha Agarwal",
    customerEmail: "neha.agarwal@yahoo.in",
    customerPhone: "+91 9977665544",
    serviceId: 11,
    date: "2024-12-18",
    time: "14:00",
    duration: 2,
    address: "45, Brigade Towers, Koramangala, Bangalore",
    cityId: 3,
    status: 'pending',
    notes: "3-year-old child, loves drawing and storytelling",
    totalAmount: 1400
  }
];

// Utility functions to get data
export const getCityById = (id: number): City | undefined => {
  return cities.find(city => city.id === id);
};

export const getServiceById = (id: number): Service | undefined => {
  return services.find(service => service.id === id);
};

export const getProviderById = (id: number): Provider | undefined => {
  return providers.find(provider => provider.id === id);
};

export const getServicesByCategory = (categoryId: number): Service[] => {
  return services.filter(service => service.categoryId === categoryId);
};

export const getProvidersByCity = (cityId: number): Provider[] => {
  return providers.filter(provider => provider.cityId === cityId);
};

export const getProvidersByService = (serviceId: number): Provider[] => {
  return providers.filter(provider => provider.services.includes(serviceId));
};

export const getReviewsByProvider = (providerId: number): Review[] => {
  return reviews.filter(review => review.providerId === providerId);
};

export const getFeaturedReviews = (): Review[] => {
  return reviews.filter(review => review.rating >= 4.5).slice(0, 6);
};