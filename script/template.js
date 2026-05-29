function getDishTemplate(indexDish) {
    return `<div class="dish_content">
            <div class="dish_img_text">
                <img class="dish_img" src="assets/img/${dishes[indexDish].src}">
                <div id="dish_description_${indexDish}" class="dish_text">
                    <h3>${dishes[indexDish].name}</h3>
                    <p class="dish_description">${dishes[indexDish].description}</p>
                </div>
            </div>
            <div class="dish_price_cart">
                <p class="dish_price">${formatToCurrency(dishes[indexDish].price)}</p>
                <button class="basket_button" id="basket_button_${indexDish}" onclick="addOneItemToCart(${indexDish})">Add to basket</button>
            </div>
            </div>
            <div>
            <button onclick="removeOneItemFromCart(${indexDish})">minus</button>
            <button onclick="addOneItemToCart(${indexDish})">plus</button>
        </div>`
}

function getCartTemplate(indexDish) {
    return `<p>${dishes[indexDish].amount} x ${dishes[indexDish].name}</p>
                <div class="cart_item_footer">
                    <div class="cart_item_quantity">
                        <button onclick="deleteFromCart(${indexDish})">delete</button>
                        <button onclick="removeOneItemFromCart(${indexDish})">Minus</button>
                        <p>${dishes[indexDish].amount}</p>
                        <button onclick="addOneItemToCart(${indexDish})">Plus</button>
                    </div>
                    <p class="cart_item_price" id="calculated_price_${indexDish}"></p>
                </div>`
}

function getCartTotalTemplate() {
    return `<div class="price_row">
                <p>Subtotal</p>
                <p id="subtotal">Preis</p>
            </div>
            <div class="price_row">
                <p>Delivery Fee</p>
                <p>4,99 €</p>
            </div>
            <hr>
            <div class="price_row price_total">
                <p>Total</p>
                <p id="total"></p>
            </div>
            <button class="buy_button">Buy now (${formatToCurrency(calculateTotal())})</button>`
}