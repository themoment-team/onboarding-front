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
