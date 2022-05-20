
// boat
// battleship
// destroyer
// aircraft carrier

const gameState = {
  nextPlayer: 0,
  boards: [
    {
      a1: { ship: false, shot: false },
      a2: { ship: false, shot: false },
      a3: { ship: false, shot: false },
      b1: { ship: false, shot: false },
      b2: { ship: false, shot: false },
      b3: { ship: false, shot: false },
      c1: { ship: false, shot: false },
      c2: { ship: false, shot: false },
      c3: { ship: false, shot: false },
    },
    {
      a1: { ship: false, shot: false },
      a2: { ship: false, shot: false },
      a3: { ship: false, shot: false },
      b1: { ship: false, shot: false },
      b2: { ship: false, shot: false },
      b3: { ship: false, shot: false },
      c1: { ship: false, shot: false },
      c2: { ship: false, shot: false },
      c3: { ship: false, shot: false },
    },
  ],
  ship: [
    [
      ["a1"],
      ["a2"],
      ["a3"],
      ["a4"],
      ["a1", "a2"],
      ["a3", "a4"],
      ["a5", "a6"],
      ["a1", "a2", "a3"],
      ["a4", "a5", "a6"],
      ["a1", "a2", "a3", "a4"],
    ],
    [
      ["a1"],
      ["a2"],
      ["a3"],
      ["a4"],
      ["a1", "a2"],
      ["a3", "a4"],
      ["a5", "a6"],
      ["a1", "a2", "a3"],
      ["a4", "a5", "a6"],
      ["a1", "a2", "a3", "a4"],
    ],
  ]
}


const canvas1 = document.querySelector(".player1")
const ctx1 = canvas1.getContext("2d")
ctx1.fillStyle = "bisque"

const canvas2 = document.querySelector(".player2")
const ctx2 = canvas2.getContext("2d")
ctx2.fillStyle = "bisque"


const alphabet = "abcdefghijklmnopqrstuvwxyz"

let cellSize
// let cellCount = rnd(9, 15)
let cellCount = 10



calcCellSize(cellCount)
render()
prepareState(cellCount)

function rnd(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function calcCellSize(cellCount) {
  cellSize = canvas1.width / cellCount
}

function prepareState(cellCount) {
  for (let k = 0; k < 2; k++) {
    gameState.boards[k] = {}
    for (let i = 0; i < cellCount; i++) {
      for (let j = 1; j <= cellCount; j++) {
        const keyName = alphabet[i] + j
        gameState.boards[k][keyName] = { ship: false, shot: false }
      }
    }

  }
}

function shoot(targetPlayer, target) {
  gameState.boards[targetPlayer][target].shot = true
  return gameState.boards[targetPlayer][target].ship
}



function clear() {
  ctx1.beginPath()
  ctx1.fillRect(0, 0, canvas1.width, canvas1.height)
}

function clear2() {
  ctx2.beginPath()
  ctx2.fillRect(0, 0, canvas2.width, canvas2.height)
}

function drawCircle(x, y, r, color, fill = false) {

  ctx1.beginPath()
  ctx1.arc(x, y, r, 0, 2 * Math.PI)
  if (color) {
    ctx1.fillStyle = ctx1.strokeStyle = color
  }
  if (fill) {
    ctx1.fill()
  } else {
    ctx1.stroke()
  }
}

function drawCircle2(x, y, r, color, fill = false) {

  ctx2.beginPath()
  ctx2.arc(x, y, r, 0, 2 * Math.PI)
  if (color) {
    ctx2.fillStyle = ctx2.strokeStyle = color
  }
  if (fill) {
    ctx2.fill()
  } else {
    ctx2.stroke()
  }
}


function getAngle(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1);
}


function getEndXY(x, y, length, angle) {
  return {
    x: x - Math.cos(Math.PI - angle) * length,
    y: y + Math.sin(Math.PI - angle) * length
  }
}

