const express = require('express');
const { Payment, Booking, User } = require('../models');
const { auth } = require('../middleware/auth');
const { commonValidations, handleValidationErrors } = require('../utils/validation');

const router = express.Router();

// Get payment by booking ID
router.get('/booking/:bookingId',
  auth,
  commonValidations.uuid,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { bookingId } = req.params;
      
      const payment = await Payment.findOne({
        where: { bookingId },
        include: [
          {
            model: Booking,
            as: 'booking',
            where: { userId: req.user.id },
            include: [
              {
                model: require('../models').Provider,
                as: 'provider',
                include: [
                  {
                    model: User,
                    as: 'user',
                    attributes: ['firstName', 'lastName']
                  }
                ]
              }
            ]
          }
        ]
      });
      
      if (!payment) {
        return res.status(404).json({
          error: 'Payment Not Found',
          message: 'Payment not found for this booking'
        });
      }
      
      res.json({ payment });
    } catch (error) {
      console.error('Get payment error:', error);
      res.status(500).json({
        error: 'Server Error',
        message: 'Unable to fetch payment'
      });
    }
  }
);

// Create payment
router.post('/', auth, async (req, res) => {
  try {
    const {
      bookingId,
      amount,
      paymentMethod,
      paymentGateway,
      transactionId,
      gatewayResponse
    } = req.body;
    
    // Check if booking exists and belongs to user
    const booking = await Booking.findOne({
      where: {
        id: bookingId,
        userId: req.user.id
      }
    });
    
    if (!booking) {
      return res.status(400).json({
        error: 'Invalid Booking',
        message: 'Booking not found'
      });
    }
    
    // Check if payment already exists
    const existingPayment = await Payment.findOne({
      where: { bookingId }
    });
    
    if (existingPayment) {
      return res.status(400).json({
        error: 'Payment Already Exists',
        message: 'Payment already exists for this booking'
      });
    }
    
    const payment = await Payment.create({
      userId: req.user.id,
      bookingId,
      amount,
      paymentMethod,
      paymentGateway,
      transactionId,
      gatewayResponse,
      status: 'completed',
      paidAt: new Date()
    });
    
    // Update booking payment status
    await booking.update({
      paymentStatus: 'paid',
      paymentMethod
    });
    
    const createdPayment = await Payment.findByPk(payment.id, {
      include: [
        {
          model: Booking,
          as: 'booking',
          include: [
            {
              model: require('../models').Provider,
              as: 'provider',
              include: [
                {
                  model: User,
                  as: 'user',
                  attributes: ['firstName', 'lastName']
                }
              ]
            }
          ]
        }
      ]
    });
    
    res.status(201).json({
      message: 'Payment processed successfully',
      payment: createdPayment
    });
  } catch (error) {
    console.error('Create payment error:', error);
    res.status(500).json({
      error: 'Server Error',
      message: 'Unable to process payment'
    });
  }
});

module.exports = router; 