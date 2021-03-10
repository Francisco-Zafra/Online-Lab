class Ai{
    constructor(x = 10){
        this.deph = 10
    }

    explore(mesa, head, body, dir, apple){
        //A ver donde esta la segunda body
        console.log("test")
        if(mesa[head.x][head.y] == 'a'){
            console.log("test")
            return
        }
        if(head.x > body.x){ //DER
            let x = 1000, y = 1000, z = 1000
            if(mesa[head.x + 1][head.y] == 'e'){
                x = this.distancia(head.x + 1, head.y, apple)
            }
            if(mesa[head.x][head.y + 1] == 'e'){
                y = this.distancia(head.x, head.y + 1, apple)
            }
            if(mesa[head.x][head.y - 1] == 'e'){
                z = this.distancia(head.x, head.y - 1, apple)
            }
            if(x <= y && x <= z){
                dir.push("RIGHT")
                this.explore(mesa, createVector(head.x + 1, head.y), head, dir, apple)
                
            }
            if(y <= x && y <= z){
                dir.push("UP")
                this.explore(mesa, createVector(head.x, head.y + 1), head, dir, apple)
            }
            if(z <= y && z <= x){
                dir.push("DOWN")
                this.explore(mesa, createVector(head.x, head.y - 1), head, dir, apple)
            }
        }
        if(head.x < body.x){ //IZQ
            let x = 1000, y = 1000, z = 1000
            if(mesa[head.x - 1][head.y] == 'e'){
                x = this.distancia(head.x - 1, head.y, apple)
            }
            if(mesa[head.x][head.y - 1] == 'e'){
                y = this.distancia(head.x, head.y - 1, apple)
            }
            if(mesa[head.x][head.y + 1] == 'e'){
                z = this.distancia(head.x, head.y + 1, apple)
            }
            if(x <= y && x <= z){
                dir.push("LEFT")
                this.explore(mesa, createVector(head.x - 1, head.y), head, dir, apple)
            }
            if(y <= x && y <= z){
                dir.push("UP")
                this.explore(mesa, createVector(head.x, head.y - 1), head, dir, apple)
            }
            if(z <= y && z <= x){
                dir.push("DOWN")
                this.explore(mesa, createVector(head.x, head.y + 1), head, dir, apple)
            } 
        }
        if(head.y > body.y){ //ABA
            let x = 1000, y = 1000, z = 1000
            if(mesa[head.x][head.y + 1] == 'e'){
                x = this.distancia(head.x, head.y + 1, apple)
            }
            if(mesa[head.x + 1][head.y] == 'e'){
                y = this.distancia(head.x + 1, head.y, apple)
            }
            if(mesa[head.x - 1][head.y] == 'e'){
                z = this.distancia(head.x - 1, head.y, apple)
            }
            if(x <= y && x <= z){
                dir.push("DOWN")
                this.explore(mesa, createVector(head.x, head.y + 1), head, dir, apple)
            }
            if(y <= x && y <= z){
                dir.push("RIGHT")
                this.explore(mesa, createVector(head.x + 1, head.y), head, dir, apple)
            }
            if(z <= y && z <= x){
                dir.push("LEFT")
                this.explore(mesa, createVector(head.x - 1, head.y), head, dir, apple)
            }
        }
        if(head.y < body.y){ //ARR
            let x = 1000, y = 1000, z = 1000
            if(mesa[head.x][head.y - 1] == 'e'){
                x = this.distancia(head.x, head.y - 1, apple)
            }
            if(mesa[head.x + 1][head.y] == 'e'){
                y = this.distancia(head.x + 1, head.y, apple)
            }
            if(mesa[head.x - 1][head.y] == 'e'){
                z = this.distancia(head.x - 1, head.y, apple)
            }
            if(x <= y && x <= z){
                dir.push("UP")
                this.explore(mesa, createVector(head.x, head.y - 1), head, dir, apple)
            }
            if(y <= x && y <= z){
                dir.push("RIGHT")
                this.explore(mesa, createVector(head.x + 1, head.y), head, dir, apple)
            }
            if(z <= y && z <= x){
                dir.push("LEFT")
                this.explore(mesa, createVector(head.x - 1, head.y), head, dir, apple)
            }
        }
        return
    }

    distancia(x, y, apple){
        return Math.abs(x - apple.x) + Math.abs(y - apple.y)
    }
}