function drawArc(beginX, beginY, endX, endY, curvature, lineWidth, color, continues = false, lineCap = "round") {
  if (curvature < 0) {
    curvature = -curvature;
    [beginX, beginY, endX, endY] = [endX, endY, beginX, beginY];
  }
  const angle = getAngle(beginX, beginY, endX, endY);
  const chordLength = Math.hypot((endX - beginX), (endY - beginY));
  const height = chordLength * curvature;
  const radius = height / 2 + chordLength ** 2 / 8 * 1 / height;
  const middleX = (endX + beginX) / 2;
  const middleY = (endY + beginY) / 2;
  const { x, y } = getEndXY(middleX, middleY, radius - height, angle + Math.PI / 2);
  const startAngle = getAngle(x, y, beginX, beginY);
  const endAngle = getAngle(x, y, endX, endY);
  if (!continues) {
    ctx1.beginPath()
  }
  ctx1.arc(x, y, radius, startAngle, endAngle);
  ctx1.lineWidth = lineWidth;
  ctx1.strokeStyle = color;
  ctx1.lineCap = lineCap;
  ctx1.stroke();
}

function drawArc2(beginX, beginY, endX, endY, curvature, lineWidth, color, continues = false, lineCap = "round") {
  if (curvature < 0) {
    curvature = -curvature;
    [beginX, beginY, endX, endY] = [endX, endY, beginX, beginY];
  }
  const angle = getAngle(beginX, beginY, endX, endY);
  const chordLength = Math.hypot((endX - beginX), (endY - beginY));
  const height = chordLength * curvature;
  const radius = height / 2 + chordLength ** 2 / 8 * 1 / height;
  const middleX = (endX + beginX) / 2;
  const middleY = (endY + beginY) / 2;
  const { x, y } = getEndXY(middleX, middleY, radius - height, angle + Math.PI / 2);
  const startAngle = getAngle(x, y, beginX, beginY);
  const endAngle = getAngle(x, y, endX, endY);
  if (!continues) {
    ctx2.beginPath()
  }
  ctx2.arc(x, y, radius, startAngle, endAngle);
  ctx2.lineWidth = lineWidth;
  ctx2.strokeStyle = color;
  ctx2.lineCap = lineCap;
  ctx2.stroke();
}

function drawShip(cellName, length, color, vertical = false) {
  const { startX, endX, startY, endY } = findCoordinates(cellName)
  const curvature = length < 3 ? 0.2 : length > 3 ? 0.11 : 0.13

  if (length != 1) {
    if (vertical) {
      const x1 = startX + 3
      const x2 = (startX + cellSize * length) - 3
      const y1 = startY + cellSize / 2
      const y2 = y1

      drawArc(x1, y1, x2, y2, curvature, 2, color)
      drawArc(x1, y1, x2, y2, -curvature, 2, color, true)
    } else {
      const x1 = startX + cellSize / 2
      const x2 = x1
      const y1 = startY + 3
      const y2 = (startY + cellSize * length) - 3

      drawArc(x1, y1, x2, y2, curvature, 2, color)
      drawArc(x1, y1, x2, y2, -curvature, 2, color, true)
    }
  } else {
    const x1 = startX + 3
    const x2 = endX - 3
    const y1 = startY + 3
    const y2 = endY - 3

    drawArc(x1, y1, x2, y2, curvature, 2, color)
    drawArc(x1, y1, x2, y2, -curvature, 2, color, true)
  }
  ctx1.fillStyle = color
  ctx1.fill()
}

function drawShip2(cellName, length, color, vertical = false) {
  const { startX, endX, startY, endY } = findCoordinates(cellName)
  const curvature = length < 3 ? 0.2 : length > 3 ? 0.11 : 0.13

  if (length != 1) {
    if (vertical) {
      const x1 = startX + 3
      const x2 = (startX + cellSize * length) - 3
      const y1 = startY + cellSize / 2
      const y2 = y1

      drawArc2(x1, y1, x2, y2, curvature, 2, color)
      drawArc2(x1, y1, x2, y2, -curvature, 2, color, true)
    } else {
      const x1 = startX + cellSize / 2
      const x2 = x1
      const y1 = startY + 3
      const y2 = (startY + cellSize * length) - 3

      drawArc2(x1, y1, x2, y2, curvature, 2, color)
      drawArc2(x1, y1, x2, y2, -curvature, 2, color, true)
    }
  } else {
    const x1 = startX + 3
    const x2 = endX - 3
    const y1 = startY + 3
    const y2 = endY - 3

    drawArc2(x1, y1, x2, y2, curvature, 2, color)
    drawArc2(x1, y1, x2, y2, -curvature, 2, color, true)
  }
  ctx2.fillStyle = color
  ctx2.fill()
}

