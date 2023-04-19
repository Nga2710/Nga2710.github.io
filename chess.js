function n() {
  console.log("note")
}
function print(text) {
  console.log(text);
}
let rookMovePos = [[0,
  1],
  [0,
    -1],
  [1,
    0],
  [-1,
    0]];
let bishopMovePos = [[-1,
  1],
  [1,
    -1],
  [1,
    1],
  [-1,
    -1]];
let knightMovePos = [[2,
  1],
  [2,
    -1],
  [-2,
    1],
  [-2,
    -1],
  [-1,
    2],
  [1,
    2],
  [-1,
    -2],
  [1,
    -2]];
for (let r = 0; r < 8; r++) {
  const row = document.getElementById("board").insertRow(r);
  for (let c = 0; c < 8; c++) {
    const cell = row.insertCell(c);
    cell.className = (c + r) % 2 == 0 ? "white": "black";
    cell.addEventListener("click", selectPieceFC);
    line = "abcdefgh";
    cell.innerHTML = `${line[c]}${Math.abs(r-8)}`;
  }
}
board = (i, j) => {
  return document.getElementById("board").querySelectorAll("tr")[i].querySelectorAll("td")[j];
}
fromMovePos = () => {
  return board(fromMove[0], fromMove[1]);
}
toMovePos = () => {
  return board(toMove[0], toMove[1]);
}
function reset() {
  isOver = false
  castle = {
    AIKingSide: true,
    AIQueenSide: true,
    playerKingSide: true,
    playerQueenSide: true
  }
  enpassant = [-1,
    -1]
  turn = colorIsChosen;
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++)
    board(i, j).innerHTML = defaultBoard[i][j];
  //board(0,1).innerHTML = "i"
  //board(1,0).innerHTML = "j"
}
enpassant = [-1, -1]
colorIsChosen = true;
turn = true;
whitePiece = "♙♖♘♗♕♔";
blackPiece = "♟♜♞♝♛♚";
playerPiece = colorIsChosen ? whitePiece: blackPiece;
AIPiece = !colorIsChosen ? whitePiece: blackPiece;
defaultBoard = [
  [AIPiece[1], AIPiece[2], AIPiece[3], AIPiece[colorIsChosen ? 4: 5], AIPiece[!colorIsChosen ? 4: 5], AIPiece[3], AIPiece[2], AIPiece[1]],
  [AIPiece[0], AIPiece[0], AIPiece[0], AIPiece[0], AIPiece[0], AIPiece[0], AIPiece[0], AIPiece[0]],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", AIPiece[1], " ", " ", " "],
  [playerPiece[0], playerPiece[0], playerPiece[0], playerPiece[0], " ", playerPiece[0], playerPiece[0], playerPiece[0]],
  [playerPiece[1], playerPiece[2], playerPiece[3], playerPiece[colorIsChosen ? 4: 5], playerPiece[!colorIsChosen ? 4: 5], playerPiece[3], playerPiece[2], playerPiece[1]]
];
reset();
async function selectPieceFC() {
  if (this.innerHTML != " " && !AIPiece.includes(this.innerHTML)) {
    this.classList.add("red");
    fromMove = [this.parentNode.rowIndex,
      this.cellIndex];
    for (let i = 0; i < 8; i++)
      for (let j = 0; j < 8; j++) {
      board(i, j).removeEventListener("click", selectPieceFC);
      board(i, j).addEventListener("click", selectPieceTC);
    }
  }
}
function selectPieceTC() {
  toMove = [this.parentNode.rowIndex,
    this.cellIndex];
  if (playerPiece.includes(fromMovePos().innerHTML) && playerPiece.includes(toMovePos().innerHTML) && toMovePos().innerHTML != " ") {
    fromMovePos().classList.remove("red");
    if (!AIPiece.includes(toMovePos().innerHTML)) {
      toMovePos().classList.add("red");
      fromMove = toMove;
    }
    return;
  }
  if (vmove(colorIsChosen, getCBoard()).includes(`${fromMove[0]}${fromMove[1]}${toMove[0]}${toMove[1]}`)) move()
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++) {
    board(i, j).classList.remove("red");
    board(i, j).addEventListener("click", selectPieceFC);
  }
}
function getCBoard() {
  let cboard = new Array(8)
  for (let k = 0; k < 8; k++)
    cboard[k] = new Array(8)
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++)
    cboard[i][j] = board(i, j).innerHTML
  return cboard
}
function move() {
  toMovePos().innerHTML = fromMovePos().innerHTML;
  fromMovePos().innerHTML = " ";
  //kiểm tra có con tốt nào ở hàng cuối không, nếu có thì cho chọn
  enpassant = [-1,
    -1]
  if (fromMovePos().innerHTML == playerPiece[1]) {
    if (fromMove[0] == 7 && fromMove[1] == 0) {
      castle.playerQueenSide = false
    }
    if (fromMove[0] == 7 && fromMove[1] == 7) {
      castle.playerKingSide = false
    }
  }
  if (!isOver) {
    // AIturn = true
    //  AImove()
  }
}
isUnderCheck = (color) => {
  for (i = 0; i < 8; i++)
    for (j = 0; j < 8; j++) {
    if (board(i, j).innerHTML == (color ? whitePiece[5]: blackPiece[5])) {
      for (let pos of knightMovePos) {
        try {
          if (board(i+pos[0], j+pos[1]).innerHTML == (!color ? whitePiece[2]: blackPiece[2])) {
            return true
          }
        }
        catch {}
      }
      brqMove = (brqMovePos, index) => {
        for (let pos of brqMovePos) {
          pos0 = [0,
            0];
          for (let k = 0; k < 8; k++) {
            pos0[0] += pos[0];
            pos0[1] += pos[1];
            try {
              if (board(i+pos0[0], j+pos0[1]).innerHTML == " ") continue
              if (board(i+pos0[0], j+pos0[1]).innerHTML == (!color ? whitePiece[index]: blackPiece[index]) || (!color ? whitePiece[4]: blackPiece[4])) {
                return true;
              } else break;

            }
            catch {}
          }
        }
        return false
      }
      if (brqMove(rookMovePos, 1) || brqMove(bishopMovePos, 3)) return true
    }
  }
  return false
}

function vmove(color, cboard) {
  lmove = []
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++) {
    if (color) {
      switch (cboard[i][j]) {
        case playerPiece[0]:
          try {
            if (cboard[i-1][j] == " ") lmove.push(`${i}${j}${i-1}${j}`)
          }
          catch {}
          if (i == 6 && cboard[4][j] == " ") lmove.push(`${i}${j}4${j}`)
          try {
            if (blackPiece.includes(cboard[i-1][j-1]) || (i-1 == enpassant[0] && j-1 == enpassant[1])) lmove.push(`${i}${j}${i-1}${j-1}`)
          }
          catch {}
          try {
            if (blackPiece.includes(cboard[i-1][j+1]) || (i-1 == enpassant[0] && j+1 == enpassant[1])) lmove.push(`${i}${j}${i-1}${j+1}`)
          }
          catch {}
          break;
      }
    }
  }
  return lmove;
}