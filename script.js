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
    renderCart();
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

function addOneItemToCart(indexDish) {
    dishes[indexDish].amount++;
    console.log(dishes[indexDish].amount);
    renderCart();
    // RENDER CART
}

function removeOneItemFromCart(indexDish) {
    dishes[indexDish].amount--;
    if (dishes[indexDish].amount < 0) {
        dishes[indexDish].amount = 0;
    }
    console.log(dishes[indexDish].amount);
    renderCart();
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
                <p class="dish_price">${dishes[indexDish].price.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</p>
                <button onclick="addOneItemToCart(${indexDish})">Add to basket</button>
            </div>
            </div>
            
            <div>
            <button onclick="removeOneItemFromCart(${indexDish})">minus</button>
            <button onclick="addOneItemToCart(${indexDish})">plus</button>
        </div>`
}

function renderCart() {
    const cartRef = document.getElementById('cart_item_content');
    cartRef.innerHTML = '';
    for (let indexDish = 0; indexDish < dishes.length; indexDish++) {
        if (dishes[indexDish].amount > 0) {
            cartRef.innerHTML += getCartTemplate(indexDish);
        }
    }
    renderCartTotal();
}

function getCartTemplate(indexDish) {
    return `<p class="cart_heading">Your Basket</p>
            <div class="cart_item_content" id="cart_item_content">
                <p>${dishes[indexDish].amount} x ${dishes[indexDish].name}</p>
                <div class="cart_item_footer">
                    <div class="cart_item_quantity">
                        <button>delete</button>
                        <button>Minus</button>
                        <p>${dishes[indexDish].amount}</p>
                        <button>Plus</button>
                    </div>
                    <p class="cart_item_price">Preis</p>
                </div>
            </div>`
}

function renderCartTotal() {
    const cartTotalRef = document.getElementById('cart_total_content');
    cartTotalRef.innerHTML = getCartTotalTemplate();
}

function getCartTotalTemplate() {
    return `    <div class="price_row">
                    <p>Subtotal</p>
                    <p>Preis</p>
                </div>
                <div class="price_row">
                    <p>Delivery Fee</p>
                    <p>Preis</p>
                </div>
                <br>
                <div class="price_row price_total">
                    <p>Total</p>
                    <p>Preis</p>
                </div>`
}

function calculateCartSubtotal() {
    let cartSubtotal = dishes[indexDish].amount * dishes[indexDish].price
}