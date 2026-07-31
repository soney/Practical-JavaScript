const img = document.querySelector("img#animal");
const btn = document.querySelector("button");

function changeToDog() {
    img.setAttribute("src", "dog.jpg");
    btn.setAttribute("disabled", "");
}
btn.addEventListener("click", changeToDog);