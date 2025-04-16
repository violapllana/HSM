const express = require('express');
const router = express.Router();
const {
  createContact,
  getContacts,
  deleteContact,
  getContactById,
} = require('../controller/contactController');

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Contact form management
 */

/**
 * @swagger
 * /contact:
 *   post:
 *     summary: Krijo një mesazh të ri nga contact form
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - phoneNumber
 *               - reason
 *               - messageContent
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               reason:
 *                 type: string
 *               messageContent:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mesazhi u krijua me sukses
 *       400:
 *         description: Kërkesë e pavlefshme
 *       500:
 *         description: Gabim serveri
 */
router.post('/', createContact);

/**
 * @swagger
 * /contact:
 *   get:
 *     summary: Merr të gjithë mesazhet
 *     tags: [Contact]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Faqja aktuale për pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Numri i mesazheve për faqe
 *     responses:
 *       200:
 *         description: Lista e mesazheve
 *       500:
 *         description: Gabim në marrjen e të dhënave
 */
router.get('/', getContacts);

/**
 * @swagger
 * /contact/{id}:
 *   get:
 *     summary: Merr një mesazh sipas ID
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e mesazhit
 *     responses:
 *       200:
 *         description: Mesazhi u gjet
 *       404:
 *         description: Mesazhi nuk u gjet
 *       400:
 *         description: Gabim në kërkesë
 */
router.get('/:id', getContactById);

/**
 * @swagger
 * /contact/{id}:
 *   delete:
 *     summary: Fshij një mesazh sipas ID
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e mesazhit
 *     responses:
 *       200:
 *         description: Mesazhi u fshi me sukses
 *       404:
 *         description: Mesazhi nuk u gjet
 *       400:
 *         description: Gabim gjatë fshirjes
 */
router.delete('/:id', deleteContact);

module.exports = router;
