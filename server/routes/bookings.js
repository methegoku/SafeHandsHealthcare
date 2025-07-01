const express = require('express');
const { Booking, User, Provider, Service, City, Payment } = require('../models');
const { auth, requireRole } = require('../middleware/auth');
const { commonValidations, handleValidationErrors } = require('../utils/validation');

const router = express.Router();

// Get user's bookings
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    const whereClause = { userId: req.user.id };
    if (status) {
      whereClause.status = status;
    }
    
    const { count, rows: bookings } = await Booking.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Provider,
          as: 'provider',
          include: [
            {
              model: require('../models').User,
              as: 'user',
              attributes: ['firstName', 'lastName', 'profileImage']
            },
            {
              model: City,
              as: 'city',
              attributes: ['name', 'state']
            }
          ]
        },
        {
          model: Service,
          as: 'service',
          include: [
            {
              model: require('../models').ServiceCategory,
              as: 'category',
              attributes: ['name', 'color']
            }
          ]
        },
        {
          model: City,
          as: 'city',
          attributes: ['name', 'state']
        },
        {
          model: Payment,
          as: 'payment',
          attributes: ['status', 'amount', 'paymentMethod']
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
    console.error('Get my bookings error:', error);
    res.status(500).json({
      error: 'Server Error',
      message: 'Unable to fetch bookings'
    });
  }
});

// Create new booking
router.post('/', auth, async (req, res) => {
  try {
    const {
      providerId,
      serviceId,
      cityId,
      scheduledDate,
      duration,
      address,
      notes,
      totalAmount
    } = req.body;
    
    // Validate provider exists and is active
    const provider = await Provider.findByPk(providerId);
    if (!provider || !provider.isActive) {
      return res.status(400).json({
        error: 'Invalid Provider',
        message: 'Selected provider is not available'
      });
    }
    
    // Validate service exists
    const service = await Service.findByPk(serviceId);
    if (!service || !service.isActive) {
      return res.status(400).json({
        error: 'Invalid Service',
        message: 'Selected service is not available'
      });
    }
    
    // Calculate commission (10% by default)
    const commissionRate = provider.commissionRate || 10;
    const commissionAmount = (totalAmount * commissionRate) / 100;
    const providerAmount = totalAmount - commissionAmount;
    
    const booking = await Booking.create({
      userId: req.user.id,
      providerId,
      serviceId,
      cityId,
      scheduledDate,
      duration,
      address,
      notes,
      totalAmount,
      commissionAmount,
      providerAmount,
      status: 'pending',
      paymentStatus: 'pending'
    });
    
    // Update provider stats
    await provider.increment('totalBookings');
    
    const createdBooking = await Booking.findByPk(booking.id, {
      include: [
        {
          model: Provider,
          as: 'provider',
          include: [
            {
              model: require('../models').User,
              as: 'user',
              attributes: ['firstName', 'lastName', 'phone']
            }
          ]
        },
        {
          model: Service,
          as: 'service'
        },
        {
          model: City,
          as: 'city'
        }
      ]
    });
    
    res.status(201).json({
      message: 'Booking created successfully',
      booking: createdBooking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      error: 'Server Error',
      message: 'Unable to create booking'
    });
  }
});

// Get booking by ID
router.get('/:id',
  auth,
  commonValidations.uuid,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;
      
      const booking = await Booking.findOne({
        where: { id, userId: req.user.id },
        include: [
          {
            model: Provider,
            as: 'provider',
            include: [
              {
                model: require('../models').User,
                as: 'user',
                attributes: ['firstName', 'lastName', 'phone', 'profileImage']
              },
              {
                model: City,
                as: 'city',
                attributes: ['name', 'state']
              }
            ]
          },
          {
            model: Service,
            as: 'service',
            include: [
              {
                model: require('../models').ServiceCategory,
                as: 'category',
                attributes: ['name', 'color']
              }
            ]
          },
          {
            model: City,
            as: 'city',
            attributes: ['name', 'state']
          },
          {
            model: Payment,
            as: 'payment'
          }
        ]
      });
      
      if (!booking) {
        return res.status(404).json({
          error: 'Booking Not Found',
          message: 'Booking not found'
        });
      }
      
      res.json({ booking });
    } catch (error) {
      console.error('Get booking error:', error);
      res.status(500).json({
        error: 'Server Error',
        message: 'Unable to fetch booking'
      });
    }
  }
);

// Cancel booking
router.post('/:id/cancel',
  auth,
  commonValidations.uuid,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { reason } = req.body;
      
      const booking = await Booking.findOne({
        where: { id, userId: req.user.id }
      });
      
      if (!booking) {
        return res.status(404).json({
          error: 'Booking Not Found',
          message: 'Booking not found'
        });
      }
      
      if (booking.status === 'cancelled') {
        return res.status(400).json({
          error: 'Already Cancelled',
          message: 'Booking is already cancelled'
        });
      }
      
      if (['completed', 'in_progress'].includes(booking.status)) {
        return res.status(400).json({
          error: 'Cannot Cancel',
          message: 'Cannot cancel a booking that is in progress or completed'
        });
      }
      
      await booking.update({
        status: 'cancelled',
        cancelledBy: 'user',
        cancelledAt: new Date(),
        cancellationReason: reason
      });
      
      res.json({
        message: 'Booking cancelled successfully',
        booking
      });
    } catch (error) {
      console.error('Cancel booking error:', error);
      res.status(500).json({
        error: 'Server Error',
        message: 'Unable to cancel booking'
      });
    }
  }
);

module.exports = router; 