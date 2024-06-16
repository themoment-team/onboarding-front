document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const newpasswordInput = document.getElementById("newpassword");
    const nextBtn = document.getElementById("next");
    const loginBtn = document.getElementById("login");
    const signupBtn = document.getElementById("signup");
    const result1 = document.getElementById("result1");
    const result2 = document.getElementById("result2");
    const logo = document.querySelector("h1");
    
    logo.addEventListener('click', function(){
        window.location.href("/");
    });
    
    function btnColor() {
        const passwordValue = passwordInput.value;
        const newpasswordValue = newpasswordInput.value;

        if (passwordValue !== "" && newpasswordValue !== "") {
            nextBtn.style.color = "white";
            nextBtn.style.background = "var(--Main, #3269F6)";
        } else {
            nextBtn.style.color = "white";
            nextBtn.style.background = "var(--gray1, #D1D1D1)";
        }
    }

    function passwordCheck(password) {
        const hasLetter = /[A-Za-z]/.test(password);
        const hasDigit = /\d/.test(password);
        const hasSpecialChar = /[@$!%*?&]/.test(password);
        const isValidLength = password.length >= 8;

        return isValidLength && (
            (hasLetter && hasDigit) || 
            (hasLetter && hasSpecialChar) || 
            (hasDigit && hasSpecialChar)
        );
    }

    function validatePassword() {
        const passwordValue = passwordInput.value.trim();

        if (!passwordCheck(passwordValue)) {
            result1.innerText = "영문, 숫자, 특수문자 중 2개 이상 포함한 8글자 이상의 조합으로 적어주세요";
            result1.style.color = "#DF454A";
            return false;
        } else {
            result1.innerText = "비밀번호 조건을 만족합니다.";
            result1.style.color = "green";
            return true;
        }
    }

    function checkPassword() {
        const newpasswordValue = newpasswordInput.value;
        const confirmPasswordValue = passwordInput.value;

        validatePassword(); // 비밀번호 조건 검사를 이 위치로 이동

        if (newpasswordValue === confirmPasswordValue && newpasswordValue !== "") {
            result2.innerText = '비밀번호가 일치합니다.';
            result2.style.color = "green";
            newpasswordInput.style.borderColor = "green";
            passwordInput.style.borderColor = "green";
            return true;
        } else if (newpasswordValue !== "" && confirmPasswordValue !== "") {
            result2.innerText = '비밀번호가 일치하지 않습니다.';
            result2.style.color = "#DF454A";
            newpasswordInput.style.borderColor = "#DF454A";
            passwordInput.style.borderColor = "#DF454A";
            return false;
        } else {
            result2.innerText = '';
            newpasswordInput.style.borderColor = "";
            passwordInput.style.borderColor = "";
            return false;
        }
    }

    function changePassword(event) {
        event.preventDefault();

        const isPasswordValid = validatePassword();
        const isPasswordMatch = checkPassword();

        if (!isPasswordValid || !isPasswordMatch) {
            return;
        }

        const newpasswordValue = newpasswordInput.value;

        fetch(`user/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                password: newpasswordValue
            }),
        })
        .then(response => {
            if (response.ok) {
                window.location.href = "/signin";
            } else {
                return response.json().then(error => { throw new Error(error.message); });
            }
        })
        .catch(error => console.error('Error:', error));
    }

    function redirectToLogin() {
        window.location.href = "/signin";
    }

    function redirectToSignup() {
        window.location.href = "/signup";
    }

    nextBtn.addEventListener("click", changePassword);
    document.getElementById("nextform").addEventListener("submit", changePassword);
    passwordInput.addEventListener("input", btnColor);
    newpasswordInput.addEventListener("input", btnColor);
    passwordInput.addEventListener("input", validatePassword);
    newpasswordInput.addEventListener("input", checkPassword);
    passwordInput.addEventListener("input", checkPassword);
    newpasswordInput.addEventListener("input", checkPassword);

    loginBtn.addEventListener("click", redirectToLogin);
    signupBtn.addEventListener("click", redirectToSignup);

    btnColor();
    validatePassword(); 
});
