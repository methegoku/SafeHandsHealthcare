module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 100]
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50]
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'India'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true
    },
    timezone: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Asia/Kolkata'
    }
  }, {
    tableName: 'cities',
    timestamps: true
  });

  City.associate = function(models) {
    City.hasMany(models.Provider, { foreignKey: 'cityId', as: 'providers' });
    City.hasMany(models.Booking, { foreignKey: 'cityId', as: 'bookings' });
  };

  return City;
}; 