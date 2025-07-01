module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define('Provider', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 200]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cityId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'cities',
        key: 'id'
      }
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 15]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    hourlyRate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    experience: {
      type: DataTypes.INTEGER, // years of experience
      allowNull: true
    },
    qualifications: {
      type: DataTypes.JSON,
      allowNull: true
    },
    certifications: {
      type: DataTypes.JSON,
      allowNull: true
    },
    specializations: {
      type: DataTypes.JSON,
      allowNull: true
    },
    languages: {
      type: DataTypes.JSON,
      allowNull: true
    },
    availability: {
      type: DataTypes.JSON,
      allowNull: true
    },
    workingHours: {
      type: DataTypes.JSON,
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
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 0
    },
    totalReviews: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    totalBookings: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    coverImage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gallery: {
      type: DataTypes.JSON,
      allowNull: true
    },
    documents: {
      type: DataTypes.JSON,
      allowNull: true
    },
    bankDetails: {
      type: DataTypes.JSON,
      allowNull: true
    },
    commissionRate: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 10.00
    },
    emergencyContact: {
      type: DataTypes.JSON,
      allowNull: true
    },
    insurance: {
      type: DataTypes.JSON,
      allowNull: true
    },
    backgroundCheck: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    backgroundCheckDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'providers',
    timestamps: true
  });

  Provider.associate = function(models) {
    Provider.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Provider.belongsTo(models.City, { foreignKey: 'cityId', as: 'city' });
    Provider.hasMany(models.ProviderService, { foreignKey: 'providerId', as: 'services' });
    Provider.hasMany(models.Booking, { foreignKey: 'providerId', as: 'bookings' });
    Provider.hasMany(models.Review, { foreignKey: 'providerId', as: 'reviews' });
    Provider.hasMany(models.ProviderAvailability, { foreignKey: 'providerId', as: 'availability' });
  };

  return Provider;
}; 