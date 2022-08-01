const cells = document.querySelectorAll(".cell") as NodeListOf<HTMLElement>;
const statusTxt = document.getElementById("status") as HTMLElement;
const resetBtn = document.getElementById("reset") as HTMLButtonElement;

let board: string[] = ["", "", "", "", "", "", "", "", ""];

const winConditions: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let player = Math.random() < 0.5 ? "X" : "O";
let running = false;
let roundWon = false;

function intiGame(): void {
  running = true;
  cells.forEach((cell: Element) => {
    cell.addEventListener("click", handleClick);
    resetBtn.addEventListener("click", restartGame);
    statusTxt.textContent = `Player ${player}'s turn`;
  });
}

function handleClick(this: HTMLElement, ev: Event): void {
  const cell = parseInt(this.getAttribute("index") || "10000"); // if no index is set, set as a large number (invalid index)
  if (board[cell] || !running) {
    return;
  }
  updateCell(this, cell);
  checkWin();
}

function updateCell(cell: HTMLElement, index: number): void {
  board[index] = player;
  cell.textContent = player;
}

function changePlayer(): void {
  player = player === "X" ? "O" : "X";
  statusTxt.textContent = `Player ${player}'s turn`;
}

function checkWin(): void {
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cell1 = board[condition[0]];
    const cell2 = board[condition[1]];
    const cell3 = board[condition[2]];

    if (cell1 == "" || cell2 == "" || cell3 == "") {
      continue;
    }
    if (cell1 === cell2 && cell2 === cell3) {
      roundWon = true;
      statusTxt.textContent = `Player ${cell1} won!`;
      break;
    }
  }
  if (roundWon) {
    statusTxt.textContent = `Player ${player} won!`;
    fireAll();
    running = false;
  } else if (!board.includes("")) {
    statusTxt.textContent = "Draw!";
    running = false;
  } else {
    changePlayer();
  }
}

function restartGame(): void {
  running = false;
  roundWon = false;
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell: Element) => {
    cell.textContent = "";
  });
  player = Math.random() < 0.5 ? "X" : "O";
  statusTxt.textContent = `Player ${player}'s turn`;
  running = true;
}

// Initialize game
intiGame();

// ------- Confetti -------
var count = 200;
var defaults = {
  origin: { y: 0.7 }
};

function fire(particleRatio: number, opts: Object) {
  //@ts-ignore - // cdn delivered js file
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio)
    })
  );
}

function fireAll() {
  fire(0.25, {
    spread: 26,
    startVelocity: 55
  });
  fire(0.2, {
    spread: 60
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45
  });
}
