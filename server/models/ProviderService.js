module.exports = (sequelize, DataTypes) => {
  const ProviderService = sequelize.define('ProviderService', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
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
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
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
    }
  }, {
    tableName: 'provider_services',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['providerId', 'serviceId']
      }
    ]
  });

  ProviderService.associate = function(models) {
    ProviderService.belongsTo(models.Provider, { foreignKey: 'providerId', as: 'provider' });
    ProviderService.belongsTo(models.Service, { foreignKey: 'serviceId', as: 'service' });
  };

  return ProviderService;
}; 