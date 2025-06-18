const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.use('/api',require('./user'));
router.use('/api',require('./location'));

module.exports = router;
