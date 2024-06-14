const logInForm = document.querySelector("#login-form");
const nextBtn = document.querySelector("#next");
const idInput = document.querySelector("#id");
const passwordInput = document.querySelector("#password");
const error = document.querySelector("#error");
const loginBtn = document.querySelector("#login");
const signupBtn = document.querySelector("#signup");

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

    fetch("/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            password: password,
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        if (data.status === "success") {
            window.location.href(`/user/${id}`);
        } else if (data.status === "error") {
            console.error(data.message);
            error.innerText = "아이디와 비밀번호를 다시 한 번 확인해주세요";
            idInput.style.border = "#DF454A";
            passwordInput.style.border = "#DF454A";
            error.style.color = "#DF454A";
        }
    })
    .catch((error) => console.error('Error:', error));
}

loginBtn.addEventListener("click", function(){
    window.location.href = "/signin";
});

signupBtn.addEventListener("click", function(){
    window.location.href = "/signup";
});
nextBtn.addEventListener("click", logIn);
logInForm.addEventListener("submit", logIn)


