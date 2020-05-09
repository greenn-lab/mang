function getValue(keys: string[], data: { [key: string]: any }): any {
  let _data = data

  keys.forEach(key => {
    _data = _data && _data[key] ? _data[key] : undefined
  })

  return _data || ''
}

export default (td: HTMLTableDataCellElement, data: { [p: string]: any }, id: string, column: Column) => {

  console.log(data, id, column)

  if (column.surface) {
    td.innerHTML = typeof column.surface === 'string'
      ? column.surface
      : column.surface(data)
  } else {
    switch (column.type) {
      case 'TEXT':
      default:
        td.innerText = getValue([...column.keys, column.id], data)
    }
  }
}
