const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const reset = document.querySelector("#resartBtn");

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
  running = true;
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  reset.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s Turn`;
}

function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");
  if (!!options[cellIndex] || !running) {
    return;
  }

  updateCell(this, cellIndex);
  changePlayer();
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s Turn`;
}

function checkWinner() {
  let roundWon = false;

  for (const condition of winConditions) {
    const cellA = option[condition[0]];
    const cellB = option[condition[1]];
    const cellC = option[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} Wins`;
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = "Draw!!!";
    running = false;
  } else {
    changePlayer();
  }
}
function restartGame() {
  let options = ["", "", "", "", "", "", "", "", ""];

  let currentPlayer = "X";
  statusText.textContent = `${currentPlayer}'s Turn`;
  cells.forEach((cell) => (cell.textContent = ""));
  running = true;
}
