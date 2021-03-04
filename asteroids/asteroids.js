const canvas = document.getElementById('myCanvas');
canvas.width = 300;
canvas.height = 300;

const context = canvas.getContext('2d');
document.addEventListener('keydown', onKeydown);

let playerX = 50;
let playerY = 150;
setInterval(updateGame, 100);

let asteroidX = 290;
let asteroidY = 290;

let asteroidSpeed = 5;


function updateGame() {
  asteroidX = asteroidX - asteroidSpeed;
  asteroidY = asteroidY - asteroidSpeed;

  draw();
}

function onKeydown(event) {
  const key = event.code;
  if (key === 'ArrowUp') {
    playerY = playerY - 10;
  } else if (key === 'ArrowDown') {
    playerY = playerY + 10;
  }
}

function draw() {
  drawBackground();
  drawPlayer(playerX, playerY);
  drawAsteroid(asteroidX, asteroidY);
}

function drawBackground() {
  context.fillStyle = 'red';
  context.fillRect(0, 0, 300, 300);
}

function drawPlayer(x, y) {
  context.fillStyle = 'blue';
  context.beginPath();
  context.arc(x, y, 10, 0, 2 * Math.PI);
  context.fill();
}

function drawAsteroid(x, y) {
  context.fillStyle = 'green';
  context.beginPath();
  context.arc(x, y, 20, 0, 2 * Math.PI);
  context.fill();
}