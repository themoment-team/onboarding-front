document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector("#title");
    const detail = document.querySelector("#detail");
    const postBtn = document.querySelector("#post");
    const previousBtn = document.querySelector("#previous");
    const postForm = document.querySelector("#postForm");
    const logo = document.querySelector("h1");
    const profile = document.querySelector("#profile");
    let userId = "";

    const serverURL = "https://port-0-onboarding-server-f02w2almh8gdgs.sel5.cloudtype.app/"; 

    if (profile) {
        profile.addEventListener("click", () => {
            window.location.href = `$/profile?id=${userId}`;
        });
    }

    if (logo) {
        logo.addEventListener('click', () => {
            window.location.href = `/`;
        });
    }

    function btnColor() {
        if (title && detail) {
            if (title.value.trim() !== "" && detail.value.trim() !== "") {
                postBtn.style.color = "white";
                postBtn.style.background = "var(--Main, #3269F6)";
            } else {
                postBtn.style.color = "white";
                postBtn.style.background = "var(--gray1, #D1D1D1)";
            }
        }
    }

    if (title) {
        title.addEventListener('input', btnColor);
    }

    if (detail) {
        detail.addEventListener('input', btnColor);
    }

    if (previousBtn) {
        previousBtn.addEventListener('click', () => {
            history.back();
        });
    }

    if (postForm) {
        postForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const data = {
                title: title ? title.value : "",
                content: detail ? detail.value : ""
            };

            fetch(`${serverURL}api/post/write`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to submit post');
                }
                window.location.href = `/`;
            })
            .catch((error) => {
                console.error(error);
            });
        });
    }

    function getUserId() {
        fetch(`${serverURL}api/user`)
            .then(response => response.json())
            .then(data => {
                userId = data.id;
            })
            .catch(error => console.error(error));
    }

    getUserId();
});
