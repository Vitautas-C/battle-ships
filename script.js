/*
экран приветствия
выбор игрока
выбор размера поля
два поля, свое и результат действий на поле противника
сбитые свои, сбитые противника
победитель
*/

// boat
// battleship
// destroyer
// aircraft carrier

// const gameState = {
//   nextPlayer: 0,
//   boards: [
//     {
//       a1: { ship: true, shot: false },
//       a2: { ship: true, shot: false },
//       a3: { ship: true, shot: false },
//       b1: { ship: false, shot: false },
//       b2: { ship: false, shot: false },
//       b3: { ship: false, shot: false },
//       c1: { ship: true, shot: false },
//       c2: { ship: false, shot: false },
//       c3: { ship: true, shot: false },
//     },
//     {
//       a1: { ship: true, shot: false },
//       a2: { ship: true, shot: false },
//       a3: { ship: true, shot: false },
//       b1: { ship: false, shot: false },
//       b2: { ship: false, shot: false },
//       b3: { ship: false, shot: false },
//       c1: { ship: true, shot: false },
//       c2: { ship: false, shot: false },
//       c3: { ship: true, shot: false },
//     },
//   ],
//   ships: [
//     [
//       ["a1", "a2", "a3"],
//       ["c1"],
//       ["c3"],
//     ],
//     [
//       ["a1", "a2", "a3"],
//       ["c1"],
//       ["c3"],
//     ],
//   ],

// shipsMap: [
//   {
//     startCell: "a1",
//     length: 3,
//     direction: false,
//     color: `hsl(120, 60%, ${40 + ship.length * 10}%)`,
//   },
//   {
//     startCell: "c1",
//     length: 1,
//     direction: false,
//     color: `hsl(120, 60%, ${40 + ship.length * 10}%)`,
//   },
//   {
//     startCell: "c3",
//     length: 1,
//     direction: false,
//     color: `hsl(120, 60%, ${40 + ship.length * 10}%)`,
//   },
// ]
// }

// const shipsMap = ships.map(ship => (
//   {
//     starCell: ship,
//     length: ship.length,
//     direction: ship.length < 2 ? false : ship[0][0] == ship[1][0] ? true : false,
//     color: `hsl(${hue}, 60%, ${40 + ship.length * 10}%)`,
//   })
// )

// const canvas = document.querySelector("canvas")
// const ctx1 = canvas.getContext("2d")
// ctx1.fillStyle = "bisque"


// let cellSize
// let cellCount = rnd(9, 15)
// let cellCount = 10


const alphabet = "abcdefghijklmnopqrstuvwxyz"

const players = [
  { board: 0, ships: [0], hue: 120, goesNext: true },
  { board: 1, ships: [0], hue: 240, goesNext: false }

]
const boards = [
  { player: 0, cellCount: 10, cellSize: 50 },
  { player: 1, cellCount: 10, cellSize: 50 }
]
const cells = [
  ...buildCells(boards[0].cellCount, boards[0].cellSize, 0),
  ...buildCells(boards[1].cellCount, boards[1].cellSize, 1)
  // { board: 0, cellName: "a1", x: 0, y: 0, ship: null, shot: true },
]
const ships = [
  // { player: 0, board: 1, startCell: "a1", length: 1, vertical: false, color: "hsl(120,70%,50%)", alive: false, sections: ["a1"] },
  ...buildShips(0, 1, players[0].hue),
  // ...buildShips(1, 1, players[1].hue)
]
const shots = [
  { player: 0, board: 1, cellName: "a1", hit: true }
]

// const cellsByName = boards.map((_, i) => Object.fromEntries(cells.filter(cell => cell.board == i).map(cell => [cell.cellName, cell])))

const cellsByName = boards.map((_, i) => {
  const boardCells = cells.filter(cell => cell.board == i)
  const boardEntries = boardCells.map(cell => [cell.cellName, cell])
  const boardCellsByName = Object.fromEntries(boardEntries)
  console.log(boardCells, boardEntries, boardCellsByName)
  return boardCellsByName
})

/*записать индексы кораблей в соответствующие ячейки*/
for (let i = 0; i < ships.length; i++) {
  ships[i].sections.forEach(section => { cellsByName[ships[i].board][section].ship = i })
}



class GameBoard {
  constructor() {
    this.canvas = document.createElement("canvas")
    this.ctx = this.canvas.getContext("2d")
  }
  resize() {
    this.canvas.width = this.canvas.height = this.side = this.cellCount * this.cellSize
  }

  clear() {
    this.ctx.clearRect(0, 0, this.side, this.side)
  }

  drawGrid() {
    const { ctx, cellCount, cellSize } = this
    ctx.beginPath()
    for (let i = cellSize; i < this.side - 1; i += cellSize) {
      ctx.moveTo(0, i)
      ctx.lineTo(this.side, i)
      ctx.moveTo(i, 0)
      ctx.lineTo(i, this.side)
    }
    ctx.stroke()
  }

