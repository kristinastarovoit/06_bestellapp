function init() {
    renderallDishes();
    renderCart();
    checkIfCartIsEmpty();
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
    toggleCartButtonAmount(indexDish);
    checkIfCartIsEmpty();
    renderCart();
}

function toggleCartButtonAmount(indexDish) {
    let cartButton = document.getElementById(`basket_button_${indexDish}`);
    let dishText = document.getElementById(`dish_description_${indexDish}`);
    if (dishes[indexDish].amount == 0) {
        dishText.classList.remove('move_dish_text');
        cartButton.classList.remove('orange_font');
        cartButton.innerText = `Add to Basket`;
    } else {
        dishText.classList.add('move_dish_text');
        cartButton.classList.add('orange_font');
        cartButton.innerText = `Added ${dishes[indexDish].amount}`;
    }
}

function removeOneItemFromCart(indexDish) {
    dishes[indexDish].amount--;
    if (dishes[indexDish].amount < 0) {
        dishes[indexDish].amount = 0;
    }
    console.log(dishes[indexDish].amount);
    toggleCartButtonAmount(indexDish);
    checkIfCartIsEmpty();
    renderCart();
}

function deleteFromCart(indexDish) {
    dishes[indexDish].amount = 0;
    toggleCartButtonAmount(indexDish);
    checkIfCartIsEmpty();
    renderCart();
}

function isAmountZero(element) {
    return element.amount === 0;
}

function checkIfCartIsEmpty() {
    const cartTotalRef = document.getElementById('cart_total_content');
    const cartEmptyText = document.getElementById('empty_cart');
    if (dishes.every(isAmountZero) == true) {
        cartTotalRef.classList.add('d_none');
        cartEmptyText.classList.remove('d_none');
    }
    else {
        cartTotalRef.classList.remove('d_none');
        cartEmptyText.classList.add('d_none');
    }
}

function renderCart() {
    const cartRef = document.getElementById('cart_item_content');
    cartRef.innerHTML = '';
    for (let indexDish = 0; indexDish < dishes.length; indexDish++) {
        if (dishes[indexDish].amount > 0) {
            cartRef.innerHTML += getCartTemplate(indexDish);
            calculateItemSum(indexDish);
        }
    }
    renderCartTotal();
}

function renderCartTotal() {
    const cartTotalRef = document.getElementById('cart_total_content');
    cartTotalRef.innerHTML = getCartTotalTemplate();
    const subtotalRef = document.getElementById('subtotal');
    const totalRef = document.getElementById('total');
    subtotalRef.innerText = formatToCurrency(calculateSubtotal());
    totalRef.innerText = formatToCurrency(calculateTotal());
}

function calculateItemSum(indexDish) {
    let priceItemRef = document.getElementById(`calculated_price_${indexDish}`);
    let newCalculatedPrice = dishes[indexDish].amount * dishes[indexDish].price;
    priceItemRef.innerText = formatToCurrency(newCalculatedPrice)
}

function calculateSubtotal() {
    let subtotal = 0;
    for (let indexDish = 0; indexDish < dishes.length; indexDish++) {
        subtotal += (dishes[indexDish].amount * dishes[indexDish].price);
    }
    return subtotal;
}

function calculateTotal() {
    let totalSum = calculateSubtotal() + 4.99;
    return totalSum;
}

function formatToCurrency(price) {
    return price.toLocaleString("de-DE", {
        style: "currency",
        currency: "EUR"
    });
}

function openDialog() {
    const dialogRef = document.getElementById('order_dialog');
    dialogRef.showModal();
    dialogRef.classList.add('opened');
    setTimeout('closeDialog()', 2000)
}

function closeDialog() {
    const dialogRef = document.getElementById('order_dialog');
    dialogRef.close();
    dialogRef.classList.remove('opened');
    resetAllAmounts();
}

function emptyCart() {
    for (indexDish = 0; indexDish < dishes.length; indexDish++) {
        dishes[indexDish].amount = 0;
    }
}

function resetAllAmounts() {
    emptyCart();
    checkIfCartIsEmpty();
    renderCart();
    renderallDishes();
}