module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    bookingNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    providerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'providers',
        key: 'id'
      }
    },
    serviceId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'services',
        key: 'id'
      }
    },
    cityId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'cities',
        key: 'id'
      }
    },
    scheduledDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER, // in hours
      allowNull: false,
      defaultValue: 1
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'rejected'),
      defaultValue: 'pending'
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    commissionAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    providerAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    paymentStatus: {
      type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
      defaultValue: 'pending'
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cancellationReason: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cancelledBy: {
      type: DataTypes.ENUM('user', 'provider', 'admin'),
      allowNull: true
    },
    cancelledAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    actualDuration: {
      type: DataTypes.INTEGER, // in hours
      allowNull: true
    },
    emergencyContact: {
      type: DataTypes.JSON,
      allowNull: true
    },
    specialInstructions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    insuranceDetails: {
      type: DataTypes.JSON,
      allowNull: true
    },
    documents: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    tableName: 'bookings',
    timestamps: true,
    hooks: {
      beforeCreate: (booking) => {
        // Generate booking number
        const timestamp = Date.now().toString().slice(-8);
        const random = Math.random().toString(36).substr(2, 4).toUpperCase();
        booking.bookingNumber = `SH${timestamp}${random}`;
        
        // Calculate amounts
        if (booking.totalAmount && booking.commissionAmount) {
          booking.providerAmount = parseFloat(booking.totalAmount) - parseFloat(booking.commissionAmount);
        }
      }
    }
  });

  Booking.associate = function(models) {
    Booking.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Booking.belongsTo(models.Provider, { foreignKey: 'providerId', as: 'provider' });
    Booking.belongsTo(models.Service, { foreignKey: 'serviceId', as: 'service' });
    Booking.belongsTo(models.City, { foreignKey: 'cityId', as: 'city' });
    Booking.hasOne(models.Payment, { foreignKey: 'bookingId', as: 'payment' });
    Booking.hasOne(models.Review, { foreignKey: 'bookingId', as: 'review' });
  };

  return Booking;
}; 