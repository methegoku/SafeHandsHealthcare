'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('providers', [
      {
        id: '990e8400-e29b-41d4-a716-446655440001',
        userId: '880e8400-e29b-41d4-a716-446655440001',
        businessName: 'Patel Home Care Services',
        description: 'Professional home care services with over 10 years of experience. Specializing in elderly care and post-surgery recovery.',
        cityId: '550e8400-e29b-41d4-a716-446655440001',
        address: '123 Marine Drive, Mumbai, Maharashtra 400001',
        phone: '9876543210',
        email: 'rajesh.patel@example.com',
        hourlyRate: 800.00,
        experience: 12,
        qualifications: JSON.stringify(['BSc Nursing', 'Geriatric Care Certification', 'First Aid Training']),
        certifications: JSON.stringify(['Registered Nurse', 'Home Care Specialist']),
        specializations: JSON.stringify(['Elderly Care', 'Post-Surgery Care', 'Medical Monitoring']),
        languages: JSON.stringify(['English', 'Hindi', 'Gujarati']),
        isVerified: true,
        isActive: true,
        isFeatured: true,
        rating: 4.8,
        totalReviews: 45,
        totalBookings: 120,
        commissionRate: 10.00,
        backgroundCheck: true,
        backgroundCheckDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '990e8400-e29b-41d4-a716-446655440002',
        userId: '880e8400-e29b-41d4-a716-446655440002',
        businessName: 'Sharma Medical Services',
        description: 'Comprehensive medical services at your doorstep. Experienced doctor with specialization in family medicine.',
        cityId: '550e8400-e29b-41d4-a716-446655440002',
        address: '456 Connaught Place, Delhi, Delhi 110001',
        phone: '9876543211',
        email: 'priya.sharma@example.com',
        hourlyRate: 1200.00,
        experience: 8,
        qualifications: JSON.stringify(['MBBS', 'MD Family Medicine', 'Home Visit Certification']),
        certifications: JSON.stringify(['Medical Council Registration', 'Family Medicine Specialist']),
        specializations: JSON.stringify(['Family Medicine', 'Pediatric Care', 'Geriatric Medicine']),
        languages: JSON.stringify(['English', 'Hindi', 'Punjabi']),
        isVerified: true,
        isActive: true,
        isFeatured: true,
        rating: 4.9,
        totalReviews: 67,
        totalBookings: 89,
        commissionRate: 10.00,
        backgroundCheck: true,
        backgroundCheckDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '990e8400-e29b-41d4-a716-446655440003',
        userId: '880e8400-e29b-41d4-a716-446655440003',
        businessName: 'Reddy Child Care Solutions',
        description: 'Professional childcare services with focus on child development and safety. Certified child care specialist.',
        cityId: '550e8400-e29b-41d4-a716-446655440003',
        address: '789 MG Road, Bangalore, Karnataka 560001',
        phone: '9876543212',
        email: 'anita.reddy@example.com',
        hourlyRate: 600.00,
        experience: 6,
        qualifications: JSON.stringify(['Child Development Degree', 'Early Childhood Education', 'First Aid Training']),
        certifications: JSON.stringify(['Child Care Specialist', 'Safety Certification']),
        specializations: JSON.stringify(['Child Development', 'Educational Activities', 'Babysitting']),
        languages: JSON.stringify(['English', 'Hindi', 'Kannada', 'Telugu']),
        isVerified: true,
        isActive: true,
        isFeatured: true,
        rating: 4.7,
        totalReviews: 34,
        totalBookings: 78,
        commissionRate: 10.00,
        backgroundCheck: true,
        backgroundCheckDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('providers', null, {});
  }
};
