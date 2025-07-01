'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('service_categories', [
      {
        id: '660e8400-e29b-41d4-a716-446655440001',
        name: 'Home Care',
        description: 'Professional home care services for elderly and patients',
        icon: 'home',
        color: '#3B82F6',
        isActive: true,
        sortOrder: 1,
        features: JSON.stringify(['Personal Care', 'Medical Assistance', 'Companionship', 'Housekeeping']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '660e8400-e29b-41d4-a716-446655440002',
        name: 'Medical Services',
        description: 'Professional medical services at your doorstep',
        icon: 'stethoscope',
        color: '#EF4444',
        isActive: true,
        sortOrder: 2,
        features: JSON.stringify(['Doctor Visits', 'Nursing Care', 'Physiotherapy', 'Health Monitoring']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '660e8400-e29b-41d4-a716-446655440003',
        name: 'Child Care',
        description: 'Professional childcare and babysitting services',
        icon: 'baby',
        color: '#10B981',
        isActive: true,
        sortOrder: 3,
        features: JSON.stringify(['Babysitting', 'Child Development', 'Educational Activities', 'Safety First']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '660e8400-e29b-41d4-a716-446655440004',
        name: 'Elderly Care',
        description: 'Specialized care services for senior citizens',
        icon: 'heart',
        color: '#F59E0B',
        isActive: true,
        sortOrder: 4,
        features: JSON.stringify(['Companionship', 'Medical Monitoring', 'Personal Care', 'Medication Management']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '660e8400-e29b-41d4-a716-446655440005',
        name: 'Post-Surgery Care',
        description: 'Professional post-operative care and recovery support',
        icon: 'shield',
        color: '#8B5CF6',
        isActive: true,
        sortOrder: 5,
        features: JSON.stringify(['Wound Care', 'Medication Management', 'Physical Therapy', 'Monitoring']),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('service_categories', null, {});
  }
};
