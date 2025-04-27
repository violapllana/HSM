const express = require('express');
const router = express.Router();

const {
  createConnection,
  getPatientsByDoctor,
  getConnectedPatients,
  getAllConnections,
  getConnectionById,
  updateConnection,
  deleteConnection,
    getConnectedPatientsByPatientId
} = require('../controller/connectionController');

/**
 * @swagger
 * /connect:
 *   get:
 *     summary: Merr të gjitha lidhjet mes mjekëve dhe pacientëve
 *     tags: [Connection]
 *     responses:
 *       200:
 *         description: Lista e lidhjeve u mor me sukses
 *       500:
 *         description: Gabim në server
 */
router.get('/', getAllConnections); // Get all connections

/**
 * @swagger
 * /connect/{doctorId}/{patientId}:
 *   get:
 *     summary: Merr një lidhje specifike mes mjekut dhe pacientit
 *     tags: [Connection]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e mjekut
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e pacientit
 *     responses:
 *       200:
 *         description: Lidhja u gjet me sukses
 *       404:
 *         description: Lidhja nuk ekziston
 *       500:
 *         description: Gabim në server
 */
router.get('/:doctorId/:patientId', getConnectionById); // Get specific connection by doctor and patient ID

/**
 * @swagger
 * /connect/{doctorId}/{patientId}:
 *   post:
 *     summary: Krijo një lidhje mes mjekut dhe pacientit
 *     tags: [Connection]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e mjekut
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e pacientit
 *     responses:
 *       200:
 *         description: Lidhja u krijua me sukses
 *       400:
 *         description: Gabim në të dhëna
 *       500:
 *         description: Gabim në server
 */
router.post('/:doctorId/:patientId', createConnection); // Create a new connection

/**
 * @swagger
 * /connect/{doctorId}/{patientId}:
 *   put:
 *     summary: Përditëso një lidhje ekzistuese
 *     tags: [Connection]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e mjekut
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e pacientit
 *     responses:
 *       200:
 *         description: Lidhja u përditësua me sukses
 *       400:
 *         description: Të dhënat e gabuara
 *       404:
 *         description: Lidhja nuk ekziston
 *       500:
 *         description: Gabim në server
 */
router.put('/:doctorId/:patientId', updateConnection); // Update an existing connection

/**
 * @swagger
 * /connect/{doctorId}/{patientId}:
 *   delete:
 *     summary: Fshi një lidhje mes mjekut dhe pacientit
 *     tags: [Connection]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e mjekut
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e pacientit
 *     responses:
 *       200:
 *         description: Lidhja u fshi me sukses
 *       404:
 *         description: Lidhja nuk ekziston
 *       500:
 *         description: Gabim në server
 */
router.delete('/:doctorId/:patientId', deleteConnection); // Delete an existing connection

/**
 * @swagger
 * /connect/doctor:
 *   get:
 *     summary: Merr të gjithë pacientët e lidhur me një mjek të caktuar
 *     tags: [Connection]
 *     responses:
 *       200:
 *         description: Lista e pacientëve të lidhur me mjekun u mor me sukses
 *       500:
 *         description: Gabim në server
 */
router.get('/doctor', getConnectedPatients); // Get all connected patients

/**
 * @swagger
 * /connect/doctor/{doctorId}:
 *   get:
 *     summary: Merr pacientët e lidhur me një mjek të caktuar
 *     tags: [Connection]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e mjekut
 *     responses:
 *       200:
 *         description: Lista e pacientëve të lidhur me mjekun u mor me sukses
 *       404:
 *         description: Nuk ka pacientë të lidhur me këtë mjek
 *       500:
 *         description: Gabim në server
 */
router.get('/doctor/:doctorId', getPatientsByDoctor); // Get patients by doctor ID


// In your routes (Express)
router.get('/patients/:patientId', getConnectedPatientsByPatientId);


module.exports = router;
