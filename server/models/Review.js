module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
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
    bookingId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: 'bookings',
        key: 'id'
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 200]
      }
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    helpfulCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    reportCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    categories: {
      type: DataTypes.JSON,
      allowNull: true
    },
    images: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    tableName: 'reviews',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['userId', 'bookingId']
      }
    ]
  });

  Review.associate = function(models) {
    Review.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Review.belongsTo(models.Provider, { foreignKey: 'providerId', as: 'provider' });
    Review.belongsTo(models.Booking, { foreignKey: 'bookingId', as: 'booking' });
  };

  return Review;
}; 