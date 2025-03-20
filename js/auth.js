import { validateForm } from "./validation.js";

document.getElementById("login-form").addEventListener("submit", (event) => {
    if (validateForm(event)) {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === "admin" && password === "12345") {
            document.cookie = "admin=loggedin; path=/";
            alert("Авторизація успішна!");
            window.location.href = "admin.html";
        } else {
            alert("Невірний логін або пароль!");
        }
    }
});
