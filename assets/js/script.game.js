const player = document.querySelector(".player");
const sad = document.querySelector(".sad");
const obstacle = document.querySelector(".obstacle");
const gameBoard = document.querySelector(".game-board");
const clounds = document.querySelector(".clounds");
const btnRestart = document.querySelector(".restart");
const score = document.querySelector(".score");
const lifeCounter = document.querySelector(".lifeCounter");
const timming = document.querySelector(".timming");
const nameUser = document.querySelector(".nameUser");
const jump = () => {
  player.classList.add("jump");

  setTimeout(() => {
    player.classList.remove("jump");
  }, 500);
};

const endGame = () => {
  gameBoard.classList.add("gameOver");
  clounds.classList.add("hidden");
  player.classList.add("hidden");
  obstacle.classList.add("hidden");
  score.classList.add("hidden");
  lifeCounter.classList.add("hidden");
  gameBoard.style.border = "0";
  score;
  nameUser.classList.add("hidden");
  setTimeout(() => {
    window.location = "http://advergame/pages/form.php";
  }, 5000);
};

btnRestart.addEventListener("click", () => {
  setTimeout(() => {
    start();
  }, 2000);
});

let life = 2;
function decreaseLife() {
  life--;
  updateLife();
}

function updateLife() {
  lifeCounter.innerHTML = `Life: ${life}`;
}

function countdown(time) {
  if (time >= 0) {
    lifeCounter.classList.add("hidden");
    score.classList.add("hidden");
    obstacle.classList.add("hidden");
    nameUser.classList.add("hidden");
    setTimeout(() => {
      timming.textContent = time;
      countdown(time - 1);
    }, 1000);
  } else {
    setTimeout(() => {
      timming.textContent = "GO!";
      start();
    }, 1000);
  }
}
countdown(1);

function start() {
  updateLife(); //life counter
  let count = 0; // point counter
  document.addEventListener("keydown", jump);
  player.classList.remove("style.botton");
  player.src = "../assets/img/player.gif";
  btnRestart.classList.add("hidden");
  score.classList.add("score");
  player.style.bottom = "";

  setTimeout(() => {
    timming.classList.add("hidden");
    lifeCounter.classList.remove("hidden");
    score.classList.remove("hidden");
    nameUser.classList.remove("hidden");
  }, 1000);
  setTimeout(() => {
    obstacle.classList.remove("hidden");
  }, 2000);

  const loop = setInterval(() => {
    count++;
    score.innerHTML = `Score: ${count}`;
    const obstaclePosition = obstacle.offsetLeft;
    const playerPosition = +window
      .getComputedStyle(player)
      .bottom.replace("px", "");
    if (
      obstaclePosition <= 90 &&
      obstaclePosition > 0 &&
      playerPosition < 150
    ) {
      decreaseLife();

      setTimeout(() => {
        obstacle.classList.add("hidden");
      }, 100);
      clearInterval(loop);

      document.removeEventListener("keydown", jump);
      player.src = "../assets/img/sad.gif";
      player.style.bottom = "1px";
      if (life <= 0) {
        setTimeout(() => {
          endGame();
        }, 3000);
      } else {
        btnRestart.classList.remove("hidden");
      }
    }
  }, 10);
}