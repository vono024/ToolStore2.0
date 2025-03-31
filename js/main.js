import tools from "./data.js";
import { addToCart } from "./cart.js";

const customTools = JSON.parse(localStorage.getItem("customTools")) || [];
const allTools = [...tools, ...customTools];

document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const searchInput = document.getElementById("search");

    if (productList) {
        renderProductList(allTools);
    }

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const query = searchInput.value.toLowerCase().trim();

            const filtered = allTools.filter(tool =>
                tool.name.toLowerCase().includes(query) ||
                tool.category.toLowerCase().includes(query) ||
                tool.description.toLowerCase().includes(query)
            );

            renderProductList(filtered);
        });
    }
});

function renderProductList(productArray) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    if (productArray.length === 0) {
        productList.innerHTML = `<p class="no-results">Нічого не знайдено 😕</p>`;
        return;
    }

    productArray.forEach(tool => {
        const card = document.createElement("div");
        card.className = "product";
        card.innerHTML = `
      <img src="${tool.image}" alt="${tool.name}">
      <h3>${tool.name}</h3>
      <p><strong>Категорія:</strong> ${tool.category}</p>
      <p><strong>Опис:</strong> ${tool.description}</p>
      <p class="price"><strong>Ціна:</strong> ${tool.price} грн</p>
      <button onclick="addToCart(${tool.id})">Додати в корзину</button>
    `;
        productList.appendChild(card);
    });
}

window.addToCart = addToCart;
