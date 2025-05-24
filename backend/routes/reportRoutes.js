const express = require('express');
const router = express.Router();
const { createReport, getReports, getReportById, updateReport, deleteReport , getMyReports, getReportsByPatientId} = require('../controller/reportController');
const { isAuthenticated, authorizeRoles } = require('../middleware/authMiddleware');


/**
 * @swagger
 * /report:
 *   post:
 *     summary: 
 *     tags: [Report]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - patientId
 *               - diagnosis
 *               - treatment
 *               - doctorId
 *             properties:
 *               title:
 *                 type: string
 *               patientId:
 *                 type: integer
 *               diagnosis:
 *                 type: string
 *               treatment:
 *                 type: string
 *               doctorId:
 *                 type: integer
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [In Progress, Completed]
 *               comments:
 *                 type: string
 *     responses:
 *       201:
 *         description: Raporti u krijua me sukses
 *       500:
 *         description: Gabim serveri
 */
router.post('/', createReport);

/**
 * @swagger
 * /report:
 *   get:
 *     summary: 
 *     tags: [Report]
 *     responses:
 *       200:
 *         description: Lista e raporteve
 *       500:
 *         description: Gabim në marrjen e të dhënave
 */
router.get('/', getReports);

/**
 * @swagger
 * /report/{id}:
 *   get:
 *     summary: 
 *     tags: [Report]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e raportit
 *     responses:
 *       200:
 *         description: Raporti u gjet
 *       404:
 *         description: Raporti nuk u gjet
 */
router.get('/:id', getReportById);

/**
 * @swagger
 * /report/{id}:
 *   put:
 *     summary: 
 *     tags: [Report]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e raportit
 *     responses:
 *       200:
 *         description: Raporti u përditësua me sukses
 *       400:
 *         description: Gabim në kërkesë
 */
router.put('/:id', updateReport);

/**
 * @swagger
 * /report/{id}:
 *   delete:
 *     summary: 
 *     tags: [Report]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e raportit
 *     responses:
 *       200:
 *         description: Raporti u fshi me sukses
 *       404:
 *         description: Raporti nuk u gjet
 */
router.delete('/:id', deleteReport);

/**
 * @swagger
 * /report/patient/{patientId}:
 *   get:
 *     summary:
 *     tags: [Report]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e pacientit për të marrë raportet
 *     responses:
 *       200:
 *         description: Lista e raporteve për pacientin
 *       404:
 *         description: Nuk u gjetën raporte për këtë pacient
 */
router.get('/patient/:patientId', getReportsByPatientId);



/**
 * @swagger
 * /myreports:
 *   get:
 *     summary: 
 *     tags: [Report]
 *     security:
 *       - bearerAuth: []  
 *     responses:
 *       200:
 *         description: Lista e raporteve për pacientin
 *       404:
 *         description: Nuk u gjetën raporte për këtë pacient
 *       500:
 *         description: Gabim në server
 */
router.get('/myreports', isAuthenticated, authorizeRoles('patient'), getMyReports);



module.exports = router;
