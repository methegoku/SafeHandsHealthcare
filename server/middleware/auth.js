const jwt = require('jsonwebtoken');
const { User } = require('../models');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        error: 'Access Denied',
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);
    
    if (!user) {
      return res.status(401).json({
        error: 'Access Denied',
        message: 'Invalid token'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        error: 'Account Suspended',
        message: 'Your account has been suspended'
      });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({
      error: 'Access Denied',
      message: 'Invalid token'
    });
  }
};

const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Access Denied',
        message: 'Authentication required'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Access Denied',
        message: 'Insufficient permissions'
      });
    }

    next();
  };
};

const requireProvider = async (req, res, next) => {
  try {
    if (req.user.role !== 'provider') {
      return res.status(403).json({
        error: 'Access Denied',
        message: 'Provider access required'
      });
    }

    const { Provider } = require('../models');
    const provider = await Provider.findOne({
      where: { userId: req.user.id }
    });

    if (!provider) {
      return res.status(403).json({
        error: 'Provider Profile Required',
        message: 'Please complete your provider profile'
      });
    }

    req.provider = provider;
    next();
  } catch (error) {
    res.status(500).json({
      error: 'Server Error',
      message: 'Unable to verify provider status'
    });
  }
};

module.exports = {
  auth,
  requireRole,
  requireProvider
}; 