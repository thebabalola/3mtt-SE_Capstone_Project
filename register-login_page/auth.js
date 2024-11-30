document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            handleLogin(email, password);
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            handleRegister(username, email, password, confirmPassword);
        });
    }
});

function handleLogin(email, password) {
    // Simulating a successful login
    const user = {
        email: email,
        name: "User Name", // You would get this from your backend
        id: "user123" // You would get a unique ID from your backend
    };
    localStorage.setItem('user', JSON.stringify(user));
    alert('Login successful!');
    window.location.href = '/userdash_page/userdash.html';
}

function handleRegister(username, email, password, confirmPassword) {
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    // Simulating a successful registration
    const user = {
        email: email,
        name: username,
        id: "user" + Date.now() // Creating a unique ID
    };
    localStorage.setItem('user', JSON.stringify(user));
    alert('Registration successful!');
    window.location.href = '/userdash_page/userdash.html';
}