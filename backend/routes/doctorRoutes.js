const express = require('express');
const router = express.Router();
const {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor
} = require('../controller/doctorController');

/**
 * @swagger
 * tags:
 *   name: Doctor
 *   description: Doctor management
 */

/**
 * @swagger
 * /doctor:
 *   post:
 *     summary: Krijo një doktor të ri
 *     tags: [Doctor]
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
 *               - specialty
 *               - phone
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               specialty:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Doktori u krijua me sukses
 *       400:
 *         description: Kërkesë e pavlefshme
 *       500:
 *         description: Gabim serveri
 */
router.post('/', createDoctor);

/**
 * @swagger
 * /doctor:
 *   get:
 *     summary: Merr të gjithë doktorët
 *     tags: [Doctor]
 *     responses:
 *       200:
 *         description: Lista e doktorëve
 *       500:
 *         description: Gabim në marrjen e të dhënave
 */
router.get('/', getDoctors);

/**
 * @swagger
 * /doctor/{id}:
 *   get:
 *     summary: Merr një doktor sipas ID
 *     tags: [Doctor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e doktorit
 *     responses:
 *       200:
 *         description: Doktori u gjet
 *       404:
 *         description: Doktori nuk u gjet
 */
router.get('/:id', getDoctorById);

/**
 * @swagger
 * /doctor/{id}:
 *   put:
 *     summary: Përditëso një doktor sipas ID
 *     tags: [Doctor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e doktorit
 *     responses:
 *       200:
 *         description: Doktori u përditësua me sukses
 *       400:
 *         description: Gabim në kërkesë
 */
router.put('/:id', updateDoctor);

/**
 * @swagger
 * /doctor/{id}:
 *   delete:
 *     summary: Fshij një doktor sipas ID
 *     tags: [Doctor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e doktorit
 *     responses:
 *       200:
 *         description: Doktori u fshi me sukses
 *       404:
 *         description: Doktori nuk u gjet
 */
router.delete('/:id', deleteDoctor);

module.exports = router;
