import tools from "./data.js";
import { addToCart } from "./cart.js";

document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");

    if (productList) {
        tools.forEach(tool => {
            const productCard = document.createElement("div");
            productCard.classList.add("product");
            productCard.innerHTML = `
                <img src="${tool.image}" alt="${tool.name}">
                <h3>${tool.name}</h3>
                <p>${tool.description}</p>
                <p class="price">${tool.price} грн</p>
                <button onclick="addToCart(${tool.id})">Додати в корзину</button>
            `;
            productList.appendChild(productCard);
        });
    }
});
