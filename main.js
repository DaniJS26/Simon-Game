let h1 = document.querySelector("h1");
let btns = document.querySelectorAll("button");
let computerArray = [];
const colors = ["red", "green", "blue", "yellow"];
let playerArray = [];
let level = 0;
let started = false;

let subHeader = document.createElement("h2");
subHeader.textContent = "Press any key to start."

if (!started) {
    setTimeout(() => {
        h1.appendChild(subHeader);
    }, 2000);
}

document.addEventListener("keypress", () => {
    if(!started) {
        subHeader.textContent = "";
        h1.textContent = "";
        nextSequence();
        started = true;
    }
})

if (!started) {
    for (i of btns) {
        i.addEventListener('click', function () {
            let playerPicked = this.className;
            gamePicking(playerPicked);
            playerArray.push(playerPicked);
            checking(playerArray.length - 1);
        })
    }
}

function checking(items) {
    if (computerArray[items] === playerArray[items]) {
        if (playerArray.length === computerArray.length) {
            setTimeout(() => {
                nextSequence();
            }, 1200);
        }
    }
    else {
        gameOver();
    }
}


function nextSequence() {
    level++;
    playerArray = [];
    h1.textContent = `Level ${level}`;
    let indexNumber = Math.floor(Math.random() * colors.length);
    let randomColor = colors[indexNumber];
    gamePicking(randomColor)
    computerArray.push(randomColor);
}

function gameOver() {
    level = 0;
    started = false;
    computerArray = [];
    h1.innerHTML = "Game Over!<br>Press any key to restart."
    document.body.classList.add("gameOver");
    setTimeout(() => {
        document.body.classList.remove("gameOver");
    }, 400);
    playsound('wrong');
}

function gamePicking(color) {
    switch (color) {
        case 'red':
            timming('red');
            playsound('red');
            break;

        case 'green':
            timming('green');
            playsound('green');
            break;

        case 'blue':
            timming('blue');
            playsound('blue');
            break;

        case 'yellow':
            timming('yellow');
            playsound('yellow');
            break;

        default:
            break;
    }
}

function timming(color) {
    let current = document.querySelector(`.${color}`);
    current.classList.add("pressed")
    setTimeout(() => {
        current.classList.remove("pressed");
    }, 100)
}

function playsound(color) {
    let audio = new Audio(`/sounds/${color}.mp3`);
    audio.play();
}