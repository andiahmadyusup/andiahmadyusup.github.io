
// Deklarasi variable
const canvas = document.querySelector('.myCanvas')
const ctx = canvas.getContext('2d');
const canvasSize = { width: 600, height: 600 }
const score = document.querySelector('.score')
const grid = { row: 24, col: 24 }
const snake = {
    direction: 'right',
    body: [
        { x: 12, y: 12 },
        { x: 11, y: 12 },
        { x: 10, y: 12 },
    ],
    foods: []
}
const fps = 5;
let snakeWall = false;
var animasi = null;

// Fungsi utama
document.addEventListener('DOMContentLoaded', main)
document.addEventListener('keydown', handleKey)
function main() {
    createCanvas();
    start()

}
function start() {
    animasi = setInterval(gameLoop, 1000 / fps)
}
// Buat canvas
function createCanvas() {
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    canvas.style.border = '1px solid black'
}
// Control ular nya
function handleKey(e) {
    if (e.key === 'ArrowUp' && snake.direction != 'down') snake.direction = 'up'
    if (e.key === 'ArrowDown' && snake.direction != 'up') snake.direction = 'down'
    if (e.key === 'ArrowLeft' && snake.direction != 'right') snake.direction = 'left'
    if (e.key === 'ArrowRight' && snake.direction != 'left') snake.direction = 'right'

}
function moveUp(){
   if (snake.direction != 'down') snake.direction = 'up'
}
function moveDown(){
    if (snake.direction != 'up') snake.direction = 'down'
 }
 function moveRight(){
    if (snake.direction != 'left') snake.direction = 'right'
 }
 function moveLeft(){
    if (snake.direction != 'right') snake.direction = 'left'
 }

 let addScore = parseInt(score.innerText)
// Button switch mode
function mode() {
    const switchMode = document.querySelector('.switchMode')
    if (switchMode.innerHTML == 'Hard Mode') {
        snakeWall = true;
        switchMode.innerHTML = 'Easy Mode'
    } else if (switchMode.innerHTML == 'Easy Mode') {
        snakeWall = false;
        switchMode.innerHTML = 'Hard Mode'
    }
}
// Rules game
function update() {
    // foods 
    if (snake.foods.length == 0) {
        const randomPos = {
            x: Math.floor(Math.random() * grid.col),
            y: Math.floor(Math.random() * grid.row)
        }
        snake.foods.push(randomPos)
        console.log(randomPos)
    }
    // Snake Move
    const head = snake.body[0]
    var newHead = Object.assign({}, head)
    if (snake.direction == 'left') newHead.x -= 1
    if (snake.direction == 'down') newHead.y += 1
    if (snake.direction == 'right') newHead.x += 1
    if (snake.direction == 'up') newHead.y -= 1
    if (snakeWall) {
        if (
            (newHead.x < 0) || (newHead.y < 0)
            || (newHead.x > grid.col) || (newHead.y > grid.row)
        ) {

            return reset(1000)
        }
    } else {
        if (newHead.x < 0) newHead.x = grid.col - 1
        if (newHead.y < 0) newHead.y = grid.row - 1
        if (newHead.x > grid.col - 1) newHead.x = 0
        if (newHead.y > grid.row - 1) newHead.y = 0
    }
    // Rules snake head gaboleh kena snake body
    for (let i = 0; i < snake.body.length; i++) {
        const body = snake.body[i]
        if (body.x == newHead.x && body.y == newHead.y) {
            return reset(1000)
        }
    }
    // food && add score
    let snakeEat = true;
    for (let i = 0; i < snake.foods.length; i++) {
        const foods = snake.foods[i]
        if (foods.x == newHead.x && foods.y == newHead.y) {
            snake.foods.splice(i, 1)
            score.innerHTML = addScore += 1
            snakeEat = false
        }
    }
    snake.body.unshift(newHead);
    if (snakeEat) snake.body.pop();
}
// Reset posisi ular ke awal
function reset(delay = 0) {
    alert('DUARR! KAMU KALAH:(')
    alert(`SCORE MU: ${addScore}`)
    if (animasi != null) {
        clearInterval(animasi)
        setTimeout(() => start(), delay)
    }
    snake.body = [
        { x: 12, y: 12 },
        { x: 11, y: 12 },
        { x: 10, y: 12 },
    ]
    score.innerHTML = 0;
    snake.direction = 'right'
}
// 
function gameLoop() {
    draw()
    update()
}

function draw() {
    drawBoard()
    drawSnake()
    drawFoods()
}
//
function drawFoods() {
    for (let i = 0; i < snake.foods.length; i++) {
        const foods = snake.foods[i]
        var w = canvasSize.width / grid.col
        var h = canvasSize.height / grid.row
        var x = foods.x * w
        var y = foods.y * h

        drawRect(x, y, w, h, 'yellow', 'black')

    }
}
// 
function drawSnake() {
    for (let i = 0; i < snake.body.length; i++) {
        const body = snake.body[i]
        var w = canvasSize.width / grid.col
        var h = canvasSize.height / grid.row
        var x = body.x * w
        var y = body.y * h
        var color = (i == 0) ? 'red' : '#001cff'


        drawRect(x, y, w, h, color, 'black')

    }
}
// 
function drawBoard() {
    for (let i = 0; i < grid.col; i++) {
        for (let j = 0; j < grid.row; j++) {
            var w = canvasSize.width / grid.col
            var h = canvasSize.height / grid.row
            var x = i * w
            var y = j * h
            var color = (i % 2 == 0)
                ? (j % 2 == 0) ? '#1f2836' : '#273546'
                : (j % 2 != 0) ? '#1f2836' : '#273546'
            drawRect(x, y, w, h, color, 'black')
        }
    }
}
// 
function drawRect(x, y, w, h, fillStyle = 'white', strokeStyle = 'black') {
    ctx.beginPath()
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.rect(x, y, w, h)
    if (ctx.fillStyle != null) ctx.fill()
    if (ctx.strokeStyle != null) ctx.stroke()
}

