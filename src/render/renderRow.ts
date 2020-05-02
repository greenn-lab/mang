function getValue(keys: string[], data: { [key: string]: any }): any {
  let _data = data

  keys.forEach(key => {
    _data = _data && _data[key] ? _data[key] : undefined
  })

  return _data || ''
}

function rendering(rowIndex: number, data: { [key: string]: any }, columns: Column[]): void {
  columns
    .forEach(column => {
      const { id, surface, cell } = column

      if (cell) {
        let value

        if (id === 'ROW_NUMBER') {
          value = rowIndex + 1
        } else if (surface) {
          value = surface(data, rowIndex)
        } else {
          value = getValue(column.keys.concat(column.id), data)
        }

        cell.innerText = value
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
