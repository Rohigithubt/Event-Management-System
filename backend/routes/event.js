const express = require('express');
const router = express.Router();
const EventApiController = require('../controllers/EventApiController');

router.post('/create-event',EventApiController.createEvent);
router.post('/index-event',EventApiController.indexEvent);
router.post('/delete-event',EventApiController.deleteEvent);
    
module.exports = router;