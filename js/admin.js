import tools from "./data.js";

let products = JSON.parse(localStorage.getItem("products")) || [...tools];

const form = document.getElementById("add-product-form");
const tableBody = document.querySelector(".admin-table tbody");

function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}

function renderProductTable() {
    tableBody.innerHTML = "";
    products.forEach((product) => {
        const row = document.createElement("tr");

        row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>${product.price} грн</td>
      <td>
        <button class="admin-btn" onclick="deleteProduct(${product.id})">Видалити</button>
      </td>
    `;

        tableBody.appendChild(row);
    });
}

window.deleteProduct = function (id) {
    products = products.filter(p => p.id !== id);
    saveProducts();
    renderProductTable();
};

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector('input[name="name"]').value.trim();
    const category = form.querySelector('input[name="category"]').value.trim();
    const price = form.querySelector('input[name="price"]').value.trim();
    const description = form.querySelector('textarea[name="description"]').value.trim();
    const fileInput = form.querySelector('input[type="file"]');

    if (!name || !category || !price || !fileInput.files[0]) {
        alert("Заповніть всі поля та виберіть зображення");
        return;
    }

    const imagePath = "../assets/images/" + fileInput.files[0].name;

    const newProduct = {
        id: Date.now(),
        name,
        category,
        price: parseInt(price),
        image: imagePath,
        description
    };

    products.push(newProduct);
    saveProducts();
    renderProductTable();
    form.reset();
});

document.addEventListener("DOMContentLoaded", renderProductTable);
