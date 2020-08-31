
let tam = 800
let grid_size = 30
let cajitas = []
let estado

function setup() {
  createCanvas(tam, tam)
  for(let i = 0; i < grid_size; i++){
    cajitas[i] = []
    for(let j = 0; j < grid_size; j++){
      cajitas[i][j] = false
    }
  }
  button = createButton('Start/Pause');
  //button.position(1000, 800);
  button.mousePressed(changeState);
  button.
  estado = false;

  button = createButton('Clean');
  //button.position(1000, 750);
  button.mousePressed(clean);
}

function draw() {
  background(22)
  drawGrid()

  for(let i = 0; i < grid_size; i++){
    for(let j = 0; j < grid_size; j++){
      if(cajitas[i][j]){
        fill(150)
        square(i*tam/grid_size, j*tam/grid_size, tam/grid_size)
      }
    }
  }
  if(estado){
    gameOfLife()
  }
}

function clean(){
  for(let i = 0; i < grid_size; i++){
    for(let j = 0; j < grid_size; j++){
      cajitas[i][j] = false
    }
  } 
}

function mousePressed(){
  if(mouseX < 0 || mouseX > tam){
    return
  }
  if(mouseY < 0 || mouseY > tam){
    return
  }
  let ant_i = 0
  let ant_j = 0
  for(let i = 0; i < grid_size; i++){
    let act = i * tam/grid_size
    if(act > mouseX){
      break;
    }
    ant_i = i
  }
  for(let j = 0; j < grid_size; j++){
    act = j * tam/grid_size
    if(act > mouseY){
      break;
    }
    ant_j = j
  }
  cajitas[ant_i][ant_j] = !cajitas[ant_i][ant_j]
}

function changeState(){
  estado = !estado
}

function drawGrid(){
  stroke(255)
  for(let i = 0; i < grid_size; i++){
    line(i*tam/grid_size, 0, i*tam/grid_size, tam)
  }
  for(let i = 0; i < grid_size; i++){
    line(0, i*tam/grid_size, tam, i*tam/grid_size)
  }
}

function gameOfLife(){
  let cajitas_tmp = []
  for(let i = 0; i < grid_size; i++){
    cajitas_tmp[i] = []
    for(let j = 0; j < grid_size; j++){
      cajitas_tmp[i][j] = cajitas[i][j]
    }
  }

  for(let i = 0; i < grid_size; i++){
    for(let j = 0; j < grid_size; j++){
      if(reproduccion(i,j) && !cajitas[i][j]){
        cajitas_tmp[i][j] = true
      }
      else if (muerte(i,j) && cajitas[i][j]){
        cajitas_tmp[i][j] = false
      }
    }
  }
  for(let i = 0; i < grid_size; i++){
    for(let j = 0; j < grid_size; j++){
      cajitas[i][j] = cajitas_tmp[i][j]
    }
  }
}

function reproduccion(x, y){
  let cont = 0
  for(let i = x-1; i <= x+1; i++){
    for(let j = y-1; j <= y+1; j++){
      if(i >= 0 && i < grid_size && j >= 0 && j < grid_size && !(i == x && j == y)){
        if(cajitas[i][j]){
          cont++;
        }
      }
    }
  }
  return cont == 3
}

function muerte(x, y){
  let cont = 0
  for(let i = x-1; i <= x+1; i++){
    for(let j = y-1; j <= y+1; j++){
      if(i >= 0 && i < grid_size && j >= 0 && j < grid_size && !(i == x && j == y)){
        if(cajitas[i][j]){
          cont++;
        }
      }
    }
  }
  return !(cont == 3 || cont == 2)
}