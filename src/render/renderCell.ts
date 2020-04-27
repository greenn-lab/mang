export default (column: Column, value: any, td: HTMLTableDataCellElement) => {
  switch (column.type) {
    case 'TEXT':
    default:
      td.innerText = value || ''
  }
}
