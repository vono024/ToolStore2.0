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

    if (cartItems) {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name} - ${item.price} грн</p>
                <button onclick="removeFromCart(${index})">Видалити</button>
            `;
            cartItems.appendChild(cartItem);
            total += item.price;
        });

        totalPrice.textContent = `${total} грн`;
    }
});

export function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

export function checkout() {
    alert("Замовлення оформлено!");
    localStorage.removeItem("cart");
    location.reload();
}
