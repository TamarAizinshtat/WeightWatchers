
const express = require('express');
const router = express.Router();
const userController=require('../controller/usersController');
const diaryController=require('../controller/diaryController');

router.get('/:id/diary', diaryController.getUserDiary)
router.post('/:id/diary', diaryController.addingDay)
router.post('/:idU/diary/:idDay', diaryController.updateDay)



router.get('/', userController.getAllUsers)
router.get('/search', userController.getUsersBySearch)
router.get('/:id', userController.getUser)
router.put('/:id', userController.updateUser)
router.post('/', userController.createUser)
router.delete('/:id', userController.deleteUser)

module.exports = router;