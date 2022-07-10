function login() {
const uEmail = document.getElementById('email').value;
const uPassword = document.getElementById('password').value;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/users');
    xhr.send();
    xhr.onload = () => {
        if (xhr.status !== 200) {
            alert(`Error ${xhr.status}: ${xhr.statusText}`);
        }
        else {
            let found = false;
            const users = JSON.parse(xhr.responseText);
            users.forEach(user => {
                if (user.email === uEmail || user.password === uPassword) {
                    found = true;
                    window.location.href = `../html/userView.html?userId=${user.id}`;
                    console.log(`the user ${user.email} in`);
                }                           
            }
            );
            if (!found) {
                alert('User not found');
            };
        }
    }
}





// async function login() {
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     const users = await getUsers();
//     const manager = await getManager();
//     console.log(manager);
//     if (email == manager.email && password == manager.password) {
//         sessionStorage.setItem('users', JSON.stringify(users));
//         window.location.href = "../src/html/users.html";
//     }
//     else
//         users.forEach(user => {
//             if (user.userName == userName && user.password == password)
//                 sessionStorage.setItem('user', JSON.stringify(user));
//             window.location.href = "../html/userView.html?userId=" + user.id
//         });
// }
// async function getManager() {
//     await fetch(`../dataFile.json`, {
//         method: `GET`,
//         headers: { 'Content-type': `application/json; charset=UTF-8` },
//     })
//         .then((response) => {
//             if (response.status === 200) {
//                 return response.json();
//             }
//             else {
//                 alert(response.message)
//             }
//         }).then((response) => {
//             let manager = JSON.parse(response).manager;
//             return manager;
//         })
// }
// async function getUsers() {
//     await fetch(`../dataFile.json`, {
//         method: `GET`,
//         headers: { 'Content-type': `application/json; charset=UTF-8` },
//     })
//     .then((response) => {
//         if (response.status === 200) {
//             return response.json();
//         }
//         else {
//             alert(response.message)
//         }
//     }).then((response) => {
//         let users = JSON.parse(response.body).users;
//         return users;
//     })
// }