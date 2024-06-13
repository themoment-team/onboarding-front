document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginButton = document.querySelector('.login-button');

    function updateButtonState() {
        const username = usernameInput.value;
        const password = passwordInput.value;

        if (username.length >= 2 && password.length >= 8) {
            loginButton.classList.add('active');
            loginButton.removeAttribute('disabled');
        } else {
            loginButton.classList.remove('active');
            loginButton.setAttribute('disabled', 'true');
        }
    }

    usernameInput.addEventListener('input', updateButtonState);
    passwordInput.addEventListener('input', updateButtonState);

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (loginButton.classList.contains('active')) {
            alert('로그인 성공');
        } else {
            alert('아이디와 비밀번호를 6자 이상 입력해주세요');
        }
    });
});
