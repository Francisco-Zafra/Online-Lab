class Ai{
    constructor(m, a){
        this.mesa = m
        this.apple = a
        this.dir = []
        this.last = createVector(-1, -1)
    }

    exp(head){
        let m = this.mesa
        return this.explore(head, m)
    }

    explore(head, mesa){
        //A ver donde esta la segunda body
        let r
        if(this.mesa[head.x][head.y] == 'a'){
            return this.dir
        }
        let mejorDir = this.mejorDir(head)
        this.dir.push(mejorDir)
        //mesa[this.nextMove(head, mejorDir).x][this.nextMove(head, mejorDir).y] = 's'
        //mesa[head.x][head.y] = 's'
        if(this.dir.length > 0){
            return this.dir
        }
        console.log(mejorDir.toString() + "  " + this.valorCasilla(this.nextMove(head, mejorDir)))
        //console.log(this.apple)
        r = this.explore(this.nextMove(head, mejorDir), mesa)
        return r
    }

    distancia(head){
        let distNormalX = Math.abs(head.x - this.apple.x)
        let distNormalY = Math.abs(head.y - this.apple.y)
        let distLocaX = (Math.min(head.x, this.apple.x) + this.mesa[0].length) - Math.max(head.x, this.apple.x)
        let distLocaY = (Math.min(head.y, this.apple.y) + this.mesa[0].length) - Math.max(head.y, this.apple.y)
        return Math.min(distNormalX, distLocaX) + Math.min(distNormalY, distLocaY)
    }

    mejorDir(head){
        let up = ["UP", "RIGHT", "DOWN", "LEFT"]
        let best = 0
        let min = 1000 
        for(let i = 0; i < 4; i++){
            let dir = up[i]
            if(this.valorCasilla(this.nextMove(head, dir)) != 's'){
                if(this.distancia(this.nextMove(head, dir), this.apple) < min){
                    if(!(this.last.x == this.nextMove(head, dir).x && this.last.y == this.nextMove(head, dir).y)){
                        min = this.distancia(this.nextMove(head, dir), this.apple)
                        best = i     
                    }               
                }
            }
        }
        
        // if((up[this.last] == "UP" && up[best] == "DOWN") || (up[this.last] == "DOWN" && up[best] == "UP")){
        //     best = this.last
        // }
        // else if((up[this.last] == "LEFT" && up[best] == "RIGHT") || (up[this.last] == "RIGHT" && up[best] == "LEFT")){
        //     best = this.last
        // }
        this.last = this.nextMove(head, up[best])
        return up[best]
    }

    valorCasilla(v){
        return this.mesa[v.x][v.y]
    }

    nextMove(head, dir){
        let size = this.mesa[0].length
        let newPos
        switch(dir){
            case "UP":
                newPos = head.y-1
                if(newPos < 0){
                    newPos = size-1
                }
                return createVector(head.x, newPos)
            case "DOWN":
                newPos = head.y+1
                if(newPos >= size){
                    newPos = 0
                }
                return createVector(head.x, newPos)
            case "LEFT":
                newPos = head.x-1
                if(newPos < 0){
                    newPos = size-1
                }
                return createVector(newPos, head.y)
            case "RIGHT":
                newPos = head.x+1
                if(newPos >= size){
                    newPos = 0
                }
                return createVector(newPos, head.y)
        }
    }
}