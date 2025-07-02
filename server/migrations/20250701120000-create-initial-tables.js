'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Enable uuid extension
    await queryInterface.sequelize.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    // ENUMs
    await queryInterface.sequelize.query(`DO $$ BEGIN
      CREATE TYPE "enum_users_role" AS ENUM ('user', 'provider', 'admin');
      EXCEPTION WHEN duplicate_object THEN null; END $$;`);
    await queryInterface.sequelize.query(`DO $$ BEGIN
      CREATE TYPE "enum_users_gender" AS ENUM ('male', 'female', 'other');
      EXCEPTION WHEN duplicate_object THEN null; END $$;`);
    await queryInterface.sequelize.query(`DO $$ BEGIN
      CREATE TYPE "enum_bookings_status" AS ENUM ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'rejected');
      EXCEPTION WHEN duplicate_object THEN null; END $$;`);
    await queryInterface.sequelize.query(`DO $$ BEGIN
      CREATE TYPE "enum_bookings_payment_status" AS ENUM ('pending', 'paid', 'failed', 'refunded');
      EXCEPTION WHEN duplicate_object THEN null; END $$;`);
    await queryInterface.sequelize.query(`DO $$ BEGIN
      CREATE TYPE "enum_bookings_cancelled_by" AS ENUM ('user', 'provider', 'admin');
      EXCEPTION WHEN duplicate_object THEN null; END $$;`);
    await queryInterface.sequelize.query(`DO $$ BEGIN
      CREATE TYPE "enum_services_price_type" AS ENUM ('hourly', 'daily', 'weekly', 'monthly', 'fixed');
      EXCEPTION WHEN duplicate_object THEN null; END $$;`);
    await queryInterface.sequelize.query(`DO $$ BEGIN
      CREATE TYPE "enum_payments_payment_method" AS ENUM ('credit_card', 'debit_card', 'upi', 'net_banking', 'wallet', 'cash');
      EXCEPTION WHEN duplicate_object THEN null; END $$;`);
    await queryInterface.sequelize.query(`DO $$ BEGIN
      CREATE TYPE "enum_payments_status" AS ENUM ('pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled');
      EXCEPTION WHEN duplicate_object THEN null; END $$;`);

    // Tables
    await queryInterface.createTable('service_categories', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.literal('uuid_generate_v4()'), primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false, unique: true },
      description: Sequelize.TEXT,
      icon: Sequelize.STRING,
      color: { type: Sequelize.STRING, defaultValue: '#3B82F6' },
      isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
      sortOrder: { type: Sequelize.INTEGER, defaultValue: 0 },
      image: Sequelize.STRING,
      features: Sequelize.JSON,
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
    });

    await queryInterface.createTable('services', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.literal('uuid_generate_v4()'), primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      description: Sequelize.TEXT,
      categoryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'service_categories', key: 'id' },
        onDelete: 'CASCADE'
      },
      basePrice: { type: Sequelize.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
      priceType: { type: 'enum_services_price_type', defaultValue: 'hourly' },
      duration: Sequelize.INTEGER,
      isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
      requirements: Sequelize.JSON,
      includedServices: Sequelize.JSON,
      excludedServices: Sequelize.JSON,
      image: Sequelize.STRING,
      sortOrder: { type: Sequelize.INTEGER, defaultValue: 0 },
      tags: Sequelize.JSON,
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
    });

    await queryInterface.createTable('cities', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.literal('uuid_generate_v4()'), primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      state: { type: Sequelize.STRING, allowNull: false },
      country: { type: Sequelize.STRING, allowNull: false, defaultValue: 'India' },
      isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
      latitude: Sequelize.DECIMAL(10, 8),
      longitude: Sequelize.DECIMAL(11, 8),
      timezone: { type: Sequelize.STRING, defaultValue: 'Asia/Kolkata' },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
    });

    await queryInterface.createTable('users', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.literal('uuid_generate_v4()'), primaryKey: true },
      firstName: { type: Sequelize.STRING, allowNull: false },
      lastName: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
      phone: Sequelize.STRING,
      role: { type: 'enum_users_role', defaultValue: 'user' },
      isVerified: { type: Sequelize.BOOLEAN, defaultValue: false },
      isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
      profileImage: Sequelize.STRING,
      dateOfBirth: Sequelize.DATEONLY,
      gender: { type: 'enum_users_gender' },
      address: Sequelize.TEXT,
      city: Sequelize.STRING,
      state: Sequelize.STRING,
      zipCode: Sequelize.STRING,
      emergencyContact: Sequelize.JSON,
      preferences: Sequelize.JSON,
      lastLoginAt: Sequelize.DATE,
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
    });

    await queryInterface.createTable('providers', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.literal('uuid_generate_v4()'), primaryKey: true },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE'
      },
      businessName: { type: Sequelize.STRING, allowNull: false },
      description: Sequelize.TEXT,
      cityId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'cities', key: 'id' },
        onDelete: 'CASCADE'
      },
      address: { type: Sequelize.TEXT, allowNull: false },
      phone: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false },
      hourlyRate: { type: Sequelize.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
      experience: Sequelize.INTEGER,
      qualifications: Sequelize.JSON,
      certifications: Sequelize.JSON,
      specializations: Sequelize.JSON,
      languages: Sequelize.JSON,
      availability: Sequelize.JSON,
      workingHours: Sequelize.JSON,
      isVerified: { type: Sequelize.BOOLEAN, defaultValue: false },
      isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
      isFeatured: { type: Sequelize.BOOLEAN, defaultValue: false },
      rating: { type: Sequelize.DECIMAL(3, 2), defaultValue: 0 },
      totalReviews: { type: Sequelize.INTEGER, defaultValue: 0 },
      totalBookings: { type: Sequelize.INTEGER, defaultValue: 0 },
      profileImage: Sequelize.STRING,
      coverImage: Sequelize.STRING,
      gallery: Sequelize.JSON,
      documents: Sequelize.JSON,
      bankDetails: Sequelize.JSON,
      commissionRate: { type: Sequelize.DECIMAL(5, 2), defaultValue: 10.00 },
      emergencyContact: Sequelize.JSON,
      insurance: Sequelize.JSON,
      backgroundCheck: { type: Sequelize.BOOLEAN, defaultValue: false },
      backgroundCheckDate: Sequelize.DATE,
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
    });

    await queryInterface.createTable('provider_services', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.literal('uuid_generate_v4()'), primaryKey: true },
      providerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'providers', key: 'id' },
        onDelete: 'CASCADE'
      },
      serviceId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'services', key: 'id' },
        onDelete: 'CASCADE'
      },
      price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
      description: Sequelize.TEXT,
      requirements: Sequelize.JSON,
      includedServices: Sequelize.JSON,
      excludedServices: Sequelize.JSON,
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
    });

    await queryInterface.createTable('provider_availability', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.literal('uuid_generate_v4()'), primaryKey: true },
      providerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'providers', key: 'id' },
        onDelete: 'CASCADE'
      },
      dayOfWeek: { type: Sequelize.INTEGER, allowNull: false },
      startTime: { type: Sequelize.TIME, allowNull: false },
      endTime: { type: Sequelize.TIME, allowNull: false },
      isAvailable: { type: Sequelize.BOOLEAN, defaultValue: true },
      breakStartTime: Sequelize.TIME,
      breakEndTime: Sequelize.TIME,
      maxBookingsPerDay: Sequelize.INTEGER,
      notes: Sequelize.TEXT,
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
    });

    await queryInterface.createTable('bookings', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.literal('uuid_generate_v4()'), primaryKey: true },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE'
      },
      providerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'providers', key: 'id' },
        onDelete: 'CASCADE'
      },
      serviceId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'services', key: 'id' },
        onDelete: 'CASCADE'
      },
      scheduleDate: { type: Sequelize.DATE, allowNull: false },
      duration: Sequelize.INTEGER,
      price: Sequelize.DECIMAL(10, 2),
      status: { type: 'enum_bookings_status', defaultValue: 'pending' },
      paymentStatus: { type: 'enum_bookings_payment_status', defaultValue: 'pending' },
      cancelledBy: { type: 'enum_bookings_cancelled_by' },
      cancellationReason: Sequelize.TEXT,
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
    });

    await queryInterface.createTable('payments', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.literal('uuid_generate_v4()'), primaryKey: true },
      paymentNumber: { type: Sequelize.STRING, allowNull: false, unique: true },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE'
      },
      bookingId: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        references: { model: 'bookings', key: 'id' },
        onDelete: 'CASCADE'
      },
      amount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      currency: { type: Sequelize.STRING, defaultValue: 'INR' },
      paymentMethod: { type: 'enum_payments_payment_method' },
      paymentGateway: Sequelize.STRING,
      transactionId: Sequelize.STRING,
      status: { type: 'enum_payments_status', defaultValue: 'pending' },
      gatewayResponse: Sequelize.JSON,
      failureReason: Sequelize.TEXT,
      refundAmount: Sequelize.DECIMAL(10, 2),
      refundReason: Sequelize.TEXT,
      refundedAt: Sequelize.DATE,
      paidAt: Sequelize.DATE,
      billingAddress: Sequelize.JSON,
      taxAmount: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0 },
      discountAmount: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0 },
      couponCode: Sequelize.STRING,
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
    });

    await queryInterface.createTable('reviews', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.literal('uuid_generate_v4()'), primaryKey: true },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE'
      },
      providerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'providers', key: 'id' },
        onDelete: 'CASCADE'
      },
      bookingId: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        references: { model: 'bookings', key: 'id' },
        onDelete: 'CASCADE'
      },
      rating: { type: Sequelize.INTEGER, allowNull: false },
      title: { type: Sequelize.STRING },
      comment: Sequelize.TEXT,
      isVerified: { type: Sequelize.BOOLEAN, defaultValue: false },
      isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
      helpfulCount: { type: Sequelize.INTEGER, defaultValue: 0 },
      reportCount: { type: Sequelize.INTEGER, defaultValue: 0 },
      categories: Sequelize.JSON,
      images: Sequelize.JSON,
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('reviews').catch(() => {});
    await queryInterface.dropTable('payments').catch(() => {});
    await queryInterface.dropTable('bookings').catch(() => {});
    await queryInterface.dropTable('provider_availability').catch(() => {});
    await queryInterface.dropTable('provider_services').catch(() => {});
    await queryInterface.dropTable('providers').catch(() => {});
    await queryInterface.dropTable('users').catch(() => {});
    await queryInterface.dropTable('cities').catch(() => {});
    await queryInterface.dropTable('services').catch(() => {});
    await queryInterface.dropTable('service_categories').catch(() => {});

    await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_users_role";`);
    await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_users_gender";`);
    await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_bookings_status";`);
    await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_bookings_payment_status";`);
    await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_bookings_cancelled_by";`);
    await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_services_price_type";`);
    await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_payments_payment_method";`);
    await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_payments_status";`);
  }
};
