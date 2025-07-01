const express = require('express');
const { User, Provider, Booking, City, Service, ServiceCategory } = require('../models');
const { auth, requireRole } = require('../middleware/auth');
const { Op } = require('sequelize');

const router = express.Router();

// Admin middleware
router.use(auth, requireRole(['admin']));

// Get dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    const [
      totalUsers,
      totalProviders,
      totalBookings,
      totalCities,
      totalServices,
      totalCategories,
      pendingBookings,
      completedBookings,
      totalRevenue
    ] = await Promise.all([
      User.count({ where: { role: 'user' } }),
      Provider.count(),
      Booking.count(),
      require('../models').City.count(),
      require('../models').Service.count(),
      require('../models').ServiceCategory.count(),
      Booking.count({ where: { status: 'pending' } }),
      Booking.count({ where: { status: 'completed' } }),
      require('../models').Payment.sum('amount', { where: { status: 'completed' } })
    ]);
    
    res.json({
      stats: {
        totalUsers,
        totalProviders,
        totalBookings,
        totalCities,
        totalServices,
        totalCategories,
        pendingBookings,
        completedBookings,
        totalRevenue: totalRevenue || 0
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      error: 'Server Error',
      message: 'Unable to fetch dashboard stats'
    });
  }
});

// Get all users (admin)
router.get('/users', async (req, res) => {
  try {
    const { search, role, isActive, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    const whereClause = {};
    
    if (search) {
      whereClause[Op.or] = [
        { firstName: { [Op.iLike]: `%${search}%` } },
        { lastName: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } }
      ];
    }
    
    if (role) {
      whereClause.role = role;
    }
    
    if (isActive !== undefined) {
      whereClause.isActive = isActive === 'true';
    }
    
    const { count, rows: users } = await User.findAndCountAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
    
    res.json({
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      error: 'Server Error',
      message: 'Unable to fetch users'
    });
  }
});

// Update user status (admin)
router.put('/users/:id/status',
  async (req, res) => {
    try {
      const { id } = req.params;
      const { isActive } = req.body;
      
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          error: 'User Not Found',
          message: 'User not found'
        });
      }
      
      await user.update({ isActive });
      
      res.json({
        message: 'User status updated successfully',
        user
      });
    } catch (error) {
      console.error('Update user status error:', error);
      res.status(500).json({
        error: 'Server Error',
        message: 'Unable to update user status'
      });
    }
  }
);

// Get all providers (admin)
router.get('/providers', async (req, res) => {
  try {
    const { search, isVerified, isActive, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    const whereClause = {};
    
    if (search) {
      whereClause[Op.or] = [
        { businessName: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }
    
    if (isVerified !== undefined) {
      whereClause.isVerified = isVerified === 'true';
    }
    
    if (isActive !== undefined) {
      whereClause.isActive = isActive === 'true';
    }
    
    const { count, rows: providers } = await Provider.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['firstName', 'lastName', 'email', 'phone']
        },
        {
          model: City,
          as: 'city',
          attributes: ['name', 'state']
        }
      ],
      order: [['createdAt', 'DESC']],
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

// Verify provider (admin)
router.put('/providers/:id/verify',
  async (req, res) => {
    try {
      const { id } = req.params;
      const { isVerified } = req.body;
      
      const provider = await Provider.findByPk(id);
      if (!provider) {
        return res.status(404).json({
          error: 'Provider Not Found',
          message: 'Provider not found'
        });
      }
      
      await provider.update({ 
        isVerified,
        backgroundCheck: isVerified,
        backgroundCheckDate: isVerified ? new Date() : null
      });
      
      res.json({
        message: 'Provider verification status updated successfully',
        provider
      });
    } catch (error) {
      console.error('Update provider verification error:', error);
      res.status(500).json({
        error: 'Server Error',
        message: 'Unable to update provider verification status'
      });
    }
  }
);

// Get all bookings (admin)
router.get('/bookings', async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    const whereClause = {};
    if (status) {
      whereClause.status = status;
    }
    
    const { count, rows: bookings } = await Booking.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['firstName', 'lastName', 'email']
        },
        {
          model: Provider,
          as: 'provider',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['firstName', 'lastName', 'email']
            }
          ]
        },
        {
          model: Service,
          as: 'service',
          attributes: ['name']
        },
        {
          model: City,
          as: 'city',
          attributes: ['name', 'state']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
    
    res.json({
      bookings,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      error: 'Server Error',
      message: 'Unable to fetch bookings'
    });
  }
});

module.exports = router; 