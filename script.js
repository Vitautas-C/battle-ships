
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
  ]
}

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
ctx.fillStyle = "bisque"

let cellSize
let cellCount = rnd(7, 15)


calcCellSize(cellCount)
render()

function rnd(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function calcCellSize(cellCount) {
  cellSize = canvas.width / cellCount
}


function clear() {
  ctx.beginPath()
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}


function drawCircle(x, y) {
  ctx.beginPath()
  ctx.arc(x, y, cellSize * 0.1, 0, 2 * Math.PI)
  ctx.stroke()
}


function drawGrid() {
  ctx.beginPath()
  const limit = cellCount * cellSize
  for (let i = cellSize; i < limit - 1; i += cellSize) {
    console.log(i, limit)
    ctx.moveTo(0, i)
    ctx.lineTo(limit, i)
    ctx.moveTo(i, 0)
    ctx.lineTo(i, limit)
  }
  ctx.stroke()
}

function findCoordinates(cellName) {
  const index = "abcdefghijklmnopqrstuvwxyz".indexOf(cellName[0])

  const startX = index * cellSize
  const endX = startX + cellSize
  const endY = cellSize * cellName.slice(1)
  const startY = endY - cellSize

  return { startX, endX, startY, endY }
}

function placeObject(cellName, object = "miss") {
  const { startX, endX, startY, endY } = findCoordinates(cellName)
  if (object == "miss") {
    drawCircle(endX - cellSize / 2, endY - cellSize / 2, cellSize)
  }
}


function render() {
  clear()
  drawGrid()
}
