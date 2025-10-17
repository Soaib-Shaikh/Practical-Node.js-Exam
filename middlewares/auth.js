const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/userSchema');

module.exports.isAuth = async (req, res, next) => {
  const token = req.cookies && req.cookies.token;
  if (!token) return res.redirect('/auth/login');
  try {
  const jwtSecret = process.env.SECRET_KEY || process.env.SESSION_SECRET || process.env.PRIVATE_KEY;
  const decoded = jwt.verify(token, jwtSecret);
    // Try to fetch fresh user record to ensure we have role and latest data
    const userRecord = await User.findById(decoded.id).lean();
    if (userRecord) {
      req.user = userRecord;
      res.locals.user = userRecord;
    } else {
      // fallback to token payload
      req.user = decoded;
      res.locals.user = decoded;
    }
    return next();
  } catch (err) {
    return res.redirect('/auth/login');
  }
};

module.exports.isAdmin = (req, res, next) => {
  const user = req.user || (res.locals && res.locals.user);
  if (user && user.role === 'admin') return next();
  if (req.accepts('html')) return res.redirect('/');
  return res.status(403).json({ message: 'Forbidden' });
};

