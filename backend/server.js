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
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const sequelize = require('./db');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const ContactForm = require('./models/contactform'); // Import the ContactForm model
const departmentRoutes = require('./routes/departmentRoutes');
const department = require('./models/department'); // Import the Department model
const adminRoutes = require('./routes/adminRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
// const patientRoutes = require('./routes/patientRoutes');

const app = express();

// Swagger Setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SmartBuy API',
      version: '1.0.0',
      description: 'API documentation for the SmartBuy e-commerce platform',
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
  max: 100, 
}));

// Middleware for parsing requests
// app.use(cors({
//   origin: 'http://localhost:3000', 
//   credentials: true 
// }));

const corsOptions = {
  origin: 'http://localhost:3000', // Lejo kërkesa nga frontend-i
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true 
};
app.use(cors(corsOptions));

// Middleware shtesë për të vendosur header-a të veçantë
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Lejo cookies në frontend
  next();
});

app.use(bodyParser.json());

app.use(express.static('public'));

app.use(express.json());

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

// Swagger UI Setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// User Routes


app.get('/api/users', async (req, res) => {
  try {
    // Simulimi i marrjes së të dhënave nga baza e të dhënave ose një burim tjetër
    res.json(users);
  } catch (error) {
    console.error('Gabim gjatë marrjes së përdoruesve:', error);
    res.status(500).json({ message: 'Ndodhi një gabim serveri' });
  }
});

app.use('/api/admin', adminRoutes);
app.use('/api/doctor', doctorRoutes);
// app.use('/api/patient', patientRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);
app.use("/api/departments", require("./routes/departmentRoutes"));



// Initialize Database and Start Server
const initializeDatabase = async () => {
  try {
    await sequelize.sync(); 
    const port = process.env.PORT || 5000;
    app.listen(port, async () => {
      console.log(`Server running on http://localhost:${port}`);
      console.log(`Swagger UI is available at http://localhost:${port}/api-docs`);
      
      // Use dynamic import to load the open package and open the browser
      const open = await import('open');
      open.default(`http://localhost:${port}/api-docs`);
    });
  } catch (error) {
    console.error('Database initialization error:', error);
  }
};

initializeDatabase();
