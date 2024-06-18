const logInForm = document.querySelector("#login-form");
const nextBtn = document.querySelector("#next");
const idInput = document.querySelector("#id");
const passwordInput = document.querySelector("#password");
const error = document.querySelector("#error");
const loginBtn = document.querySelector("#login");
const signupBtn = document.querySelector("#signup");
const logo = document.querySelector("h1");

function btnColor() {
    const id = idInput.value;
    const password = passwordInput.value;

    if (id !== "" && password !== "") {
        nextBtn.style.color = "white";
        nextBtn.style.background = "var(--Main, #3269F6)";
    } else {
        nextBtn.style.color = "white";
        nextBtn.style.background = "var(--gray1, #D1D1D1)";
    }
}

idInput.addEventListener("input", btnColor);
passwordInput.addEventListener("input", btnColor);

function logIn(event) {
    event.preventDefault();

    const id = idInput.value;
    const password = passwordInput.value;

    fetch("https://port-0-onboarding-server-f02w2almh8gdgs.sel5.cloudtype.app/api/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: id,
            password: password,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
                window.location.href = `/`;
        })
        .catch((error) => console.error(error));
            console.error(data.message);
            error.innerText = "아이디와 비밀번호를 다시 한 번 확인해주세요";
                idInput.style.border = "1px solid #DF454A";
                passwordInput.style.border = "1px solid #DF454A";
                error.style.color = "#DF454A";
}

loginBtn.addEventListener("click", function () {
    window.location.href = "/login";
});

signupBtn.addEventListener("click", function () {
    window.location.href = "users/signup";
});

nextBtn.addEventListener("click", logIn);
logInForm.addEventListener("submit", logIn);

logo.addEventListener('click', function () {
    window.location.href = "/";
});
