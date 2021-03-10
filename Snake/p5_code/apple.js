class Apple{
    constructor(x = 0, y = 0){
        this.x = x
        this.y = y
    }

    spawn(mesa, size){
        let x = int(random(0, size - 1))
        let y = int(random(0, size - 1))

        while(mesa[x][y] != 'e'){
            x = int(random(0, size - 1))
            y = int(random(0, size - 1))
        }
        this.x = x
        this.y = y
        mesa[x][y] = 'a'
    }
}