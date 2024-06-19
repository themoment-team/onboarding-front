document.addEventListener("DOMContentLoaded", () => {
  const elements = {
    passwordInput: document.getElementById("password"),
    newpasswordInput: document.getElementById("newpassword"),
    nextBtn: document.getElementById("next"),
    loginBtn: document.getElementById("login"),
    signupBtn: document.getElementById("signup"),
    result1: document.getElementById("result1"),
    result2: document.getElementById("result2"),
    logo: document.querySelector("h1"),
    profile: document.querySelector("#profile"),
    nextForm: document.getElementById("nextform"),
  };

  let userId = "";

  const fetchUserId = async () => {
    try {
      const response = await fetch(
        "https://port-0-onboarding-server-f02w2almh8gdgs.sel5.cloudtype.app/api/user",
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      userId = data.id;
      validatePassword();
      updateNextBtnColor();
    } catch (error) {
      console.error("Failed to fetch user ID:", error);
    }
  };

  const updateNextBtnColor = () => {
    const { passwordInput, newpasswordInput, nextBtn } = elements;
    const isEnabled =
      passwordInput.value !== "" && newpasswordInput.value !== "";
    nextBtn.style.color = "white";
    nextBtn.style.background = isEnabled
      ? "var(--Main, #3269F6)"
      : "var(--gray1, #D1D1D1)";
  };

  const isPasswordValid = (password) => {
    const hasLetter = /[A-Za-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);
    const isValidLength = password.length >= 8;

    return (
      isValidLength &&
      ((hasLetter && hasDigit) ||
        (hasLetter && hasSpecialChar) ||
        (hasDigit && hasSpecialChar))
    );
  };

  const validatePassword = () => {
    const { passwordInput, result1 } = elements;
    const passwordValue = passwordInput.value.trim();

    if (!isPasswordValid(passwordValue)) {
      result1.innerText =
        "영문, 숫자, 특수문자 중 2개 이상 포함한 8글자 이상의 조합으로 적어주세요";
      result1.style.color = "#DF454A";
      return false;
    } else {
      result1.innerText = "비밀번호 조건을 만족합니다.";
      result1.style.color = "black";
      return true;
    }
  };

  const checkPasswordMatch = () => {
    const { passwordInput, newpasswordInput, result2 } = elements;
    const newpasswordValue = newpasswordInput.value;
    const confirmPasswordValue = passwordInput.value;

    if (newpasswordValue === confirmPasswordValue && newpasswordValue !== "") {
      result2.innerText = "비밀번호가 일치합니다.";
      result2.style.color = "black";
      newpasswordInput.style.borderColor = "black";
      passwordInput.style.borderColor = "black";
      return true;
    } else if (newpasswordValue !== "" && confirmPasswordValue !== "") {
      result2.innerText = "비밀번호가 일치하지 않습니다.";
      result2.style.color = "#DF454A";
      newpasswordInput.style.borderColor = "#DF454A";
      passwordInput.style.borderColor = "#DF454A";
      return false;
    } else {
      result2.innerText = "";
      newpasswordInput.style.borderColor = "";
      passwordInput.style.borderColor = "";
      return false;
    }
  };

  const changePassword = async (event) => {
    event.preventDefault();

    if (!validatePassword() || !checkPasswordMatch()) {
      return;
    }

    const { newpasswordInput } = elements;
    const newpasswordValue = newpasswordInput.value;

    try {
      const response = await fetch(
        `https://port-0-onboarding-server-f02w2almh8gdgs.sel5.cloudtype.app/api/user/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: newpasswordValue }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      window.location.href = "/login";
    } catch (error) {
      console.error("Failed to change password:", error);
    }
  };

  const addEventListeners = () => {
    const {
      passwordInput,
      newpasswordInput,
      nextBtn,
      nextForm,
      loginBtn,
      signupBtn,
      profile,
      logo,
    } = elements;

    const onInput = () => {
      updateNextBtnColor();
      validatePassword();
      checkPasswordMatch();
    };

    passwordInput.addEventListener("input", onInput);
    newpasswordInput.addEventListener("input", onInput);
    nextBtn.addEventListener("click", changePassword);
    nextForm.addEventListener("submit", changePassword);
    loginBtn.addEventListener(
      "click",
      () => (window.location.href = "/login/")
    );
    signupBtn.addEventListener(
      "click",
      () => (window.location.href = "/signup")
    );
    profile.addEventListener(
      "click",
      () => (window.location.href = `/profile?id=${userId}`)
    );
    logo.addEventListener("click", () => (window.location.href = "/"));
  };

  fetchUserId();
  addEventListeners();
});
