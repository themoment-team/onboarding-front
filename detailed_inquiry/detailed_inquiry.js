document.addEventListener("DOMContentLoaded", function() {
    const editButton = document.getElementById("editBtn");
    const deleteButton = document.getElementById("deleteBtn");
    const pageTitle = document.querySelector(".page-title");
    const article = document.querySelector(".article");

    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    if(id === null) {pageTitle.textContent = "게시글 정보가 없습니다."; article.textContent="정보 없음";}

    const fetchPostsUrl = `https://ecc80d0f-16e2-4cee-80b9-b062890d4192.mock.pstmn.io/api/post/${id}`;

    // fetch를 사용한 게시글 요청
    fetch(fetchPostsUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((post) => {
            pageTitle.textContent = post.title;
            article.textContent = post.content;
            console.log("게시글:", post);
        })
        .catch((error) => {
            console.error("게시글 요청 에러:", error,fetchPostsUrl);
        });

    const detailsButton = document.getElementById("details");
    const dropdown = document.createElement("div");
    dropdown.className = "dropdown-content";
    dropdown.innerHTML = `
        <button id="editBtn">수정</button>
        <button id="deleteBtn">삭제</button>
    `;
    detailsButton.parentNode.insertBefore(dropdown, detailsButton.nextSibling);


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
            // 삭제 로직을 추가하세요.
            alert("게시물이 삭제되었습니다.");
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
});
function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
        && typeof document.createRange != "undefined") {
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

document.getElementById('comment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let commentText = document.getElementById('comment-text').value;
    if (commentText.trim() !== "") {
        commentText = commentText.replaceAll("\n","<br>");
        const commentList = document.getElementById('comment-list');
        const newComment = document.createElement('div');
        newComment.classList.add('comment');
        newComment.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="12" fill="black"/>
            </svg>
            <span class="userName">MY</span>
            <p>${commentText}</p>`;
        commentList.appendChild(newComment);

        document.getElementById('comment-text').value = "";

        const textarea = document.getElementById('comment-text');
        textarea.style.height = "50px";
        const charCount = document.getElementById('char-count');
        charCount.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const textarea = document.getElementById('comment-text');
    const charCount = document.getElementById('char-count');
    const initialHeight = textarea.clientHeight;

    function autoResize() {
        textarea.style.height = "50px";
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    function handleExcessCharacters() {
        const commentText = textarea.value;

        if (commentText.length > 100) {
            textarea.value = commentText.slice(0, 100);
        }
    }

    function updateCharCount() {
        const remaining = 100 - textarea.value.length;
        const currentHeight = textarea.clientHeight;

        if (currentHeight > initialHeight || textarea.value.includes('\n')) {
            charCount.textContent = `${remaining}`;
            charCount.style.display = 'block';
        } else {
            charCount.style.display = 'none';
        }
    }

    textarea.addEventListener('input', autoResize);
    textarea.addEventListener('input', handleExcessCharacters);
    textarea.addEventListener('input', updateCharCount);

    autoResize();
    updateCharCount();
});

document.addEventListener("DOMContentLoaded", function() {
    const commentText = document.getElementById("comment-text");
    const charCount = document.getElementById("char-count");
    const maxChars = 100;
    const initialHeight = commentText.clientHeight;

    commentText.addEventListener("input", function() {
        const textLength = commentText.value.length;
        charCount.textContent = maxChars - textLength;

        if (textLength > maxChars) {
            commentText.classList.add("excess");
        } else {
            commentText.classList.remove("excess");
        }

        if (commentText.scrollHeight > initialHeight) {
            charCount.style.display = "block";
        } else {
            charCount.style.display = "none";
        }
    });
});

let heartClicked = false;
document.getElementById('heart-button').addEventListener('click', function() {
    const heartCount = document.getElementById('heart-count');
    const currentCount = parseInt(heartCount.textContent);

    if (!heartClicked) {
        heartCount.textContent = currentCount + 1;
        this.classList.add('active');
    } else {
        heartCount.textContent = currentCount - 1;
        this.classList.remove('active');
    }
    heartClicked = !heartClicked;
});

// 이전화면으로 이동
const previous = document.querySelector("#prvBtn");

previous.addEventListener('click', function(){
    history.back();
});