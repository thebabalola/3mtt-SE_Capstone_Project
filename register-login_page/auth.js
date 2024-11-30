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
    // Here you would typically send a request to your server to authenticate the user
    console.log('Login attempt', { email, password });
    
    // For demo purposes, we'll just set a token in localStorage
    localStorage.setItem('token', 'demo_token');
    alert('Login successful!');
    // Redirect to dashboard
    window.location.href = '/userdash_page/userdash.html';
}

function handleRegister(username, email, password, confirmPassword) {
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    // Here you would typically send a request to your server to register the user
    console.log('Register attempt', { username, email, password });
    
    // For demo purposes, we'll just set a token in localStorage
    localStorage.setItem('token', 'demo_token');
    alert('Registration successful!');
    // Redirect to dashboard
    window.location.href = '/userdash_page/userdash.html';
}