// GET /meeting
// GET /meeting/:id
// POST /meeting
// PUT /meeting/:id
// DELETE /meeting/:id

const express = require('express');
const router = express.Router();
const controller=require('../controller/meetingController');

router.get('/', controller.getMeeting)
router.get('/:id', controller.getMeetingById)
router.post('/', controller.addMeeting)
router.put('/:id', controller.updateMeeting)
router.delete('/:id', controller.deleteMeeting)

module.exports = router;