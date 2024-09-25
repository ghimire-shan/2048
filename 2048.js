var gameBoard;
var score =0;
var rows = 4;
var columns = 4;


window.onload = function(){
    setBoardForGame();
}

function setBoardForGame(){
    board = new Array(4).fill().map( ()=> new Array(4).fill(0));
    console.log(board)

    for (let row = 0; row < this.rows; row ++){
        for (let column =0; column < this.columns; column++){
            let tile = document.createElement("div");
            tile.id = row.toString() + "-" + column.toString();
            let number = board[row][column];
            updateTile(tile, number);
            document.getElementById("board").append(tile);
        }
    }
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
        tile.innerText = number;
        tile.classList.add("t" + number.toString());
    }
}

document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowLeft"){
        slideLeft();
    }
})

function slideLeft(){
    
}
