export default (td: HTMLTableDataCellElement, column: Column, value: any) => {
  switch (column.type) {
    case 'TEXT':
    default:
      td.innerText = value || ''
  }
}
