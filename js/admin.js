import tools from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
    const adminProductList = document.getElementById("admin-product-list");

    if (adminProductList) {
        adminProductList.innerHTML = "";
        tools.forEach((tool, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${tool.name}</td>
                <td>${tool.price} грн</td>
                <td>
                    <button class="admin-btn" onclick="deleteProduct(${index})">Видалити</button>
                </td>
            `;
            adminProductList.appendChild(row);
        });
    }
});

function deleteProduct(index) {
    tools.splice(index, 1);
    alert("Товар видалено!");
    location.reload();
}
