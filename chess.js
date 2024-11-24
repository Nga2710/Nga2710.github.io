async function s(cboard) {
  /*return Object.assign({}, cboard)
  //return cboard
  let tboard = {}
  Object.assign(tboard, cboard)
  return tboard*/
  return JSON.parse(JSON.stringify(cboard))
}
var cal = 0
var mc = {}
async function checkOver(cboard, color) {
  if (cboard.fm >= 100 || cboard.l.filter(e=> cboard.b == e).length >= 3) return 0
  if (!(await glmove(color, await s(cboard), "tM"))) {
    if (await isUnderCheck(color, await s(cboard))) {
      return color ? Infinity: -Infinity
    }
    return 0
  }
  let b = 0,
  w = 0
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++) {
    if (cboard.b[i][j] == " ") continue
    if ([playerPiece[0], playerPiece[1], playerPiece[4], AIPiece[0], AIPiece[1], AIPiece[4]].includes(cboard.b[i][j])) return undefined
    switch (cboard.b[i][j]) {
      case playerPiece[2]:
        w += 3
        break;
      case playerPiece[3]:
        w += 3
        break;
      case playerPiece[2]:
        b += 3
        break;
      case playerPiece[3]:
        b += 3
        break;
    }
  }
  if ((b == 0 && w == 0) || (b == 3 && w == 0) || (b == 0 && w == 3) (b == 3 && w == 3)) return 0
  return undefined
}
async function updateBoard(cboard) {
  if (isOver) return
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++)
    board(i, j).innerHTML = cboard.b[i][j]
  dboard = await s(cboard)
  let co = await checkOver(dboard, !turn)
  if (co != undefined) {
    if (dboard.fm == 100) {
      p("Hòa luật 50 nước đi")
    } else p(co)
    isOver = true
    return
  }
  /*if (dboard.fm == 100) {
    alert("Hòa luật 50 nước đi")
    return
  }*/
  // console.log(await isUnderCheck(cboard.turn, await s(dboard)))
  turn = !turn
  /*if (!(await glmove(turn, await s(dboard), "tM"))) {
    if (await isUnderCheck(turn, await s(dboard))) {
      alert(`${!turn ? "Bạn": "AI"} Thắng!`)
    } else {
      alert("Hòa do hết nước đi")
    }
    return
  }*/
  setTimeout(async ()=> {
    if (!turn) {
      AImove(await s(dboard), false)
    } else {
   //   AImove(await s(dboard), true)
    }
  },
    1)
}
async function findBestMove(cboard, depth, color = false) {
  cal = 0
  console.time("A")
  let validMoves = await glmove(color,
    await s(cboard))
  let workers = []
  // Tạo một worker cho mỗi phần tử trong mảng
  for (let i = 0; i < validMoves.length; i++) {
    var worker = new Worker('worker.js');
    workers.push(worker);
    // Gửi phần tử của mảng qua cho worker tương ứng
    let gameState = [[await mboard(validMoves[i], await s(cboard)),
      depth - 1,
      -Infinity,
      Infinity,
      !color],
      [cic,
        playerPiece,
        AIPiece,
        posW,
        posB]]
    worker.postMessage(gameState);
    worker.onerror = function(e) {
    //  reject(e);
      console.error(e.message, e.lineno)
    }
  }
  // Xử lý kết quả trả về từ các worker
  let scores = await Promise.all(
    workers.map(function(worker) {
      return new Promise(function(resolve) {
        worker.onmessage = function(event) {
          var result = event.data;
          cal += result[1]

          resolve(result[0]);
        };
      });
    })
  ).then(r=>r);
  let u = []
  for (let k = 0; k < scores.length; k++) if (scores[k] == (color ? Math.min(...scores): Math.max(...scores))) u.push(k)
  move = validMoves[u[Math.floor(Math.random()*u.length)]]
  console.log(await Promise.all(validMoves.map(async (e, i) => await readMove(e)+`: ${scores[i]}`)))
  p(`${await readMove(move, await s(cboard), color)}: ${scores[validMoves.indexOf(move)]}`, cboard.fm, cal)
  console.timeEnd("A")
  return move
  //return validMoves[u[0]]
}
async function readMove(Move, cboard) {
  let ab = "abcdefgh"
  let p = ["",
    "R",
    "N",
    "B",
    "Q",
    "K"]
  //let r = p[(color ? playerPiece: AIPiece).indexOf(cboard.b[Move[0]][Move[1]])]
  try {
    return `${ab[Number(Move[1])]}${Math.abs(Number(Move[0])-8)}${ab[Number(Move[3])]}${Math.abs(Number(Move[2])-8)}${Move[4] ? Move[4]: ""}`
  }
  catch {
    return 0
  }
}
async function AImove(cboard, color) {
  /*let lm = (await glmove(false, await s(cboard)))
   let amove = lm[Math.floor(Math.random()*lm.length)]
   await updateBoard(await mboard(amove, await s(cboard)))*/
  let amove = new Promise(async (resolve, reject) => {
    resolve(findBestMove(await s(cboard), Number(document.getElementById("depth").value), color))}).then(async amove=> {
    for (let i = 0; i < 8; i++)
      for (let j = 0; j < 8; j++)
      board(i, j).classList.remove("aqua")
    board(amove[0], amove[1]).classList.add("aqua")
    board(amove[2], amove[3]).classList.add("aqua")
    await updateBoard(await mboard(amove, await s(cboard)))})
}
let cic = 1
let turn = cic
let whitePiece = "♙♖♘♗♕♔", blackPiece = "♟♜♞♝♛♚"
//tạo bàn cờ
for (let r = 0; r < 8; r++) {
  let row = document.getElementById("board").insertRow(r)
  for (let c = 0; c < 8; c++) {
    const cell = row.insertCell(c)
    cell.className = (c + r) % 2 == 0 ? "white": "black"
    cell.classList.add("td")
    cell.addEventListener("click", selectPieceFC)
  }
}
var board = (i, j) => {
  return document.getElementById("board").querySelectorAll("tr")[i].querySelectorAll("td")[j]
}
var fromMove = [-1, -1]
var toMove = [-1, -1]
var fromMovePos = () => {
  return board(fromMove[0], fromMove[1])
}
var toMovePos = () => {
  return board(toMove[0], toMove[1])
}
var playerPiece = cic ? whitePiece: blackPiece
var AIPiece = !cic ? whitePiece: blackPiece
var nboard = {
  b: [[AIPiece[1],
    AIPiece[2],
    AIPiece[3],
    AIPiece[cic ? 4: 5],
    AIPiece[!cic ? 4: 5],
    AIPiece[3],
    AIPiece[2],
    AIPiece[1]],
    [AIPiece[0],
      AIPiece[0],
      AIPiece[0],
      AIPiece[0],
      AIPiece[0],
      AIPiece[0],
      AIPiece[0],
      AIPiece[0]],
    [" ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " "],
    [" ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " "],
    [" ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " "],
    [" ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " "],
    [playerPiece[0],
      playerPiece[0],
      playerPiece[0],
      playerPiece[0],
      playerPiece[0],
      playerPiece[0],
      playerPiece[0],
      playerPiece[0]],
    [playerPiece[1],
      playerPiece[2],
      playerPiece[3],
      playerPiece[cic ? 4: 5],
      playerPiece[!cic ? 4: 5],
      playerPiece[3],
      playerPiece[2],
      playerPiece[1]]],

  ack: true,
  acq: true,
  pck: true,
  pcq: true,
  turn: cic,
  ep: [-1,
    -1],
  fm: 0
}
nboard.l = []

let isOver = false
reset()
async function reset() {
  isOver = false
  turn = !cic
  var playerPiece = cic ? whitePiece: blackPiece
  var AIPiece = !cic ? whitePiece: blackPiece
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++)
    board(i, j).classList.remove("aqua")
  await updateBoard(await s(nboard))
}
const bpr = document.getElementById("bpr")
const tpr = document.getElementById("tpr")
tpr.classList.add("hide")
bpr.classList.add("hide")
const row = tpr.insertRow(0)
for (let c = 0; c < 4; c++) {
  const cell2 = row.insertCell(c)
  cell2.className = c % 2 == 0 ? "white": "black"
  cell2.innerHTML = playerPiece[c+1]
  cell2.addEventListener("click", selectPiecePP)
}
async function promotePiece() {
  tpr.classList.remove("hide")
  bpr.classList.remove("hide")
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++) {
    board(i, j).removeEventListener("click", selectPieceFC)
  }
}
async function selectPiecePP() {
  switch (this.innerHTML) {
    case playerPiece[1]:
      pieceP = "R"
      break
    case playerPiece[2]:
      pieceP = "N"
      break
    case playerPiece[3]:
      pieceP = "B"
      break
    case playerPiece[4]:
      pieceP = "Q"
      break
  }
  if ((await glmove(true, await s(dboard), [fromMove[0], fromMove[1]])).includes(`${fromMove[0]}${fromMove[1]}${toMove[0]}${toMove[1]}${pieceP}`)) {
    await updateBoard(await mboard(`${fromMove[0]}${fromMove[1]}${toMove[0]}${toMove[1]}${pieceP}`, await s(dboard)))
  }
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++) {
    board(i, j).addEventListener("click", selectPieceFC)
  }
  tpr.classList.add("hide")
  bpr.classList.add("hide")
}
//chọn quân
async function selectPieceFC() {
  if (this.innerHTML != " " && !AIPiece.includes(this.innerHTML)) {
    this.classList.add("red")
    fromMove = [this.parentNode.rowIndex,
      this.cellIndex]
    for (let i = 0; i < 8; i++)
      for (let j = 0; j < 8; j++) {
      board(i, j).removeEventListener("click", selectPieceFC)
      board(i, j).addEventListener("click", selectPieceTC)
    }
  }
}
//chọn nước đi đến
async function selectPieceTC() {
  toMove = [this.parentNode.rowIndex,
    this.cellIndex]
  fromMovePos().classList.remove("red")
  if (playerPiece.includes(fromMovePos().innerHTML) && playerPiece.includes(toMovePos().innerHTML)) {
    fromMove = toMove
    toMovePos().classList.add("red")
    return
  }
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++) {
    board(i, j).removeEventListener("click", selectPieceTC)
    board(i, j).addEventListener("click", selectPieceFC)
  }
  if (turn) {
    if (toMove[0] == 0 && board(fromMove[0], fromMove[1]).innerHTML == playerPiece[0]) {
      await promotePiece()
      return
    }
    if ((await glmove(true, await s(dboard), [fromMove[0], fromMove[1]])).includes(`${fromMove[0]}${fromMove[1]}${toMove[0]}${toMove[1]}`)) {
      await updateBoard(await mboard(`${fromMove[0]}${fromMove[1]}${toMove[0]}${toMove[1]}`, await s(dboard)))
    }
  }
}
//thiết lập lại
function n() {
  console.log("note")
}
function p(...text) {
  document.getElementById("textarea").value = text.join(" ")
  console.log(text.join(" "))
}
//lấy những nước đi hợp lệ
async function glmove(color, cboard, ft = "fc") {
  let lmove = []
  if (ft == "tM") {
    for (let i = 0; i < 8; i++)
      for (let j = 0; j < 8; j++) {
      if (cboard.b[i][j] == " " || (!color ? playerPiece: AIPiece).includes(cboard.b[i][j])) continue
      await cm(i, j)
      if (lmove[0] != undefined) return true
    }
    return false
  }
  if (ft == "fc") {
    for (let i = 0; i < 8; i++)
      for (let j = 0; j < 8; j++) {
      if (cboard.b[i][j] == " " || (!color ? playerPiece: AIPiece).includes(cboard.b[i][j])) continue
      await cm(i, j)
    }
  } else {
    await cm(ft[0], ft[1])
    // p(lmove)
  }
  async function cm(i, j) {
    async function brqTest(brqMovePos, color) {
      for (let pos of brqMovePos) {
        let pos0 = [0,
          0]
        for (let k = 0; k < 8; k++) {
          pos0[0] += pos[0]
          pos0[1] += pos[1]
          if (pos0[0]+i > 7 || pos0[0]+i < 0 || pos0[1]+j > 7 || pos0[1]+j < 0) break
          let n = !color ? playerPiece: AIPiece
          let isCheck = (await isUnderCheck(color, await mboard(`${i}${j}${i+pos0[0]}${j+pos0[1]}`, await s(cboard))))
          if (cboard.b[i+pos0[0]][j+pos0[1]] == " ") {
            if (!isCheck)
              lmove.unshift(`${i}${j}${i+pos0[0]}${j+pos0[1]}`)
            continue
          }
          if (n.includes(cboard.b[i+pos0[0]][j+pos0[1]]) && !isCheck) {
            lmove.unshift(`${i}${j}${i+pos0[0]}${j+pos0[1]}`)
          }
          break
        }
      }
    }
    if (color) {
      switch (cboard.b[i][j]) {
        case playerPiece[0]:
          if (cboard.b[i-1][j] == " " && !(await isUnderCheck(color, await mboard(`${i}${j}${i-1}${j}`, await s(cboard))))) {
            if (i-1 == 0) {
              lmove.push(`${i}${j}${i-1}${j}R`)
              lmove.push(`${i}${j}${i-1}${j}N`)
              lmove.push(`${i}${j}${i-1}${j}B`)
              lmove.push(`${i}${j}${i-1}${j}Q`)
            } else lmove.push(`${i}${j}${i-1}${j}`)
          }
          if (i == 6 && cboard.b[4][j] == " " && cboard.b[5][j] == " " && !(await isUnderCheck(color, await mboard(`${i}${j}4${j}`, await s(cboard))))) lmove.push(`${i}${j}4${j}`)
          if (j-1 > -1)
            if ((AIPiece.includes(cboard.b[i-1][j-1]) || (i-1 == cboard.ep[0] && j-1 == cboard.ep[1])) && !(await isUnderCheck(color, await mboard(`${i}${j}${i-1}${j-1}`, await s(cboard))))) {
            if (i-1 == 0) {
              lmove.push(`${i}${j}${i-1}${j-1}R`)
              lmove.push(`${i}${j}${i-1}${j-1}N`)
              lmove.push(`${i}${j}${i-1}${j-1}B`)
              lmove.push(`${i}${j}${i-1}${j-1}Q`)
            } else lmove.push(`${i}${j}${i-1}${j-1}`)
          }
          if (j+1 < 8)
            if ((AIPiece.includes(cboard.b[i-1][j+1]) || (i-1 == cboard.ep[0] && j+1 == cboard.ep[1])) && !(await isUnderCheck(color, await mboard(`${i}${j}${i-1}${j+1}`, await s(cboard))))) {
            if (i-1 == 0) {
              lmove.push(`${i}${j}${i-1}${j+1}R`)
              lmove.push(`${i}${j}${i-1}${j+1}N`)
              lmove.push(`${i}${j}${i-1}${j+1}B`)
              lmove.push(`${i}${j}${i-1}${j+1}Q`)
            } else lmove.push(`${i}${j}${i-1}${j+1}`)
          }
          break
        case playerPiece[1]:
          await brqTest(rookMovePos, true)
          break
        case playerPiece[2]:
          for (let pos of knightMovePos) {
            if (pos[0]+i > 7 || pos[0]+i < 0 || pos[1]+j > 7 || pos[1]+j < 0) continue
            if (((cboard.b[i+pos[0]][j+pos[1]] == " ") || AIPiece.includes(cboard.b[i+pos[0]][j+pos[1]])) && !(await isUnderCheck(color, await mboard(`${i}${j}${i+pos[0]}${j+pos[1]}`, await s(cboard))))) {
              lmove.push(`${i}${j}${i+pos[0]}${j+pos[1]}`)
            }
          }
          break
        case playerPiece[3]:
          await brqTest(bishopMovePos, true)
          break
        case playerPiece[4]:
          await brqTest(rookMovePos, true)
          await brqTest(bishopMovePos, true)
          break
        case playerPiece[5]:
          for (let pos of kingMovePos) {
            if (pos[0]+i > 7 || pos[0]+i < 0 || pos[1]+j > 7 || pos[1]+j < 0) continue
            if (((cboard.b[i+pos[0]][j+pos[1]] == " ") || AIPiece.includes(cboard.b[i+pos[0]][j+pos[1]])) && !(await isUnderCheck(color, await mboard(`${i}${j}${i+pos[0]}${j+pos[1]}`, await s(cboard))))) {
              lmove.push(`${i}${j}${i+pos[0]}${j+pos[1]}`)
            }
          }
          if (!(await isUnderCheck(color, cboard))) {
            if (!(await isUnderCheck(color, await mboard(`7472`, await s(cboard)))) && cboard.pcq && cboard.b[7][1] == " " && cboard.b[7][2] == " " && cboard.b[7][3] == " ") {
              lmove.push(`7472`)
            }
            if (!(await isUnderCheck(color, await mboard(`7476`, await s(cboard)))) && cboard.pck && cboard.b[7][5] == " " && cboard.b[7][6] == " ") {
              lmove.push(`7476`)
            }
          }
          break
      }
    }
    if (!color) {
      switch (cboard.b[i][j]) {
        case AIPiece[0]:
          if (cboard.b[i+1][j] == " " && !(await isUnderCheck(false, await mboard(`${i}${j}${i+1}${j}`, await s(cboard))))) {
            if (i+1 == 7) {
              lmove.push(`${i}${j}${i+1}${j}R`)
              lmove.push(`${i}${j}${i+1}${j}N`)
              lmove.push(`${i}${j}${i+1}${j}B`)
              lmove.push(`${i}${j}${i+1}${j}Q`)
            } else lmove.push(`${i}${j}${i+1}${j}`)
          }
          if (i == 1 && cboard.b[3][j] == " " && cboard.b[2][j] == " " && !(await isUnderCheck(false, await mboard(`${i}${j}3${j}`, await s(cboard))))) lmove.push(`${i}${j}3${j}`)
          if (j-1 > -1)
            if ((playerPiece.includes(cboard.b[i+1][j-1]) || (i+1 == cboard.ep[0] && j-1 == cboard.ep[1])) && !(await isUnderCheck(false, await mboard(`${i}${j}${i+1}${j-1}`, await s(cboard))))) {
            if (i+1 == 7) {
              lmove.push(`${i}${j}${i+1}${j-1}R`)
              lmove.push(`${i}${j}${i+1}${j-1}N`)
              lmove.push(`${i}${j}${i+1}${j-1}B`)
              lmove.push(`${i}${j}${i+1}${j-1}Q`)
            } else lmove.push(`${i}${j}${i+1}${j-1}`)
          }
          if (j+1 < 8)
            if ((playerPiece.includes(cboard.b[i+1][j+1]) || (i+1 == cboard.ep[0] && j+1 == cboard.ep[1])) && !(await isUnderCheck(false, await mboard(`${i}${j}${i+1}${j+1}`, await s(cboard))))) {
            if (i+1 == 7) {
              lmove.push(`${i}${j}${i+1}${j+1}R`)
              lmove.push(`${i}${j}${i+1}${j+1}N`)
              lmove.push(`${i}${j}${i+1}${j+1}B`)
              lmove.push(`${i}${j}${i+1}${j+1}Q`)
            } else lmove.push(`${i}${j}${i+1}${j+1}`)
          }
          break
        case AIPiece[1]:
          await brqTest(rookMovePos, false)
          break
        case AIPiece[2]:
          for (let pos of knightMovePos) {
            if (pos[0]+i > 7 || pos[0]+i < 0 || pos[1]+j > 7 || pos[1]+j < 0) continue
            if (((cboard.b[i+pos[0]][j+pos[1]] == " ") || playerPiece.includes(cboard.b[i+pos[0]][j+pos[1]])) && !(await isUnderCheck(false, await mboard(`${i}${j}${i+pos[0]}${j+pos[1]}`, await s(cboard))))) {
              lmove.push(`${i}${j}${i+pos[0]}${j+pos[1]}`)
            }
          }
          break
        case AIPiece[3]:
          await brqTest(bishopMovePos, false)
          break
        case AIPiece[4]:
          await brqTest(rookMovePos, false)
          await brqTest(bishopMovePos, false)
          break
        case AIPiece[5]:
          for (let pos of kingMovePos) {
            if (pos[0]+i > 7 || pos[0]+i < 0 || pos[1]+j > 7 || pos[1]+j < 0) continue
            if (((cboard.b[i+pos[0]][j+pos[1]] == " ") || playerPiece.includes(cboard.b[i+pos[0]][j+pos[1]])) && !(await isUnderCheck(false, await mboard(`${i}${j}${i+pos[0]}${j+pos[1]}`, await s(cboard))))) {
              lmove.push(`${i}${j}${i+pos[0]}${j+pos[1]}`)
            }
          }
          if (!(await isUnderCheck(false, cboard))) {
            if (!(await isUnderCheck(false, await mboard(`0402`, await s(cboard)))) && cboard.acq && cboard.b[0][1] == " " && cboard.b[0][2] == " " && cboard.b[0][3] == " ") {
              lmove.push(`0402`)
            }
            if (!(await isUnderCheck(color, await mboard(`0406`, await s(cboard)))) && cboard.ack && cboard.b[0][5] == " " && cboard.b[0][6] == " ") {
              lmove.push(`0406`)
            }
          }
          break
      }
    }
  }
  return lmove
}
//kiểm tra xem vua có đang bị check
//tách bộ nhớ
//trạng thái của board sau khi move
async function mboard(move, cboard) {
  move = [Number(move[0]),
    Number(move[1]),
    Number(move[2]),
    Number(move[3]),
    move[4]]
  if (cboard.b[move[0]][move[1]] == playerPiece[0] || cboard.b[move[0]][move[1]] == AIPiece[0]) {
    cboard.fm = 0
  } else {
    cboard.fm += 1
  }
  if (move[4] != undefined) {
    if (move[0] == 6) {
      switch (move[4]) {
        case "R":
          cboard.b[move[2]][move[3]] = AIPiece[1]
          break
        case "N":
          cboard.b[move[2]][move[3]] = AIPiece[2]
          break
        case "B":
          cboard.b[move[2]][move[3]] = AIPiece[3]
          break
        case "Q":
          cboard.b[move[2]][move[3]] = AIPiece[4]
          break
      }
    }
    if (move[0] == 1) {
      switch (move[4]) {
        case "R":
          cboard.b[move[2]][move[3]] = playerPiece[1]
          break
        case "N":
          cboard.b[move[2]][move[3]] = playerPiece[2]
          break
        case "B":
          cboard.b[move[2]][move[3]] = playerPiece[3]
          break
        case "Q":
          cboard.b[move[2]][move[3]] = playerPiece[4]
          break
      }
    }
  } else {
    cboard.b[move[2]][move[3]] = cboard.b[move[0]][move[1]]
  }
  if (cboard.b[move[0]][move[1]] == playerPiece[1]) {
    if (move[0] == 7 && move[1] == 0) {
      cboard.pcq = false
    }
    if (move[0] == 7 && move[1] == 7) {
      cboard.pck = false
    }
  }
  if (cboard.b[move[0]][move[1]] == playerPiece[5]) {
    if (move[2] == 7 && move[3] == 2 && cboard.pcq) {
      cboard.b[7][0] = " "
      cboard.b[7][3] = playerPiece[1]
    }
    if (move[2] == 7 && move[3] == 6 && cboard.pck) {
      cboard.b[7][7] = " "
      cboard.b[7][5] = playerPiece[1]
    }
    cboard.pcq = false
    cboard.pck = false
  }
  if (cboard.b[move[0]][move[1]] == AIPiece[1]) {
    if (move[0] == 0 && move[1] == 0) {
      cboard.acq = false
    }
    if (move[0] == 0 && move[1] == 7) {
      cboard.ack = false
    }
  }
  if (cboard.b[move[0]][move[1]] == AIPiece[5]) {
    if (move[2] == 0 && move[3] == 2 && cboard.acq) {
      cboard.b[0][0] = " "
      cboard.b[0][3] = AIPiece[1]
    }
    if (move[2] == 0 && move[3] == 6 && cboard.ack) {
      cboard.b[0][7] = " "
      cboard.b[0][5] = AIPiece[1]
    }
    cboard.acq = false
    cboard.ack = false
  }
  if (cboard.ep[0] == move[2] && cboard.ep[1] == move[3]) {
    if (cboard.b[move[0]][move[1]] == playerPiece[0])
      cboard.b[3][move[3]] = " "
    if (cboard.b[move[0]][move[1]] == AIPiece[0])
      cboard.b[4][move[3]] = " "
  }
  cboard.ep = [-1,
    -1]
  if (cboard.b[move[0]][move[1]] == playerPiece[0] && move[0] == 6 && move[2] == 4) {
    cboard.ep = [5,
      move[1]]
  }
  if (cboard.b[move[0]][move[1]] == AIPiece[0] && move[0] == 1 && move[2] == 3) {
    cboard.ep = [2,
      move[1]]
  }
  cboard.b[move[0]][move[1]] = " "
  cboard.turn = AIPiece.includes(cboard.b[move[0]][move[1]])
  cboard.l.push(cboard.b)
  return cboard
}
function isUnderCheck(color, cboard) {
  color = cic == color
  let pd = cic == color ? -1: 1
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (cboard.b[i][j] != (color ? whitePiece[5]: blackPiece[5])) continue
      //hướng đi của pawn
      if (j+1 < 8 && -1 < i+pd && i+pd < 8)
        if (cboard.b[i+pd][j+1] == (!color ? whitePiece[0]: blackPiece[0])) return true
      if (j-1 > -1 && -1 < i+pd && i+pd < 8)
        if (cboard.b[i+pd][j-1] == (!color ? whitePiece[0]: blackPiece[0])) return true
      for (let pos of knightMovePos) {
        if (pos[0]+i > 7 || pos[0]+i < 0 || pos[1]+j > 7 || pos[1]+j < 0) continue
        if (cboard.b[i+pos[0]][j+pos[1]] == (!color ? whitePiece[2]: blackPiece[2])) {
          return true
        }
      }
      for (let pos of kingMovePos) {
        if (pos[0]+i > 7 || pos[0]+i < 0 || pos[1]+j > 7 || pos[1]+j < 0) continue
        if (cboard.b[i+pos[0]][j+pos[1]] == (!color ? whitePiece[5]: blackPiece[5])) {
          return true
        }
      }
      let brqMove = (brqMovePos, index) => {
        for (let pos of brqMovePos) {
          let pos0 = [0,
            0]
          for (let k = 0; k < 8; k++) {
            pos0[0] += pos[0]
            pos0[1] += pos[1]
            if (pos0[0]+i > 7 || pos0[0]+i < 0 || pos0[1]+j > 7 || pos0[1]+j < 0) break
            if (cboard.b[i+pos0[0]][j+pos0[1]] == " ") continue
            if (cboard.b[i+pos0[0]][j+pos0[1]] == (!color ? whitePiece[index]: blackPiece[index]) || cboard.b[i+pos0[0]][j+pos0[1]] == (!color ? whitePiece[4]: blackPiece[4])) {
              return true
            }
            break
          }
        }
        return false
      }
      if (brqMove(rookMovePos, 1) || brqMove(bishopMovePos, 3)) return true
      return false
    }
  }
}
let rookMovePos = [[0, 1], [0, -1], [1, 0], [-1, 0]]
let bishopMovePos = [[-1, 1], [1, -1], [1, 1], [-1, -1]]
let knightMovePos = [[2, 1], [2, -1], [-2, 1], [-2, -1], [-1, 2], [1, 2], [-1, -2], [1, -2]]
let kingMovePos = [[1, 1], [1, 0], [1, -1], [0, 1], [0, -1], [-1, 1], [-1, 0], [-1, -1]]
var reverseArray = (array) => array.slice().reverse()

