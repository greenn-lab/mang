import renderHeader from './renderHeader'

const createSkeletonElement = (element: GridElement, shape: Shape): void => {
  element.root.classList.add('mang__root')

  const header = document.createElement('header')
  header.append(element.head)
  element.head.classList.add('mang__head')

  const main = document.createElement('main')
  main.append(element.body)
  element.body.classList.add('mang__body')

  if (shape.frozen) {
    element.apex = document.createElement('table')
    element.apex.classList.add('mang__apex')
    header.prepend(element.apex)

    element.left = document.createElement('table')
    element.left.classList.add('mang__left')
    header.prepend(element.left)
  }

  element.root.append(header, main)
}

const createColgroup = (element: GridElement, shape: Shape): void => {
  if (shape.columns == null) {
    throw new Error('columns was wrong')
  }

  const colgroup = document.createElement('colgroup')

  let total = 0

  shape.columns.forEach((column, index) => {
    const col = document.createElement('col')

    col.classList.add('mang--col')
    col.dataset.index = String(index)

    if (!column.hide) {
      const width = column.width || 100
      col.style.width = `${width}px`

      total += width
    }

    colgroup.append(col)
  })

  element.head.style.width = `${total}px`
  element.head.prepend(colgroup)

  element.body.style.width = `${total}px`
  element.body.prepend(colgroup.cloneNode(true))
}

const calculateColumnMatrix = (columns: Column[], matrix: Column[][], columnIndex: number = 0, rowIndex: number = 0): number => {
  columns.forEach(column => {
    if (!matrix[rowIndex]) {
      matrix[rowIndex] = []
    }

    matrix[rowIndex][columnIndex] = column

    if (column.children && column.children.length > 0) {
      columnIndex = calculateColumnMatrix(column.children, matrix, columnIndex, rowIndex + 1)
    } else {
      columnIndex++
    }
  })

  return columnIndex
}

const calculatedMatrix = (columns: Column[], shape: Shape): Column[][] => {
  const matrix: Column[][] = []
  const columnLength = calculateColumnMatrix(columns, matrix)
  const rowLength = matrix.length

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < columnLength; col++) {
      matrix[row][col].index = col

      let next = 1
      while (row + next < rowLength && !matrix[row + next][col]) {
        matrix[row + next][col] = { mocker: true, ...matrix[row][col] }
        matrix[row][col].rowspan = ++next
      }

      next = 1
      while (col + next < columnLength && !matrix[row][col + next]) {
        matrix[row][col + next] = { mocker: true, ...matrix[row][col] }
        matrix[row][col].colspan = ++next
      }

      if (next > 1) {
        col += next - 1
      }
    }
  }

  shape.columns = matrix[matrix.length - 1]
  return matrix
}


export const initialize = (element: GridElement, shape: Shape, columns: Column[]): void => {
  const matrix: Column[][] = calculatedMatrix(columns, shape)

  createSkeletonElement(element, shape)

  renderHeader(element, matrix)

  createColgroup(element, shape)
}
