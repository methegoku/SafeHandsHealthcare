const express = require('express');
const { User } = require('../models');
const { auth, requireRole } = require('../middleware/auth');
const { userValidations, handleValidationErrors } = require('../utils/validation');

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [
        {
          model: require('../models').Provider,
          as: 'providerProfile',
          include: [
            {
              model: require('../models').City,
              as: 'city'
            }
          ]
        }
      ]
    });
    
    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      error: 'Server Error',
      message: 'Unable to fetch profile'
    });
  }
});

// Update user profile
router.put('/profile', 
  auth,
  userValidations.updateProfile,
  handleValidationErrors,
  async (req, res) => {
    try {
      const updateData = req.body;
      
      await req.user.update(updateData);
      
      const updatedUser = await User.findByPk(req.user.id, {
        include: [
          {
            model: require('../models').Provider,
            as: 'providerProfile',
            include: [
              {
                model: require('../models').City,
                as: 'city'
              }
            ]
          }
        ]
      });
      
      res.json({
        message: 'Profile updated successfully',
        user: updatedUser
      });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({
        error: 'Server Error',
        message: 'Unable to update profile'
      });
    }
  }
);

module.exports = router; 