const express = require('express');
const router = express.Router();
const quotationController = require('../controllers/quotationController');

router.post('/saveQuotation', quotationController.saveQuotation);

module.exports = router;
