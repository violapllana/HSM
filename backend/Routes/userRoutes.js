const express = require('express');
const router = express.Router();

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controller/userController');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - role
 *       properties:
 *         id:
 *           type: integer
 *           description: ID e përdoruesit
 *         username:
 *           type: string
 *           description: Emri i përdoruesit
 *         email:
 *           type: string
 *           description: Emaili i përdoruesit
 *         password:
 *           type: string
 *           description: Passwordi i përdoruesit
 *         role:
 *           type: string
 *           enum: [patient, doctor, admin]
 *           description: Roli i përdoruesit
 *       example:
 *         id: 1
 *         username: "adminUser"
 *         email: "admin@example.com"
 *         password: "Password1!"
 *         role: "admin"
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Krijon një përdorues të ri (patient, doctor, admin)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Përdoruesi u krijua me sukses
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Gabim në validimin e të dhënave
 *       500:
 *         description: Gabim i brendshëm i serverit
 */
router.post('/', createUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Merr të gjithë përdoruesit
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista e përdoruesve
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Gabim në server
 */
router.get('/', getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Merr një përdorues sipas ID-së
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e përdoruesit
 *     responses:
 *       200:
 *         description: Përdoruesi u gjet me sukses
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Përdoruesi nuk u gjet
 *       500:
 *         description: Gabim në server
 */
router.get('/:id', getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Përditëson një përdorues sipas ID-së
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e përdoruesit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Përdoruesi u përditësua me sukses
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Gabim në validim
 *       404:
 *         description: Përdoruesi nuk u gjet
 *       500:
 *         description: Gabim në server
 */
router.put('/:id', updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Fshin një përdorues sipas ID-së
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e përdoruesit
 *     responses:
 *       200:
 *         description: Përdoruesi u fshi me sukses
 *       404:
 *         description: Përdoruesi nuk u gjet
 *       500:
 *         description: Gabim në server
 */
router.delete('/:id', deleteUser);

module.exports = router;
