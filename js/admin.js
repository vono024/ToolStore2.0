import tools from "./data.js";

let customTools = JSON.parse(localStorage.getItem("customTools")) || [];

const allTools = [...tools, ...customTools];

document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("admin-product-list");
    if (list) renderTable();

    const form = document.getElementById("add-product-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const fileInput = document.getElementById("image");
            const file = fileInput.files[0];
            const reader = new FileReader();

            reader.onload = function (event) {
                const imageDataUrl = event.target.result;

                const newTool = {
                    id: Date.now(),
                    name: document.getElementById("name").value,
                    category: document.getElementById("category").value,
                    price: parseFloat(document.getElementById("price").value),
                    image: imageDataUrl,
                    description: document.getElementById("description").value
                };

                customTools.push(newTool);
                localStorage.setItem("customTools", JSON.stringify(customTools));

                form.reset();
                renderTable();
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        });
    }
});

function renderTable() {
    const list = document.getElementById("admin-product-list");
    list.innerHTML = "";

    [...tools, ...customTools].forEach((tool, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${tool.name}</td>
            <td>${tool.price} грн</td>
            <td>
                <button class="admin-btn" onclick="deleteProduct(${tool.id})">Видалити</button>
            </td>
        `;
        list.appendChild(row);
    });
}

window.deleteProduct = function(id) {
    customTools = customTools.filter(item => item.id !== id);
    localStorage.setItem("customTools", JSON.stringify(customTools));
    renderTable();
};
