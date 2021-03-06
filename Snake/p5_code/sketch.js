
let mesa = []
let size = 24
let tam = 800

let snake
let apple
let ai

let cont = 0
let vel_max = 1

let dir = []
let dir_actual

let depth
let button

function setup(){
  createCanvas(tam +250, tam).position(150,0, 'relative')
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
  depth = createSlider(1, 12, 11, 1)
  depth.position(-40,-210,'relative')

  button = createButton('Restart');
  button.position(-190, 300, 'relative');
  button.style('font-size', '36px')
  button.style('font-family', 'Monospace')
  button.mousePressed(reload);
}

function draw(){
  background(22)
  drawTable()
  textSize(48)
  fill(232,240,240)
  text("Score: " + snake.body.length, 805,400)
  textSize(28)
  text("Profundidad: " + depth.value(), 830,150)
  textSize(42)
  text("Backtracking", 805, 100)
  if(cont > vel_max){
    //if(dir.length == dir.length/2 || dir.length == 0){
      // ai = new Ai(mesa, apple)
      // dir = ai.exp(snake.body[0])
      // console.log(dir)
      ai = new Backtracking(mesa, snake, apple, depth.value())
      dir = ai.backtracking()
      //console.log("---"+dir+"---")
    //}
    //if(dir.length > 0){
      dir_actual = dir//.shift()
    //}
    apple = snake.move(dir_actual, mesa, size)
    cont = 0
  }
  cont++
}

function drawTable(){
  let mod = 255 / ((size-1) * (size-1))
  for(let i = 0; i < size; i++){
    for(let j = 0; j < size; j++){
      switch(mesa[i][j]){
        case 'e':
          fill(50)
          square(i*(tam/size), j*(tam/size), (tam/size) - 2)
          break;
        case 's':
          fill(125, 255, 255-(i+1)*j * mod)
          square(i*(tam/size), j*(tam/size), (tam/size) - 2)
          break;
        case 'a':
          fill(244, 23, 84)
          square(i*(tam/size), j*(tam/size), (tam/size) - 2)
          break;
        case 'h':
          fill(125, 255, 255-(i+1)*j * mod)
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
function reload() {
  location.reload()
}