const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '071fae810amshb706a2052da6b94p190cadjsnf53c140ff392',
        'X-RapidAPI-Host': 'calorieninjas.p.rapidapi.com'
    }
};
function getNutritionalValues(){
    const food = document.getElementById('nutritionalValues').value;
    fetch(`https://calorieninjas.p.rapidapi.com/v1/nutrition?query=${food}`, options)
    .then(response => response.json())
    .then(response => drew(response.items[0]))
    .catch(err => console.error(err));
}
 function drew(food){
    let table = '';
    table+=`
    <tr class= "item">
    <td>${food.name}</td>
    <td>${food.calories}</td>
    <td>${food.cholesterol_mg}</td>
    <td>${food.sugar_g}</td>
    <td>${food.fiber_g}</td>
    <td>${food.serving_size_g}</td>
    <td>${food.sodium_mg}</td>
    <td>${food.potassium_mg}</td>
    <td>${food.fat_saturated_g}</td>
    <td>${food.fat_total_g}</td>
    <td>${food.protein_g}</td>
    <td>${food.carbohydrates_total_g}</td>
    </tr> `
    const container = document.querySelector('.foodTable')
    container.innerHTML +=table;
}