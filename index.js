const cells = document.querySelectorAll(".cell");

console.log(cells);
const statusText = document.querySelector("#statusText");
const reset = document.querySelector("#restartBtn");

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
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}
function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");

  if (options[cellIndex] != "" || !running) {
    return;
  }

  updateCell(this, cellIndex);
  checkWinner();
}
function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;

  setTimeout(() => {
    cell.style.fontSize = "4rem";
  }, 30);
}
function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
  let roundWon = false;

  for (const condition of winConditions) {
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (!cellA || !cellB || !cellC) {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      cells[condition[0]].classList.add("red-text");
      cells[condition[1]].classList.add("red-text");
      cells[condition[2]].classList.add("red-text");

      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} wins!`;
    reset.classList.add("restartBtnn");

    running = false;
  } else if (!options.includes("")) {
    reset.classList.add("restartBtnn");
    statusText.textContent = `Draw!`;
    running = false;
  } else {
    changePlayer();
  }
}
function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach((cell) => cell.classList.remove("red-text"));
  reset.classList.remove("restartBtnn");
  cells.forEach((cell) => (cell.textContent = ""));
  running = true;
}
