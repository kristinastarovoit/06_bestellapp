function init() {
    renderAllDishes();
    renderCart();
    updateCartState();
    showMobileCartAmount();
}

function renderAllDishes() {
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

function addOneItemToCart(indexDish) {
    dishes[indexDish].amount++;
    toggleCartButtonAmount(indexDish);
    updateCartState();
    renderCart();
    toggleHighlightedMobileCart();
    showMobileCartAmount();
}

function removeOneItemFromCart(indexDish) {
    dishes[indexDish].amount--;
    if (dishes[indexDish].amount < 0) {
        dishes[indexDish].amount = 0;
    }
    console.log(dishes[indexDish].amount);
    toggleCartButtonAmount(indexDish);
    updateCartState();
    renderCart();
    toggleHighlightedMobileCart();
    showMobileCartAmount();
}

function deleteFromCart(indexDish) {
    dishes[indexDish].amount = 0;
    toggleCartButtonAmount(indexDish);
    updateCartState();
    renderCart();
    toggleHighlightedMobileCart();
    showMobileCartAmount();
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

function openDialog() {
    const dialogRef = document.getElementById('order_dialog');
    dialogRef.showModal();
    dialogRef.classList.add('opened');
    setTimeout(closeDialog, 2000)
}

function closeDialog() {
    const dialogRef = document.getElementById('order_dialog');
    dialogRef.close();
    dialogRef.classList.remove('opened');
    resetAllAmounts();
}

function resetAllAmounts() {
    emptyCart();
    updateCartState();
    renderCart();
    renderAllDishes();
    toggleHighlightedMobileCart();
    showMobileCartAmount();
}

function emptyCart() {
    for (let indexDish = 0; indexDish < dishes.length; indexDish++) {
        dishes[indexDish].amount = 0;
    }
}

function isAmountZero(element) {
    return element.amount === 0;
}

function updateCartState() {
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

function showCartMobile() {
    document.getElementById('cart_wrapper').style.display = 'flex';
}

function closeCartMobile() {
    document.getElementById('cart_wrapper').style.display = 'none';
}

function toggleHighlightedMobileCart() {
    const mobileCart = document.getElementById('mobile_cart_icon');
    if (dishes.every(isAmountZero) == false) {
        mobileCart.src = 'assets/icons/orange_cart.svg';
    } else {
        mobileCart.src = 'assets/icons/shopping_cart.svg';
    }
}

function showMobileCartAmount() {
    const cartAmountRef = document.getElementById('mobile_cart_amount_number');
    const mobileAmountDisplay = document.getElementById('mobile_cart_amount_wrapper');
    let totalCartAmount = 0;
    for (let indexDish = 0; indexDish < dishes.length; indexDish++) {
        totalCartAmount += dishes[indexDish].amount;
    }
    if (totalCartAmount === 0) {
        mobileAmountDisplay.classList.add('d_none');
    } else {
        mobileAmountDisplay.classList.remove('d_none');
        cartAmountRef.innerText = totalCartAmount;
    }
}

