'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('cities', [
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        name: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        isActive: true,
        latitude: 19.0760,
        longitude: 72.8777,
        timezone: 'Asia/Kolkata',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        name: 'Delhi',
        state: 'Delhi',
        country: 'India',
        isActive: true,
        latitude: 28.7041,
        longitude: 77.1025,
        timezone: 'Asia/Kolkata',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        name: 'Bangalore',
        state: 'Karnataka',
        country: 'India',
        isActive: true,
        latitude: 12.9716,
        longitude: 77.5946,
        timezone: 'Asia/Kolkata',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440004',
        name: 'Hyderabad',
        state: 'Telangana',
        country: 'India',
        isActive: true,
        latitude: 17.3850,
        longitude: 78.4867,
        timezone: 'Asia/Kolkata',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440005',
        name: 'Chennai',
        state: 'Tamil Nadu',
        country: 'India',
        isActive: true,
        latitude: 13.0827,
        longitude: 80.2707,
        timezone: 'Asia/Kolkata',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440006',
        name: 'Kolkata',
        state: 'West Bengal',
        country: 'India',
        isActive: true,
        latitude: 22.5726,
        longitude: 88.3639,
        timezone: 'Asia/Kolkata',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440007',
        name: 'Pune',
        state: 'Maharashtra',
        country: 'India',
        isActive: true,
        latitude: 18.5204,
        longitude: 73.8567,
        timezone: 'Asia/Kolkata',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440008',
        name: 'Ahmedabad',
        state: 'Gujarat',
        country: 'India',
        isActive: true,
        latitude: 23.0225,
        longitude: 72.5714,
        timezone: 'Asia/Kolkata',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cities', null, {});
  }
}; 