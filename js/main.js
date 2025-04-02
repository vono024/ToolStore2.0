import tools from './data.js';

let products = JSON.parse(localStorage.getItem("products")) || [...tools];

const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");

function renderProducts(filteredProducts = products) {
    productList.innerHTML = "";

    if (filteredProducts.length === 0) {
        productList.innerHTML = '<p class="no-results">Товарів не знайдено</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product");

        productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Категорія: ${product.category}</p>
      <p>Опис: ${product.description}</p>
      <p class="price">Ціна: ${product.price} грн</p>
      <button onclick="addToCart(${product.id})">Додати в корзину</button>
    `;

        productList.appendChild(productCard);
    });
}

function addToCart(id) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = products.find(p => p.id === id);
    if (product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`"${product.name}" додано до корзини`);
    }
}

window.addToCart = addToCart;

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
    renderProducts(filtered);
});

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
});
