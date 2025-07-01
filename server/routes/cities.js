const express = require('express');
const { City } = require('../models');
const { commonValidations, handleValidationErrors } = require('../utils/validation');
const { Op } = require('sequelize');

const router = express.Router();

// Get all cities
router.get('/', async (req, res) => {
  try {
    const { search, state, isActive } = req.query;
    
    const whereClause = {};
    
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { state: { [Op.iLike]: `%${search}%` } }
      ];
    }
    
    if (state) {
      whereClause.state = state;
    }
    
    if (isActive !== undefined) {
      whereClause.isActive = isActive === 'true';
    }
    
    const cities = await City.findAll({
      where: whereClause,
      order: [
        ['name', 'ASC'],
        ['state', 'ASC']
      ]
    });
    
    res.json({
      cities,
      total: cities.length
    });
  } catch (error) {
    console.error('Get cities error:', error);
    res.status(500).json({
      error: 'Server Error',
      message: 'Unable to fetch cities'
    });
  }
});

// Get city by ID
router.get('/:id',
  commonValidations.uuid,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;
      
      const city = await City.findByPk(id);
      if (!city) {
        return res.status(404).json({
          error: 'City Not Found',
          message: 'City with the specified ID does not exist'
        });
      }
      
      res.json({ city });
    } catch (error) {
      console.error('Get city error:', error);
      res.status(500).json({
        error: 'Server Error',
        message: 'Unable to fetch city'
      });
    }
  }
);

// Create new city (Admin only)
router.post('/',
  [
    require('express-validator').body('name')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('City name must be between 2 and 100 characters'),
    require('express-validator').body('state')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('State name must be between 2 and 50 characters'),
    require('express-validator').body('country')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Country name must be between 2 and 50 characters'),
    require('express-validator').body('latitude')
      .optional()
      .isFloat({ min: -90, max: 90 })
      .withMessage('Latitude must be between -90 and 90'),
    require('express-validator').body('longitude')
      .optional()
      .isFloat({ min: -180, max: 180 })
      .withMessage('Longitude must be between -180 and 180')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { name, state, country, latitude, longitude, timezone } = req.body;
      
      // Check if city already exists
      const existingCity = await City.findOne({
        where: {
          name: { [Op.iLike]: name },
          state: { [Op.iLike]: state }
        }
      });
      
      if (existingCity) {
        return res.status(400).json({
          error: 'City Already Exists',
          message: 'A city with this name and state already exists'
        });
      }
      
      const city = await City.create({
        name,
        state,
        country: country || 'India',
        latitude,
        longitude,
        timezone: timezone || 'Asia/Kolkata',
        isActive: true
      });
      
      res.status(201).json({
        message: 'City created successfully',
        city
      });
    } catch (error) {
      console.error('Create city error:', error);
      res.status(500).json({
        error: 'Server Error',
        message: 'Unable to create city'
      });
    }
  }
);

// Update city (Admin only)
router.put('/:id',
  commonValidations.uuid,
  [
    require('express-validator').body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('City name must be between 2 and 100 characters'),
    require('express-validator').body('state')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('State name must be between 2 and 50 characters'),
    require('express-validator').body('country')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Country name must be between 2 and 50 characters'),
    require('express-validator').body('latitude')
      .optional()
      .isFloat({ min: -90, max: 90 })
      .withMessage('Latitude must be between -90 and 90'),
    require('express-validator').body('longitude')
      .optional()
      .isFloat({ min: -180, max: 180 })
      .withMessage('Longitude must be between -180 and 180'),
    require('express-validator').body('isActive')
      .optional()
      .isBoolean()
      .withMessage('isActive must be a boolean value')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const city = await City.findByPk(id);
      if (!city) {
        return res.status(404).json({
          error: 'City Not Found',
          message: 'City with the specified ID does not exist'
        });
      }
      
      // Check for duplicate if name or state is being updated
      if (updateData.name || updateData.state) {
        const existingCity = await City.findOne({
          where: {
            id: { [Op.ne]: id },
            name: { [Op.iLike]: updateData.name || city.name },
            state: { [Op.iLike]: updateData.state || city.state }
          }
        });
        
        if (existingCity) {
          return res.status(400).json({
            error: 'City Already Exists',
            message: 'A city with this name and state already exists'
          });
        }
      }
      
      await city.update(updateData);
      
      res.json({
        message: 'City updated successfully',
        city
      });
    } catch (error) {
      console.error('Update city error:', error);
      res.status(500).json({
        error: 'Server Error',
        message: 'Unable to update city'
      });
    }
  }
);

// Delete city (Admin only)
router.delete('/:id',
  commonValidations.uuid,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;
      
      const city = await City.findByPk(id);
      if (!city) {
        return res.status(404).json({
          error: 'City Not Found',
          message: 'City with the specified ID does not exist'
        });
      }
      
      // Check if city has associated providers or bookings
      const { Provider, Booking } = require('../models');
      const providerCount = await Provider.count({ where: { cityId: id } });
      const bookingCount = await Booking.count({ where: { cityId: id } });
      
      if (providerCount > 0 || bookingCount > 0) {
        return res.status(400).json({
          error: 'Cannot Delete City',
          message: `City has ${providerCount} providers and ${bookingCount} bookings associated with it. Please deactivate instead.`
        });
      }
      
      await city.destroy();
      
      res.json({
        message: 'City deleted successfully'
      });
    } catch (error) {
      console.error('Delete city error:', error);
      res.status(500).json({
        error: 'Server Error',
        message: 'Unable to delete city'
      });
    }
  }
);

// Get cities by state
router.get('/state/:state', async (req, res) => {
  try {
    const { state } = req.params;
    
    const cities = await City.findAll({
      where: {
        state: { [Op.iLike]: state },
        isActive: true
      },
      order: [['name', 'ASC']]
    });
    
    res.json({
      cities,
      total: cities.length
    });
  } catch (error) {
    console.error('Get cities by state error:', error);
    res.status(500).json({
      error: 'Server Error',
      message: 'Unable to fetch cities'
    });
  }
});

// Get all states
router.get('/states/list', async (req, res) => {
  try {
    const states = await City.findAll({
      attributes: ['state'],
      where: { isActive: true },
      group: ['state'],
      order: [['state', 'ASC']]
    });
    
    const stateList = states.map(city => city.state);
    
    res.json({
      states: stateList,
      total: stateList.length
    });
  } catch (error) {
    console.error('Get states error:', error);
    res.status(500).json({
      error: 'Server Error',
      message: 'Unable to fetch states'
    });
  }
});

module.exports = router; 