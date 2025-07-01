const express = require('express');
const { Provider, User, City, Service, ProviderService, Review } = require('../models');
const { auth, requireRole } = require('../middleware/auth');
const { commonValidations, handleValidationErrors } = require('../utils/validation');
const { Op } = require('sequelize');

const router = express.Router();

// Get all providers
router.get('/', async (req, res) => {
  try {
    const { 
      cityId, 
      serviceId, 
      search, 
      isActive = 'true',
      isVerified,
      isFeatured,
      page = 1, 
      limit = 20,
      sortBy = 'rating',
      sortOrder = 'DESC'
    } = req.query;
    
    const offset = (page - 1) * limit;
    const whereClause = { isActive: isActive === 'true' };
    
    if (cityId) {
      whereClause.cityId = cityId;
    }
    
    if (isVerified !== undefined) {
      whereClause.isVerified = isVerified === 'true';
    }
    
    if (isFeatured !== undefined) {
      whereClause.isFeatured = isFeatured === 'true';
    }
    
    if (search) {
      whereClause[Op.or] = [
        { businessName: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }
    
    const includeClause = [
      {
        model: User,
        as: 'user',
        attributes: ['firstName', 'lastName', 'email', 'phone', 'profileImage']
      },
      {
        model: City,
        as: 'city',
        attributes: ['id', 'name', 'state']
      }
    ];
    
    // If serviceId is provided, include provider services
    if (serviceId) {
      includeClause.push({
        model: ProviderService,
        as: 'services',
        where: { serviceId, isActive: true },
        include: [
          {
            model: Service,
            as: 'service',
            attributes: ['id', 'name', 'description']
          }
        ]
      });
    }
    
    const { count, rows: providers } = await Provider.findAndCountAll({
      where: whereClause,
      include: includeClause,
      order: [[sortBy, sortOrder.toUpperCase()]],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
    
    res.json({
      providers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Get providers error:', error);
    res.status(500).json({
      error: 'Server Error',
      message: 'Unable to fetch providers'
    });
  }
});

// Get provider by ID
router.get('/:id',
  commonValidations.uuid,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;
      
      const provider = await Provider.findByPk(id, {
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['firstName', 'lastName', 'email', 'phone', 'profileImage']
          },
          {
            model: City,
            as: 'city',
            attributes: ['id', 'name', 'state']
          },
          {
            model: ProviderService,
            as: 'services',
            where: { isActive: true },
            include: [
              {
                model: Service,
                as: 'service',
                include: [
                  {
                    model: require('../models').ServiceCategory,
                    as: 'category',
                    attributes: ['id', 'name', 'color', 'icon']
                  }
                ]
              }
            ]
          },
          {
            model: Review,
            as: 'reviews',
            where: { isActive: true },
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['firstName', 'lastName', 'profileImage']
              }
            ],
            order: [['createdAt', 'DESC']],
            limit: 10
          }
        ]
      });
      
      if (!provider) {
        return res.status(404).json({
          error: 'Provider Not Found',
          message: 'Provider with the specified ID does not exist'
        });
      }
      
      res.json({ provider });
    } catch (error) {
      console.error('Get provider error:', error);
      res.status(500).json({
        error: 'Server Error',
        message: 'Unable to fetch provider'
      });
    }
  }
);

// Create provider profile
router.post('/',
  auth,
  requireRole(['user']),
  async (req, res) => {
    try {
      const {
        businessName,
        description,
        cityId,
        address,
        phone,
        email,
        hourlyRate,
        experience,
        qualifications,
        certifications,
        specializations,
        languages
      } = req.body;
      
      // Check if user already has a provider profile
      const existingProvider = await Provider.findOne({
        where: { userId: req.user.id }
      });
      
      if (existingProvider) {
        return res.status(400).json({
          error: 'Provider Profile Exists',
          message: 'You already have a provider profile'
        });
      }
      
      // Check if city exists
      const city = await City.findByPk(cityId);
      if (!city) {
        return res.status(400).json({
          error: 'City Not Found',
          message: 'Selected city does not exist'
        });
      }
      
      const provider = await Provider.create({
        userId: req.user.id,
        businessName,
        description,
        cityId,
        address,
        phone,
        email,
        hourlyRate,
        experience,
        qualifications,
        certifications,
        specializations,
        languages,
        isActive: true
      });
      
      // Update user role to provider
      await req.user.update({ role: 'provider' });
      
      const createdProvider = await Provider.findByPk(provider.id, {
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['firstName', 'lastName', 'email', 'phone', 'profileImage']
          },
          {
            model: City,
            as: 'city',
            attributes: ['id', 'name', 'state']
          }
        ]
      });
      
      res.status(201).json({
        message: 'Provider profile created successfully',
        provider: createdProvider
      });
    } catch (error) {
      console.error('Create provider error:', error);
      res.status(500).json({
        error: 'Server Error',
        message: 'Unable to create provider profile'
      });
    }
  }
);

// Update provider profile
router.put('/:id',
  auth,
  requireRole(['provider']),
  commonValidations.uuid,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const provider = await Provider.findOne({
        where: { id, userId: req.user.id }
      });
      
      if (!provider) {
        return res.status(404).json({
          error: 'Provider Not Found',
          message: 'Provider profile not found'
        });
      }
      
      await provider.update(updateData);
      
      const updatedProvider = await Provider.findByPk(id, {
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['firstName', 'lastName', 'email', 'phone', 'profileImage']
          },
          {
            model: City,
            as: 'city',
            attributes: ['id', 'name', 'state']
          }
        ]
      });
      
      res.json({
        message: 'Provider profile updated successfully',
        provider: updatedProvider
      });
    } catch (error) {
      console.error('Update provider error:', error);
      res.status(500).json({
        error: 'Server Error',
        message: 'Unable to update provider profile'
      });
    }
  }
);

// Get featured providers
router.get('/featured/list', async (req, res) => {
  try {
    const providers = await Provider.findAll({
      where: {
        isFeatured: true,
        isActive: true,
        isVerified: true
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['firstName', 'lastName', 'profileImage']
        },
        {
          model: City,
          as: 'city',
          attributes: ['id', 'name', 'state']
        }
      ],
      order: [['rating', 'DESC'], ['totalBookings', 'DESC']],
      limit: 10
    });
    
    res.json({
      providers,
      total: providers.length
    });
  } catch (error) {
    console.error('Get featured providers error:', error);
    res.status(500).json({
      error: 'Server Error',
      message: 'Unable to fetch featured providers'
    });
  }
});

module.exports = router; 