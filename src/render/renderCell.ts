function getValue(keys: string[], data: { [key: string]: any }): any {
  let _data = data

  keys.forEach(key => {
    _data = _data && _data[key] ? _data[key] : undefined
  })

  return _data || ''
}

export default (td: HTMLTableDataCellElement, data: { [p: string]: any }, id: string, column: Column) => {
  if (column.surface) {
    td.innerHTML = typeof column.surface === 'string'
      ? column.surface
      : column.surface(data)
  } else {
    switch (column.type) {
      case 'ROW_NUMBER':
        td.innerText = data.__rowNumber
        break
      case 'TEXT':
      case 'NUMBER':
      case 'DATE':
      case 'TIMESTAMP':
      case 'BOOLEAN':
      default:
        td.innerText = getValue([...column.keys, column.id], data)
    }
  }
}
