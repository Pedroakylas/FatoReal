const express = require('express');
const router = express.Router();
const checkController = require('../controllers/checkController');

// verificação por texto.
router.post('/text', checkController.checkText);

module.exports = router;