  drawShip({ board, startCell, length, vertical, color }) {
    const { cellSize, ctx } = this
    const { x, y } = cellsByName[board][startCell]
    const curvature = length < 3 ? 0.2 : length > 3 ? 0.11 : 0.13

    if (length != 1) {
      if (vertical) {
        const x1 = x + cellSize / 2
        const x2 = x1
        const y1 = y + 3
        const y2 = (y + cellSize * length) - 3

        drawArc(ctx, x1, y1, x2, y2, curvature, 2, color)
        drawArc(ctx, x1, y1, x2, y2, -curvature, 2, color, true)
      } else {
        const x1 = x + 3
        const x2 = (x + cellSize * length) - 3
        const y1 = y + cellSize / 2
        const y2 = y1

        drawArc(ctx, x1, y1, x2, y2, curvature, 2, color)
        drawArc(ctx, x1, y1, x2, y2, -curvature, 2, color, true)
      }
    } else {
      const x1 = x + 3
      const x2 = x + cellSize - 3
      const y1 = y + 3
      const y2 = y + cellSize - 3

      drawArc(ctx, x1, y1, x2, y2, curvature, 2, color)
      drawArc(ctx, x1, y1, x2, y2, -curvature, 2, color, true)
    }
    ctx.fillStyle = color
    ctx.fill()
  }

  render({ cellCount, cellSize }, ships, fow = false) {
    this.cellCount = cellCount
    this.cellSize = cellSize
    this.resize()
    this.drawGrid()
    ships.forEach(ship => this.drawShip(ship))
  }
}


const leftBoard = new GameBoard()
const rightBoard = new GameBoard()

document.body.append(leftBoard.canvas, rightBoard.canvas)
leftBoard.render(boards[0], ships.filter(ship => ship.board == 0 && ship.player == 0))
rightBoard.render(boards[1], ships.filter(ship => ship.board == 1 && ship.player == 0))

rightBoard.canvas.onclick = ({ offsetX, offsetY }) => {
  const row = Math.floor(offsetY / rightBoard.cellSize) + 1
  const column = alphabet[Math.floor(offsetX / rightBoard.cellSize)]
  const cellName = column + row
  const cell = cellsByName[1][cellName]
  console.log(cell)
  if (cell.ship != null) {
    // ships[cell.ship].board = 0
    // cellsByName[0][cellName].ship = cell.ship

    const ship = ships[cell.ship]


    console.log(ship.sections)
    ship.sections.forEach(
      /*выполнить несколько раз*/
    )
    /* сделать что-то с ячейкой */

    // cell.ship = null
    // leftBoard.render(boards[0], ships.filter(ship => ship.board == 0 && ship.player == 0))
    // rightBoard.render(boards[1], ships.filter(ship => ship.board == 1 && ship.player == 0))
  }
}

function rnd(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function calcCellSize(cellCount) {
  cellSize = canvas.width / cellCount
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
  ctx1.fillRect(0, 0, canvas.width, canvas.height)
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



function getAngle(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1);
}


function getEndXY(x, y, length, angle) {
  return {
    x: x - Math.cos(Math.PI - angle) * length,
    y: y + Math.sin(Math.PI - angle) * length
  }
}

function drawArc(ctx, beginX, beginY, endX, endY, curvature, lineWidth, color, continues = false, lineCap = "round") {
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
    ctx.beginPath()
  }
  ctx.arc(x, y, radius, startAngle, endAngle);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.lineCap = lineCap;
  ctx.stroke();
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


// drawShip("a1", 4, "red", true)
// drawShip("a3", 2, "green")
// drawShip("b1", 3, "magenta")
// drawShip("b4", 4, "blue")
// drawShip("c3", 2, "yellow", true)
// drawShip("b1", 3, "lime", true)
// drawShip("b4", 4, "yellowgreen", true)

// drawSmoke("a1")
// drawSmoke("c3")
// drawSmoke("e5")
// drawSmoke("e6")

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


function findCoordinates(cellName, cellSize) {
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


function render() {
  clear()
  drawGrid()
}




function buildCells(cellCount, cellSize, board) {
  const cells = []
  for (let row = 1; row <= cellCount; row++) {
    for (let column = 0; column < cellCount; column++) {
      cells.push({ board, cellName: alphabet[column] + row, x: column * cellSize, y: (row - 1) * cellSize, ship: null, shot: false })
    }
  }
  return cells
}

function findSections(startCell, length, vertical) {
  const sections = []
  if (vertical) {
    for (let i = 0; i < length; i++) {
      sections.push(startCell[0] + (+startCell.slice(1) + i))
    }
  } else {
    const offset = alphabet.indexOf(startCell[0])
    for (let i = 0; i < length; i++) {
      sections.push((alphabet[i + offset]) + (+startCell.slice(1)))
    }
  }
  return sections
}

function buildShips(player, board, hue) {
  const vertical = false
  const ships = []
  for (let length = 1; length <= 4; length++) {
    for (let i = 0; i <= 4 - length; i++) {
      const startCell = alphabet[i * length] + (length)
      const color = `hsl(${hue},70%,${40 + length * 10}%)`
      const sections = findSections(startCell, length, vertical)
      ships.push({ player, board, startCell, length, vertical: false, color, alive: true, sections },)

    }
  }
  return ships
  // ({ player: 0, board: 1, startCell: "a1", length: 1, vertical: false, color: "hsl(120,70%,50%)", alive: false, sections: ["a1"] })
}

