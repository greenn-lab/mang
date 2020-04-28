import renderCell from './renderCell'

function rendering(rowIndex: number, data: { [p: string]: any }, columns: Column[]): void {
  columns
    .forEach(column => {
      const { id, surface, cell } = column

      console.log(column, data)

      if (cell) {
        let value = id === 'ROW_NUMBER' ? rowIndex + 1 : data[id]

        if (value && surface) {
          value = surface(value, data)
        }

        renderCell(cell, column, value)
      }
    })
}

export default (
  rowIndex: number,
  container: HTMLTableRowElement[],
  table: HTMLTableElement,
  columns: Column[],
  data: { [key: string]: any }
) => {
  container.forEach(tr => {
    rendering(rowIndex, data, columns)

    table.append(tr.cloneNode(true))
  })
}
