import renderHeader from './render/renderHeader'

const appendTableAt = (
  parent: Element,
  table: HTMLTableElement,
  type: string
): void => {
  table.classList.add(`mang__${type}`)
  parent.append(table)
}

const createSkeletonElement = (
  { root, head, body, apex, left, cage }: GridElement,
  { frozen }: Shape
): void => {
  root.classList.add('mang__root')

  appendTableAt(cage.head, head, 'head')
  appendTableAt(cage.body, body, 'body')

  if (frozen) {
    appendTableAt(cage.apex, apex, 'apex')
    cage.apex.classList.add('mang__cage-apex')
    cage.head.prepend(cage.apex)

    appendTableAt(cage.left, left, 'left')
    cage.left.classList.add('mang__cage-left')
    cage.body.prepend(cage.left)
  }

  root.append(cage.head, cage.body)
}

const createHeader = ({ head, apex }: GridElement, { frozen }: Shape, matrix: Column[][]): void => {
  renderHeader(head, matrix)

  if (frozen) {
    renderHeader(apex, matrix, frozen)
  }
}

const createFrozenWidthsByColgroup = (
  { root, body, left, apex, cage }: GridElement,
  shape: Shape,
  colgroup: HTMLTableColElement,
  totalWidth: number
): void => {
  const cageWidth = (shape.columns || [])
    .filter((column, i) => !column.hide && i < shape.frozen)
    .reduce((width, column) => width + (column.width || 0), 0)

  const cageColgroup = document.createElement('colgroup')
  const bodyColgroup = colgroup.cloneNode(true) as Element

  bodyColgroup.querySelectorAll('col')
    .forEach((col, i) => {
      if (i < shape.frozen) {
        cageColgroup.append(col)
      }
    })

  shape.body.width = totalWidth - cageWidth

  body.style.left = `${cageWidth}px`
  body.style.width = `${shape.body.width}px`
  body.prepend(bodyColgroup)

  root.classList.add('mang--frozen')

  apex.style.width = `${cageWidth}px`
  apex.prepend(cageColgroup)

  left.style.width = `${cageWidth}px`
  left.prepend(cageColgroup.cloneNode(true))

  cage.apex.style.width = `${cageWidth}px`
  cage.left.style.width = `${cageWidth}px`
}

const createWidthsByColgroup = (element: GridElement, shape: Shape): void => {
  const { head, body } = element
  const { columns = [], frozen } = shape

  const colgroup = document.createElement('colgroup')

  columns.forEach((column, index) => {
    const col = document.createElement('col')
    col.classList.add('mang--col')
    col.dataset.index = String(index)
    col.style.width = column.hide ? '0' : `${column.width || 100}px`
    colgroup.append(col)
  })

  const totalWidth = columns.reduce((width, column) => width
    + (column.hide ? 0 : column.width || 100), 0)

  head.style.width = `${totalWidth}px`
  head.prepend(colgroup)

  if (frozen) {
    createFrozenWidthsByColgroup(element, shape, colgroup, totalWidth)
  } else {
    shape.body.width = totalWidth

    body.style.width = `${totalWidth}px`
    body.prepend(colgroup.cloneNode(true))
  }
}

const calculateColumnMatrix = (
  columns: Column[],
  matrix: Column[][],
  columnIndex: number = 0,
  rowIndex: number = 0,
  keys: string[] = []
): number => {
  columns.forEach(column => {
    if (!matrix[rowIndex]) {
      matrix[rowIndex] = []
    }

    column.keys = keys

    matrix[rowIndex][columnIndex] = column

    if (column.children && column.children.length > 0) {
      columnIndex = calculateColumnMatrix(
        column.children,
        matrix,
        columnIndex,
        rowIndex + 1,
        column.id ? keys.concat(column.id) : keys
      )
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


export default (element: GridElement, shape: Shape, columns: Column[]): void => {
  const matrix: Column[][] = calculatedMatrix(columns, shape)

  createSkeletonElement(element, shape)

  createHeader(element, shape, matrix)

  createWidthsByColgroup(element, shape)

  if (shape.height > 0) {
    shape.body.height = shape.height - element.head.offsetHeight
    element.cage.body.style.height = `${shape.body.height}px`
  }
}
