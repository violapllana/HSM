const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
  const token = req.cookies['ubtsecured'];
  if (!token) {
    return res.status(401).json({ error: 'Kërkohet autentifikimi.' });
  }
  jwt.verify(token, process.env.JWT_SECRET || 'supersecret', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token i pavlefshëm.' });
    }
    req.user = user;
    next();
  });
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Nuk keni leje për këtë veprim.' });
    }
    next();
  };
};

module.exports = { isAuthenticated, authorizeRoles };
