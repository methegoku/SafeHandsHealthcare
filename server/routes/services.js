const express = require('express');
const { Service, ServiceCategory } = require('../models');
const { commonValidations, handleValidationErrors } = require('../utils/validation');
const { Op } = require('sequelize');

const router = express.Router();

// Get all services
router.get('/', async (req, res) => {
  try {
    const { 
      search, 
      categoryId, 
      isActive, 
      page = 1, 
      limit = 20,
      sortBy = 'name',
      sortOrder = 'ASC'
    } = req.query;
    
    const offset = (page - 1) * limit;
    const whereClause = {};
    
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }
    
    if (categoryId) {
      whereClause.categoryId = categoryId;
    }
    
    if (isActive !== undefined) {
      whereClause.isActive = isActive === 'true';
    }
    
    const { count, rows: services } = await Service.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: ServiceCategory,
          as: 'category',
          attributes: ['id', 'name', 'color', 'icon']
        }
      ],
      order: [[sortBy, sortOrder.toUpperCase()]],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
    
    res.json({
      services,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      error: 'Server Error',
      message: 'Unable to fetch services'
    });
  }
});

// Get service by ID
router.get('/:id',
  commonValidations.uuid,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;
      
      const service = await Service.findByPk(id, {
        include: [
          {
            model: ServiceCategory,
            as: 'category',
            attributes: ['id', 'name', 'color', 'icon', 'description']
          }
        ]
      });
      
      if (!service) {
        return res.status(404).json({
          error: 'Service Not Found',
          message: 'Service with the specified ID does not exist'
        });
      }
      
      res.json({ service });
    } catch (error) {
      console.error('Get service error:', error);
      res.status(500).json({
        error: 'Server Error',
        message: 'Unable to fetch service'
      });
    }
  }
);

module.exports = router; 