// Hardkodovani korisnici za testiranje
const users = [
    { username: "user1", password: "password1", email: "user1@example.com" },
    { username: "user2", password: "password2", email: "user2@example.com" },
];

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const loginError = document.getElementById("login-error");
const registerError = document.getElementById("register-error");
const registerSuccess = document.getElementById("register-success");

// Login funkcija
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Provera da li korisnik postoji
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Uspešna prijava - spremamo korisničko ime u localStorage
        localStorage.setItem("currentUser", username);
        window.location.href = "index.html"; // Preusmeravamo na glavnu stranicu
    } else {
        // Prikazivanje greške
        loginError.style.display = "block";
    }
});

// Registracija funkcija
registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("reg-email").value.trim();
    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value.trim();

    // Validacija emaila
    if (!email.includes("@")) {
        registerError.textContent = "Invalid email address.";
        registerError.style.display = "block";
        return;
    }

    // Validacija lozinke
    if (password.length < 8 || !/[a-zA-Z]/.test(password)) {
        registerError.textContent = "Password must be at least 8 characters long and contain at least one letter.";
        registerError.style.display = "block";
        return;
    }

    // Provera da li korisnik već postoji
    const userExists = users.some(user => user.username === username || user.email === email);
    if (userExists) {
        registerError.textContent = "Username or email already exists.";
        registerError.style.display = "block";
        return;
    }

    // Dodavanje novog korisnika
    users.push({ username, password, email });
    registerError.style.display = "none";
    registerSuccess.style.display = "block";

    // Resetovanje forme
    registerForm.reset();
});
