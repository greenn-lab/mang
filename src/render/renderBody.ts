import renderRow from './renderRow'

function createFrozenRowContainer({ row, frozen }: Shape) {
  row.left = []

  row.body.forEach(tr => {
    const ctr = document.createElement('tr')

    for (let i = 0; i < frozen; i++) {
      ctr.append(tr.cells[i])
    }

    row.left.push(ctr)
  })
}

function createRowContainer(shape: Shape): void {
  const { row, columns, frozen } = shape

  if (row.body.length === 0) {
    const tr = document.createElement('tr')
    row.body.push(tr)

    columns.forEach(column => {
      const td = document.createElement('td')
      td.classList.add('mang--cell', `mang--cell-${column.id.replace(/\./g, '--')}`)
      td.dataset.id = column.id
      td.dataset.index = String(column.index)

      tr.append(td)
    })
  }

  if (frozen) {
    createFrozenRowContainer(shape)
  }
}

export default (element: GridElement, shape: Shape, data: GridData): void => {
  createRowContainer(shape)

  data.list.forEach(row => {
    renderRow(element, shape, row)
  })
}
