const express = require('express');
const router = express.Router();
const {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDoctorsByDepartment 
} = require('../controller/departmentController');

/**
 * @swagger
 * tags:
 *   name: Department
 *   description: 
 */

/**
 * @swagger
 * /department:
 *   get:
 *     summary: 
 *     tags: [Department]
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
 *         description: Numri i departamenteve për faqe
 *     responses:
 *       200:
 *         description: Lista e departamenteve
 *       500:
 *         description: Gabim në marrjen e të dhënave
 */
router.get('/', getDepartments);

/**
 * @swagger
 * /department/{id}:
 *   get:
 *     summary: 
 *     tags: [Department]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e departamentit
 *     responses:
 *       200:
 *         description: Departamenti u gjet
 *       404:
 *         description: Departamenti nuk u gjet
 *       400:
 *         description: Gabim në kërkesë
 */
router.get('/:id', getDepartmentById);

/**
 * @swagger
 * /department/{id}/doctors:
 *   get:
 *     summary: 
 *     tags: [Department]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e departamentit
 *     responses:
 *       200:
 *         description: Lista e doktorëve për departamentin
 *       404:
 *         description: Departamenti nuk u gjet
 */
router.get('/:id/doctors', getDoctorsByDepartment);  // Kjo është rruga e re për doktorët

/**
 * @swagger
 * /department:
 *   post:
 *     summary: 
 *     tags: [Department]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Departamenti u krijua me sukses
 *       400:
 *         description: Të dhënat janë të paplota
 *       500:
 *         description: Gabim gjatë krijimit
 */
router.post('/', createDepartment);

/**
 * @swagger
 * /department/{id}:
 *   put:
 *     summary: 
 *     tags: [Department]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e departamentit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Departamenti u përditësua me sukses
 *       404:
 *         description: Departamenti nuk u gjet
 *       400:
 *         description: Gabim në përditësim
 */
router.put('/:id', updateDepartment);

/**
 * @swagger
 * /department/{id}:
 *   delete:
 *     summary: 
 *     tags: [Department]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e departamentit
 *     responses:
 *       200:
 *         description: Departamenti u fshi me sukses
 *       404:
 *         description: Departamenti nuk u gjet
 *       500:
 *         description: Gabim gjatë fshirjes
 */
router.delete('/:id', deleteDepartment);

module.exports = router;
