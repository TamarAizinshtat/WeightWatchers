
const userModel = require('../model/userModel')
const userFunctions = require('./usersService');
describe("user tests", () => {
  test('get all users returns a list', () => {

    const result = userFunctions.getAllUsers();
    expect(typeof result).toEqual(typeof Array())

  });
  test('get user by id returns user', () => {

    const result = userFunctions.getUser('62cec3a9bf9d2e7362b22327');
    expect(typeof result).toEqual(typeof userModel())
    // expect(result.id ).toEqual('62cec3a9bf9d2e7362b22327')
  });


})
// module.exports.getUsersBySearch = () => {

// }
// module.exports.getUser = async (id) => {
//     return await userModel.find(id)

// }
// module.exports.updateUser = async (id, update) => {
//     const { firstName, lastName, city, street, number, phone, email, password, hight, weight } = update;
//     const data =
//     {
//         firstName,
//         lastName,
//         city,
//         street,
//         number,
//         phone,
//         email,
//         password,
//         hight,
//         weight
//     }
//     return await userModel.findByIdAndUpdate(id, data, {
//         new: true
//     });

// }
// module.exports.createUser = async (newUser) => {
//     const { firstName, lastName, city, street, number, phone, email, password, hight, weight } = newUser;
//     const data = new userModel(
//         {
//             firstName,
//             lastName,
//             city,
//             street,
//             number,
//             phone,
//             email,
//             password,
//             hight,
//             weight
//         }
//     )
//     return await data.save();

// }
// module.exports.deleteUser = async (id) => {
//     return await userModel.findByIdAndDelete(id)
// }