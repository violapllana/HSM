const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactController');

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Dërgo një mesazh kontakti
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - message
 *     responses:
 *       201:
 *         description: Mesazhi u krijua me sukses
 *       400:
 *         description: Të dhëna të pavlefshme
 */
router.post('/contact', contactController.createContact);

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Merr të gjitha mesazhet e kontaktit
 *     responses:
 *       200:
 *         description: Lista e mesazheve të kontaktit
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   message:
 *                     type: string
 *       500:
 *         description: Gabim i serverit
 */
router.get('/contacts', contactController.getContacts);

/**
 * @swagger
 * /api/contact/{id}:
 *   delete:
 *     summary: Fshi një mesazh kontakti
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID e mesazhit për të fshirë
 *     responses:
 *       200:
 *         description: Mesazhi u fshi me sukses
 *       404:
 *         description: Mesazhi nuk u gjet
 */
router.delete('/contact/:id', contactController.deleteContact);

module.exports = router;
