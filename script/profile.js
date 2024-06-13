const logOut = document.querySelector("#logout");
const home = document.querySelector("#home");

home.addEventListener('click', function() {
    window.location.href = '/posts/write';
});

const getUserId = async () => {
    try {
        const response = await fetch('http://172.30.1.1:8080/api/signin', {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            const data = await response.json();
            if (data.status === 'success') {
                return data.data.user.id;
            } else {
                throw new Error('Not logged in');
            }
        } else {
            throw new Error('Failed to check login status');
        }
    } catch (error) {
        console.error(error);
    }
};
