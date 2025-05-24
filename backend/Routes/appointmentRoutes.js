const express = require('express');
const router = express.Router();
const {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment
} = require('../controller/appointmentController'); // Sigurohuni që rruga është e saktë

/**
 * @swagger
 * tags:
 *   name: Appointment
 *   description:
 */

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: 
 *     tags: [Appointment]
 *     responses:
 *       200:
 *         description: Lista e takimeve
 *       500:
 *         description: Gabim në marrjen e të dhënave
 */
router.get('/', getAppointments);

/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     summary: 
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e takimit
 *     responses:
 *       200:
 *         description: Takimi u gjet
 *       404:
 *         description: Takimi nuk u gjet
 */
router.get('/:id', getAppointmentById);

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: 
 *     tags: [Appointment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - patientId
 *               - doctorId
 *               - departmentId
 *               - date
 *             properties:
 *               patientId:
 *                 type: integer
 *               doctorId:
 *                 type: integer
 *               departmentId:
 *                 type: integer
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Data dhe koha e takimit në formatin ISO 8601
 *     responses:
 *       201:
 *         description: Takimi u krijua me sukses
 *       400:
 *         description: Të dhënat janë të paplota
 *       500:
 *         description: Gabim gjatë krijimit
 */
router.post('/', createAppointment);

/**
 * @swagger
 * /appointments/{id}:
 *   put:
 *     summary:
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e takimit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: integer
 *               doctorId:
 *                 type: integer
 *               departmentId:
 *                 type: integer
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Data dhe koha e përditësuar e takimit në formatin ISO 8601
 *     responses:
 *       200:
 *         description: Takimi u përditësua me sukses
 *       404:
 *         description: Takimi nuk u gjet
 *       400:
 *         description: Gabim në përditësim
 */
router.put('/:id', updateAppointment);

/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: 
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e takimit
 *     responses:
 *       200:
 *         description: Takimi u fshi me sukses
 *       404:
 *         description: Takimi nuk u gjet
 *       500:
 *         description: Gabim gjatë fshirjes
 */
router.delete('/:id', deleteAppointment);

module.exports = router;
