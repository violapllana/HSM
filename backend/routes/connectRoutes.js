const express = require('express');
const { User } = require('../models/user');
const router = express.Router();

/**
 * @swagger
 * /connect:  
 *   post:
 *     summary: Krijo një lidhje mes mjekut dhe pacientit
 *     description: Kjo rrugë mundëson lidhjen mes një mjeku dhe një pacienti.
 *     parameters:
 *       - in: body
 *         name: connect
 *         description: Lidhja mes mjekut dhe pacientit
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             doctorId:
 *               type: integer
 *               description: ID e mjekut
 *             patientId:
 *               type: integer
 *               description: ID e pacientit
 *     responses:
 *       200:
 *         description: Lidhja mes mjekut dhe pacientit u krijua me sukses
 *       400:
 *         description: Mjeku ose pacienti janë të pasaktë
 *       500:
 *         description: Gabim në server
 */
router.post('/connect', async (req, res) => {
  const { doctorId, patientId } = req.body;

  try {
    const doctor = await User.findByPk(doctorId);
    const patient = await User.findByPk(patientId);

    // Kontrollo nëse të dy përdoruesit ekzistojnë dhe nëse janë të përkatshëm
    if (!doctor || doctor.role !== 'doctor') {
      return res.status(400).json({ message: 'Invalid doctor.' });
    }

    if (!patient || patient.role !== 'patient') {
      return res.status(400).json({ message: 'Invalid patient.' });
    }

    // Mund të shtosh një relacion të ri mes mjekut dhe pacientit këtu nëse do
    doctor.addPatient(patient); // Shembuj i një lidhjeje të mundshme

    return res.status(200).json({ message: 'Successfully connected doctor and patient.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
