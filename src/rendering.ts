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

const drawHeader = (uid: string, element: GridElement, columns: Column[]): void => {
  const colgroup = document.createElement('colgroup')
  element.head.append(colgroup)

  const matrix: Column[][] = []
  const maxColumnIndex = generateHeaderMatrix(matrix, columns)

  for (let columnIndex = 0; columnIndex < maxColumnIndex; columnIndex++) {
    colgroup.append(document.createElement('col'))
  }

  matrix.forEach((row, rowIndex) => {
    const tr = document.createElement('tr')
    element.head.append(tr)

    for (let columnIndex = 0; columnIndex < maxColumnIndex; columnIndex++) {
      if (matrix[rowIndex][columnIndex]) {
        const th = document.createElement('th')
        th.textContent = matrix[rowIndex][columnIndex].label || matrix[rowIndex][columnIndex].id
        tr.append(th)

        let i = 1
        while (matrix[rowIndex + i] && !matrix[rowIndex + i][columnIndex]) i++

        if (i > 1) {
          th.setAttribute('rowspan', String(i))
        }

        i = 1
        while (!matrix[rowIndex][columnIndex + i] && columnIndex + i < maxColumnIndex) i++

        if (i > 1) {
          console.log(matrix[rowIndex])
          th.setAttribute('colspan', String(i))
          columnIndex += i
        }
      }
    }
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
