
const usersService = require('../service/usersService')
module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await usersService.getAllUsers()
        res.send(users);
    }
    catch (err) {
        next(err);
    }
}
module.exports.getUsersBySearch = (req, res, next) => {
    usersService.getUsersBySearch()
}
module.exports.getUser = async (req, res, next) => {
    try {
        if (req.body) {
            const id = req.params.id
            const user = await usersService.getUser(id)
            res.send(user);
        }
    }
    catch (err) {
        next(err);
    }
}
module.exports.updateUser = async (req, res, next) => {
    try {
        if (req.body) {
            const { firstName, lastName, city, street, number, phone, email, password, hight, weight } = req.body;
            const data = {
                firstName,
                lastName,
                city,
                street,
                number,
                phone,
                email,
                password,
                hight,
                weight
            }
            const id = req.params.id
            const updated = await usersService.updateUser(id, data);
            res.send(updated);

        }
    }
    catch (err) {
        next(err);
    }
}
module.exports.createUser = async(req, res, next) => {
    try {

        if (req.body) {
            const { firstName, lastName, city, street, number, phone, email, password, hight, weight } = req.body;
            const data = {
                firstName,
                lastName,
                city,
                street,
                number,
                phone,
                email,
                password,
                hight,
                weight
            }
            const created = await usersService.createUser(data);
            res.send(created);
        }
    }
    catch (err) {
        next(err);
    }
}
module.exports.deleteUser = async(req, res, next) => {
    try {
        if (req.body) {
            const id = req.params.id
            const deleted = await usersService.deleteUser(id)
            res.send(deleted);
        }
    }
    catch (err) {
        next(err);
    }

}
