let dishes = [
    {
        "name": "Pizza Margherita",
        "price": 11.90,
        "description": "Tomato Sauce, Mozzarella",
        "category": "pizza",
        "src": "pizza_margherita.jpg",
        "amount": 0
    },
    {
        "name": "Pizza Chorizo",
        "price": 13.90,
        "description": "Tomato slices, Mozzarella, Chorizo",
        "category": "pizza",
        "src": "pizza_chorizo.jpg",
        "amount": 0
    },
    {
        "name": "Pizza Funghi",
        "price": 12.90,
        "description": "Red onion, Olives, Button Mushrooms, Mozzarella",
        "category": "pizza",
        "src": "pizza_funghi.jpg",
        "amount": 0
    },
    {
        "name": "Quattro Formaggi with Chicken",
        "price": 15.90,
        "description": "Chicken, Mozzarella, Gorgonzola, Fontina,  Parmigiano Reggiano",
        "category": "pizza",
        "src": "pizza_quattro.jpg",
        "amount": 0
    },
    {
        "name": "Warm beef arugula salad",
        "price": 16.90,
        "description": "Beef, Arugula, Field salad, Greek feta, Cherry tomatoes, Sun-dried Tomatoes, Balsamic-vinegar dressing",
        "category": "salad",
        "src": "salad_arugula.jpg",
        "amount": 0
    },
    {
        "name": "Mini green Salad",
        "price": 7.90,
        "description": "Green salad, Cucumber, Carrots, Parsley, Radishes ",
        "category": "salad",
        "src": "salad_minigreen.jpg",
        "amount": 0
    },
    {
        "name": "Green Salad with sea food",
        "price": 16.90,
        "description": "Mixed greens, Cherry tomatoes, Red onion, Mussels, Squid rings, Shrimp, Dijon mustard-lemon dressing with dill",
        "category": "salad",
        "src": "salad_seafood.jpg",
        "amount": 0
    },
    {
        "name": "Vegan green salad with tofu",
        "price": 14.90,
        "description": "Green salad, Cherry tomatoes, Cucumber, Baby spinach, Edamame, Radishes, Bittercress, Tofu, Peanuts",
        "category": "salad",
        "src": "salad_tofu.jpg",
        "amount": 0
    },
    {
        "name": "Veggie mushroom black burger",
        "price": 16.90,
        "description": "Mixed green salad, Tomatoes, Edamame, Mushrooms",
        "category": "burger",
        "src": "burger_veggie.jpg",
        "amount": 0
    },
    {
        "name": "All meat burger",
        "price": 15.90,
        "description": "Beef, Bacon, Dill pickles, Smoked cheese, Ketchup, BBQ souse",
        "category": "burger",
        "src": "burger_allmeat.jpg",
        "amount": 0
    },
    {
        "name": "Beef red burger",
        "price": 14.90,
        "description": "Beef, Cheese, Tomatoes, Lettuce, Onion",
        "category": "burger",
        "src": "burger_red.jpg",
        "amount": 0
    },
    {
        "name": "Big chicken burger",
        "price": 15.90,
        "description": "Chicken, Cheese, Tomatoes, Lettuce, Onion, Bell pepper",
        "category": "burger",
        "src": "burger_chicken.jpg",
        "amount": 0
    },

]

function init() {
    renderallDishes();
}

function renderallDishes() {
    renderCategoryDishes('burger_content', "burger");
    renderCategoryDishes('pizza_content', "pizza");
    renderCategoryDishes('salad_content', "salad");
}

function renderCategoryDishes(contentId, categoryName) {
    let dishRef = document.getElementById(contentId);
    dishRef.innerHTML = '';
    for (let indexDish = 0; indexDish < dishes.length; indexDish++) {
        if (dishes[indexDish]["category"] == categoryName) {
            dishRef.innerHTML += getDishTemplate(indexDish);
        }
    }
}

function addToCart(indexDish) {
    dishes[indexDish].amount = dishes[indexDish].amount +1;
    return dishes[indexDish].amount;
    console.log(dishes[indexDish].amount);
    
}

function getDishTemplate(indexDish) {
    return `<div class="dish_content">
            <div class="dish_img_text">
                <img class="dish_img" src="assets/img/${dishes[indexDish].src}">
                <div class="dish_text">
                    <h3>${dishes[indexDish].name}</h3>
                    <p>${dishes[indexDish].description}</p>
                </div>
            </div>
            <div class="dish_price_cart">
                <p class="dish_price">${dishes[indexDish].price.toLocaleString("de-DE", {style: "currency", currency: "EUR"})}</p>
                <button onclick="addToCart(${indexDish})">Add to basket</button>
            </div>
            </div>`
}