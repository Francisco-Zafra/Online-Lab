class Ray{
    constructor(x, y, dirX, dirY){
        this.p = createVector(x, y)
        this.dir = createVector(dirX, dirY)
    }
    show (walls){
        stroke(255)
        let tmp = this.hitPoint(walls)
        textSize(44)
        if(tmp == null){
            push()
            translate(this.p.x, this.p.y)
            line(0, 0, this.dir.x*1000, this.dir.y*1000)
            pop()
            text("Distacia: ∞", 50, 50)
        }
        else{
            line(this.p.x, this.p.y, tmp.x, tmp.y)
            text("Distacia: " + int(this.distance(tmp.x, tmp.y)), 50, 50)
        }
    }

    setDir (x, y){
        this.dir.x = x - this.p.x 
        this.dir.y = y - this.p.y
        this.dir.normalize()
    }

    setDirNeg (x, y){
        this.dir.x = -(x - this.p.x) 
        this.dir.y = -(y - this.p.y)
        this.dir.normalize()
    }

    cast (wall){
        let x1 = wall.a.x
        let y1 = wall.a.y
        let x2 = wall.b.x
        let y2 = wall.b.y

        let x3 = this.p.x
        let y3 = this.p.y
        let x4 = this.p.x + this.dir.x
        let y4 = this.p.y + this.dir.y

        let den = ((x1 - x2)*(y3 - y4) - (y1 - y2)*(x3 - x4))
        if (den == 0) {
            return null
        }
        let t = ((x1 - x3)*(y3 - y4) - (y1 - y3)*(x3 - x4)) / den               
        let u = -((x1 - x2)*(y1 - y3) - (y1 - y2)*(x1 - x3)) / den

        if( 0 <= t && t <= 1 && u > 0){
            let px = int(x1 + t*(x2 - x1))
            let py = int(y1 + t*(y2 - y1))
            return createVector(px, py)
        }
        else{
            return null
        }
    }

    hitPoint(walls){
        let dist = Infinity
        let v = createVector()
        let tmp = null
        let found = false
        for (let wall of walls){
            tmp = this.cast(wall)
            if(tmp != null) {
                if(this.distance(tmp.x, tmp.y) < dist){
                    dist = this.distance(tmp.x, tmp.y)
                    v.x = tmp.x
                    v.y = tmp.y
                    found = true
                }
            }
        }
        if(!found) return null
        else return v
    }

    distance(x1, y1){
        let x2 = this.p.x
        let y2 = this.p.y

        return sqrt(pow((x2 - x1), 2) + pow((y2 - y1), 2))
    }
}