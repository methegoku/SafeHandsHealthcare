module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    paymentNumber: {
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
    bookingId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: 'bookings',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'INR'
    },
    paymentMethod: {
      type: DataTypes.ENUM('credit_card', 'debit_card', 'upi', 'net_banking', 'wallet', 'cash'),
      allowNull: false
    },
    paymentGateway: {
      type: DataTypes.STRING,
      allowNull: true
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled'),
      defaultValue: 'pending'
    },
    gatewayResponse: {
      type: DataTypes.JSON,
      allowNull: true
    },
    failureReason: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    refundAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    refundReason: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    refundedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    paidAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    billingAddress: {
      type: DataTypes.JSON,
      allowNull: true
    },
    taxAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0
    },
    discountAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0
    },
    couponCode: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'payments',
    timestamps: true,
    hooks: {
      beforeCreate: (payment) => {
        // Generate payment number
        const timestamp = Date.now().toString().slice(-8);
        const random = Math.random().toString(36).substr(2, 4).toUpperCase();
        payment.paymentNumber = `PAY${timestamp}${random}`;
      }
    }
  });

  Payment.associate = function(models) {
    Payment.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Payment.belongsTo(models.Booking, { foreignKey: 'bookingId', as: 'booking' });
  };

  return Payment;
}; 