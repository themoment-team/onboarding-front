document.addEventListener('DOMContentLoaded', (event) => {
    const title = document.querySelector("#title");
    const detail = document.querySelector("#detail");
    const postBtn = document.querySelector("#post");
    const previousBtn = document.querySelector("#previous");
    const postForm = document.querySelector("#postForm"); 
    const logo = document.querySelector("h1");
    const profile = document.querySelector("#profile");
    let userId = "";

    if (profile) {
        profile.addEventListener("click", function() {
            window.location.href = `/profile?id=${userId}`;
        });
    }

    if (logo) {
        logo.addEventListener('click', function() {
            window.location.href = "/";
        });
    }

    function btnColor() {
        if (title && detail) {
            if (title.value !== "" && detail.value !== "") {
                postBtn.style.removeProperty('background');
                postBtn.style.removeProperty('color');
                postBtn.style.color = "white";
                postBtn.style.background = "var(--Main, #3269F6)";
            } else {
                postBtn.style.removeProperty('background');
                postBtn.style.removeProperty('color');
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
        previousBtn.addEventListener('click', function() {
            history.back();
        });
    }

    if (postForm) {
        postForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const data = {
                title: title ? title.value : "",
                content: detail ? detail.value : ""
            };

            fetch("/api/post/write", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response)
            .catch((error) => {
                console.error(error);
            });
        });
    }

    function getUserId() {
        fetch("/api/login")
            .then(response => response.json())
            .then(data => {
                userId = data.id;
            })
            .catch(error => console.error(error));
    }

    getUserId();
});
