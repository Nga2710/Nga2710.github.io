self.onmessage = async function(e) {
  var [cic, playerPiece, AIPiece] = e.data[1]
  //self.postMessage(0)
let whitePiece = "♙♖♘♗♕♔", blackPiece = "♟♜♞♝♛♚"

async function minimax(cboard, depth, alpha, beta, color) {
  // Kiểm tra điều kiện dừng đệ quy

  if (depth <= 0) {
    return await eboard(await sm(cboard), color);
  }
  const validMoves = await glmove(color, await sm(cboard))
  if (validMoves) {
    let maxScore = color ? Infinity: -Infinity
    for (let i = 0; i < validMoves.length; i++) {
      const score = await minimax(await mboard(validMoves[i], await sm(cboard)), depth - 1, alpha, beta, !color);
      maxScore = color ? Math.min(maxScore, score): Math.max(maxScore, score)

      /*if (!color) {
      alpha = Math.max(alpha, maxScore)
    } else {
      beta = Math.min(beta, maxScore)}
    if (beta <= alpha) {
      return maxScore;
    }*/

    }
    return maxScore
  } else return await eboard(await sm(cboard), color);

}
async function eboard(cboard, color) {

  let co = await checkOver(await sm(cboard), color)
  if (co !== undefined) {
    return co
  }

  let pp = cboard.pcq*2+cboard.pck*2,

  ap = cboard.acq*2+cboard.ack*2,
  len = [100,
    500,
    300,
    300,
    900,
    0]
  let posW = [pawnEvalWhite,
    rookEvalWhite,
    knightEval,
    bishopEvalWhite,
    evalQueen,
    kingEvalWhite]
  let posB = [pawnEvalBlack,
    rookEvalBlack,
    knightEval,
    bishopEvalBlack,
    evalQueen,
    kingEvalBlack]
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++) {
    if (cboard.b[i][j] == " ") continue
    for (let k = 0; k < 7; k++) {
      if (cboard.b[i][j] == playerPiece[k]) {
        pp += len[playerPiece.indexOf(cboard.b[i][j])] + posW[playerPiece.indexOf(cboard.b[i][j])][i][j]
        break
      }
      if (cboard.b[i][j] == AIPiece[k]) {
        ap += len[AIPiece.indexOf(cboard.b[i][j])] + posB[AIPiece.indexOf(cboard.b[i][j])][i][j]

        break
      }
    }
  }

  return ap-pp
}
async function checkOver(cboard, color) {
  if (cboard.fm >= 100) return 0
  if (!(await glmove(color, await sm(cboard), "tM"))) {
    if (await isUnderCheck(color, await sm(cboard))) {
      return color ? Infinity: -Infinity
    }
    return 0
  }

  let b = 0,
  w = 0
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++) {
    if (cboard.b[i][j] == " ") continue
    if ([playerPiece[0],playerPiece[1],playerPiece[4],AIPiece[0],AIPiece[1],AIPiece[4]].includes(cboard.b[i][j])) return undefined
    switch (cboard.b[i][j]) {
      case playerPiece[2]:
        w += 3
        break;
      case playerPiece[3]:
w+=3
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
  /*[-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
  [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 1.0, 1.0, 0.5, 0.0, -1.0],
  [-1.0, 0.5, 0.5, 1.0, 1.0, 0.5, 0.5, -1.0],
  [-1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, -1.0],
  [-1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0],
  [-1.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, -1.0],
  [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]*/
    [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
];

var bishopEvalBlack = reverseArray(bishopEvalWhite);

var rookEvalWhite = [
  /*[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [0.0, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0]*/
      [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
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
          let isCheck = (await isUnderCheck(color, await mboard(`${i}${j}${i+pos0[0]}${j+pos0[1]}`, await sm(cboard))))
          if (cboard.b[i+pos0[0]][j+pos0[1]] == " ") {
            if (!isCheck)
              lmove.push(`${i}${j}${i+pos0[0]}${j+pos0[1]}`)
            continue
          }
          if (n.includes(cboard.b[i+pos0[0]][j+pos0[1]]) && !isCheck) {
            lmove.push(`${i}${j}${i+pos0[0]}${j+pos0[1]}`)
          }
          break
        }
      }
    }
    if (color) {
      switch (cboard.b[i][j]) {
        case playerPiece[0]:

          if (cboard.b[i-1][j] == " " && !(await isUnderCheck(color, await mboard(`${i}${j}${i-1}${j}`, await sm(cboard))))) {
            if (i-1 == 0) {
              lmove.push(`${i}${j}${i-1}${j}R`)
              lmove.push(`${i}${j}${i-1}${j}N`)
              lmove.push(`${i}${j}${i-1}${j}B`)
              lmove.push(`${i}${j}${i-1}${j}Q`)
            } else lmove.push(`${i}${j}${i-1}${j}`)
          }


          if (i == 6 && cboard.b[4][j] == " " && cboard.b[5][j] == " " && !(await isUnderCheck(color, await mboard(`${i}${j}4${j}`, await sm(cboard))))) lmove.push(`${i}${j}4${j}`)
          if (j-1 > -1)
            if ((AIPiece.includes(cboard.b[i-1][j-1]) || (i-1 == cboard.ep[0] && j-1 == cboard.ep[1])) && !(await isUnderCheck(color, await mboard(`${i}${j}${i-1}${j-1}`, await sm(cboard))))) {
            if (i-1 == 0) {
              lmove.push(`${i}${j}${i-1}${j-1}R`)
              lmove.push(`${i}${j}${i-1}${j-1}N`)
              lmove.push(`${i}${j}${i-1}${j-1}B`)
              lmove.push(`${i}${j}${i-1}${j-1}Q`)
            } else lmove.push(`${i}${j}${i-1}${j-1}`)
          }
          if (j+1 < 8)
            if ((AIPiece.includes(cboard.b[i-1][j+1]) || (i-1 == cboard.ep[0] && j+1 == cboard.ep[1])) && !(await isUnderCheck(color, await mboard(`${i}${j}${i-1}${j+1}`, await sm(cboard))))) {
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
            if (((cboard.b[i+pos[0]][j+pos[1]] == " ") || AIPiece.includes(cboard.b[i+pos[0]][j+pos[1]])) && !(await isUnderCheck(color, await mboard(`${i}${j}${i+pos[0]}${j+pos[1]}`, await sm(cboard))))) {
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
            if (((cboard.b[i+pos[0]][j+pos[1]] == " ") || AIPiece.includes(cboard.b[i+pos[0]][j+pos[1]])) && !(await isUnderCheck(color, await mboard(`${i}${j}${i+pos[0]}${j+pos[1]}`, await sm(cboard))))) {
              lmove.push(`${i}${j}${i+pos[0]}${j+pos[1]}`)
            }

          }
          if (!(await isUnderCheck(color, cboard))) {
            if (!(await isUnderCheck(color, await mboard(`7472`, await sm(cboard)))) && cboard.pcq && cboard.b[7][1] == " " && cboard.b[7][2] == " " && cboard.b[7][3] == " ") {
              lmove.push(`7472`)
            }
            if (!(await isUnderCheck(color, await mboard(`7476`, await sm(cboard)))) && cboard.pck && cboard.b[7][5] == " " && cboard.b[7][6] == " ") {
              lmove.push(`7476`)
            }
          }
          break
      }
    }
    if (!color) {
      switch (cboard.b[i][j]) {
        case AIPiece[0]:

          if (cboard.b[i+1][j] == " " && !(await isUnderCheck(false, await mboard(`${i}${j}${i+1}${j}`, await sm(cboard))))) {
            if (i+1 == 7) {
              lmove.push(`${i}${j}${i+1}${j}R`)
              lmove.push(`${i}${j}${i+1}${j}N`)
              lmove.push(`${i}${j}${i+1}${j}B`)
              lmove.push(`${i}${j}${i+1}${j}Q`)
            } else lmove.push(`${i}${j}${i+1}${j}`)
          }

          if (i == 1 && cboard.b[3][j] == " " && cboard.b[2][j] == " " && !(await isUnderCheck(false, await mboard(`${i}${j}3${j}`, await sm(cboard))))) lmove.push(`${i}${j}3${j}`)
          if (j-1 < 8)
            if ((playerPiece.includes(cboard.b[i+1][j-1]) || (i+1 == cboard.ep[0] && j-1 == cboard.ep[1])) && !(await isUnderCheck(false, await mboard(`${i}${j}${i+1}${j-1}`, await sm(cboard))))) {
            if (i+1 == 7) {
              lmove.push(`${i}${j}${i+1}${j-1}R`)
              lmove.push(`${i}${j}${i+1}${j-1}N`)
              lmove.push(`${i}${j}${i+1}${j-1}B`)
              lmove.push(`${i}${j}${i+1}${j-1}Q`)
            } else lmove.push(`${i}${j}${i+1}${j-1}`)
          }
          if (j-1 > -1)
            if ((playerPiece.includes(cboard.b[i+1][j+1]) || (i+1 == cboard.ep[0] && j+1 == cboard.ep[1])) && !(await isUnderCheck(false, await mboard(`${i}${j}${i+1}${j+1}`, await sm(cboard))))) {
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
            if (((cboard.b[i+pos[0]][j+pos[1]] == " ") || playerPiece.includes(cboard.b[i+pos[0]][j+pos[1]])) && !(await isUnderCheck(false, await mboard(`${i}${j}${i+pos[0]}${j+pos[1]}`, await sm(cboard))))) {
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
            if (((cboard.b[i+pos[0]][j+pos[1]] == " ") || playerPiece.includes(cboard.b[i+pos[0]][j+pos[1]])) && !(await isUnderCheck(false, await mboard(`${i}${j}${i+pos[0]}${j+pos[1]}`, await sm(cboard))))) {
              lmove.push(`${i}${j}${i+pos[0]}${j+pos[1]}`)
            }

          }
          if (!(await isUnderCheck(false, cboard))) {
            if (!(await isUnderCheck(false, await mboard(`0402`, await sm(cboard)))) && cboard.acq && cboard.b[0][1] == " " && cboard.b[0][2] == " " && cboard.b[0][3] == " ") {
              lmove.push(`0402`)
            }
            if (!(await isUnderCheck(color, await mboard(`0406`, await sm(cboard)))) && cboard.ack && cboard.b[0][5] == " " && cboard.b[0][6] == " ") {
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
async function sm(cboard) {
  return JSON.parse(JSON.stringify(cboard))
}
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
  self.postMessage(await minimax(...e.data[0]));
}