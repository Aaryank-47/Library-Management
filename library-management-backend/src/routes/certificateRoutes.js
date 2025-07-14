const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');

// Route to generate a certificate for a donor
router.post('/generate', certificateController.generateCertificate);

// Route to retrieve a certificate by ID
router.get('/:id', certificateController.getCertificate);

// Route to list all certificates
router.get('/', certificateController.getAllCertificates);

module.exports = router;