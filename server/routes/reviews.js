const express = require('express');
const { Review, User, Provider, Booking } = require('../models');
const { auth } = require('../middleware/auth');
const { commonValidations, handleValidationErrors } = require('../utils/validation');

const router = express.Router();

// Get reviews for a provider
router.get('/provider/:providerId', async (req, res) => {
  try {
    const { providerId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    const { count, rows: reviews } = await Review.findAndCountAll({
      where: {
        providerId,
        isActive: true
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['firstName', 'lastName', 'profileImage']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
    
    res.json({
      reviews,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({
      error: 'Server Error',
      message: 'Unable to fetch reviews'
    });
  }
});

// Create review
router.post('/', auth, async (req, res) => {
  try {
    const { providerId, bookingId, rating, title, comment } = req.body;
    
    // Check if booking exists and belongs to user
    const booking = await Booking.findOne({
      where: {
        id: bookingId,
        userId: req.user.id,
        providerId,
        status: 'completed'
      }
    });
    
    if (!booking) {
      return res.status(400).json({
        error: 'Invalid Booking',
        message: 'Booking not found or not eligible for review'
      });
    }
    
    // Check if review already exists
    const existingReview = await Review.findOne({
      where: { bookingId }
    });
    
    if (existingReview) {
      return res.status(400).json({
        error: 'Review Already Exists',
        message: 'You have already reviewed this booking'
      });
    }
    
    const review = await Review.create({
      userId: req.user.id,
      providerId,
      bookingId,
      rating,
      title,
      comment,
      isActive: true
    });
    
    // Update provider rating
    const provider = await Provider.findByPk(providerId);
    const allReviews = await Review.findAll({
      where: { providerId, isActive: true }
    });
    
    const averageRating = allReviews.reduce((sum, rev) => sum + rev.rating, 0) / allReviews.length;
    await provider.update({
      rating: averageRating,
      totalReviews: allReviews.length
    });
    
    const createdReview = await Review.findByPk(review.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['firstName', 'lastName', 'profileImage']
        }
      ]
    });
    
    res.status(201).json({
      message: 'Review created successfully',
      review: createdReview
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({
      error: 'Server Error',
      message: 'Unable to create review'
    });
  }
});

module.exports = router; 