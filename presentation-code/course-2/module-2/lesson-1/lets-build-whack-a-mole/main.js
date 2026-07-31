const NUM_ROWS = 4;
const NUM_COLS = 4;

let currentScore = 0;
updateScore(currentScore);

const gameBoard = document.querySelector("#game-board");

// CREATE A GAME BOARD
for(let row_num = 0; row_num < NUM_ROWS; row_num++) {
    const row = document.createElement("tr");
    gameBoard.append(row);
    for(let col_num = 0; col_num < NUM_COLS; col_num++) {
        const cell = document.createElement("td");
        const cellId = "hole-"+row_num+col_num;
        cell.classList.add("hole");
        cell.setAttribute("id", cellId)
        row.append(cell);

        cell.addEventListener("click", () => {
            if(cell.classList.contains("needs-whack")) {
                cell.classList.remove("needs-whack");
                currentScore += 1;
            } else {
                currentScore -= 1;
            }
            updateScore(currentScore);
        });
    }
}


// Every second, make a mole show up in a random place
const moleInterval = setInterval(() => {
    const element = document.querySelector("#" + getRandomHoleId());
    element.classList.add("needs-whack");
}, 1000);

// Gives us a random round number from 0 to num-1
function getRandomNumberUpTo(num) {
   return Math.floor(Math.random() * num);
}

// Gets the ID of a random hole in our game board
function getRandomHoleId() {
    const randomCol = getRandomNumberUpTo(NUM_COLS);
    const randomRow = getRandomNumberUpTo(NUM_ROWS);
    return "hole-"+randomRow+randomCol;
}

function updateScore(newScore) {
    const scoreElement = document.querySelector("#score");
    scoreElement.textContent = "Score: " + newScore;
}