// require('dotenv').config();
// const express = require('express');
// const session = require('express-session');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// const flash = require('connect-flash');
// const cookieParser = require('cookie-parser');
// const sequelize = require('./db');

// const User = require('./models/user');

// const app = express();

// // Configure session middleware with secure settings
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'supersecret',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     maxAge: 24 * 60 * 60 * 1000 // 24 hours
//   }
// }));

// app.use(cookieParser());
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());

// // Configure Helmet for extra security headers
// app.use(helmet());

// // Configure rate limiting for DDoS protection
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per windowMs
// });
// app.use(limiter);

// // Configure body parser and CORS
// app.use(cors({
//   origin: 'http://localhost:3000', // Frontend URL
//   credentials: true // Allow credentials (cookies) to be sent
// }));
// app.use(bodyParser.json());

// // Logging middleware to debug session and user
// app.use((req, res, next) => {
//   console.log('Session:', req.session);
//   console.log('User:', req.user);
//   next();
// });

// // Configure passport for local authentication
// passport.use(new LocalStrategy(async (username, password, done) => {
//   try {
//     const user = await User.findOne({ where: { username } });
//     if (!user) {
//       return done(null, false, { message: 'Përdoruesi nuk u gjet.' });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return done(null, false, { message: 'Fjalëkalimi është i gabuar.' });
//     }
//     return done(null, user);
//   } catch (err) {
//     return done(err);
//   }
// }));

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findByPk(id);
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });

// // Middleware to ensure the user is authenticated
// const isAuthenticated = (req, res, next) => {
//   const token = req.cookies['ubtsecured'];
//   if (!token) {
//     return res.status(401).json({ error: 'Kërkohet autentifikimi.' });
//   }
//   jwt.verify(token, process.env.JWT_SECRET || 'supersecret', (err, user) => {
//     if (err) {
//       return res.status(403).json({ error: 'Token i pavlefshëm.' });
//     }
//     req.user = user;
//     next();
//   });
// };

// // Auth route for login
// app.post('/login', (req, res, next) => {
//   passport.authenticate('local', async (err, user, info) => {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.status(401).json({ message: 'Login i dështuar. Provoni përsëri.' });
//     }
//     req.logIn(user, (err) => {
//       if (err) {
//         return next(err);
//       }
//       const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET || 'supersecret', {
//         expiresIn: '24h'
//       });
//       res.cookie('ubtsecured', token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         maxAge: 24 * 60 * 60 * 1000,
//         sameSite: 'strict'
//       });
//       res.status(200).json({ message: 'Login i suksesshëm', user });
//     });
//   })(req, res, next);
// });

// // Route to get the logged-in user's information
// app.get('/user', isAuthenticated, (req, res) => {
//   res.json({ user: req.user });
// });

// // Registration route
// app.post('/register', async (req, res) => {
//   const { username, password } = req.body;

//   console.log('Përpjekje për regjistrim:', req.body);

//   // Check if username is already taken
//   const existingUser = await User.findOne({ where: { username } });
//   if (existingUser) {
//     return res.status(400).json({ message: 'Ky emër përdoruesi është tashmë i zënë.' });
//   }

//   // Hash the password before saving
//   try {
//     const hash = await bcrypt.hash(password, 10);
//     const user = await User.create({ username, password: hash, role: 'user' });
//     res.status(201).json(user); // Return the newly created user
//   } catch (err) {
//     console.error('Gabim gjatë regjistrimit:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // Logout route
// app.post('/logout', (req, res) => {
//   res.clearCookie('ubtsecured', {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'strict'
//   });
//   req.logout((err) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.status(200).json({ message: 'U çkyçët me sukses.' });
//   });
// });

// // Initialize server and ensure database and table creation
// const initializeDatabase = async () => {
//   try {
//     await sequelize.sync(); // Ensure the database is synced
//     app.listen(process.env.PORT, () => {
//       console.log(`Serveri po punon në portin ${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.error('Gabim gjatë inicializimit të databazës:', error);
//   }
// };

// initializeDatabase();
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const sequelize = require('./db');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Security Middleware
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
}));

// Middleware for parsing requests
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true 
}));
app.use(bodyParser.json());
app.use(cookieParser());

// Session Configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// User Routes
app.use('/api/users', userRoutes);

// Initialize Database and Start Server
const initializeDatabase = async () => {
  try {
    await sequelize.sync(); 
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  } catch (error) {
    console.error('Database initialization error:', error);
  }
};

initializeDatabase();

