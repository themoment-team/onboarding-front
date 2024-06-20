const hostURL =
    "https://port-0-onboarding-server-f02w2almh8gdgs.sel5.cloudtype.app";
const pageTitle = document.querySelector(".page-title");
const article = document.querySelector(".article");
const viewCount = document.querySelector("#view-count");
const likes = document.querySelector("#heart-count");
const commentList = document.getElementById("comment-list");
const details = document.querySelector("#details");
const writing = document.querySelector("#writing");
const myProfile = document.querySelector("#myProfile");
const heartBtn = document.querySelector("#heart-button");

let isLogined = false;
let user;
const fetchUserUrl = `${hostURL}/api/user`;
fetch(fetchUserUrl, { credentials: "include" }).then((response) => {
    if (response.ok) {
        response.json().then((userData) => {
            user = userData;
            isLogined = true;
        });
    } else {
        response.text().then((text) => console.log(text));
    }
});

const url = new URL(window.location.href);
const id = url.searchParams.get("id");
if (id === null) {
    pageTitle.textContent = "게시글 정보가 없습니다.";
    article.textContent = "정보 없음";
}

console.log(id);

let isPostLoading = true;
let post = {};
const fetchPostsUrl = `${hostURL}/api/post/${id}`;
const fetchCommentsUrl = `${hostURL}/api/post/${id}/comments`;

// fetch를 사용한 게시글 요청
fetch(fetchPostsUrl, { credentials: "include" })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((_post) => {
        post = _post;
        if (!isLogined || user.name !== post.author) {
            details.outerHTML = "";
            writing.outerHTML = "";
        }
        if (!isLogined) {
            myProfile.outerHTML = "";
            heartBtn.setAttribute("disabled", "true");
        }
        pageTitle.textContent = post.title;
        article.textContent = post.content;
        likes.textContent = post.likes;
        viewCount.textContent = post.viewCount;
        isPostLoading = false;
        console.log("게시글:", post);

        // 로컬 스토리지에서 좋아요 상태 불러오기
        let heartClicked =
            localStorage.getItem(`heartClicked_${id}`) === "true";
        if (heartClicked) {
            heartBtn.classList.add("active");
        }
    })
    .catch((error) => {
        console.error("게시글 요청 에러:", error, fetchPostsUrl);
    });

fetch(fetchCommentsUrl, { credentials: "include" })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((comments) => {
        comments.forEach((comment) => {
            const template = document.createElement("template");
            template.innerHTML = `<div class="comment">
                    <svg class="profile" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                        <g clip-path="url(#clip0_2202_235)">
                            <rect y="0.5" width="24" height="24" rx="12" fill="#CBCCCE" />
                            <path d="M12.5 15.5C15.1244 15.5 17.25 13.3744 17.25 10.75C17.25 8.12562 15.1244 6 12.5 6C9.87563 6 7.75 8.12562 7.75 10.75C7.75 13.3744 9.87563 15.5 12.5 15.5ZM12.5 17.875C9.32937 17.875 3 19.4662 3 22.625V23.8125C3 24.4656 3.53438 25 4.1875 25H20.8125C21.4656 25 22 24.4656 22 23.8125V22.625C22 19.4662 15.6706 17.875 12.5 17.875Z" fill="white" />
                        </g>
                        <defs>
                            <clipPath id="clip0_2202_235">
                                <rect y="0.5" width="24" height="24" rx="12" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <strong class="commentAuthor">${comment.author}</strong>
                    <p class="commentContent">${comment.content}</p>
                </div>`;
            commentList.appendChild(template.content.firstChild);
        });
        console.log("게시글:", comments);
    })
    .catch((error) => {
        console.error("게시글 요청 에러:", error);
    });

const detailsButton = document.getElementById("details");
const dropdown = document.createElement("div");
dropdown.className = "dropdown-content";
dropdown.innerHTML = `
    <button id="editBtn">수정</button>
    <button id="deleteBtn">삭제</button>
`;

detailsButton.parentNode.insertBefore(dropdown, detailsButton.nextSibling);

const editButton = document.getElementById("editBtn");
const deleteButton = document.getElementById("deleteBtn");

detailsButton.addEventListener("click", function () {
    const rect = detailsButton.getBoundingClientRect();
    dropdown.style.display =
        dropdown.style.display === "block" ? "none" : "block";
    dropdown.style.left = `${rect.right + window.scrollX}px`;
    dropdown.style.top = `${rect.top + window.scrollY}px`;
});

