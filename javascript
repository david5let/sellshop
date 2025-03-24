function updateCart() {
 
    const cartItemsContainer = document.getElementById("cart-items-container");
    const totalPriceElement = document.getElementById("total-price");
    const subtotalPriceElement = document.getElementById("subtotal-price");
    const taxPriceElement = document.getElementById("tax-price");
    const finalPriceElement = document.getElementById("final-price");


    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItemsContainer.innerHTML = "";  
    let totalPrice = 0; 
    let tax = 0;  

    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Корзина пуста.</p>";
        totalPriceElement.textContent = "0";
        subtotalPriceElement.textContent = "0";
        taxPriceElement.textContent = "0";
        finalPriceElement.textContent = "0";
        return;
    }


    cart.forEach((item, index) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <p>${item.name} - ${item.price} грн.</p>
            <button class="remove-btn" data-index="${index}">Удалить</button>
        `;
        cartItemsContainer.appendChild(itemElement);

        totalPrice += parseFloat(item.price);  
    });

    tax = totalPrice * 0.1;  
    const shippingPrice = 160;  
    const finalPrice = totalPrice + tax + (totalPrice > 0 ? shippingPrice : 0);


    totalPriceElement.textContent = totalPrice.toFixed(2);
    subtotalPriceElement.textContent = totalPrice.toFixed(2);
    taxPriceElement.textContent = tax.toFixed(2);
    finalPriceElement.textContent = finalPrice.toFixed(2);


    localStorage.setItem("cart", JSON.stringify(cart));
}


updateCart();
