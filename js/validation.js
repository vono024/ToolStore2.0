export function validateForm(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username.trim() === "" || password.trim() === "") {
        alert("Будь ласка, заповніть усі поля!");
        return false;
    }

    return true;
}
