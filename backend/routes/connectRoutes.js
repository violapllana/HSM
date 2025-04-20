const express = require('express');
const User = require('../models/user');
const DoctorPatient = require('../models/doctorpatient');  // Për modelin e lidhjes
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Connection
 *   description: Menaxhimi i lidhjeve mes mjekëve dhe pacientëve
 */
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
router.post('/', async (req, res) => {
  const { doctorId, patientId } = req.body;

  try {
    const doctor = await User.findByPk(doctorId);
    const patient = await User.findByPk(patientId);

    if (!doctor || doctor.role !== 'doctor') {
      return res.status(400).json({ message: 'Invalid doctor.' });
    }

    if (!patient || patient.role !== 'patient') {
      return res.status(400).json({ message: 'Invalid patient.' });
    }

    // Krijo lidhjen
    await doctor.addPatient(patient);

    return res.status(200).json({ message: 'Successfully connected doctor and patient.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// /**
//  * @swagger
//  * /connect:
//  *   get:
//  *     summary: Merr të gjitha lidhjet mes mjekëve dhe pacientëve
//  *     description: Kjo rrugë mundëson marrjen e të gjitha lidhjeve mes mjekëve dhe pacientëve.
//  *     responses:
//  *       200:
//  *         description: Lidhjet mes mjekëve dhe pacientëve u morën me sukses
//  *       500:
//  *         description: Gabim në server
//  */
// // Adjust the route to fetch connections with doctor and patient data
// router.get('/', async (req, res) => {
//   try {
//     const connections = await DoctorPatient.findAll({
//       include: [
//         {
//           model: User,
//           as: 'doctor', // Alias for the doctor relationship
//           attributes: ['username', 'email'] // Specify the fields you need
//         },
//         {
//           model: User,
//           as: 'patient', // Alias for the patient relationship
//           attributes: ['username', 'email'] // Specify the fields you need
//         }
//       ]
//     });

//     if (!connections || connections.length === 0) {
//       return res.status(404).json({ message: 'No connections found.' });
//     }

//     res.status(200).json(connections);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error.' });
//   }
// });





/**
 * @swagger
 * /api/connect:
 *   get:
 *     summary: Get all doctor-patient connections with usernames and emails
 *     tags: [DoctorPatient]
 *     responses:
 *       200:
 *         description: List of doctor-patient connections
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   doctor:
 *                     type: object
 *                     properties:
 *                       username:
 *                         type: string
 *                       email:
 *                         type: string
 *                   patient:
 *                     type: object
 *                     properties:
 *                       username:
 *                         type: string
 *                       email:
 *                         type: string
 */
router.get('/', async (req, res) => {
  try {
    const connections = await DoctorPatient.findAll({
      include: [
        {
          model: User,
          as: 'doctor',
          attributes: ['username', 'email'],
        },
        {
          model: User,
          as: 'patient',
          attributes: ['username', 'email'],
        },
      ],
    });

    res.status(200).json(connections);
  } catch (error) {
    console.error('Error fetching connections:', error);
    res.status(500).json({ error: 'Failed to fetch connections' });
  }
});



/**
 * @swagger
 * /connect/{id}:
 *   get:
 *     summary: Merr një lidhje mes mjekut dhe pacientit me ID
 *     description: Kjo rrugë mundëson marrjen e lidhjes mes një mjeku dhe një pacienti bazuar në ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID e lidhjes mes mjekut dhe pacientit
 *     responses:
 *       200:
 *         description: Lidhja mes mjekut dhe pacientit u gjet me sukses
 *       404:
 *         description: Lidhja nuk u gjet
 *       500:
 *         description: Gabim në server
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await DoctorPatient.findByPk(id);
    if (!connection) {
      return res.status(404).json({ message: 'Connection not found.' });
    }

    res.status(200).json(connection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

/**
 * @swagger
 * /connect/{id}:
 *   put:
 *     summary: Përditëso një lidhje mes mjekut dhe pacientit
 *     description: Kjo rrugë mundëson përditësimin e lidhjes mes një mjeku dhe një pacienti bazuar në ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID e lidhjes mes mjekut dhe pacientit
 *       - in: body
 *         name: connect
 *         description: Lidhja që do të përditësohet
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
 *         description: Lidhja u përditësua me sukses
 *       400:
 *         description: Lidhja nuk mund të përditësohet
 *       404:
 *         description: Lidhja nuk u gjet
 *       500:
 *         description: Gabim në server
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { doctorId, patientId } = req.body;

  try {
    const connection = await DoctorPatient.findByPk(id);

    if (!connection) {
      return res.status(404).json({ message: 'Connection not found.' });
    }

    // Përditëso lidhjen
    connection.doctorId = doctorId;
    connection.patientId = patientId;

    await connection.save();

    return res.status(200).json({ message: 'Connection updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

/**
 * @swagger
 * /connect/{id}:
 *   delete:
 *     summary: Fshi një lidhje mes mjekut dhe pacientit
 *     description: Kjo rrugë mundëson fshirjen e lidhjes mes një mjeku dhe një pacienti bazuar në ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID e lidhjes mes mjekut dhe pacientit
 *     responses:
 *       200:
 *         description: Lidhja u fshi me sukses
 *       404:
 *         description: Lidhja nuk u gjet
 *       500:
 *         description: Gabim në server
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await DoctorPatient.findByPk(id);

    if (!connection) {
      return res.status(404).json({ message: 'Connection not found.' });
    }

    await connection.destroy();

    return res.status(200).json({ message: 'Connection deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