function drawSmoke(cellName) {
  const { startX, endX, startY, endY } = findCoordinates(cellName)
  let x = endX - cellSize / 2
  let y = endY - cellSize / 2
  let r = cellSize / 7
  drawCircle(x, y, r, "black", true)
  drawCircle(x += cellSize / 9, y -= cellSize / 6, r += cellSize / 15, "DimGrey", true)
  drawCircle(x += cellSize / 9, y -= cellSize / 6, r += cellSize / 15, "Gray", true)
  drawCircle(x += cellSize / 15, y -= cellSize / 12, r -= cellSize / 15, "DarkGrey", true)
}

function drawSmoke2(cellName) {
  const { startX, endX, startY, endY } = findCoordinates(cellName)
  let x = endX - cellSize / 2
  let y = endY - cellSize / 2
  let r = cellSize / 7
  drawCircle2(x, y, r, "black", true)
  drawCircle2(x += cellSize / 9, y -= cellSize / 6, r += cellSize / 15, "DimGrey", true)
  drawCircle2(x += cellSize / 9, y -= cellSize / 6, r += cellSize / 15, "Gray", true)
  drawCircle2(x += cellSize / 15, y -= cellSize / 12, r -= cellSize / 15, "DarkGrey", true)
}

drawShip("a1", 4, "hsl(120, 60%, 80%)", true)
drawShip("f1", 3, "hsl(120, 60%, 70%)", true)
drawShip("j1", 3, "hsl(120, 60%, 70%)")
drawShip("a3", 2, "hsl(120, 60%, 60%)", true)
drawShip("d3", 2, "hsl(120, 60%, 60%)", true)
drawShip("g3", 2, "hsl(120, 60%, 60%)", true)
drawShip("a5", 1, "hsl(120, 60%, 50%)")
drawShip("c5", 1, "hsl(120, 60%, 50%)")
drawShip("e5", 1, "hsl(120, 60%, 50%)")
drawShip("g5", 1, "hsl(120, 60%, 50%)")

drawSmoke("a3")
drawSmoke("b3")
drawSmoke("a5")
drawSmoke("c5")
drawSmoke("e5")
drawSmoke("g5")

// drawShip2("a1", 4, "hsl(240, 60%, 80%)", true)
// drawShip2("f1", 3, "hsl(240, 60%, 70%)", true)
// drawShip2("j1", 3, "hsl(240, 60%, 70%)")
drawShip2("a3", 2, "hsl(240, 60%, 60%)", true)
// drawShip2("d3", 2, "hsl(240, 60%, 60%)", true)
// drawShip2("g3", 2, "hsl(240, 60%, 60%)", true)
drawShip2("a5", 1, "hsl(240, 60%, 50%)")
// drawShip2("c5", 1, "hsl(240, 60%, 50%)")
// drawShip2("e5", 1, "hsl(240, 60%, 50%)")
// drawShip2("g5", 1, "hsl(240, 60%, 50%)")

drawSmoke2("a3")
drawSmoke2("b3")
drawSmoke2("a5")

function drawGrid() {
  ctx1.beginPath()
  const limit = cellCount * cellSize
  for (let i = cellSize; i < limit - 1; i += cellSize) {
    console.log(i, limit)
    ctx1.moveTo(0, i)
    ctx1.lineTo(limit, i)
    ctx1.moveTo(i, 0)
    ctx1.lineTo(i, limit)
  }
  ctx1.stroke()
}

function drawGrid2() {
  ctx2.beginPath()
  const limit = cellCount * cellSize
  for (let i = cellSize; i < limit - 1; i += cellSize) {
    console.log(i, limit)
    ctx2.moveTo(0, i)
    ctx2.lineTo(limit, i)
    ctx2.moveTo(i, 0)
    ctx2.lineTo(i, limit)
  }
  ctx2.stroke()
}

function findCoordinates(cellName) {
  const index = alphabet.indexOf(cellName[0])

  const startX = index * cellSize
  const endX = startX + cellSize
  const endY = cellSize * cellName.slice(1)
  const startY = endY - cellSize

  return { startX, endX, startY, endY }
}

function placeObject(cellName, object = "miss") {
  const { startX, endX, startY, endY } = findCoordinates(cellName)
  if (object == "miss") {
    drawCircle(endX - cellSize / 2, endY - cellSize / 2, cellSize * 0.1, "black")
  }
}


placeObject("g6")


function render() {
  clear()
  drawGrid()
  clear2()
  drawGrid2()
}

/*
экран приветствия
выбор игрока
выбор размера поля
два поля, свое и результат действий на поле противника
сбитые свои, сбитые противника
победитель
*/