editButton.addEventListener("click", function () {
    const isEditing = pageTitle.contentEditable === "true";

    if (isEditing) {
        pageTitle.contentEditable = "false";
        article.contentEditable = "false";
        editButton.textContent = "수정";
        post.title = pageTitle.textContent;
        post.content = article.textContent;
        fetch(fetchPostsUrl, {
            method: "PATCH",
            body: JSON.stringify({
                title: post.title,
                content: post.content,
            }),
            credentials: "include",
        }).then((response) => {
            if (!response.ok) alert("게시글 수정에 실패했습니다.");
        });
    } else {
        pageTitle.contentEditable = "true";
        article.contentEditable = "true";
        editButton.textContent = "저장";
    }
    dropdown.style.display = "none";
});

pageTitle.addEventListener("input", () => {
    if (pageTitle.textContent.length > 15) {
        pageTitle.textContent = pageTitle.textContent.substring(0, 15);
        placeCaretAtEnd(pageTitle);
    }
});

article.addEventListener("input", () => {
    if (article.textContent.length > 500) {
        article.textContent = article.textContent.substring(0, 500);
        placeCaretAtEnd(article);
    }
});

deleteButton.addEventListener("click", function () {
    if (confirm("정말로 삭제하시겠습니까?")) {
        fetch(fetchPostsUrl, { method: "DELETE", credentials: "include" }).then(
            (response) => {
                if (!response.ok) alert("게시물 삭제 실패");
                else alert("게시물이 삭제되었습니다.");
            }
        );
    }
    dropdown.style.display = "none";
});

document.addEventListener("click", function (event) {
    if (
        !event.target.closest("#details") &&
        !event.target.closest(".dropdown-content")
    ) {
        dropdown.style.display = "none";
    }
});
function placeCaretAtEnd(el) {
    el.focus();
    if (
        typeof window.getSelection != "undefined" &&
        typeof document.createRange != "undefined"
    ) {
        let range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        let sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        let textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}

document
    .getElementById("comment-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        let commentText = document.getElementById("comment-text").value;
        if (!commentText) return;

        fetch(fetchCommentsUrl, {
            method: "POST",
            body: JSON.stringify({ content: commentText }),
            credentials: "include",
        })
            .then((response) => {
                if (response.ok) return response.json();
                else throw new Error("댓글 생성 실패");
            })
            .then((newComment) => {
                const template = document.createElement("template");
                template.innerHTML = `<div class="comment">
                        <svg class="profile" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <g clip-path="url(#clip0_2202_235)">
                                <rect y="0.5" width="24" height="24" rx="12" fill="#CBCCCE" />
                                <path d="M12.5 15.5C15.1244 15.5 17.25 13.3744 17.25 10.75C17.25 8.12562 15.1244 6 12.5 6C9.87563 6 7.75 8.12562 7.75 10.75C7.75 13.3744 9.87563 15.5 12.5 15.5ZM12.5 17.875C9.32937 17.875 3 19.4662 3 22.625V23.8125C3 24.4656 3.53438 25 4.1875 25H20.8125C21.4656 25 22 24.4656 22 23.8125V22.625C22 19.4662 15.6706 17.875 12.5 17.875Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_2202_235">
                                    <rect y="0.5" width="24" height="24" rx="12" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <strong class="commentAuthor">${newComment.author}</strong>
                        <p class="commentContent">${newComment.content}</p>
                    </div>`;
                commentList.appendChild(template.content.firstChild);
                document.getElementById("comment-text").value = "";
            })
            .catch((error) => console.error("댓글 요청 에러:", error));
    });

heartBtn.addEventListener("click", function () {
    const heartClicked = heartBtn.classList.contains("active");
    const method = heartClicked ? "DELETE" : "POST";
    fetch(`${fetchPostsUrl}/like`, {
        method: method,
        credentials: "include",
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("좋아요 요청 실패");
            }
            return response.json();
        })
        .then((data) => {
            heartBtn.classList.toggle("active");
            likes.textContent = data.likes;
            localStorage.setItem(`heartClicked_${id}`, !heartClicked);
        })
        .catch((error) => console.error("좋아요 요청 에러:", error));
});
