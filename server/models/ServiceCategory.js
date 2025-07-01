module.exports = (sequelize, DataTypes) => {
  const ServiceCategory = sequelize.define('ServiceCategory', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [2, 100]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '#3B82F6'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    features: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    tableName: 'service_categories',
    timestamps: true
  });

  ServiceCategory.associate = function(models) {
    ServiceCategory.hasMany(models.Service, { foreignKey: 'categoryId', as: 'services' });
  };

  return ServiceCategory;
}; 