var pawnEvalWhite =
[
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
  [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
  [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
  [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
  [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
  [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
];

var pawnEvalBlack = reverseArray(pawnEvalWhite);

var knightEval =
[
  [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
  [-4.0, -2.0, 0.0, 0.0, 0.0, 0.0, -2.0, -4.0],
  [-3.0, 0.0, 1.0, 1.5, 1.5, 1.0, 0.0, -3.0],
  [-3.0, 0.5, 1.5, 2.0, 2.0, 1.5, 0.5, -3.0],
  [-3.0, 0.0, 1.5, 2.0, 2.0, 1.5, 0.0, -3.0],
  [-3.0, 0.5, 1.0, 1.5, 1.5, 1.0, 0.5, -3.0],
  [-4.0, -2.0, 0.0, 0.5, 0.5, 0.0, -2.0, -4.0],
  [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
];

var bishopEvalWhite = [
  [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
  [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 1.0, 1.0, 0.5, 0.0, -1.0],
  [-1.0, 0.5, 0.5, 1.0, 1.0, 0.5, 0.5, -1.0],
  [-1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, -1.0],
  [-1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0],
  [-1.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, -1.0],
  [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]/*
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]*/
];

var bishopEvalBlack = reverseArray(bishopEvalWhite);

var rookEvalWhite = [
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [0.0, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0]/*
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]*/
];

var rookEvalBlack = reverseArray(rookEvalWhite);

var evalQueen = [/*
  [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
  [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
  [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
  [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
  [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]*/
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
];

var kingEvalWhite = [

  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
  [-1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
  [2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0],
  [2.0, 3.0, 1.0, 0.0, 0.0, 1.0, 3.0, 2.0]
];

var kingEvalWhite = [

  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
];
var kingEvalBlack = reverseArray(kingEvalWhite);
var posW = [pawnEvalWhite,
  rookEvalWhite,
  knightEval,
  bishopEvalWhite,
  evalQueen,
  kingEvalWhite]
var posB = [pawnEvalBlack,
  rookEvalBlack,
  knightEval,
  bishopEvalBlack,
  evalQueen,
  kingEvalBlack]