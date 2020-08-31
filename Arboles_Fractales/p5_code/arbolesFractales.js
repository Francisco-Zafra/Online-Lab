let tam = 800
let n_max = 8
let angle

let slider_angle;
let slider_len;
let slider_ramas;

function setup() {
  canvas = createCanvas(tam, tam)
  canvas.addClass("cacanvas")
  angle = PI/5
  slider_angle = createSlider(0, PI, PI/5, 0.001)
  slider_len = createSlider(0, 400, 150)
  slider_ramas = createSlider(0, 12, 8)
  slider_angle.addClass("barras")
  slider_len.addClass("barras")
  slider_ramas.addClass("barras")
  print(slider_angle.class())
}

function draw() {
  background(200)
  angle = slider_angle.value()
  n_max = slider_ramas.value()
  translate(tam/2, tam)
  strokeWeight(4)
  treeRecursivo(slider_len.value(), 0)
}

function treeRecursivo(len, n){
  if(n >= n_max){
    return
  }
  line(0 , 0, 0, -len)
  n++
  translate(0, -len)
  push()
  rotate(angle)
  treeRecursivo(len*0.75, n)
  pop()
  push()
  rotate(-angle)
  treeRecursivo(len*0.75, n)
  pop()
  
}
