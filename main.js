const serverUrl =


const logIn = document.querySelector("#login");
const signUp = document.querySelector("#signup");
const posting = document.querySelector("#posting");
const searchForm = document.querySelector("#searchForm");
const postList = document.querySelector("#post");
const logo = document.querySelector("h1");
const postsContainer = document.querySelector(".frame-6");
const profile = document.querySelector("#profile");
let allPosts = [];
let id = "";
let postId = "";
const post = document.querySelector(".post");

post.addEventListener("click", function () {
  window.location.href = `/posts/${postId}`;
});

document.addEventListener("DOMContentLoaded", () => {


    });
}

function searchPosts(query) {
  if (!query.trim()) {
    alert("검색 결과가 없습니다");
    return;
  }

  const filteredPosts = allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase())
  );

  createPostElements(filteredPosts);
}

function createPostElements(posts) {
