const express = require('express');
const tokenController = require('../controllers/tokenController')

const router = express.Router();

router.get('/generateToken/:email', tokenController.generateToken);

module.exports = router;