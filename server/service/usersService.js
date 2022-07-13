const fs = require('fs')
const jsonPath = 'dataFile.json';
const jsonData = fs.readFileSync(jsonPath, 'utf8');
const data = JSON.parse(jsonData)
const manager = data.manager
const userModel = require('../model/userModel')
//
module.exports.getAllUsers = async () => {
    return await userModel.find()

}
module.exports.getUsersBySearch = () => {

}
module.exports.getUser = async (id) => {
    return await userModel.find(id)

}
module.exports.updateUser = async (id, update) => {
    let users = await Array.from(data.users)
    users = users.filter(user => user.id != id);
    users.push(update)
    const json = JSON.stringify({ 'manager': manager, 'users': users })
    await fs.writeFileSync(jsonPath, json);
    return 'update'

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
    const users = await Array.from(data.users).filter(user => user.id != id)
    const json = JSON.stringify({ 'manager': manager, 'users': users })
    await fs.writeFileSync(jsonPath, json);
    return 'delete'
}