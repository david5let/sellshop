document.addEventListener("DOMContentLoaded", function () {
    function updateCart() {
        const cartItemsContainer = document.getElementById("cart-items") || document.getElementById("cart-items-container");
        const totalPriceElement = document.getElementById("total-price");
        const subtotalPriceElement = document.getElementById("subtotal-price");
        const taxPriceElement = document.getElementById("tax-price");
        const finalPriceElement = document.getElementById("final-price");

        if (!cartItemsContainer || !totalPriceElement) {
            console.error("Ошибка: не найдены элементы корзины.");
            return;
        }

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartItemsContainer.innerHTML = ""; // Очистим содержимое корзины на странице
        let totalPrice = 0;
        let tax = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Корзина пуста.</p>";
            totalPriceElement.textContent = "0";
            if (subtotalPriceElement) subtotalPriceElement.textContent = "0";
            if (taxPriceElement) taxPriceElement.textContent = "0";
            if (finalPriceElement) finalPriceElement.textContent = "0";
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
        if (subtotalPriceElement) subtotalPriceElement.textContent = totalPrice.toFixed(2);
        if (taxPriceElement) taxPriceElement.textContent = tax.toFixed(2);
        if (finalPriceElement) finalPriceElement.textContent = finalPrice.toFixed(2);

        // Сохраняем актуальную корзину в localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Обработчик для кнопки "Подтвердить оплату"
    document.getElementById("confirm-payment").addEventListener("click", function () {
        // Очистить корзину в localStorage
        localStorage.removeItem("cart");

        // Обновляем корзину на странице
        updateCart();

        // Скрываем форму оплаты и показываем сообщение об успешной оплате
        document.getElementById("card-form").style.display = "none";
        document.getElementById("successMessage").style.display = "block";
    });

    // Обработчик для удаления товара из корзины
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-btn")) {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const index = event.target.getAttribute("data-index");
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCart(); // Обновляем корзину после удаления товара
        }
    });

    // Обработчик для кнопки оформления заказа
    const checkoutBtn = document.getElementById("checkout-btn");
    const orderForm = document.getElementById("order-form");
    const cartSection = document.querySelector(".cart");

    checkoutBtn.addEventListener("click", function () {
        if (cartSection) cartSection.classList.add("hidden");
        if (orderForm) orderForm.classList.remove("hidden");
    });

    // Вызов функции для отображения корзины при загрузке страницы
    updateCart();
});
