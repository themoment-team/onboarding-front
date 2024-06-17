document.addEventListener('DOMContentLoaded', function() {
    const logOut = document.querySelector("#logout");
    let userId = null;
    const logo = document.querySelector("h1");
    const name = document.querySelector("#name");
    const signOff = document.querySelector("#signoff");
    const writing = document.querySelector("#writing");
    let username = null;

    writing.addEventListener('click', function() {
        window.location.href = "/posts/write";
    });

    logo.addEventListener('click', function() {
        window.location.href = "/";
    });

    const checkLogin = () => {
        fetch("/api/signin")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); 
            })
            .then(data => {
                if (data.loggedIn) {
                    userId = data.userId; 
                    username = data.username;

                    document.getElementById("logIn").classList.add("hidden");
                    document.getElementById("signUp").classList.add("hidden");
                    document.getElementById("posting").classList.remove("hidden");
                    name.innerText = username;

                    loadPosts(); 
                } else {
                    document.getElementById("posting").classList.add("hidden");
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };
    
    checkLogin();

    async function loadPosts() {
        try {
            const response = await fetch('/api/posts');
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await response.json();
            data.forEach(post => {
                if (post.author === username) {
                    createPostElement(post);
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    logOut.addEventListener('click', function(event) {
        event.preventDefault();

        fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ logout: true })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('로그아웃 실패');
            }
        })
        .then(data => {
            alert(data.message); 
            window.location.href = '/login'; 
        })
        .catch(err => {
            console.error(err);
            alert('로그아웃 중 오류가 발생했습니다.');
        });
    });


    signOff.addEventListener('click', function(event) {
        event.preventDefault();

        if (!confirm('정말로 회원 탈퇴하시겠습니까?')) {
            return; 
        }

        fetch(`/user/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('회원 탈퇴 실패');
            }
        })
        .then(data => {
            alert(data.message);
            window.location.href = '/login'; 
        })
        .catch(err => {
            console.error(err);
            alert('회원 탈퇴 중 오류가 발생했습니다.');
        });
    });

});
