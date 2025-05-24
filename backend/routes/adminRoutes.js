const express = require('express');
const router = express.Router();
const {
  createAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin
} = require('../controller/adminController');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: 
 */

/**
 * @swagger
 * /admin:
 *   post:
 *     summary: 
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admini u krijua me sukses
 *       400:
 *         description: Kërkesë e pavlefshme
 *       500:
 *         description: Gabim serveri
 */
router.post('/', createAdmin);

/**
 * @swagger
 * /admin:
 *   get:
 *     summary: 
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Lista e adminëve
 *       500:
 *         description: Gabim në marrjen e të dhënave
 */
router.get('/', getAdmins);

/**
 * @swagger
 * /admin/{id}:
 *   get:
 *     summary: 
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e adminit
 *     responses:
 *       200:
 *         description: Admini u gjet
 *       404:
 *         description: Admini nuk u gjet
 */
router.get('/:id', getAdminById);

/**
 * @swagger
 * /admin/{id}:
 *   put:
 *     summary:
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e adminit
 *     responses:
 *       200:
 *         description: Admini u përditësua me sukses
 *       400:
 *         description: Gabim në kërkesë
 */
router.put('/:id', updateAdmin);

/**
 * @swagger
 * /admin/{id}:
 *   delete:
 *     summary: 
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e adminit
 *     responses:
 *       200:
 *         description: Admini u fshi me sukses
 *       404:
 *         description: Admini nuk u gjet
 */
router.delete('/:id', deleteAdmin);

module.exports = router;
