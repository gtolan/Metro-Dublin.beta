//     
export class Game {
                        
                        
                                                  
                          
                          
                         
                              
                            
                       
                                   
                

    constructor(size                = [], exit                = [], mines                                         = {}, start                = [], facing         = 0) {
        //board
        this.exit = exit;
        this.size = size;
        this.mines = mines;
        this.minesX = this.mines.x;
        this.minesY = this.mines.y;
        //turtle
        this.start = start;
        this.directions = ["North", "East", "South", "West"];
        this.turtleDirection = facing;
        this.faceDirection = this.directions[this.turtleDirection];
        this.currentPosition = start;
        this.turtle = document.getElementById( 'turtle');

        //this binding
        (this     ).runActionList = this.runActionList.bind(this);
        (this     ).action = this.action.bind(this);
        (this     ).rotate = this.rotate.bind(this);
        (this     ).turnTheTurleNinetyDeg = this.turnTheTurleNinetyDeg.bind(this);
        (this     ).move = this.move.bind(this);
        (this     ).checkForExit = this.checkForExit.bind(this);
        (this     ).checkIfOutsideBounds = this.checkIfOutsideBounds.bind(this);
        (this     ).checkForMineOnXAxis = this.checkForMineOnXAxis.bind(this);
        (this     ).checkForMineOnYAxis = this.checkForMineOnYAxis.bind(this);
        (this     ).checkForMine = this.checkForMine.bind(this);
        (this     ).checkLocation = this.checkLocation.bind(this);
    }

    runActionList(arr               )       {
        arr.forEach((item) => {
            this.action(item);
        });
    }

    action(choice        )      {
        if(choice != "m" || choice != "r"){console.log("bad command"); return}
        return (choice === "m") ? this.move() : this.rotate();
    }

    rotate()      {
        this.turtleDirection = this.turtleDirection <= 3 ? this.turtleDirection++ : 0;
        return this.turnTheTurleNinetyDeg();
    }

    turnTheTurleNinetyDeg() {
        let degs = [0,90,180,270];
        this.turtle.style.transform = "rotate(" + degs[this.turtleDirection] + "deg)";
    }

    move() {
        this.faceDirection = this.faceDirection === "North" ? this.currentPosition[1]++ :
            this.faceDirection === "East" ? this.currentPosition[0]++ :
                this.faceDirection === "South" ? this.currentPosition[1]-- :
                    this.faceDirection === "West" && this.currentPosition[0]--;
        return this.checkLocation()
    }

    checkForExit()          {
        if ((this.currentPosition[0] === this.exit[0]) && (this.currentPosition[1] === this.exit[1])) { return true}
        return false;
    }

    checkIfOutsideBounds()          {
        if (this.currentPosition[0] < 0 || this.currentPosition[0] > this.size[0]) { return true } //Check X
        if (this.currentPosition[1] < 0 || this.currentPosition[1] > this.size[1]) { return true } //Check Y
        return false;
    }

    checkForMineOnXAxis()          {
        return this.minesX.every(mine => this.currentPosition[0] !== mine) //true
    }

    checkForMineOnYAxis()          {
        return this.minesY.every(mine => this.currentPosition[1] !== mine) //true
    }

    checkForMine()          {
        return this.checkForMineOnXAxis() ? this.checkForMineOnYAxis() : false;
    }

    checkLocation()         {
        let checks = [this.checkForExit, this.checkIfOutsideBounds, this.checkForMine];
        let result = checks[0]() ? "Turle has left the building" : checks[1]() ? "Out of Bounds" : checks[2]() ? "Has hit a Mine" : "Still in danger"; //Success
        console.log(result);
        return result;
    }
}



let newGame = new Game([4, 3], [4, 2], {x: [1, 3, 3], y: [1, 1, 3]}, [0, 1], 0);

let exit = ["m","r","m","m","r","m","m","r","r","r","m","m"];
let outOfBounds = ["m","m","m"];
let mineHit = ["r", "m"]
let inDanger = ["m","r","m","m"]

newGame.runActionList(exit);
newGame.runActionList(outOfBounds);
newGame.runActionList(mineHit);
newGame.runActionList(inDanger);
