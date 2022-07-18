function getWeight(){
  return this.weight
}
const baseUrl= 'http://localhost:3000/'
let users;
function getUsers() {

    fetch(baseUrl+"user")
    .then((response) => response.json())
    .then((response) => {
      (users = response)})
    .then((response) => 
    users.forEach(user => {
        showUser(user)
    }))
    .catch((err) => {
      console.log(err);
    });


    // const xhr = new XMLHttpRequest();
    // xhr.open('GET', '../dataFile.json',true);
    // xhr.send();
    // xhr.onload = function () {
    // if (xhr.status != 200) {
    //     alert(`Error ${xhr.status}: ${xhr.statusText}`);
    // } 
    // else {
    //     users = JSON.parse(xhr.responseText).users;
    //     console.log(users);
    //     // manager.users = users; 
    //     // sessionStorage.setItem('users',JSON.stringify(users));
    //     // sessionStorage.setItem('manager',JSON.stringify(manager));
    //     users.forEach(user => {
    //         showUser(user)
    //     });
    // }
// }
}
function showUser(user) {
    const tmp=document.getElementById("users-card");
          const element = tmp.content.cloneNode(true);

        element.querySelector(".firstName").innerText = user.firstName
        element.querySelector(".lastName").innerText = user.lastName
        const bmi=user.weight.meetings[user.weight.meetings.length-1].weight / (Math.pow(user.hight,2));
        const bmiColor=bmi-user.weight.meetings[user.weight.meetings.length-2].weight/(Math.pow(user.hight,2));
        element.querySelector(".bmi").innerText = bmi
        element.querySelector(".bmi").id = user.id
        const button=document.createElement("button");
        button.innerHTML = "more details";
        button.addEventListener("click", () => {window.location.href="../html/userView.html?userId="+user.id})
        element.querySelector(".details").appendChild(button);
        document.querySelector(".users").appendChild(element)
        changeColor(bmiColor,user.id)
        // const c = document.getElementById("tbody")
        // c.appendChild(element);
       
}
function changeColor(bmiColor,id){
    let color="";
    if(bmiColor>0)
        color="red";
    else
        color="#66FF66";
    document.getElementById(id).style.color = color;
}
function searchProductByName(){

}
function searchUserByWeight(){
        const userW = findUserByWeight(document.getElementById('from-weight').value,
           document.getElementById('to-weight').value);
        console.log(userW)
        drow(userW)
}
function findUserByWeight(from, to) {
    return this.users.filter((u) => u.getWeight > from && u.getWeight < to);
}
function searchUserWhoLostWeightFromLastWeek() {
    const userW = users.findUserWhoLostWeightFromLastWeek()
    console.log(userW);
    drow(userW)
}
function findUserWhoLostWeightFromLastWeek() {
    return this.users.filter((u) => u.bmiColor <=0);
}
function searchUserWhoGainedWeightFromLastWeek() {
    const userW = users.findUserWhoGainedWeightFromLastWeek()
    console.log(userW);
    drow(userW)
}
function findUserWhoGainedWeightFromLastWeek() {
    return this.users.filter((u) => u.bmiColor >0); 
}

















// let Data;
// $.ajax({
//     url: 'data.json',
//     success: (data) => {
//         Data = data;
//     }
// });
// const xhr = new XMLHttpRequest();
// xhr.open("GET", '../dataFile.json');
// xhr.send();
// xhr.onload = async function () {
//     if (xhr.status != 200) {
//         alert(`Error ${xhr.status}: ${xhr.statusText}`);
//     }
//     else {
//         let users = [];
//         users = JSON.parse(xhr.responseText);
//         // console.log(users);
//         let table = '';

//         Array.from(users).forEach(user => {
//             table += `
//             <tr>
//                 <th>${user.firstName + ' ' + user.lastName}</th>
//                 <th>${user.weight.historyWeight[users.length - 1] / Math.sqrt(user.hight)}</th>
//                 <th><a href="">details</a></th>
//             </tr>`
            
//         });

//         const container = document.querySelector('.usersTable');
//         container.innerHTML += table;
//     }
// }



