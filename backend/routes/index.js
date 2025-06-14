const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.use('/api',require('./user'));

module.exports = router;
