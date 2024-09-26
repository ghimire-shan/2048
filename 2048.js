var gameBoard;
var score =0;
var rows = 4;
var columns = 4;


window.onload = function(){
    setBoardForGame();
}

function setBoardForGame(){
    board = new Array(4).fill().map( ()=> new Array(4).fill(2));

    for (let row = 0; row < this.rows; row ++){
        for (let column =0; column < this.columns; column++){
            let tile = document.createElement("div");
            tile.id = row.toString() + column.toString();
            let number = board[row][column];
            updateTile(tile, number);
            document.getElementById("board").append(tile);
        }
    }
    setTile();
    setTile();
}

function setTile(){
    if (!hasEmptyTile){  
        return;  
        // if (gameOver){
        //     alert("Game over");
        // }else{
        //    return; 
        // }
    }

    
    
    let found = false;

    while (!found){
        let row = Math.floor(Math.random() * this.rows);
        let column = Math.floor(Math.random() * this.columns);
        if (board[row][column] ==  0){
            board[row][column] =2;
            let tile = document.getElementById(row.toString() + column.toString());
            tile.innerText=2;
            tile.classList.add("t2");
            found = true;
        }
    }
}

function gameOver(){
    for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.columns; c++) {
            // Check if any horizontal move is possible
            if (c < this.columns - 1 && board[r][c] === board[r][c + 1]) {
                return false
            }
            // Check if any vertical move is possible
            if (r < this.rows - 1 && board[r][c] === board[r + 1][c]) {
                return false;
            }
        }
    }
    return true;
}



function updateTile(tile, number){
    // Remove the innerText
    tile.innerText = "";
    // Remove the class ex: if a tile has class tile and x2, may need to update it to x4/x8...
    tile.classList.value = "";
    // Add the tile class back again
    tile.classList.add("tile");
    if (number > 0){
        // Add the appropriate class to the tile back again
        tile.innerText = number.toString();
        tile.classList.add("t" + number.toString());
    }
}

document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowLeft"){
        slideLeft();
        setTile();
    }
    else if (e.code == "ArrowRight"){
        slideRight();
        setTile();
    }
    else if (e.code == "ArrowUp"){
        slideUp();
        setTile();
    }
    else if (e.code == "ArrowDown"){
        slideDown();
        setTile();
    }
    document.getElementById("score").innerText = this.score;
})

function removeZeroes(row){
    row = row.filter(num => num !=0);
    return row;
}


function slide(row){
    row = removeZeroes(row);
    // When all zeroes removed, actually side

    for (let index = 0; index < row.length -1 ;index++ ){
        if (row[index] == row[index+1]){
            row[index] *= 2;
            row[index+1] = 0;
            this.score += row[index];
        }
    }
    row = removeZeroes(row);
    
    while (row.length < 4){
        row.push(0);
    }

    return row;
}

function slideLeft(){
    for (let r = 0; r < this.rows; r++){
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for (let c= 0; c < this.columns; c++){
            let tile = document.getElementById(r.toString()+c.toString());
            let num = board[r][c]
            updateTile(tile, num);
        }
    }
    
}

function slideRight(){
    for (let r = 0; r < this.rows; r++){
        let row = board[r];
        // Sliding to the right is like sliding to the left of right
        row.reverse();
        row = slide(row);
        row.reverse()
        board[r] = row;

        for (let c= 0; c < this.columns; c++){
            let tile = document.getElementById(r.toString()+c.toString());
            let num = board[r][c]
            updateTile(tile, num);
        }
    }
    
}

function slideUp(){
    // Sliding left but taking the ith index, 
    for (let c=0; c < this.columns; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for (let r=0; r < this.rows; r++){
            board[r][c] = row[r];
            let title = document.getElementById(r.toString()+c.toString());
            let number = board[r][c];
            updateTile(title, number);
        }

    }
}

function slideDown(){
    // Sliding down is basically sliding up by reverse
    for (let c=0; c < this.columns; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse()
        row = slide(row);
        row.reverse();
        for (let r=0; r < this.rows; r++){
            board[r][c] = row[r];
            let title = document.getElementById(r.toString()+c.toString());
            let number = board[r][c];
            updateTile(title, number);
        }

    }
}
function hasEmptyTile() {
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) { //at least one zero in the board
                return true;
            }
        }
    }
    return false;
}