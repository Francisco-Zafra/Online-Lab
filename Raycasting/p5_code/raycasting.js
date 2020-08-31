let tam = 800
let n_rays = 100

let wall1
let wall2
let wall3
let walls

let ray1
let ray2

function setup() {
  createCanvas(tam, tam)
  wall1 = new Wall(600, 300, 500, 500)
  wall2 = new Wall(100, 100, 100, 500)
  wall3 = new Wall(700, 300, 500, 700)

  walls = new Set([wall1, wall2, wall3])
  ray1 = new Ray(300, 400, 1, 0)
  ray2 = new Ray(300, 400, -1, 0)
}

function draw() {
  background(0)
  wall1.show()
  wall2.show()
  wall3.show()

  ray1.show(walls)
  //ray2.show(walls)

  ray1.setDir (mouseX, mouseY)
  //ray2.setDirNeg (mouseX, mouseY)

  
}
