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

let background = 'black';
let isGameOver = false;


/**
 * Every 100 milliseconds:
 *  - move asteroid
 *  - check if player hit asteroid
 *    - If player is hitting asteroid:
 *      - set background red
 *      - is game over
 *  - draw game
 *    - draw background
 *    - draw player
 *    - draw asteroid
 *    - If gameOver
 *      - draw game over
 */



function updateGame() {
  asteroidX = asteroidX - asteroidSpeed;
  asteroidY = asteroidY - asteroidSpeed;

  // Check if player collides with asteroid
  const didPlayerHitAsteroid = isColliding(playerX, playerY, 10, asteroidX, asteroidY, 20);
  if (didPlayerHitAsteroid) {
    background = 'red';
    isGameOver = true;
  }

  draw();
}

function onKeydown(event) {
  const key = event.code;
  if (key === 'ArrowUp') {
    playerY = playerY - 10;
  } else if (key === 'ArrowDown') {
    playerY = playerY + 10;
  } else if (key === 'ArrowLeft') {
    playerX = playerX - 10;
  } else if (key === 'ArrowRight') {
    playerX = playerX + 10;
  }
}

function draw() {
  drawBackground();
  drawPlayer(playerX, playerY);
  drawAsteroid(asteroidX, asteroidY);
  if (isGameOver) {
    drawGameOver();
  }
}

function drawBackground() {
  context.fillStyle = background;
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

function drawGameOver() {
    context.fillStyle = 'white';
    
    context.fillText("Game Over refresh page if you want to play again", 10, 100);
}

function isColliding(x1, y1, r1, x2, y2, r2) {
    //  5 * 5 = 25. sqrt(25) = 5
    // sqrt( (x2 - x1)^2 + (y2 - y1)^2 )
    const distance = Math.sqrt( Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2) )
    if (distance <= r1 + r2) {
        return true;
    }
    return false;
}

