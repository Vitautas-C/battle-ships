
// function drawGrid() {
//   ctx.moveTo(0, 0)
//   ctx.lineTo(300, 0)

//   ctx.moveTo(0, 100)
//   ctx.lineTo(300, 100)

//   ctx.moveTo(0, 200)
//   ctx.lineTo(300, 200)

//   ctx.moveTo(0, 300)
//   ctx.lineTo(300, 300)

//   ctx.moveTo(0, 0)
//   ctx.lineTo(0, 300)

//   ctx.moveTo(100, 0)
//   ctx.lineTo(100, 300)

//   ctx.moveTo(200, 0)
//   ctx.lineTo(200, 300)

//   ctx.moveTo(300, 0)
//   ctx.lineTo(300, 300)
// }



let canvas = document.querySelector("canvas")
ctx = canvas.getContext("2d")
ctx.fillStyle = "bisque"

ctx.fillRect(0, 0, canvas.width, canvas.height)

function clear() {
  ctx.beginPath()
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function drawGrid(cellCount, cellSize) {
  ctx.beginPath()
  const limit = cellCount * cellSize
  for (let i = 0; i <= limit; i += cellSize) {
    ctx.moveTo(0, i)
    ctx.lineTo(limit, i)
    ctx.moveTo(i, 0)
    ctx.lineTo(i, limit)
  }
  ctx.stroke()
}
// drawGrid()


// function drawCell(x, y, size, lineWidth) {
//   ctx.fillStyle = "green"
//   ctx.fillRect(x, y, size, size)
//   ctx.fillStyle = "bisque"
//   ctx.fillRect(x + lineWidth / 2, y + lineWidth / 2, size - lineWidth, size - lineWidth)
// }

// function drawGrid(cellCount, cellSize) {
//   const limit = cellCount * cellSize
//   for (let x = 0; x < limit; x += cellSize) {
//     for (let y = 0; y < limit; y += cellSize) {
//       drawCell(x, y, cellSize, 2)
//     }
//   }
// }

// function drawGrid(cellCount, cellSize) {
//   const limit = cellCount ** 2
//   for (let i = 0; i < limit; i++) {
//     drawCell(Math.floor(i / cellCount) * cellSize, i % cellCount * cellSize, cellSize, 2)
//   }
// }



function render() {
  clear()
  drawGrid()
}

  // gameState = {
  //   nextPlayer: 0,
  //   boards: [
  //     {
  //       a1: { ship: false, shot: false },
  //       a2: { ship: false, shot: false },
  //       a3: { ship: false, shot: false },
  //       b1: { ship: false, shot: false },
  //       b2: { ship: false, shot: false },
  //       b3: { ship: false, shot: false },
  //       c1: { ship: false, shot: false },
  //       c2: { ship: false, shot: false },
  //       c3: { ship: false, shot: false },
  //     },
  //     {
  //       a1: { ship: false, shot: false },
  //       a2: { ship: false, shot: false },
  //       a3: { ship: false, shot: false },
  //       b1: { ship: false, shot: false },
  //       b2: { ship: false, shot: false },
  //       b3: { ship: false, shot: false },
  //       c1: { ship: false, shot: false },
  //       c2: { ship: false, shot: false },
  //       c3: { ship: false, shot: false },
  //     },
  //   ]
  // }