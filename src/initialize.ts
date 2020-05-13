import renderHeader from './render/renderHeader'


function appendTableAt(parent: Element, table: HTMLTableElement, type: string): void {
  table.classList.add(`mang__${type}`)
  parent.append(table)
}

function properlyFrozen(matrix: Column[][], shape: Shape): void {
  const isProperlyFrozen = (): boolean => {
    if (shape.frozen === 0) {
      return true
    }

    for (let i = 0; i < matrix.length - 1; i++) {
      if (matrix[i][shape.frozen].children && matrix[i][shape.frozen - 1].children) {
        return false
      }
    }

    return true
  }

  try {
    while (!isProperlyFrozen()) {
      shape.frozen++
    }
  } catch (e) {
    shape.frozen = 0
  }
}

function compositeElements(
  { root, head, body, apex, left, cage }: GridElement,
  shape: Shape,
  matrix: Column[][]
): void {
  root.classList.add('mang__root')

  appendTableAt(cage.head, head, 'head')
  appendTableAt(cage.body, body, 'body')

  if (shape.frozen) {
    properlyFrozen(matrix, shape)

    appendTableAt(cage.apex, apex, 'apex')
    cage.apex.classList.add('mang__cage-apex')
    cage.head.prepend(cage.apex)

    appendTableAt(cage.left, left, 'left')
    cage.left.classList.add('mang__cage-left')
    cage.body.prepend(cage.left)
  }

  root.append(cage.head, cage.body)
}

function createColgroup({ body, head, left, apex }: GridElement, { columns }: Shape): void {
  const colgroup = () => document.createElement('colgroup')
  head.prepend(colgroup())
  body.prepend(colgroup())
  left.prepend(colgroup())
  apex.prepend(colgroup())

  const col = (): HTMLTableColElement => document.createElement('col')
  columns.forEach(column => {
    column.cols = [col(), col()]
  })
}

function calculateColumnMatrix(
  columns: Column[],
  matrix: Column[][],
  columnIndex: number = 0,
  rowIndex: number = 0,
  keys: string[] = []
): number {
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

function calculatedMatrix(columns: Column[], shape: Shape): Column[][] {
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
  shape.columnMap = shape.columns
    .reduce((obj, column) => ({ ...obj, [column.id]: column }), {})

  return matrix
}

function createDataCellTemplate(column: Column): HTMLTableDataCellElement {
  const { id, type, align, pattern } = column
  const td = document.createElement('td')

  td.classList.add('mang--cell')

  if (align) {
    td.classList.add(`mang--align-${align.toLowerCase()}`)
  }

  td.dataset.id = id

  if (type) {
    td.dataset.type = type
  }

  if (pattern) {
    td.dataset.pattern = pattern
  }

  return td
}

function createRowTemplate(columns: Column[]): HTMLTableRowElement {
  const tr = document.createElement('tr')

  columns
    .forEach(column => {
      column.cellTemplate = createDataCellTemplate(column)
      tr.append(column.cellTemplate)
    })

  return tr
}

function buildRowTemplate(element: GridElement, shape: Shape): void {
  const { columns, row, frozen } = shape

  row.body = [
    createRowTemplate(columns.slice(shape.frozen))
  ]

  if (frozen) {
    row.left = [
      createRowTemplate(columns.slice(0, shape.frozen))
    ]
  }
}

function createScrollbar({ scroll, cage }: GridElement) {
  const railX = document.createElement('div')
  const railY = document.createElement('div')

  scroll.x.classList.add('mang--scroll', 'mang--scroll-x')
  railX.classList.add('mang__scroll-rail', 'mang__scroll-rail__x')
  railX.append(scroll.x)

  scroll.y.classList.add('mang--scroll', 'mang--scroll-y')
  railY.classList.add('mang__scroll-rail', 'mang__scroll-rail__y')
  railY.append(scroll.y)

  cage.body.append(railX)
  cage.body.append(railY)
}

export function fitting(
  { root, body, left, head, apex, cage }: GridElement,
  shape: Shape
): void {
  if (shape.frozen > 0) {
    root.classList.add('mang--frozen')
  }

  const leftWidth = (shape.columns || [])
    .filter((column, i) => !column.hide && i < shape.frozen)
    .reduce((width, column) => width + (column.width || 0), 0)

  const totalWidth = shape.columns.reduce((width, column) => width
    + (column.hide ? 0 : column.width), 0)

  head.style.width = `${totalWidth}px`
  shape.bodyWidth = totalWidth

  body.style.width = `${totalWidth}px`


  shape.bodyWidth = totalWidth - leftWidth

  body.style.left = `${leftWidth}px`
  body.style.width = `${shape.bodyWidth}px`
  apex.style.width = `${leftWidth}px`
  left.style.width = `${leftWidth}px`
  cage.apex.style.width = `${leftWidth}px`
  cage.left.style.width = `${leftWidth}px`

  if (shape.height > 0) {
    shape.bodyHeight = shape.height - head.offsetHeight
    cage.body.style.height = `${shape.bodyHeight}px`
  }
}

export default (element: GridElement, shape: Shape, columns: Column[]): void => {
  const matrix: Column[][] = calculatedMatrix(columns, shape)

  compositeElements(element, shape, matrix)

  createColgroup(element, shape)

  renderHeader(element.head, matrix)

  createScrollbar(element)

  buildRowTemplate(element, shape)

  fitting(element, shape)
}
