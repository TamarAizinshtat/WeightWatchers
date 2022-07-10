// GET /user/:id/diary
// POST /user/:id/diary (- for adding new day summary)
// POST /user/:id/diary/:id (- for updating a day summary)
// DELETE /user/:id/diary/:id
const diaryService = require('../service/diaryService')
module.exports.getUserDiary = async (req, res, next) => {
    try {
        if (req.body) {
            const id = req.params.id
            const users = await diaryService.getUserDiary(id);
            res.send(users);
        }
    }
    catch (err) {
        next(err);
    }
}

module.exports.addingDay = async (req, res, next) => {
    try {
        if (req.body) {
            const { date, meals } = req.body;
            const day = {
                date,
                meals
            }
            const id = req.params.id
            const updated = await diaryService.addingDay(id, day)
            res.send(updated);
        }
    }
    catch (err) {
        next(err);
    }
}

module.exports.updateDay = async (req, res, next) => {
    try {
        if (req.body) {
            const { date, meals } = req.body;
            const day = {
                date,
                meals
            }
            const idU = req.params.idU
            const idDay = req.params.idDay
            const updated = await diaryService.updateDay(idU,idDay, day)
            res.send(updated);
        }
    }
    catch (err) {
        next(err);
    }
}
// module.exports.createUser = async(req, res, next) => {
//     try {

//         if (req.body) {
//             const { firstName, lastName, city, street, number, phone, email, password, hight, weight } = req.body;
//             const data = {
//                 firstName,
//                 lastName,
//                 city,
//                 street,
//                 number,
//                 phone,
//                 email,
//                 password,
//                 hight,
//                 weight
//             }
//             const created = await usersService.createUser(data);
//             res.send(created);
//         }
//     }
//     catch (err) {
//         next(err);
//     }
// }
// module.exports.deleteUser = async(req, res, next) => {
//     try {
//         if (req.body) {
//             const id = req.params.id
//             const deleted = await usersService.deleteUser(id)
//             res.send(deleted);
//         }
//     }
//     catch (err) {
//         next(err);
//     }

// }
