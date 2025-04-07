const express = require('express');
const { register, login, getUserProfile } = require('../controller/userController');
const { isAuthenticated, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Regjistro një përdorues të ri
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *               - role
 *     responses:
 *       201:
 *         description: Përdoruesi u regjistrua me sukses
 *       400:
 *         description: Të dhëna të papërshtatshme
 */
router.post('/register', register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Identifikohu në sistem
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Përdoruesi është identifikuar, kthehet token-i i autentifikimit
 *       400:
 *         description: Kredenciale të pavlefshme
 */
router.post('/login', login);


/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Merr profilin e përdoruesit të identifikuar
 *     responses:
 *       200:
 *         description: Informacionet e profilit të përdoruesit
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 role:
 *                   type: string
 *       401:
 *         description: Jo i autorizuar, përdoruesi nuk është identifikuar
 */
router.get('/profile', isAuthenticated, getUserProfile);

/**
 * @swagger
 * /api/users/admin:
 *   get:
 *     summary: Endpoint për përdoruesit me rol admin
 *     responses:
 *       200:
 *         description: Mesazh mirëseardhje për adminin
 *       403:
 *         description: Ndaluar për shkak të rolit të pamjaftueshëm
 */
router.get('/admin', isAuthenticated, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Welcome, Admin!' });
});

/**
 * @swagger
 * /api/users/doctor:
 *   get:
 *     summary: Endpoint për përdoruesit me rol mjek
 *     responses:
 *       200:
 *         description: Mesazh mirëseardhje për mjekun
 *       403:
 *         description: Ndaluar për shkak të rolit të pamjaftueshëm
 */
router.get('/doctor', isAuthenticated, authorizeRoles('doctor'), (req, res) => {
  res.json({ message: 'Welcome, Doctor!' });
});

/**
 * @swagger
 * /api/users/patient:
 *   get:
 *     summary: Endpoint për përdoruesit me rol pacient
 *     responses:
 *       200:
 *         description: Mesazh mirëseardhje për pacientin
 *       403:
 *         description: Ndaluar për shkak të rolit të pamjaftueshëm
 */
router.get('/patient', isAuthenticated, authorizeRoles('patient'), (req, res) => {
  res.json({ message: 'Welcome, Patient!' });
});

module.exports = router;
