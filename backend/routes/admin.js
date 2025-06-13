const express = require('express');
const router = express.Router();
const AdminApiController = require('../controllers/AdminApiController');

router.post('/register',AdminApiController.register);
// router.post('/',AdminApiController.);
// router.post('/',AdminApiController.register);
// router.post('/',AdminApiController.register);

module.exports=router;