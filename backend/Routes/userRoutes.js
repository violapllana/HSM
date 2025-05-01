const express = require('express');
const { register, login, getUserProfile, getAdmins, deleteAdmin } = require('../controller/userController');


const router = express.Router();

/**
 * @swagger
 * /register:
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
 * /login:
 *   post:
 *     summary: Identifikohu në sistem
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Përdoruesi është identifikuar, kthehet token-i i autentifikimit
 *       400:
 *         description: Kredenciale të pavlefshme
 */
router.post('/login', login);



module.exports = router;
