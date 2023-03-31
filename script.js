// 获取元素
const canvas = document.getElementById("canvas");
const gameBoard = document.getElementById("game-board");
const gameOverModal = document.querySelector(".game-over");
const finalScore = document.getElementById("final-score");
const restartButton = document.getElementById("restart-button");
const scoreElement = document.getElementById("score");
// 创建画布
const ctx = canvas.getContext("2d");
const cellSize = 20;
const cellCount = canvas.width / cellSize;
// 初始化贪吃蛇
let snake = [
  { x: 5, y: 5 },
  { x: 4, y: 5 },
  { x: 3, y: 5 },
];
let dx = 1;
let dy = 0;
// 初始化食物
let food = getRandomFood();
// 初始化游戏状态
let isGameOver = false;
let score = 0;
// 监听键盘事件
document.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "ArrowLeft":
      if (dx !== 1) {
        dx = -1;
        dy = 0;
      }
      break;
    case "ArrowRight":
      if (dx !== -1) {
        dx = 1;
        dy = 0;
      }
      break;
    case "ArrowUp":
      if (dy !== 1) {
        dx = 0;
        dy = -1;
      }
      break;
    case "ArrowDown":
      if (dy !== -1) {
        dx = 0;
        dy = 1;
      }
      break;
  }
});
// 游戏循环
function gameLoop() {
  if (isGameOver) {
    return;
  }
  setTimeout(() => {
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
    if (isSnakeOutOfBonds() || isSnakeEatingItself()) {
      endGame();
    } else {
      gameLoop();
    }
  }, 100);
}
// 清空画布
function clearCanvas() {
  ctx.fillStyle = "#EEE";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
// 随机生成食物
function getRandomFood() {
  return {
    x: Math.floor(Math.random() * cellCount),
    y: Math.floor(Math.random() * cellCount),
  };
}
// 绘制食物
function drawFood() {
  ctx.fillStyle = "#F00";
  ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);
}
// 移动贪吃蛇
function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    eatFood();
  } else {
    snake.pop();
  }
}
// 吃到食物
function eatFood() {
  food = getRandomFood();
  score += 10;
  scoreElement.innerText = score;
}
// 绘制贪吃蛇
function drawSnake() {
  ctx.fillStyle = "#333";
  snake.forEach((cell) => {
    ctx.fillRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
  });
}
// 判断贪吃蛇是否出界
function isSnakeOutOfBonds() {
  const head = snake[0];
  return head.x < 0 || head.x >= cellCount || head.y < 0 || head.y >= cellCount;
}
// 判断贪吃蛇是否撞到自己
function isSnakeEatingItself() {
  const head = snake[0];
  return snake.slice(1).some((cell) => cell.x === head.x && cell.y === head.y);
}
// 结束游戏
function endGame() {
  isGameOver = true;
  finalScore.innerText = score;
  gameOverModal.style.display = "block";
}
// 重新开始游戏
function restartGame() {
  snake = [
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 },
  ];
  dx = 1;
  dy = 0;
  food = getRandomFood();
  isGameOver = false;
  score = 0;
  scoreElement.innerText = score;
  gameOverModal.style.display = "none";
  gameLoop();
}
// 启动游戏循环
gameLoop();
// 监听重新开始按钮点击事件
restartButton.addEventListener("click", restartGame);
