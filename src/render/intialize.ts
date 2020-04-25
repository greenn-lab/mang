import renderHeader from './renderHeader'

const appendTableAt = (
  parent: Element,
  table: HTMLTableElement = document.createElement('table'),
  type: string
): HTMLTableElement => {
  table.classList.add(`mang__${type}`)
  parent.append(table)

  return table
}

const createSkeletonElement = (element: GridElement, shape: Shape): void => {
  element.root.classList.add('mang__root')

  const header = document.createElement('header')
  element.head = appendTableAt(header, element.head, 'head')

  const main = document.createElement('main')
  element.body = appendTableAt(main, element.body, 'body')

  if (shape.frozen) {
    element.cage = {
      apex: document.createElement('div'),
      left: document.createElement('div')
    }

    element.apex = appendTableAt(element.cage.apex, element.apex, 'apex')
    element.cage.apex.classList.add('mang__cage-apex')
    header.prepend(element.cage.apex)

    element.left = appendTableAt(element.cage.left, element.left, 'left')
    element.cage.left.classList.add('mang__cage-left')
    main.prepend(element.cage.left)
  }

  element.root.append(header, main)
}

const createHeader = (element: GridElement, shape: Shape, matrix: Column[][]): void => {
  renderHeader(element.head, matrix)

  if (shape.frozen && element.apex) {
    renderHeader(element.apex, matrix, shape.frozen)
  }
}

const createWidthsByColgroup = (element: GridElement, shape: Shape): void => {
  if (shape.columns == null) {
    throw new Error('columns was wrong')
  }

  const colgroup = document.createElement('colgroup')
  const { columns, frozen } = shape
  const { head, body, apex, left, cage } = element

  let totalWidth = 0

  columns.forEach((column, index) => {
    const col = document.createElement('col')

    col.classList.add('mang--col')
    col.dataset.index = String(index)

    if (!column.hide) {
      const width = column.width || 100
      col.style.width = `${width}px`

      totalWidth += width
    }

    colgroup.append(col)
  })

  head.style.width = `${totalWidth}px`
  head.prepend(colgroup)

  if (!frozen) {
    body.style.width = `${totalWidth}px`
    body.prepend(colgroup.cloneNode(true))
  } else {
    const cageWidth = shape.columns
      .filter((column, i) => !column.hide && i < frozen)
      .reduce((width, column) => width + (column.width || 0), 0)

    const cageColgroup = document.createElement('colgroup')
    const bodyColgroup = colgroup.cloneNode(true) as Element

    bodyColgroup.querySelectorAll('col')
      .forEach((col, i) => {
        if (i < frozen) {
          cageColgroup.append(col)
        }
      })

    body.style.width = `${totalWidth - cageWidth}px`
    body.prepend(bodyColgroup)

    element.root.classList.add('mang--frozen')

    if (apex) {
      apex.style.width = `${cageWidth}px`
      apex.prepend(cageColgroup)
    }

    if (left) {
      left.style.width = `${cageWidth}px`
      left.prepend(cageColgroup.cloneNode(true))
    }

    if (cage) {
      cage.apex.style.width = `${cageWidth}px`
      cage.left.style.width = `${cageWidth}px`
    }
  }
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

  createHeader(element, shape, matrix)

  createWidthsByColgroup(element, shape)
}
