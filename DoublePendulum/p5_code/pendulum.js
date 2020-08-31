class Pendulum{

    f = 0
    vel = 0.00001

    constructor(l, angle, x, y){
        this.len = l
        this.angle = angle
        this.anchor = createVector(x, y)
    }

    show(){
        stroke(255)
        fill(255)
        push()
        this.calcPos()
        line(0, 0, 0, this.len)
        ellipse(0, this.len, 20)
        pop()
    }

    move(){
        this.f += -10*10*sin(this.angle)
        this.angle += this.f * this.vel
    }

    calcPos(){       
        translate(this.anchor.x, this.anchor.y)
        rotate(this.angle)   
    }
}