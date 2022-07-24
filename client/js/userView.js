function getUserId(){
const userId = new URL(location.href).searchParams.get('userId');
console.log(userId);
return userId;
}

getUserDetails = () => {
    const id = getUserId();
    fetch(`http://localhost:3000/user/${id}`)
    .then(response => response.json())
    .then(response => {
        currentUser=response;
      showDetails(currentUser)
    })
    .catch(function (err) {
      console.log('Something went wrong.', err);
    });
      
}

function showDetails(currentUser) {
    document.getElementById("userName").innerHTML = currentUser.firstName + ' ' + currentUser.lastName;
    document.getElementById("userEmail").innerHTML = currentUser.email;
    document.getElementById("userPhone").innerHTML = currentUser.phone;
    document.getElementById("userAddress").innerHTML = currentUser.address.city + '- ' + currentUser.address.street + ' ' + currentUser.address.number;
    document.getElementById("userHight").innerHTML = currentUser.hight;
    document.getElementById("userFirstWeight").innerHTML = currentUser.weight.startWeight;
    console.log(currentUser.weight.meetings);
    currentUser.weight.meetings.forEach(meeting => {
        showMeeting(meeting);
    });

}

function showMeeting(meeting) {
    const tmp = document.getElementById("history-meetings-template");
    const element = tmp.content.cloneNode(true);

    element.querySelector(".date").innerText = meeting.date;
    element.querySelector(".weight").innerText = meeting.weight;
    const bmi = meeting.weight / (Math.pow(currentUser.hight, 2));
    element.querySelector(".bmi").innerText = bmi
    document.querySelector(".meeting-table").appendChild(element)
    document.querySelector('.goTodiaryManagement').addEventListener("click",
    () => window.location.href = `./foodDiary.html?id=${users.id}`)
    // "history-meetings"
}