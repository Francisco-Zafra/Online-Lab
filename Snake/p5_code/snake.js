class Snake{
    constructor(x, y, l = 1){
        this.body = []
        for(let i = 0; i < l; i++){
            this.body.push(createVector(x-i,y))
        }
        this.l = l
    }
    
    move(dir, mesa, size){
        let head = this.body[0]
        let newPos
        switch(dir){
            case "UP":
                newPos = head.y-1
                if(newPos < 0){
                    newPos = size-1
                }
                head = createVector(head.x, newPos)
                break;
            case "DOWN":
                newPos = head.y+1
                if(newPos >= size){
                    newPos = 0
                }
                head = createVector(head.x, newPos)
                break;
            case "LEFT":
                newPos = head.x-1
                if(newPos < 0){
                    newPos = size-1
                }
                head = createVector(newPos, head.y)
                break;
            case "RIGHT":
                newPos = head.x+1
                if(newPos >= size){
                    newPos = 0
                }
                head = createVector(newPos, head.y)
                break;
        }
        this.body[0] = head
        if(mesa[this.body[0].x][this.body[0].y] == 'a'){
            this.crecer(dir,size)
        }
        if(mesa[this.body[0].x][this.body[0].y] == 's'){
            print("FIN")
            noLoop()
        }
        mesa[this.body[0].x][this.body[0].y] = 's'
        mesa[this.body[this.l-1].x][this.body[this.l-1].y] = 'e'
        for(let i = this.l-1; i > 0; i--){
            this.body[i] = this.body[i-1]
        }
    }

    crecer(dir, size){
        let tail = this.body[this.l-1]
        let x = tail.x
        let y = tail.y
        let ok = false

        while(!ok){
            switch(dir){
                case "UP":
                    if(x+1 >= size){
                    dir = "DOWN" 
                    }else{
                        this.body.push(createVector(x+1,y))
                        ok = true
                    }
                break;
                case "DOWN":
                    if(x-1 < 0){
                        dir = "LEFT" 
                    }else{
                        this.body.push(createVector(x-1,y))
                        ok = true
                    }
                break;
                case "LEFT":
                    if(y+1 >= size){
                        dir = "RIGHT" 
                    }else{
                        this.body.push(createVector(x,y+1))
                        ok = true
                    }
                break;
                case "RIGHT":
                    if(x+1 >= size){
                        dir = "UP" 
                    }else{
                        this.body.push(createVector(x,y-1))
                        ok = true
                    }
                break;
            }
        }
        this.l++

        let apple = new Apple()
        apple.spawn(mesa,size)
    }
}