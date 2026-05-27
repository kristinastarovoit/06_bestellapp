function init(){
    renderAllDishes();
}

function renderAllDishes() {
    let dishRef = document.getElementById('dish_content');
    dishRef.innerHTML = '';
    for (let indexDish = 0; indexDish < renderAllDishes.length; indexDish++) {
        dishRef.innerHTML += getDishTemplate();
    }
}

function getDishTemplate() {
    
}