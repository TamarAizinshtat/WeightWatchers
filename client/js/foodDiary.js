let idOfUser;
let currentUser;
function getParams() {
    const params = new URLSearchParams(window.location.search)
    idOfUser = JSON.parse(params.get('id'));
}
getAllDiary = () => {
    getParams();
    fetch(`http://localhost:3000/diary/${idOfUser}`)
        .then((response) => {
            if (response.status === 200 && response.status !== undefined)
                return response.json();
            else
                alert(response.message)
        })
        .then((response) => {
            currentUser = response;
            response.forEach(d => showDayEating(d));
        })
        .catch(err => console.error(err));
}
let numOfDay = 0;
function showDayEating(oneDay) {
    let numOfMeat = 1;
    const element = document.querySelector('.dayEating-card');
    const cln = element.content.cloneNode(true);
    cln.querySelector('.date').innerText = oneDay.date;
    oneDay.meals.forEach(meal => {//אני לא יודעת מה זה המיליס הזה.. וגם הפודס שבשורה למטה
        cln.getElementById(numOfMeat).innerText = meal.Foods;
        numOfMeat++;
    });
    document.querySelector('.container').appendChild(cln);
    let element2 = document.getElementsByClassName('edit')[numOfDay];
    element2.id = numOfDay;
    element2 = document.getElementsByClassName('save')[numOfDay];
    element2.id = numOfDay;
    element2 = document.getElementsByClassName('delete')[numOfDay];
    element2.id = numOfDay;
    document.querySelector('.edit').addEventListener("click", () => {

        console.log(document.querySelector('.edit').id);
        editDay(1)
    });
    document.querySelector('.save').addEventListener("click", () => {
        saveDay(document.querySelector('.save').id)
    });
    document.querySelector('.delete').addEventListener("click", () => {
        deleteDay(document.querySelector('.delete').id)
    });
    element2 = document.getElementsByClassName('one-day')[numOfDay];
    element2.id = numOfDay;
    numOfDay++;
}

let modal;
function addDate() {
    document.querySelector('.dateOfMeal').value = new Date().toISOString().split('T')[0];
    document.getElementById("myModal").style.display = "block";
    document.getElementById('myBtn').style.display = "block";
    document.getElementsByClassName("close")[0].addEventListener("click", tackOfData)
    function tackOfData() {
        document.getElementById("myModal").style.display = "none"
    }
    for (let i = 0; i < 3; i++)
        drowMeal();

}
function onkeydown() {
    const activeInput = document.activeElement;
    const classInput = activeInput.attributes.class.value;
    res = document.getElementsByClassName(classInput)[1];
    const valueInput = activeInput.value;
    res.innerHTML = '';
    let list = '';
    let foods = autocompleteMatch(valueInput);
    for (i = 0; i < foods.length; i++) {
        list += `<li onclick="choosedFood('${foods[i]}','${classInput}')"> ${foods[i]} </li>`;
    }
    res.innerHTML = '<ul>' + list + '</ul>';
}

let numMeal = 1;
function drowMeal() {
    let numToCreateInput = numMeal;
    const element = document.querySelector('.add-date-card');
    const cln = element.content.cloneNode(true);
    cln.querySelector('.meal-title').innerText = `meal-${numMeal}`;
    cln.querySelector('.container-foods').id = `container-foods-${numMeal}`;
    cln.querySelector('.addMoreFood').addEventListener("click", () => createInput(numToCreateInput));
    numMeal++;
    document.querySelector('.modal-content').appendChild(cln);
}
function createInput(numToCreateInput) {
    let numInput = 6;
    let input = document.createElement('input');
    input.type = 'text';
    input.id = numInput++;
    input.placeholder = 'Enter food';
    input.autocomplete = 'off';
    document.getElementById(`container-foods-${numToCreateInput}`).appendChild(input);
}
function saveNewDate(){
    const eatingDiary = getAllTheMealsInThisDay();
    if (eatingDiary) {
        currentUser.eatingDiary.push(eatingDiary);
        fetch(`http://localhost:3000/diary/${idOfUser}`, {
            method: `POST`,
            body: JSON.stringify({
                'eatingDiary': currentUser.eatingDiary,
            }),
            headers: { 'Content-type': `application/json; charset=UTF-8` },
        })
            .then((response) => {
                if (response.status === 200 && response.status !== undefined) {
                    alert(`the daily eating saved successfully`);
                    modal.style.display = 'none';
                }
                else {
                    alert(response.message)
                }
            })
    }
    modal.style.display = 'none';
}
function getAllTheMealsInThisDay() {
    const dateOfDay = document.querySelector('.dateOfMeal').value;
    if (!checkIfThisDayIsAlreadyExist(dateOfDay)) {
        let meals = [];
        for (let j = 1; j < numMeal; j++) {
            let oneMeal = getOneMealInThisDay(j);
            if (oneMeal !== null)
                meals.push(oneMeal);
        }
        if (meals.length > 0) {
            let eatingDiary = { 'date': dateOfDay, 'meals': meals }
            return eatingDiary;
        }
        else {
            alert('you don`t add any meal Because of this we don`t save anything');
            return null;
        }
    }
    else
        alert('There is such a day in your calendar, if you would like to add or edit information contact there from the main page');
}
function getOneMealInThisDay(numOfMeal)  {
    let foods = [];
    const collection = document.getElementById(`container-foods-${numOfMeal}`);
    const childrens = collection.children;
    for (let i = 0; i < childrens.length; i++) {
        if (childrens[i].children[0].value !== '')
            foods.push(childrens[i].children[0].value);
    }
    if (foods.length > 0) {
        let oneMeal = { 'Foods': foods };
        return oneMeal;
    }
    return null;
}
function checkIfThisDayIsAlreadyExist(dateOfDay)  {
    const ifExist = currentUser.eatingDiary.find(e => e.date === dateOfDay)
    if (!ifExist)
        return false;
    return true;
}

function editDay(id)  {
    
    const collection = document.getElementsByTagName('tr');
    for (let index = 0; index < collection.length; index++) {
        if (collection[index].id === id) {
            collection[index].children.setAttribute('contenteditable', 'true')
        }
    }
    alert("now you have to edit your meals😉")
}
function saveDay() {
    const collection = document.getElementsByTagName('td');
    let day = {
        date: collection[0].innerHTML,
        meals: {
            Foods: []
        }
    }
    for (let i = 1; i < collection.length; i++) {
        if (collection[i].innerHTML == !null) {
            day.meals.Foods.push(collection.innerHTML.toString())
        }
        fetch(`http://localhost:3000/diary/${idOfUser}/${day.date}`, {
            method: `POST`,
            body: JSON.stringify(day),
            headers: { 'Content-type': `application/json; charset=UTF-8` },
        })
            .then((response) => {
                if (response.status === 200 && response.status !== undefined) {
                    alert(`the daily eating saved successfully`);
                }
                else {
                    console.log(response.message)
                    alert("Sorry,something failed...")
                }
            })
    }
};

function deleteDay () {

    fetch(`http://localhost:3000/diary/${idOfUser}/${day.date}`, {
        method: `DELETE`,
        body: JSON.stringify(),
        headers: { 'Content-type': `application/json; charset=UTF-8` },
    })
        .then((response) => {
            if (response.status === 200 && response.status !== undefined) {
                alert(`the daily eating saved successfully`);
            }
            else {
                console.log(response.message)
                alert("Sorry,something failed...")
            }
        })
};  