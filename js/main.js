import tools from "./data.js";
import { addToCart } from "./cart.js";

const customTools = JSON.parse(localStorage.getItem("customTools")) || [];
const allTools = [...tools, ...customTools];

document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    if (productList) {
        renderProductList(allTools);
    }
});

function renderProductList(productArray) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    productArray.forEach(tool => {
        const card = document.createElement("div");
        card.className = "product";
        card.innerHTML = `
            <img src="${tool.image}" alt="${tool.name}">
            <h3>${tool.name}</h3>
            <p>${tool.description}</p>
            <p class="price">${tool.price} грн</p>
            <button onclick="addToCart(${tool.id})">Додати в корзину</button>
        `;
        productList.appendChild(card);
    });
}

window.searchProducts = function () {
    const query = document.getElementById("search").value.toLowerCase();
    const filtered = allTools.filter(tool => tool.name.toLowerCase().includes(query));
    renderProductList(filtered);
};

window.addToCart = addToCart;
