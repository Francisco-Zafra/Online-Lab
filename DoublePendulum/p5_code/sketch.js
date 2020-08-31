let tam = 800
let l = 300

//let p

let l1
let a1 
let m1
let a1_v
let l2
let a2
let m2
let a2_v

let g

let history = []

function setup() {
    createCanvas(tam, tam)
    //p = new Pendulum(l, PI/3, tam/2, 200)
    l1 = 225
    a1 = PI
    m1 = 20
    a1_v = 0

    l2 = 175
    a2 = PI/3
    m2 = 20
    a2_v = 0

    g = 1
  }
  
  function draw() {
    background(20)
    stroke(255)
    doublePendulum();
    //p.show()
    //p.move()
  }

  function doublePendulum(){

    let num1 = -g*(2*m1+m2)*sin(a1)-m2*g*sin(a1-2*a2)-2*sin(a1-a2)*m2*(a2_v*a2_v*l2+a1_v*a1_v*l1*cos(a1-a2))
    let den1 = l1*(2*m1+m2-m2*cos(2*a1-2*a2))
    let num2 = 2*sin(a1-a2)*(a1_v*a1_v*l1*(m1+m2)+g*(m1+m2)*cos(a1)+a2_v*a2_v*l2*m2*cos(a1-a2))
    let den2 = l2*(2*m1+m2-m2*cos(2*a1-2*a2))

    let a1_a = num1/den1
    let a2_a = num2/den2
    
    translate(tam/2, 200)

    let x1 = sin(a1) * l1
    let y1 = cos(a1) * l1

    let x2 = x1 + sin(a2) * l2
    let y2 = y1 + cos(a2) * l2

    line(0, 0, x1, y1)
    ellipse(x1, y1, m1)

    line(x1, y1, x2, y2)
    ellipse(x2, y2, m2)

    history.push(createVector(x2, y2)); 
    if (history.length > 1000) {
      history.splice(0, 1);
    }
    noFill()
    beginShape();
    for (var i = 0; i < history.length; i++) {
      var pos = history[i];
      vertex(pos.x, pos.y);
    }
    endShape();

    a1_v += a1_a
    a2_v += a2_a

    a1 += a1_v 
    a2 += a2_v

    //a1_v *= 0.99
    //a2_v *= 0.99

    
    
  }