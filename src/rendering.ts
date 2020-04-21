const generateHeaderMatrix = (matrix: Column[][], columns: Column[], columnIndex: number = 0, rowIndex: number = 0): number => {
  columns.forEach(column => {
    if (!matrix[rowIndex]) {
      matrix[rowIndex] = []
    }

    matrix[rowIndex][columnIndex] = column

    if (column.children && column.children.length > 0) {
      columnIndex = generateHeaderMatrix(matrix, column.children, columnIndex, rowIndex + 1)
    } else {
      columnIndex++
    }
  })

  return columnIndex
}

const headerMatrix = (columns: Column[]): Column[][] => {
  const matrix: Column[][] = []
  const columnLength = generateHeaderMatrix(matrix, columns)
  const rowLength = matrix.length

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < columnLength; col++) {
      let index = 1
      while (row + index < rowLength && !matrix[row + index][col]) {
        matrix[row + index][col] = matrix[row][col]
        index++
      }

      while (col + 1 < columnLength && !matrix[row][col + 1]) {
        matrix[row][col + 1] = matrix[row][col]
        col++
      }
    }
  }

  console.log(matrix)

  return matrix
}

const drawHeader = (uid: string, element: GridElement, columns: Column[]): void => {
  const colgroup = document.createElement('colgroup')
  element.head.append(colgroup)

  const matrix: Column[][] = headerMatrix(columns)
  const maxColumnIndex = matrix[0].length

  for (let columnIndex = 0; columnIndex < maxColumnIndex; columnIndex++) {
    colgroup.append(document.createElement('col'))
  }

  matrix.forEach(row => {
    const tr = document.createElement('tr')
    element.head.append(tr)

    row.forEach(col => {
      const th = document.createElement('th')
      th.textContent = col.label || col.id
      tr.append(th)
    })
  })
}

export const initialize = (uid: string, element: GridElement, columns: Column[]): void => {
  element.root.classList.add('mang', 'mang__root', uid)

  const header = document.createElement('header')
  header.append(element.head)
  element.head.classList.add('mang__head')
  element.root.append(header)

  const main = document.createElement('main')
  main.append(element.body)
  element.body.classList.add('mang__body')
  element.root.append(main)

  drawHeader(uid, element, columns)

  element.head.querySelectorAll('.mang__head-column[data-column]')
    .forEach((column) => {
      column.addEventListener('click', () => {
        const columnIndex = Number(column.getAttribute('data-column'))
      })
    })
}
