const fs = require('fs')
const jsonPath = 'dataFile.json';
const jsonData = fs.readFileSync(jsonPath, 'utf8');
const data = JSON.parse(jsonData)
const manager = data.manager
//
module.exports.getAllUsers = async () => {
    return await data.users;
}
module.exports.getUsersBySearch = () => {

}
module.exports.getUser = async (id) => {

    const user = await Array.from(data.users).find(user => user.id === id);
    return await user;

}
module.exports.updateUser = async (id, update) => {
    let users = await Array.from(data.users)
    users = users.filter(user => user.id != id);
    users.push(update)
    const json =  JSON.stringify({ 'manager': manager, 'users':users })
    await fs.writeFileSync(jsonPath, json);
    return 'update'

}
module.exports.createUser = async (newUser) => {
    const users = Array.from(data.users)
    users.push(newUser);
    const json = JSON.stringify({ 'manager': manager, 'users': users})
    await fs.writeFileSync(jsonPath, json);
    return 'create'

}
module.exports.deleteUser = async (id) => {
    const users=await Array.from(data.users).filter(user => user.id != id)
    const json = JSON.stringify({ 'manager': manager, 'users': users})
    await fs.writeFileSync(jsonPath, json);
    return 'delete'
}