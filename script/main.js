const logIn = document.querySelector("#login");
const signUp = document.querySelector("#signup");
const logOut = document.querySelector("#logout");
const posting = document.querySelector("#posting");
const searchForm = document.querySelector("#searchForm");
const postList = document.querySelector("#post");

const checkLogin = async () => {
    try {
        const response = await fetch("/signin");
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
        const response = await fetch(`/api/posts?search=${encodeURIComponent(query)}`);
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
    const displayMessage = posts.length === 0 ? '<h2>검색 결과가 없습니다</h2>' : '';
    postList.innerHTML = displayMessage;
    posts.forEach(post => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<h3>${post.title}</h3>
            <p>${post.content}</p>
            <div>${post.counting}회 조회 <img src="heart.png" alt="Heart">${post.likes}</div>`;
        postList.appendChild(listItem);
    });
    postList.classList.toggle("hidden", posts.length === 0);
};

searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = event.target.elements.search.value;
    await searching(query);
});

posting.addEventListener('click', () => {
    window.location.href = '/posts/write';
});

logIn.addEventListener('click', () => {
    window.location.href = '/login';
});

signUp.addEventListener('click', () => {
    window.location.href = '/users/signup';
});

logOut.addEventListener('click', (event) => {
    event.preventDefault();
    const userConfirmed = confirm("정말 로그아웃 하시겠습니까?");
    if (userConfirmed) {
        window.location.href = '/logout';
    }
});

searching();
