
let mesa = []
let size = 24
let tam = 800

let snake
let apple
let ai

let cont = 0
let vel_max = 3

let dir = []
let dir_actual

function setup(){
  createCanvas(tam, tam)
  dir_actual = "UP"
  for(let i = 0; i < size; i++){
    mesa[i] = []
    for(let j = 0; j < size; j++){
      mesa[i][j] = 'e'
    }
  }
  snake = new Snake(size/2, size/2, 10)
  apple = new Apple()
  apple.spawn(mesa, size)
}

function draw(){
  background(22)
  drawTable()
  if(cont > vel_max){
    if(dir.length == 0){
      ai = new Ai(mesa, apple)
      dir = ai.exp(snake.body[0])
      console.log(dir)
    }
    if(dir.length > 0){
      dir_actual = dir.shift()
    }
    apple = snake.move(dir_actual, mesa, size)
    cont = 0
  }
  cont++
}

function drawTable(){
  for(let i = 0; i < size; i++){
    for(let j = 0; j < size; j++){
      switch(mesa[i][j]){
        case 'e':
          fill(50)
          square(i*(tam/size), j*(tam/size), (tam/size) - 2)
          break;
        case 's':
          fill(149, 233, 27)
          square(i*(tam/size), j*(tam/size), (tam/size) - 2)
          break;
        case 'a':
          fill(244, 23, 84)
          square(i*(tam/size), j*(tam/size), (tam/size) - 2)
          break;
        case 'h':
          fill(48, 156, 77)
          square(i*(tam/size), j*(tam/size), (tam/size) - 2)
          break;
      }
    }
  }
}

function keyPressed() {
  if(dir.length < 3){
    if (keyCode === LEFT_ARROW && dir_actual != "RIGHT") {
      dir.push("LEFT")
    } else if (keyCode === RIGHT_ARROW && dir_actual != "LEFT") {
      dir.push("RIGHT")
    } else if (keyCode === UP_ARROW && dir_actual != "DOWN"){
      dir.push("UP")
    } else if (keyCode === DOWN_ARROW && dir_actual != "UP"){
      dir.push("DOWN")
    }
  }
}