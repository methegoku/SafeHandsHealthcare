const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { auth, requireRole } = require('../middleware/auth');
const { userValidations, handleValidationErrors } = require('../utils/validation');

const router = express.Router();

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// Register new user
router.post('/register', 
  userValidations.register,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { firstName, lastName, email, password, phone } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({
          error: 'Registration Failed',
          message: 'User with this email already exists'
        });
      }

      // Create new user
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        phone,
        role: 'user'
      });

      // Generate token
      const token = generateToken(user.id);

      // Update last login
      await user.update({ lastLoginAt: new Date() });

      res.status(201).json({
        message: 'User registered successfully',
        user: user.toJSON(),
        token
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        error: 'Registration Failed',
        message: 'Unable to create account. Please try again.'
      });
    }
  }
);

// Login user
router.post('/login',
  userValidations.login,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({
          error: 'Login Failed',
          message: 'Invalid email or password'
        });
      }

      // Check if user is active
      if (!user.isActive) {
        return res.status(401).json({
          error: 'Account Suspended',
          message: 'Your account has been suspended. Please contact support.'
        });
      }

      // Verify password
      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        return res.status(401).json({
          error: 'Login Failed',
          message: 'Invalid email or password'
        });
      }

      // Generate token
      const token = generateToken(user.id);

      // Update last login
      await user.update({ lastLoginAt: new Date() });

      res.json({
        message: 'Login successful',
        user: user.toJSON(),
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        error: 'Login Failed',
        message: 'Unable to login. Please try again.'
      });
    }
  }
);

// Get current user profile
router.get('/me', auth, async (req, res) => {
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

    res.json({
      user: user.toJSON()
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      error: 'Server Error',
      message: 'Unable to fetch profile'
    });
  }
});

// Refresh token
router.post('/refresh', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user || !user.isActive) {
      return res.status(401).json({
        error: 'Token Refresh Failed',
        message: 'User not found or inactive'
      });
    }

    const token = generateToken(user.id);
    res.json({
      message: 'Token refreshed successfully',
      token
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({
      error: 'Token Refresh Failed',
      message: 'Unable to refresh token'
    });
  }
});

// Logout (client-side token removal)
router.post('/logout', auth, async (req, res) => {
  try {
    // In a more advanced setup, you might want to blacklist the token
    // For now, we'll just return success
    res.json({
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      error: 'Logout Failed',
      message: 'Unable to logout'
    });
  }
});

// Change password
router.post('/change-password', 
  auth,
  [
    require('express-validator').body('currentPassword')
      .notEmpty()
      .withMessage('Current password is required'),
    require('express-validator').body('newPassword')
      .isLength({ min: 6 })
      .withMessage('New password must be at least 6 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage('New password must contain at least one uppercase letter, one lowercase letter, and one number'),
    require('express-validator').body('confirmPassword')
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) {
          throw new Error('Password confirmation does not match new password');
        }
        return true;
      })
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const user = await User.findByPk(req.user.id);

      // Verify current password
      const isValidPassword = await user.comparePassword(currentPassword);
      if (!isValidPassword) {
        return res.status(400).json({
          error: 'Password Change Failed',
          message: 'Current password is incorrect'
        });
      }

      // Update password
      await user.update({ password: newPassword });

      res.json({
        message: 'Password changed successfully'
      });
    } catch (error) {
      console.error('Change password error:', error);
      res.status(500).json({
        error: 'Password Change Failed',
        message: 'Unable to change password'
      });
    }
  }
);

// Forgot password (send reset email)
router.post('/forgot-password',
  [
    require('express-validator').body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        // Don't reveal if user exists or not
        return res.json({
          message: 'If an account with that email exists, a password reset link has been sent.'
        });
      }

      // Generate reset token
      const resetToken = jwt.sign(
        { userId: user.id, type: 'password_reset' },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // In a real application, you would send an email here
      // For now, we'll just return the token (in production, this should be sent via email)
      res.json({
        message: 'Password reset link sent to your email',
        resetToken // Remove this in production
      });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({
        error: 'Password Reset Failed',
        message: 'Unable to process password reset request'
      });
    }
  }
);

// Reset password
router.post('/reset-password',
  [
    require('express-validator').body('token')
      .notEmpty()
      .withMessage('Reset token is required'),
    require('express-validator').body('newPassword')
      .isLength({ min: 6 })
      .withMessage('New password must be at least 6 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage('New password must contain at least one uppercase letter, one lowercase letter, and one number')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { token, newPassword } = req.body;

      // Verify reset token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.type !== 'password_reset') {
        return res.status(400).json({
          error: 'Invalid Token',
          message: 'Invalid reset token'
        });
      }

      const user = await User.findByPk(decoded.userId);
      if (!user) {
        return res.status(400).json({
          error: 'Invalid Token',
          message: 'User not found'
        });
      }

      // Update password
      await user.update({ password: newPassword });

      res.json({
        message: 'Password reset successfully'
      });
    } catch (error) {
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        return res.status(400).json({
          error: 'Invalid Token',
          message: 'Reset token is invalid or expired'
        });
      }

      console.error('Reset password error:', error);
      res.status(500).json({
        error: 'Password Reset Failed',
        message: 'Unable to reset password'
      });
    }
  }
);

module.exports = router; 