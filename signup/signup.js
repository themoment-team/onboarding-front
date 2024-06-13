document.getElementById('registrationForm').addEventListener('input', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const submitBtn = document.getElementById('submitBtn');

    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    const isUsernameValid = /^[a-zA-Z0-9]+$/.test(username);
    
    // New password validation rule
    const hasLetter = /[A-Za-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);
    const isPasswordValid = password.length >= 8 && (
        (hasLetter && hasDigit) || 
        (hasLetter && hasSpecialChar) || 
        (hasDigit && hasSpecialChar)
    );
    
    const doPasswordsMatch = password === confirmPassword;

    if (!isUsernameValid) {
        document.getElementById('username').classList.add('error');
        usernameError.textContent = '아이디는 영문, 숫자만 사용할 수 있습니다.';
    } else {
        document.getElementById('username').classList.remove('error');
        usernameError.textContent = '';
    }

    if (!isPasswordValid) {
        document.getElementById('password').classList.add('error');
        passwordError.textContent = '비밀번호는 영문, 숫자, 특수문자 중 2개 이상 포함하여 8글자 이상이어야 합니다.';
        document.getElementById('confirmPassword').classList.add('error');
    } else {
        document.getElementById('password').classList.remove('error');
        passwordError.textContent = '';
        document.getElementById('confirmPassword').classList.remove('error');
    }

    if (!doPasswordsMatch) {
        document.getElementById('confirmPassword').classList.add('error');
        confirmPasswordError.textContent = '비밀번호가 일치하지 않습니다.';
    } else {
        document.getElementById('confirmPassword').classList.remove('error');
        confirmPasswordError.textContent = '';
    }

    if (isUsernameValid && isPasswordValid && doPasswordsMatch) {
        submitBtn.classList.add('active');
        submitBtn.disabled = false;
    } else {
        submitBtn.classList.remove('active');
        submitBtn.disabled = true;
    }
});

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('회원가입 완료');
});
