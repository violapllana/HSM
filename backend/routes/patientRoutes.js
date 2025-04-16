const express = require('express');
const router = express.Router();
const {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient
} = require('../controller/patientController');

/**
 * @swagger
 * tags:
 *   name: Patient
 *   description: Patient management
 */

/**
 * @swagger
 * /patient:
 *   post:
 *     summary: Krijo një pacient të ri
 *     tags: [Patient]
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
 *               - age
 *               - gender
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               age:
 *                 type: integer
 *               gender:
 *                 type: string
 *               medicalHistory:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pacienti u krijua me sukses
 *       400:
 *         description: Kërkesë e pavlefshme
 *       500:
 *         description: Gabim serveri
 */
router.post('/', createPatient);

/**
 * @swagger
 * /patient:
 *   get:
 *     summary: Merr të gjithë pacientët
 *     tags: [Patient]
 *     responses:
 *       200:
 *         description: Lista e pacientëve
 *       500:
 *         description: Gabim në marrjen e të dhënave
 */
router.get('/', getPatients);

/**
 * @swagger
 * /patient/{id}:
 *   get:
 *     summary: Merr një pacient sipas ID
 *     tags: [Patient]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e pacientit
 *     responses:
 *       200:
 *         description: Pacienti u gjet
 *       404:
 *         description: Pacienti nuk u gjet
 */
router.get('/:id', getPatientById);

/**
 * @swagger
 * /patient/{id}:
 *   put:
 *     summary: Përditëso një pacient sipas ID
 *     tags: [Patient]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e pacientit
 *     responses:
 *       200:
 *         description: Pacienti u përditësua me sukses
 *       400:
 *         description: Gabim në kërkesë
 */
router.put('/:id', updatePatient);

/**
 * @swagger
 * /patient/{id}:
 *   delete:
 *     summary: Fshij një pacient sipas ID
 *     tags: [Patient]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e pacientit
 *     responses:
 *       200:
 *         description: Pacienti u fshi me sukses
 *       404:
 *         description: Pacienti nuk u gjet
 */
router.delete('/:id', deletePatient);

module.exports = router;
