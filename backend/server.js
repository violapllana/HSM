
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const sequelize = require('./db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');
const reportRoutes = require('./routes/reportRoutes');
const connectRoutes = require('./routes/connectRoutes');
const appointmentRoutes = require('./Routes/appointmentRoutes'); // Korrigjim këtu
const models = require('./models'); 
const app = express();

// Swagger Setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hospital Management System API',
      version: '1.0.0',
      description: 'API documentation for the Hospital Management System platform',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API route files for documentation
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Security Middleware
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 900, 
}));

const corsOptions = {
  origin: 'http://localhost:3000', // Lejo kërkesa nga frontend-i
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true 
};
app.use(cors(corsOptions));

// Middleware për të vendosur header-a të veçantë
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});


app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());





// Session Configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 1 ditë
  }
}));
app.use(passport.initialize());
app.use(passport.session());

// Swagger UI Setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use('/api/admin', adminRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/users', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/department', departmentRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/connect', connectRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);

// Initialize Database and Start Server
const initializeDatabase = async () => {
  try {
    await sequelize.sync(); 
    const port = process.env.PORT || 5000;
    app.listen(port, async () => {
      console.log(`Server running on http://localhost:${port}`);
      console.log(`Swagger UI is available at http://localhost:${port}/api-docs`);
      
      // Përdorimi i importimit dinamik për të hapur browser-in
      const open = await import('open');
      open.default(`http://localhost:${port}/api-docs`);
    });
  } catch (error) {
    console.error('Database initialization error:', error);
  }
};

initializeDatabase();
