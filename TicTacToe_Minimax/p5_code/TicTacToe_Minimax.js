
const cruz = 1
const circulo = 2
const empate = 3

let tam = 800
let mesa = []
let turnoMinimax = false;
let win = false

function setup() {
  createCanvas(tam, tam)
  for(let i = 0; i < 3; i++){
    mesa[i] = []
    for(let j= 0; j < 3; j++){
      mesa[i][j] = 0
    }
  }
  mesa[1][1] = cruz
}

function draw() {
  background(22)
  drawTable()
  drawSimbols()
  if(checkWin(mesa) != -1){
    win = true
    switch(checkWin(mesa)){
      case cruz:
        createP('Cruz').style('font-size','44pt')
        break
      case circulo:
        createP('Circulo').style('font-size','44pt')
        break
      case empate:
        createP('Empate').style('font-size','44pt')
        break
    }
    noLoop()
  }
  if(turnoMinimax && !win){
    turnoIA(mesa)
  }
}

function drawTable() {
  stroke(222)
  strokeWeight(4)
  //Verticales
  line(tam/3, 10, tam/3, tam-10)
  line(2*tam/3, 10, 2*tam/3, tam-10)
  //Horizontales
  line(10, tam/3, tam-10, tam/3)
  line(10, 2*tam/3, tam-10, 2*tam/3)
}

function drawSimbols(){
  noFill()
  for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
      let centerX = tam/6 + j*tam/3
      let centerY = tam/6 + i*tam/3
      if(mesa[i][j] == cruz){
        line(centerX - 100, centerY - 100, centerX + 100, centerY + 100)
        line(centerX + 100, centerY - 100, centerX - 100, centerY + 100)
      }
      else if(mesa[i][j] == circulo){
        ellipse(centerX, centerY, 200, 200)
      }
    }
  }
}

function setSimbol(x, y, s){
  let x1 = int(x/(tam/3))
  let y1 = int(y/(tam/3))

  mesa[y1][x1] = s
}

function mousePressed(){
  if(!win){
    let x1 = int(mouseX/(tam/3))
    let y1 = int(mouseY/(tam/3))
  
    if(!turnoMinimax && mesa[y1][x1] == 0){
      setSimbol(mouseX, mouseY, circulo)
      turnoMinimax = true
    }
  }
}

function checkWin(mesa){
  //Vertical
  for(let i = 0; i < 3; i++){
    if(mesa[0][i] == mesa[1][i] && mesa [0][i] == mesa[2][i] && mesa[0][i] != 0){
      return mesa[0][i]
    } 
  }
  //Horizontal
  for(let i = 0; i < 3; i++){
    if(mesa[i][0] == mesa[i][1] && mesa [i][0] == mesa[i][2] && mesa[i][0] != 0){
      return mesa[i][0]
    } 
  }
  //Diagonal Izq a Der
  if(mesa[0][0] == mesa[1][1] && mesa [0][0] == mesa[2][2] && mesa[0][0] != 0){
    return mesa[1][1]
  }
  //Diagonal Der Izq
  if(mesa[2][0] == mesa[1][1] && mesa [2][0] == mesa[0][2] && mesa[2][0] != 0){
    return mesa[1][1]
  }
  let emp = true
  for(let i = 0; i < 3; i++){
    for(let j= 0; j < 3; j++){
      if(mesa[i][j] == 0){
        emp = false
      }
    }
  }
  if(emp){
    return empate
  }
  return -1
}

function turnoIA(estado){
  let nuevo_estado = []
  let mejor_valor = -Infinity
  let mejor_mov = {i:0, j:0}

  for(let i = 0; i < 3; i++){
    nuevo_estado[i] = []
    for(let j = 0; j < 3; j++){
      nuevo_estado[i][j] = estado[i][j] 
    }
  }

  for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
      if(nuevo_estado[i][j] == 0){
        nuevo_estado[i][j] = cruz
        let valor = miniMax(nuevo_estado, false)
        nuevo_estado[i][j] = 0
        if(valor > mejor_valor){
          mejor_valor = valor
          mejor_mov = {i, j}
        }
      }
    }
  }
  estado[mejor_mov.i][mejor_mov.j] = cruz
  turnoMinimax = false
}

function miniMax(estado, max){
  let nuevo_estado = []
  for(let i = 0; i < 3; i++){
    nuevo_estado[i] = []
    for(let j = 0; j < 3; j++){
      nuevo_estado[i][j] = estado[i][j] 
    }
  }

  switch(checkWin(nuevo_estado)){
    case circulo:
      return -10
    case cruz:
      return 10
    case empate:
      return 0
    default:
      break
  }

  if(max){
    let mayor_valor = -Infinity
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        if(nuevo_estado[i][j] == 0){
          nuevo_estado[i][j] = cruz
          let valor = miniMax(nuevo_estado, false)
          nuevo_estado[i][j] = 0
          if(valor > mayor_valor){
            mayor_valor = valor
          }
        }
      }
    }
    return mayor_valor
  }
  else{
    let menor_valor = Infinity
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        if(nuevo_estado[i][j] == 0){
          nuevo_estado[i][j] = circulo
          let valor = miniMax(nuevo_estado, true)
          nuevo_estado[i][j] = 0
          if(valor < menor_valor){
            menor_valor = valor
          }
        }
      }
    }
    return menor_valor
  }
}
