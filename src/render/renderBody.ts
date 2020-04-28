import renderRow from './renderRow'

function createCellContainer(column: Column): HTMLTableDataCellElement {
  const { id, index, type, align, pattern } = column
  const td = document.createElement('td')

  td.classList.add('mang--cell')

  if (align) {
    td.classList.add(`mang--align-${align.toLowerCase()}`)
  }

  td.dataset.id = id
  td.dataset.index = String(index)

  if (type) {
    td.dataset.type = type
  }

  if (pattern) {
    td.dataset.pattern = pattern
  }

  return td
}

function createRowContainer(columns: Column[]): HTMLTableRowElement {
  const tr = document.createElement('tr')

  columns
    .forEach(column => {
      column.cell = createCellContainer(column)
      tr.append(column.cell)
    })

  return tr
}

export default (element: GridElement, shape: Shape, data: GridData): void => {
  const { columns, row, frozen } = shape
  const { body, left } = element
  const bodyColumns = columns.slice(frozen)
  const leftColumns = columns.slice(0, frozen)

  row.body = [
    createRowContainer(bodyColumns)
  ]

  if (frozen) {
    row.left = [
      createRowContainer(leftColumns)
    ]
  }

  data.list.slice(0, 1).forEach((item, i) => {
    renderRow(i, row.body, body, bodyColumns, item)

    if (left) {
      renderRow(i, row.left, left, leftColumns, item)
    }
  })
}
