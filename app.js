let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let highScore = localStorage.getItem("highScore") || 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("#high-score");
h3.innerText = `Highest Score: ${highScore}`;

document.addEventListener("keydown", function () {
  if (!started) {
    started = true;
    levelup();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => btn.classList.remove("userflash"), 250);
}

function levelup() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);

  gameSeq.push(randColor);
  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelup, 250);
    }
  } else {
    if (level > highScore) {
      highScore = level;
      localStorage.setItem("highScore", highScore);
    }

    h2.innerHTML = `Game over! Your score was <b>${level}</b><br>Press any key to restart`;
    h3.innerText = `Highest Score: ${highScore}`;

    document.body.style.backgroundColor = "red";
    setTimeout(() => document.body.style.backgroundColor = "white", 150);
    reset();
  }
}

function btnpress() {
  let btn = this;
  userFlash(btn);
  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
  btn.addEventListener("click", btnpress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
// Reset High Score Button Functionality
document.querySelector("#reset-score").addEventListener("click", function () {
    localStorage.removeItem("highScore");
    highScore = 0;
    document.querySelector("#high-score").innerText = `Highest Score: 0`;
  });
  
  
