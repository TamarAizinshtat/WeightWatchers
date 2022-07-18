
const userModel = require('../model/userModel')
const userFunctions= require('./usersService');
describe("user tests", () => {
    test('get all users returns a list', () => {   
      // arrange and act
      const result = userFunctions.getAllUsers();
    
      // assert
      expect(result).toBe(typeOf(list));
    });
    
    test("subtracting 2 from 10 should return 8", () => {
      // arrange and act
      var result = mathOperations.diff(10,2)
    
      // assert
      expect(result).toBe(8);
    });
    
    test("multiplying 2 and 8 should return 16", () => {
      // arrange and act
      var result = mathOperations.product(2,8)
    
      // assert
      expect(result).toBe(16);
    });
   })
module.exports.getUsersBySearch = () => {

}
module.exports.getUser = async (id) => {
    return await userModel.find(id)

}
module.exports.updateUser = async (id, update) => {
    const { firstName, lastName, city, street, number, phone, email, password, hight, weight } = update;
    const data =
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