var gameBoard;
var score =0;
var rows = 4;
var columns = 4;


window.onload = function(){
    setBoardForGame();
}

function setBoardForGame(){
    board = new Array(rows).fill().map( ()=> new Array(columns).fill(0));

    for (let row = 0; row < rows; row ++){
        for (let column =0; column < columns; column++){
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
    if (!hasEmptyTile()){ 
        return;
    }

    let found = false;

    while (!found){
        let row = Math.floor(Math.random() * rows);
        let column = Math.floor(Math.random() * columns);
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
    if (hasEmptyTile()){
        return false;
    }
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            // Check if any horizontal or vertical moves are possible.
            if ((c < columns - 1 && board[r][c] === board[r][c + 1])|| (r < rows - 1 && board[r][c] === board[r + 1][c])){
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

document.addEventListener('keydown', (e) => {
    let boardChanged = false;

    switch (e.code) {
        case 'ArrowLeft':
            boardChanged = slideLeft();
            break;
        case 'ArrowRight':
            boardChanged = slideRight();
            break;
        case 'ArrowUp':
            boardChanged = slideUp();
            break;
        case 'ArrowDown':
            boardChanged = slideDown();
            break;
    }

    // Only add a new tile if the board has changed
    if (boardChanged) {
        setTile();
        
        // Check for game over state after a successful move
        if (gameOver()) {
            alert("Game Over! No valid moves left");
        }
    }

    // Update the score display
    document.getElementById("score").innerText = score;
});
function removeZeroes(row){
    return row.filter(num => num !=0);
}


function slide(row){
    if (!row){
        return null;
    }

    let originalRow = [...row];
    row = removeZeroes(row);
    // When all zeroes removed, actually side

    for (let index = 0; index < row.length -1 ;index++ ){
        if (row[index] == row[index+1]){
            row[index] *= 2;
            row[index+1] = 0;
            score += row[index];
        }
    }
    row = removeZeroes(row);
    while (row.length < 4){
        row.push(0);
    }
    return originalRow.toString() !== row.toString() ? row: null;
}

function slideLeft(){
    let boardChanged = false;
    for (let r = 0; r < rows; r++){
        let row = board[r];
        let newRow = slide(row);

        // If the value is null, then the board has not changed. 
        if (newRow){
          board[r] = newRow;
          boardChanged = true; 
        }   

        for (let c= 0; c < columns; c++){
            let tile = document.getElementById(r.toString()+c.toString());
            let num = board[r][c]
            updateTile(tile, num);
        }
    }
    return boardChanged
    
}

function slideRight(){
    let boardChanged = false;
    for (let r = 0; r < rows; r++){
        let row = board[r];
        // Sliding to the right is like sliding to the left of right
        row.reverse();
        let newRow = slide(row);
        
        if(newRow){
            newRow.reverse()
            board[r] = newRow;
            boardChanged = true;
        } else{
            row.reverse();
        }
        for (let c= 0; c < columns; c++){
            let tile = document.getElementById(r.toString()+c.toString());
            let num = board[r][c]
            updateTile(tile, num);
        }
    }
    return boardChanged;
    
}

function slideUp(){
    let boardChanged = false;
    // Sliding left but taking the ith index, 
    for (let c=0; c < columns; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        let newRow  = slide(row);

        if (newRow){
            boardChanged = true;
            for (let r=0; r < rows; r++){
                board[r][c] = newRow[r];
                let title = document.getElementById(r.toString()+c.toString());
                let number = board[r][c];
                updateTile(title, number);
            }
        }
    }
    return boardChanged;
}

function slideDown(){
    let boardChanged = false;
    // Sliding down is basically sliding up by reverse
    for (let c=0; c < columns; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse()
        let newRow = slide(row);;

        if(newRow){
            newRow.reverse();
            boardChanged = true;
            for (let r=0; r < rows; r++){
                board[r][c] = newRow[r];
                let title = document.getElementById(r.toString()+c.toString());
                let number = board[r][c];
                updateTile(title, number);
            }
        } else{
            row.reverse();
        }
    }
    return boardChanged;
}
function hasEmptyTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) { //at least one zero in the board
                return true;
            }
        }
    }
    return false;
}