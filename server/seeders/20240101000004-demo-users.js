'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('password123', 12);
    
    await queryInterface.bulkInsert('users', [
      {
        id: '880e8400-e29b-41d4-a716-446655440001',
        firstName: 'Rajesh',
        lastName: 'Patel',
        email: 'rajesh.patel@example.com',
        password: hashedPassword,
        phone: '9876543210',
        role: 'provider',
        isVerified: true,
        isActive: true,
        profileImage: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '880e8400-e29b-41d4-a716-446655440002',
        firstName: 'Priya',
        lastName: 'Sharma',
        email: 'priya.sharma@example.com',
        password: hashedPassword,
        phone: '9876543211',
        role: 'provider',
        isVerified: true,
        isActive: true,
        profileImage: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '880e8400-e29b-41d4-a716-446655440003',
        firstName: 'Anita',
        lastName: 'Reddy',
        email: 'anita.reddy@example.com',
        password: hashedPassword,
        phone: '9876543212',
        role: 'provider',
        isVerified: true,
        isActive: true,
        profileImage: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '880e8400-e29b-41d4-a716-446655440004',
        firstName: 'Aryan',
        lastName: 'Sakaria',
        email: 'aryansakaria01@gmail.com',
        password: hashedPassword,
        phone: '9876543213',
        role: 'user',
        isVerified: true,
        isActive: true,
        profileImage: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '880e8400-e29b-41d4-a716-446655440005',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@safehands.com',
        password: hashedPassword,
        phone: '9876543214',
        role: 'admin',
        isVerified: true,
        isActive: true,
        profileImage: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
}; 