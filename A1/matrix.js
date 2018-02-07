/*
  COMPLETED FUNCTIONALITY:
  - reveal answers
  - hide answers
  - toggle cells
  - reset table
  - check answers
  - show row labels *NOTE: row label is 1 behind for some reason
*/

const LABEL_OFFSET = 1

const rows = 12
const cols = 12

/********* DOM node creation methods **********/

const table = document.getElementById('root')

const rowElem = () => {
  const elem = document.createElement('tr')
  elem.className = 'row'
  return elem
}

const colElem = () => {
  const elem = document.createElement('td')
  elem.className = 'col'
  return elem
}

/*********************************************/

let matrix = []
let answerMatrix = []
let rowLabels = []
let colLabels = []

const getRandomBit = (min = 0, max = 1) => {
  const randMin = Math.ceil(min)
  const randMax = Math.floor(max)
  return Math.floor(Math.random() * (randMax - randMin + 1)) + randMin
}

const createRowLabel = length => `<span>${length}&nbsp;</span>`

const generateNewMatrix = () => {
  matrix = []
  rowLabels = []
  for (let r = 0; r < rows + LABEL_OFFSET; r++) {
    matrix.push([])
    rowLabels.push([])
    colLabels.push([])

    let rowPrevious = 0
    let rowLength = 0
    for (let c = 0; c < cols + LABEL_OFFSET; c++) {
      const bit = getRandomBit()
      matrix[r].push(bit)

      if (bit) {
        rowLength += 1
        rowPrevious = bit
      } else if (rowPrevious && !bit && rowLength > 0) {
        rowLabels[r].push(createRowLabel(rowLength))
        rowLength = 0
      }
    }
  }
}

const clearAnswerMatrix = () => {
  answerMatrix = []
  for (let r = 0; r < rows + LABEL_OFFSET; r++) {
    answerMatrix.push([])
    for (let c = 0; c < cols + LABEL_OFFSET; c++) {
      answerMatrix[r].push(0)
    }
  }
}

const checkAnswers = () => {
  let correct = true
  for (let r = 1; r < rows + LABEL_OFFSET; r++) {
    for (let c = 1; c < cols + LABEL_OFFSET; c++) {
      if (matrix[r][c] !== answerMatrix[r][c]) {
        correct = false
        break
      }
    }
  }
  {
    correct ? alert('Correct!') : alert('Incorrect!')
  }
}

const toggleCell = (r, c) => {
  const target = document.querySelector(`#r${r}c${c}`)
  if (target.style.backgroundColor === 'black') {
    target.style.backgroundColor = 'white'
  } else {
    target.style.backgroundColor = 'black'
  }
  answerMatrix[r][c] = 1
}

// create table
const createTable = () => {
  for (let r = 0; r < rows + LABEL_OFFSET; r++) {
    const childRow = table.appendChild(rowElem())
    childRow.id = `r${r}`
    for (let c = 0; c < cols + LABEL_OFFSET; c++) {
      // cell labels
      const childCol = childRow.appendChild(colElem())
      childCol.id = `r${r}c${c}`
      childCol.onclick = () => toggleCell(r, c)

      if (!c && r > 0) {
        childRow.innerHTML = rowLabels[r].reduce((x, acc) => x + acc, '')
      }
      if (!r && c > 0) {
        childCol.innerHTML = c
      }
    }
  }
}

const fillTable = () => {
  hideTable()
  clearAnswerMatrix()
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (matrix[r][c]) {
        const target = document.querySelector(`#r${r + 1}c${c + 1}`)
        target.style.backgroundColor = 'black'
      }
    }
  }
}

const resetTable = () => {
  generateNewMatrix()
  clearAnswerMatrix()
  hideTable()
}

const hideTable = () => {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const target = document.querySelector(`#r${r + 1}c${c + 1}`)
      target.style.backgroundColor = 'white'
    }
  }
}

// on DOM ready
generateNewMatrix()
createTable()
clearAnswerMatrix()
