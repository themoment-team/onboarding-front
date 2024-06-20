const serverUrl =
  "https://port-0-onboarding-server-f02w2almh8gdgs.sel5.cloudtype.app/";

const logIn = document.querySelector("#login");
const signUp = document.querySelector("#signup");
const posting = document.querySelector("#posting");
const searchForm = document.querySelector("#searchForm");
const postList = document.querySelector("#post");
const logo = document.querySelector("h1");
const postsContainer = document.querySelector(".frame-6");
const profile = document.querySelector("#profile");
const allPosts = [];
let id = "";

document.addEventListener("DOMContentLoaded", () => {
  profile.addEventListener("click", () => {
    window.location.href = `/profile?id=${id}`;
  });

  checkLogin();
  fetchPosts();

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = event.target.elements.search.value;
    searchPosts(query);
  });

  postList.addEventListener("click", () => {
    window.location.href = `/posts/?id=${id}`;
  });

  posting.addEventListener("click", () => {
    window.location.href = "/posts/write";
  });

  logIn.addEventListener("click", () => {
    window.location.href = "/login";
  });

  signUp.addEventListener("click", () => {
    window.location.href = "/signup";
  });

  logo.addEventListener("click", () => {
    window.location.href = "/";
  });
});

function checkLogin() {
  fetch(`${serverUrl}api/user`, { credentials: "include" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      logIn.classList.add("hidden");
      signUp.classList.add("hidden");
      posting.classList.remove("hidden");
      id = data.id;
    })
    .catch((error) => {
      console.error(error);
      posting.classList.add("hidden");
      logIn.classList.remove("hidden");
      signUp.classList.remove("hidden");
    });
}

function fetchPosts() {
  fetch(`${serverUrl}api/post`, { credentials: "include" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      allPosts = data.map((post) => ({
        id: post.id,
        title: post.title,
        author: post.author,
        content: post.content,
        counting: post.counting,
        likes: post.likes,
      }));
      createPostElements(allPosts);
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
}

function searchPosts(query) {
  if (!query.trim()) {
    alert("검색 결과가 없습니다");
    return;
  }

  const filteredPosts = allPosts.filter((post) => {
    return (
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase())
    );
  });

  createPostElements(filteredPosts);
}

function createPostElements(posts) {
  postsContainer.innerHTML = "";

  posts.forEach((post) => {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");

    const titleElement = document.createElement("h2");
    titleElement.textContent = post.title;
    titleElement.classList.add("text-wrapper-6");

    const authorElement = document.createElement("p");
    authorElement.classList.add("text-wrapper-7");
    authorElement.innerHTML = `
      <svg class="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <g clip-path="url(#clip0_2013_976)">
          <rect width="24" height="24" rx="12" fill="#CBCCCE"/>
          <path d="M12.5 15C15.1244 15 17.25 12.8744 17.25 10.25C17.25 7.62562 15.1244 5.5 12.5 5.5C9.87563 5.5 7.75 7.62562 7.75 10.25C7.75 12.8744 9.87563 15 12.5 15ZM12.5 17.375C9.32937 17.375 3 18.9662 3 22.125V23.3125C3 23.9656 3.53438 24.5 4.1875 24.5H20.8125C21.4656 24.5 22 23.9656 22 23.3125V22.125C22 18.9662 15.6706 17.375 12.5 17.375Z" fill="white"/>
        </g>
        <defs>
          <clipPath id="clip0_2013_976">
            <rect width="24" height="24" rx="12" fill="white"/>
          </clipPath>
        </defs>
      </svg>${post.author}`;

    const contentElement = document.createElement("p");
    contentElement.textContent = post.content;
    contentElement.classList.add("p");

    const counting = document.createElement("div");
    counting.textContent = `${post.counting}회 조회`;
    counting.classList.add("text-wrapper-8");

    const like = document.createElement("div");
    like.innerHTML = `
      <svg class="heart-streamline" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <g clip-path="url(#clip0_2013_1031)">
          <path d="M8.00496 14.152L1.74854 8.48496C-1.6517 5.08472 3.34664 -1.44373 8.00496 3.83796C12.6632 -1.44373 17.639 5.10739 14.2614 8.48496L8.00496 14.152Z" stroke="#B4B5B7" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
          <clipPath id="clip0_2013_1031">
            <rect width="16" height="16" fill="white"/>
          </clipPath>
        </defs>
      </svg>${post.likes}`;
    like.classList.add("text-wrapper-8");

    postDiv.appendChild(titleElement);
    postDiv.appendChild(authorElement);
    postDiv.appendChild(contentElement);
    postDiv.appendChild(counting);
    postDiv.appendChild(like);

    postsContainer.appendChild(postDiv);
  });
}
