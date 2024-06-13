const title = document.querySelector("#title");
const detail = document.querySelector("#detail");
const postBtn = document.querySelector("#post");
const previousBtn = document.querySelector("#previous");
const titleLength = document.querySelector("#titlelength");
const detailLength = document.querySelector("#detaillength");
const postForm = document.querySelector("#postForm"); 

function btnColor() {
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

title.addEventListener('input', btnColor);
detail.addEventListener('input', btnColor);
title.addEventListener('input', function(){
    titleLength.innerText = `${title.value.length}/15`;
});
detail.addEventListener('input', function(){
    detailLength.innerText = `${detail.value.length}/500`;
});
previousBtn.addEventListener('click', function(){
    history.back();
});
postForm.addEventListener('submit', function(event){
    event.preventDefault();

    const data = {
        title: title.value,
        detail: detail.value
    };

    fetch("/post/write",{
        method: 'POST',
        headers: {
            'Content-Type':  'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response)
    .catch((error)=>{
        console.error(error);
    })
})