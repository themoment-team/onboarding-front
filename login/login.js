document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginButton = document.querySelector('.login-button');
    const togglePasswordButton = document.getElementById('togglePassword');
    const showPasswordIcon = document.getElementById('showPassword');
    const hidePasswordIcon = document.getElementById('hidePassword');

    function updateButtonState() {
        const username = usernameInput.value;
        const password = passwordInput.value;

        if (username.length >= 2 && username.length <= 15 && password.length >= 8) {
            loginButton.classList.add('active');
            loginButton.removeAttribute('disabled');
        } else {
            loginButton.classList.remove('active');
            loginButton.setAttribute('disabled', 'true');
        }
    }

    usernameInput.addEventListener('input', updateButtonState);
    passwordInput.addEventListener('input', updateButtonState);

    togglePasswordButton.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        if (type === 'text') {
            showPasswordIcon.style.display = 'inline';
            hidePasswordIcon.style.display = 'none';
        } else {
            showPasswordIcon.style.display = 'none';
            hidePasswordIcon.style.display = 'inline';
        }
    });

    loginForm.addEventListener("submit", (event) => {
        const loginData = {
            name: usernameInput.value,
            password: passwordInput.value,
        };

        const loginUrl = "http://localhost:8080/api/user/login";

        fetch(loginUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text();
        })
        .then((data) => {
            console.log("로그인 성공:", data);
            window.location.href = "/main";
        })
        .catch((error) => {
            console.error("로그인 에러:", error);
        });

        event.preventDefault();
    });
});



