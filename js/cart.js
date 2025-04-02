import tools from "./data.js";

let products = JSON.parse(localStorage.getItem("products")) || [...tools];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsContainer = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="no-results">Корзина порожня</p>`;
        totalPriceElement.textContent = "0 грн";
        return;
    }

    cart.forEach((product, index) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product");

        productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Категорія: ${product.category}</p>
      <p>Опис: ${product.description}</p>
      <p class="price">Ціна: ${product.price} грн</p>
      <button onclick="removeFromCart(${index})">Видалити</button>
    `;

        total += parseFloat(product.price);
        cartItemsContainer.appendChild(productCard);
    });

    totalPriceElement.textContent = `${total} грн`;
}

window.removeFromCart = function (index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
};

window.checkout = function () {
    if (cart.length === 0) {
        alert("Корзина порожня");
        return;
    }
    alert("Замовлення оформлено! Дякуємо!");
    cart = [];
    saveCart();
    renderCart();
};

document.addEventListener("DOMContentLoaded", renderCart);
