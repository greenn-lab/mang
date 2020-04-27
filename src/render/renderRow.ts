import renderCell from './renderCell'

function rendering(table: HTMLTableElement, ctr: HTMLTableRowElement, data: { [p: string]: any }, columns: Column[]) {
  const tr = ctr.cloneNode(true) as HTMLTableRowElement

  tr.querySelectorAll('td').forEach(td => {
    const column = columns[Number(td.dataset.index)]
    const value = column.surface ? column.surface(data[column.id], data) : data[column.id]

    renderCell(column, value, td)
  })

  table.append(tr)
}

export default ({ body, left }: GridElement, { row, frozen, columns }: Shape, data: {[key: string]: any}) => {
  if (frozen && left) {
    row.left.forEach(tr => {
      rendering(left, tr, data, columns)
    })
  }

  row.body.forEach(tr => {
    rendering(body, tr, data, columns)
  })
}
