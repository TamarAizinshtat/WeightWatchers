window.addEventListener('load',()=>{
  const byWeight = document.getElementById('byWeight');
  const byProcess = document.getElementById('byProcess');
  const byBMI = document.getElementById('byBMI');
  const byCity = document.getElementById('byCity');
  const inputToSearch = document.getElementById('inputSearch');
  const search = document.getElementById('searchAll');  

  const weightInputs = document.getElementById('weightInputs');
  let inputMinWeight = null;
  let inputMaxWeight = null;
  let weightDiv = null;
  let labelBigger = null;
  let labelLower = null;
  const boolSearch = [false, false, false, false];

  byWeight.onchange = (e) => { 
    e.preventDefault();
    boolSearch[0] = true;
    inputMinWeight = document.createElement('input');
    inputMaxWeight = document.createElement('input');
    labelBigger = document.createElement('label');
    labelLower = document.createElement('label');
    inputMinWeight.type = "text";
    inputMaxWeight.type = "text";
    labelBigger.innerHTML = "bigger than:";
    labelLower.innerHTML = "lower than:";
    weightDiv = document.createElement('div');
    weightDiv.append(labelBigger, inputMinWeight, labelLower, inputMaxWeight);
    weightInputs.append(weightDiv);
   }
   
   const bmiInputs = document.getElementById('bmiInputs');
let minBmi = null;
let maxBmi = null;
let BMIDiv = null;
let labelBigger2 = null;
let labelLower2 = null;
byBMI.onchange = (e) => {
    e.preventDefault();
    boolSearch[2] = true;
    minBmi = document.createElement('input');
    maxBmi = document.createElement('input');
    labelBigger2 = document.createElement('label');
    labelLower2 = document.createElement('label');
    minBmi.type = "text";
    maxBmi.type = "text";
    labelBigger2.innerHTML = "bigger than:";
    labelLower2.innerHTML = "lower than:";
    BMIDiv = document.createElement('div');
    BMIDiv.append(labelBigger2, minBmi, labelLower2, maxBmi);
    bmiInputs.append(BMIDiv);
}

const cityInput = document.getElementById('cityInput');
let city = null;
byCity.onchange = (e) => {
    e.preventDefault();
    boolSearch[3] = true;
    city = document.createElement('input');
    city.type = "text";
    cityInput.append(city);
}


let searches = ['', '', '', '', '', ''];

let flag = true;
search.onclick = (e) => {
    e.preventDefault();
    for (let i = 0; i < boolSearch.length; i++) {
        if (boolSearch[i]) {
            switch (i) {
                case 0:
                    // currentUsers = byWeightFunc(currentUsers, parseInt(inputMinWeight.value), parseInt(inputMaxWeight.value));
                    searches[1] = inputMinWeight.value;
                    searches[2] = inputMaxWeight.value;
                    break;
                case 1:
                    // currentUsers = byProcessFunc(currentUsers);
                    break;
                case 2:
                    // currentUsers = byBMIFunc(currentUsers, parseInt(minBmi.value), parseInt(maxBmi.value));
                    searches[3] = minBmi.value;
                    searches[4] = maxBmi.value;
                    break;
                case 3:
                    // currentUsers = byCityFunc(currentUsers, city.value);
                    searches[5] = city.value;
                    break;
            }
        }
    }
    //sendToPrint(currentUsers);
    if (inputToSearch.value != "") {
        // currentUsers = searchFunc(list, inputToSearch.value);
        searches[0] = inputToSearch.value;
        //  sendToPrint(currentUsers);
    }
    console.log(searches);
    console.log(boolSearch);
    getFromServer(searches);
    // funcReset();
}

})

let users;
getUsers = (fromNewMeeting) => {
    fetch(`http://localhost:3000/user`)
    .then(response => response.json())
    .then(response => {
       users = response;
       usersList1(users, fromNewMeeting);
      })
    .catch(function (err) {
      console.log('Something went wrong.', err);
    });
    // const users = JSON.parse(sessionStorage.getItem('manager')).users;
    
}
usersList1 = (list, fromNewMeeting) => {
    list.forEach((element) => {
        showUser(element, fromNewMeeting);
    });
}

showUser = (user, fromNewMeeting) => {
    const element = document.getElementById('users-card');
    const cln = element.content.cloneNode(true);
    cln.querySelector('.firstName').innerText = user.firstName;
    cln.querySelector('.lastName').innerText = user.lastName;
    if(!fromNewMeeting){
        cln.querySelector('.card').addEventListener("click", () => window.location.href=`showUser.html?id=${user.id}`);
        const bmi = user.weight.meeting[user.weight.meeting.length - 1].Weight / (user.hight ** 2);
        let bmiColor;
        if(user.weight.meeting.length>1)
          bmiColor = bmi - user.weight.meeting[user.weight.meeting.length - 2].Weight / (user.hight ** 2);
        else
          bmiColor = bmi;
        cln.querySelector('.bmi').innerText = bmi;
        cln.querySelector('.bmi').id = user.id;
        document.querySelector('.i').appendChild(cln);
        changeColor(bmiColor, user.id);
    }
    else {
        cln.querySelector('.card').id = user.id;
        cln.querySelector('.weight').value = user.weight.meeting[user.weight.meeting.length - 1].Weight;
        cln.querySelector('.date').value = new Date().toISOString().split('T')[0];
        document.querySelector('.users').appendChild(cln);
    }
}

changeColor = (bmiColor, id) => {
    if (bmiColor < 0) {
        document.getElementById(id).style.backgroundColor = 'lightgreen';
    }
    else {
        document.getElementById(id).style.backgroundColor = 'red';
    };
}



saveNewMeeting = () => {
    let meeting=[];
    users.forEach(user => {
      const element = document.getElementById(user.id);
      if (!element.children[5].children[0].checked)
        meeting.push({"userId": user.id, "Weight": element.children[2].children[0].value, "date": element.children[3].children[0].value})
    });
    fetch(`http://localhost:3000/meeting`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(meeting)
    })
    .then((response) => {
        if (response.status === 200 && response.status !== undefined) 
            return response.json();
        else 
            alert(response.message)
     })
    .then(data => {
        if(data){
            alert('saved successfully');
            window.location.href = "./homeManager.html";
        }
    })
    .catch(err => alert('error: ' + err.message))
  }
  drawAfterChanges = (u) => {
    let usersList = document.getElementById('i');
    let list = document.getElementById('users');
    usersList.remove();
    let usersDiv = document.createElement('div');
    usersDiv.setAttribute('class', 'i');
    list.appendChild(usersDiv);
    usersList1(u);
}
const getFromServer = (searches) => {
  let a = 'aa'
  fetch(`http://localhost:3000/users/${a}}`, {
      method: `POST`,
      body: JSON.stringify(
          searches
      ),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
  }).then(response => {
      return response.json();
  }).then(data => {
      console.log(data);
      drawAfterChanges(data);
  })
}



// function search(data, type) {

//     if (type == "firstName")
//       this.filteredUser = this.users.filter((user) => {
//         return user.firstName === data;
//       });
//     if (type == "lastName")
//       this.filteredUser = this.users.filter((user) => {
//         return user.lastName === data;
//       });
//     if (type == "email")
//       this.filteredUser = this.users.filter((user) => {
//         return user.emailAddress === data;
//       });
//     if (type == "phone")
//       this.filteredUser = this.users.filter((user) => {
//         return user.phoneNumber === data;
//       });
//      showUser(this.filteredUser);
//   }