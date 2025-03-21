import tools from "./data.js";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function addToCart(id) {
    const tool = tools.find(item => item.id === id);
    if (tool) {
        cart.push(tool);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${tool.name} додано до корзини!`);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");

    if (cartItems && totalPrice) {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name} - ${item.price} грн</p>
                <button onclick="removeFromCart(${index})">Видалити</button>
            `;
            cartItems.appendChild(div);
            total += item.price;
        });

        totalPrice.textContent = `${total} грн`;
    }
});

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
};

window.checkout = function () {
    if (cart.length === 0) {
        alert("Корзина порожня!");
        return;
    }

    alert("Дякуємо за замовлення!");
    cart = [];
    localStorage.removeItem("cart");
    location.reload();
};
