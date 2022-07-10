// GET /user/:id/diary
// POST /user/:id/diary (- for adding new day summary)
// POST /user/:id/diary/:id (- for updating a day summary)
// DELETE /user/:id/diary/:id
const fs = require('fs')
const jsonPath = 'dataFile.json';
const jsonData = fs.readFileSync(jsonPath, 'utf8');
const data = JSON.parse(jsonData)
const manager = data.manager
//
module.exports.getUserDiary = async (id) => {
    const user = await Array.from(data.users).find(user => user.id === id);
    return await user.eatingDiary;
}
module.exports.addingDay = async (id, day) => {
    debugger;
    const user = await Array.from(data.users).find(user => user.id === id);
    debugger;
    console.log("user///////\n"+user);
    const users = await Array.from(data.users).filter(user => user.id != id);
    console.log("users//////\n"+users);
    debugger;
    console.log(Array.from(user.eatingDiary))
    // console.log( Array.from(user.eatingDiary).push(day));
    
    const diary = Array.from(user.eatingDiary).push(day)
    console.log("diary//////\n"+diary);
    user.eatingDiary = diary
    // console.log("user.eatingDiary//////\n"+user.eatingDiary);
    users.push(user);

    const json = JSON.stringify({ 'manager': manager, 'users': users })
    await fs.writeFileSync(jsonPath, json);
    return 'adding day'
}
module.exports.updateDay = async (id) => {


}
module.exports.deleteDay = async (id, update) => {


}


