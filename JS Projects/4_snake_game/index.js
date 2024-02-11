// To give direction to snake
let inputDirection = {
  x: 0,
  y: 0,
};

// we are also using audios
const foodSound = new Audio("food.mp3");
const gameOverSound = new Audio("gameover.mp3");
const moveSound = new Audio("move.mp3");
const musicSound = new Audio("music.mp3");
const board = document.getElementById("board");
// below variable is for screen repaint
let speed = 2;
let lastPaintTime = 0;
// below is our snake
// Its an array where we store coordinates of snake in x and y plane
let snakeArr = [{ x: 6, y: 7 }];
// Below varibale is for food element which is just a object
let food = { x: 13, y: 15 };
// Below variable is to display score
let score = 0;
let Score = document.getElementById("score");
let highScore = document.getElementById("highScore");

// Game functions
function main(ctime) {
  // Instead of reqAnimationFrame we can also use setInterval or setTimeout but reqAnimationFrame is more efficient
  // We are again calling this function so that it becomes like a loop and it repaints our screen in every specified interval
  window.requestAnimationFrame(main);
  // below condition tells in how much time we want to repaint our screen
  // 1/speed means 0.5
  // we divide by 1000 as its in miliseconds
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }

  lastPaintTime = ctime;
  // Below function is our main working function to update and display food and snake
  gameEngine();
}

function isCollide(snakeArray) {
  // we will collide when we bump into ourself or bump into boundary

  // Logic for bumping into itself
  // loop starts from i = 1 as we check if any node is same as head i.e 0th index node then its a collide
  for (let i = 1; i < snakeArray.length; i++) {
    if (
      snakeArray[i].x === snakeArray[0].x &&
      snakeArray[i].y === snakeArray[i].y
    ) {
      return true;
    }
  }

  // Now we check out of bound condition, our matrix size is 0 to 18
  if (
    snakeArray[0].x >= 18 ||
    snakeArray[0].x <= 0 ||
    snakeArray[0].y >= 18 ||
    snakeArray[0].y <= 0
  ) {
    return true;
  }
}

function gameEngine() {
  // Part 1: Updating the snake array & food
  if (isCollide(snakeArr)) {
    // Play game over sound
    gameOverSound.play();
    musicSound.pause();
    inputDirection = { x: 0, y: 0 };
    alert("Game over. Press any key to play again");
    // Reset position of snake
    snakeArr = [{ x: 13, y: 15 }];
    musicSound.play();
    score = 0;
  }

  // If snake is not collided and has eaten the food
  // When will snake eat the food? when coordinate of head of snake is same as coordinate of food
  if (snakeArr[0].y === food && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1; // Increase score when we eat food
    if (score > highVal) {
      localStorage.setItem("HighScore", JSON.stringify(score));
      highScore.innerHTML = "High Score" + score;
    }
    Score.innerHTML = "Score" | score;
    // if food eaten, add one more block in snake body
    snakeArr.unshift({
      x: snakeArr[0].x + inputDirection,
      y: snakeArr[0].y + inputDirection.x,
    });
    // We need to now generate new random location of food element
    // a + (b-a)*Math.random will generate a random number between a to b and Math.round makes it a integer
    // a and b will size of our grid 0 to 18 but we can also change it to 2 to 16
    let a = 2;
    let b = 16;
    food = {
      x: 2 + Math.round(a + (b - a) * Math.random()),
      y: 2 + Math.round(a + (b - a) * Math.random()),
    };
  }
  // Moving the snake
  // To move the snake, we will just slide one box ahead, x will come to x-1 means each block will slide to its next block poisiton and ultimately head will move one step ahead in the pressed key direction
  // we start loop from second last end node of snake so that we start shifting end node to second last and so on we shift first node to head position
  for (let i = snakeArr.length - 1; i >= 0; i--) {
    // To create a reference to a new object we do de-structuring
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  // Now we move head based on input object by user
  snakeArr[0].x = inputDirection.x;
  snakeArr[0].y = inputDirection.y;

  // Part 2: Display the snake and food
  // To display the snake, first of all clear the board and display new location of snake
  // Display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    // Make a snakeElement and place it in the grid according to its x,y coordinates
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      // If its head then add 'head' class
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  // Display the Food
  // Same as snake element
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// actual logic
// The below code is just like a animation that will re-paint our screen in specified time
let high = localStorage.getItem("highScore");
if (high === null) {
  let highVal = 0;
  localStorage.setItem("highScore", JSON.stringify(highVal));
} else {
  highVal = JSON.parse(high);
  highScore.innerHTML = "High Score:" + high;
}
window.requestAnimationFrame(main);
// Listen to key-down event
window.addEventListener("keydown", (e) => {
  inputDirection = { x: 0, y: 1 }; // start the game
  // Play the sound
  moveSound.play();
  // Which key is pressed lets check
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDirection.x = 0;
      inputDirection.y = -1;
      break;
    case "ArrowDown":
      console.log("ArrowDown");
      inputDirection.x = 0;
      inputDirection.y = 1;
      break;
    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDirection.x = -1;
      inputDirection.y = 0;
      break;
    case "ArrowRight":
      console.log("ArrowRight");
      inputDirection.x = 1;
      inputDirection.y = 0;
      break;
    default:
      break;
  }
});
