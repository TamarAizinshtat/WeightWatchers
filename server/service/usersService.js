
const userModel = require('../model/userModel')
//
module.exports.getAllUsers = async () => {
    return await userModel.find()

}
module.exports.getUsersBySearch = () => {

}
module.exports.getUser = async (id) => {
    return await userModel.findOne({id:id})

}
module.exports.updateUser = async (id, update) => {
    const { firstName, lastName, address, phone, email, password, hight, weight } = update;
    const data =
    {
        firstName,
        lastName,
        address,
        phone,
        email,
        password,
        hight,
        weight
    }
    return await userModel.findByIdAndUpdate(id, data, {
        new: true
    });

}
module.exports.createUser = async (newUser) => {
    const { firstName, lastName, city, street, number, phone, email, password, hight, weight } = newUser;
    const data = new userModel(
        {
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
    )
    return await data.save();

}
module.exports.deleteUser = async (id) => {
    return await userModel.findByIdAndDelete(id)
}