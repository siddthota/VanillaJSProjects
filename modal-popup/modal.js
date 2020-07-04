let modalpopup = document.querySelector(".modal-popup");
let button = document.querySelector("#modal-button");
let X = document.querySelector(".X");
let mainbody = document.querySelector(".body-section");
let orangebtn = document.querySelector("#orange");
let blackbtn = document.querySelector("#black");
let bluebtn = document.querySelector("#blue");
let greenbtn = document.querySelector("#green");
let modalText = document.querySelector(".modal-text");

button.addEventListener("click", openModal);
X.addEventListener("click", closeModal);
modalpopup.addEventListener("click", closeModalOutsideClick);
orangebtn.addEventListener("click", orangeClicked);
blackbtn.addEventListener("click", blackClicked);
bluebtn.addEventListener("click", blueClicked);
greenbtn.addEventListener("click", greenClicked);

function openModal() {
    modalpopup.style.display = "block";
    mainbody.style.filter = "blur(5px)";
    styleModalText("#eaeaea", "");
}

function closeModal() {
    modalpopup.style.display = "none";
    mainbody.style.filter = "blur(0px)";
}

function closeModalOutsideClick(e) {
    if(e.target.className == 'modal-popup') {
        modalpopup.style.display = "none";
        mainbody.style.filter = "blur(0px)";
    }
}

function styleModalText(color, button) {
    if(button === 'black') {
        modalText.style.color = '#eaeaea';
    } else {
        modalText.style.color = '#000000';
    }
    modalText.style.backgroundColor = color;
    let selectedColor = modalText.getElementsByClassName("selected-color");
    selectedColor[0].innerHTML = button;
}

function orangeClicked() {
    styleModalText('#fd8904', 'orange');
}

function blackClicked() {
    styleModalText('#000000', 'black');
}

function blueClicked() {
    styleModalText('#04cbfd', 'blue');
}

function greenClicked() {
    styleModalText('#9cdd2d', 'green');
}



