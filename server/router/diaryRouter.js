// GET /user/:id/diary
// POST /user/:id/diary (- for adding new day summary)
// POST /user/:id/diary/:id (- for updating a day summary)
// DELETE /user/:id/diary/:id
const express = require('express');
const router = express.Router();
const controller = require('../controller/diaryController');

router.get('/', controller.getUserDiary)
// router.get('/search', controller.getUsersBySearch)
// router.get('/:id', controller.getUser)
// router.put('/:id', controller.updateUser)
// router.post('/', controller.createUser)
// router.delete('/:id', controller.deleteUser)

module.exports = router;