const canvas = document.getElementById('myCanvas');
canvas.width = 300;
canvas.height = 300;

const context = canvas.getContext('2d');
document.addEventListener('keydown', onKeydown);
document.addEventListener('keyup', onKeyup);

let playerX = 50;
let playerY = 150;
let playerSpeed = 30;

// setInterval(updateGame, 100);
setInterval(makeAsteroid, 1000);

let asteroids = [];

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
let lastTime = (new Date()).getTime();


function updateGame(timestamp) {
  const timeDifference = timestamp - lastTime;
  const secondsDifference = timeDifference / 1000;
  lastTime = timestamp;

  if (isKeyDown('ArrowUp')) {
    playerY = playerY - (playerSpeed * secondsDifference);
  } else if (isKeyDown('ArrowDown')) {
    playerY = playerY + (playerSpeed * secondsDifference);
  }

  if (isKeyDown('ArrowLeft')) {
    playerX = playerX - (playerSpeed * secondsDifference);
  } else if (isKeyDown('ArrowRight')) {
    playerX = playerX + (playerSpeed * secondsDifference);
  }

  for (const asteroid of asteroids) {
    asteroid.x -= asteroid.speed * secondsDifference;
    asteroid.speed += 0.50 * secondsDifference;

    const didPlayerHitAsteroid = isColliding(playerX, playerY, 10, asteroid.x, asteroid.y, 20);
    if (didPlayerHitAsteroid) {
      background = 'red';
      isGameOver = true;
    }
  }

  draw();
  requestAnimationFrame(updateGame);
}
requestAnimationFrame(updateGame);

const keysDown = {};
function onKeydown(event) {
  const key = event.code;
  keysDown[key] = true;
}

function onKeyup(event) {
  const key = event.code;
  keysDown[key] = false;
}

function isKeyDown(code) {
  return keysDown[code] === true;
}

function makeAsteroid() {
  const asteroid = {
    x: 350,
    y: Math.random() * 300,
    speed: 50
  };

  asteroids.push(asteroid);
}

function draw() {
  drawBackground();
  drawPlayer(playerX, playerY);

  for (const asteroid of asteroids) {
    drawAsteroid(asteroid.x, asteroid.y);
  }
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