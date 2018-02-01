const LABEL_OFFSET = 1

const rows = 12
const cols = 12

// data for calculating occupied cells

// create array for number of components in each col
const colComponents = new Array(cols + LABEL_OFFSET)
colComponents[0] = null
const colComponentLengths = []

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

const getRandomInt = (min = 1, max = (rows / 2)) => {
  const randMin = Math.ceil(min)
  const randMax = Math.floor(max)
  return Math.floor(Math.random() * (randMax - randMin + 1)) + randMin
}

const getRandomComponentLength = (setSize) => {
  // max length for each one and subsequent is
  // rows - minSpaces - sum(existingComponentLengths)
  const componentLengths = []
  const data = {}
  data.maxCells = rows
  data.components = setSize // set number of components
  data.minSpaces = data.components - 1
  data.remainingCells = data.maxCells - data.minSpaces

  const { maxCells, components, minSpaces, remainingCells } = data

  let availCells = remainingCells - components
  let total = 0

  for (let i = 0; i < setSize; i++) {
    const length = getRandomInt(1, availCells)
    total += length
    componentLengths.push(length)
  }
  colComponentLengths.push(componentLengths)
}

for (let i = 1; i < cols + LABEL_OFFSET; i++){
  // # of components in each col
  const components = getRandomInt()
  colComponents[i] = components
  getRandomComponentLength(components)
}

colComponentLengths.unshift(null) // offset for empty cell

// create table
for (let i = 0; i < rows + LABEL_OFFSET; i++) {
  const childRow = table.appendChild(rowElem())
  childRow.id = `i${i}`
  for (let j = 0; j < cols + LABEL_OFFSET; j++) {
    const childCol = childRow.appendChild(colElem())
    childCol.id = `i${i}j${j}`
    childCol.style.textAlign = 'center'
    if (!j && i > 0) childRow.innerHTML = i
    if (!i && j > 0) {
      childCol.innerHTML = colComponentLengths[j].reduce(
        (x, acc) => acc + `<div>${x}</div>`,
        '',
      )
    }
  }
}

console.log(colComponents)
