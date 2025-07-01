module.exports = (sequelize, DataTypes) => {
  const ProviderAvailability = sequelize.define('ProviderAvailability', {
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
    dayOfWeek: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 6
      }
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    breakStartTime: {
      type: DataTypes.TIME,
      allowNull: true
    },
    breakEndTime: {
      type: DataTypes.TIME,
      allowNull: true
    },
    maxBookingsPerDay: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'provider_availability',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['providerId', 'dayOfWeek']
      }
    ]
  });

  ProviderAvailability.associate = function(models) {
    ProviderAvailability.belongsTo(models.Provider, { foreignKey: 'providerId', as: 'provider' });
  };

  return ProviderAvailability;
}; 