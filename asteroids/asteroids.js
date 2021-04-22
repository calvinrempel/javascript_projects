const canvas = document.getElementById('myCanvas');
canvas.width = 300;
canvas.height = 300;

const context = canvas.getContext('2d');
document.addEventListener('keydown', onKeydown);
document.addEventListener('keyup', onKeyup);

// Image loading stuff
let imagesLoading = 0;
let isLoading = true;
let images = {};

function loadImage(imageSrc) {
  imagesLoading += 1;
  const image = new Image();
  image.onload = function() {
    imagesLoading -= 1;
    images[imageSrc] = image;

    if (imagesLoading === 0) {
      isLoading = false;
    }
  };
  image.src = imageSrc;
}

// Load images
loadImage('./media/images/asteroid.png');
loadImage('./media/images/ship.png');

// Player setup stuff
let playerX = 50;
let playerY = 150;
let playerSpeed = 30;

let ufoParticles = new ParticleSystem(
  playerX,
  playerY,
  100,
  'green',
  1,
  0.5,
  { x: 0, y: 1 }
);

// setInterval(makeAsteroid, 1000);

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

  if (isLoading) {
    // Do nothing
  } else {
    let shouldPlayerParticlesBeOn = false;
    if (isKeyDown('ArrowUp')) {
      playerY = playerY - (playerSpeed * secondsDifference);
      shouldPlayerParticlesBeOn = true;
    } else if (isKeyDown('ArrowDown')) {
      playerY = playerY + (playerSpeed * secondsDifference);
      shouldPlayerParticlesBeOn = true;
    }
    
    if (isKeyDown('ArrowLeft')) {
      playerX = playerX - (playerSpeed * secondsDifference);
      shouldPlayerParticlesBeOn = true;
    } else if (isKeyDown('ArrowRight')) {
      playerX = playerX + (playerSpeed * secondsDifference);
      shouldPlayerParticlesBeOn = true;
    }

    if (shouldPlayerParticlesBeOn !== ufoParticles.on) {
      if (shouldPlayerParticlesBeOn) {
        ufoParticles.turnOn()
      } else {
        ufoParticles.turnOff();
      }
    }
    ufoParticles.update(secondsDifference);

    asteroids.forEach(asteroid => {
      asteroid.x -= asteroid.speed * secondsDifference;
      asteroid.speed += 2.50 * secondsDifference;

      const didPlayerHitAsteroid = isColliding(playerX, playerY, 15, asteroid.x, asteroid.y, 20);
      if (didPlayerHitAsteroid) {
        background = 'red';
        isGameOver = true;
      }

      if (asteroid.x < -100) {
        const index = asteroids.indexOf(asteroid);
        asteroids.splice(index, 1);
      }
    });
  }

  draw(secondsDifference);
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

function isKeyDown(key) {
  return keysDown[key] === true;
}

function makeAsteroid() {
  if (!isGameOver) {
    const asteroid = {
      x: 350,
      y: Math.random() * 300,
      speed: 50
    };

    asteroids.push(asteroid);
  }
}

function draw() {
  drawBackground();
  if (isLoading) {
    drawLoading();
  } else if (isGameOver) {
    drawGameOver();
  } else {
    drawPlayer(playerX, playerY);
    asteroids.forEach(asteroid => drawAsteroid(asteroid.x, asteroid.y));
  }
}

function drawBackground() {
  context.fillStyle = background;
  context.fillRect(0, 0, 300, 300);
}

function drawPlayer(x, y) {
  const width = 40;
  const height = 40;

  ufoParticles.setPosition(x, y);
  ufoParticles.draw(context);

  context.drawImage(
    images['./media/images/ship.png'],
    x - 20,
    y - 20,
    width,
    height
  );

  
}

function drawAsteroid(x, y) {
  context.drawImage(images['./media/images/asteroid.png'], x - 20, y - 20);
}

function drawGameOver() {
    context.fillStyle = 'white';
    context.fillText("Game Over refresh page if you want to play again", 10, 100);
}

function drawLoading() {
  context.fillStyle = 'white';
  context.fillText("Loading...", 10, 100);
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