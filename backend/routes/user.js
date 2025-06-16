const express = require('express');
const router = express.Router();
const UserApiController = require('../controllers/UserApiController');

router.post('/register',UserApiController.register);
router.post('/login',UserApiController.login);
router.post('/index',UserApiController.index);
// router.post('/',AdminApiController.);
// router.post('/',AdminApiController.register);
// router.post('/',AdminApiController.register);

module.exports=router;