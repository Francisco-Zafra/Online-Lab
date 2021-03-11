class Backtracking{
    constructor(m, s, a, d){
        this.mesa = this.copyOfArray(m)
        this.snake = s
        this.apple = a
        this.direcciones = ["UP", "RIGHT", "DOWN", "LEFT"]
        this.resultado = ""
        this.depth = d

        
    }

    backtracking(){
        this.backtrackingRecursivo(this.mesa, this.snake.body[0], 0)
        return this.resultado
    }

    backtrackingRecursivo(mesa, head, k){

        if(this.mesa[head.x][head.y] == 'a'){
            return 0
        }
        else if (k == this.depth){
            return this.distancia(head)
        }
        else{
            let sucesores = this.sucesores(head)
            let parcialValores = [1000,1000,1000,1000]
            let parcialDir = ["UP", "UP", "UP", "UP"]
            for(let i = 0; i < sucesores.length; i++){
                let dir = sucesores[i]
                let char = this.valorCasilla(this.nextMove(head, dir))
                if(char != 's' && char != 'h'){ 
                    if (char != 'a')
                        this.mesa[this.nextMove(head, dir).x][this.nextMove(head, dir).y] = 's'
                    //if(this.distancia(this.nextMove(head, dir)) < this.minimo(parcialValores))
                        parcialValores[i] = this.backtrackingRecursivo(this.mesa, this.nextMove(head, dir), k+1)
                    parcialDir[i] = dir
                    //console.log(dir + " " + char + " " + k + " v-> " + parcialValores[i])
                    this.mesa[this.nextMove(head, dir).x][this.nextMove(head, dir).y] = 'e'
                }
            }
            let min = 1000
            let best = 0
            for(let i = 0; i < parcialValores.length; i++){
                if(parcialValores[i] < min){
                    min = parcialValores[i]
                    best = i
                }
            }
            //console.log("k: " + k + " d: " + parcialDir[best] + " v-> " + parcialValores[best])
            if(k == 0){
                this.resultado = parcialDir[best]
            }
            return parcialValores[best] + this.distancia(head)
        }
   }

   copyOfArray(array){
        let r = []
        for(let i = 0; i < array.length; i++){
            r[i] = []
            for(let j = 0; j < array.length; j++){
                r[i][j] = array[i][j]
            }
        }
        return r
    }

    minimo(l){
        let min = 1000
        let best = 0
        for(let i = 0; i < l.length; i++){
            if(l[i] < min){
                min = l[i]
                best = i
            }
        }
        return l[best]
    }

    distancia(head){
        let distNormalX = Math.abs(head.x - this.apple.x)
        let distNormalY = Math.abs(head.y - this.apple.y)
        let distLocaX = (Math.min(head.x, this.apple.x) + this.mesa[0].length) - Math.max(head.x, this.apple.x)
        let distLocaY = (Math.min(head.y, this.apple.y) + this.mesa[0].length) - Math.max(head.y, this.apple.y)
        return Math.min(distNormalX, distLocaX) + Math.min(distNormalY, distLocaY)
    }

    sucesores(head){
        let dir = ["DOWN", "RIGHT", "UP", "LEFT"]
        let valor = []
        let result = []

        for(let i = 0; i < 4; i++){
            valor[i] = this.distancia(this.nextMove(head, dir[i]))
        }

        for(let j = 0; j < 4; j++){
            let best = 0
            let min = 1000        
            for(let i = 0; i < valor.length; i++){
                if(valor[i] < min && result.indexOf(dir[i]) == -1){
                    min = valor[i]
                    best = i
                }
            }
            result[j] = dir[best]
        }
        return result
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