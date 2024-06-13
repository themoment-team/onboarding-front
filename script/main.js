const logIn = document.querySelector("#login");
const signUp = document.querySelector("#signup");
const posting = document.querySelector("#posting");
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#search");
const postList = document.querySelector("#post");

const checkLogin = async () => {
    try {
        const response = await fetch("http://172.30.1.1:8080/api/login");
        const data = await response.json();

        if (data.status === "success") {
            logIn.classList.add("hidden");
            signUp.classList.add("hidden");
            posting.classList.remove("hidden");
        } else {
            posting.classList.add("hidden");
        }
    } catch (error) {
        console.error('Error checking login status:', error);
    }
};

checkLogin();

const searching = async (query = '') => {
    try {
        const response = await fetch(`http://172.30.1.1:8080/api?search=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Error fetching posts');
        }
        const posts = await response.json();
        displayPosts(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        postList.innerHTML = `<h2>${error.message}</h2>`;
    }
};

const displayPosts = (posts) => {
    postList.innerHTML = '';
    if (posts.length === 0) {
        postList.innerHTML = '<h2>검색 결과가 없습니다</h2>';
        postList.classList.add("hidden");
    } else {
        posts.forEach(post => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<h3>${post.title}</h3>
            <p>${post.content}</p>
            <div>${post.counting}회 조회 <img src="heart.png" alt="Heart">${post.likes}</div>`;
            postList.appendChild(listItem);
        });
        postList.classList.remove("hidden");
    }
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = searchInput.value;
    searching(query);
});

posting.addEventListener('click', function() {
    window.location.href = '/posts/write';
});

logIn.addEventListener('click', function() {
    window.location.href = '/login';
});

signUp.addEventListener('click', function() {
    window.location.href = '/users/signup';
});

searching();
