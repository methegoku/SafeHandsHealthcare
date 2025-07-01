module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
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
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'service_categories',
        key: 'id'
      }
    },
    basePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    priceType: {
      type: DataTypes.ENUM('hourly', 'daily', 'weekly', 'monthly', 'fixed'),
      defaultValue: 'hourly'
    },
    duration: {
      type: DataTypes.INTEGER, // in minutes
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    requirements: {
      type: DataTypes.JSON,
      allowNull: true
    },
    includedServices: {
      type: DataTypes.JSON,
      allowNull: true
    },
    excludedServices: {
      type: DataTypes.JSON,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    tableName: 'services',
    timestamps: true
  });

  Service.associate = function(models) {
    Service.belongsTo(models.ServiceCategory, { foreignKey: 'categoryId', as: 'category' });
    Service.hasMany(models.ProviderService, { foreignKey: 'serviceId', as: 'providerServices' });
    Service.hasMany(models.Booking, { foreignKey: 'serviceId', as: 'bookings' });
  };

  return Service;
}; 