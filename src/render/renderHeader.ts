function createTh(col: Column): HTMLTableHeaderCellElement {
  const th = document.createElement('th')
  th.classList.add('mang--cell')
  th.textContent = col.label || col.id
  th.dataset.index = String(col.index)
  return th
}

export default (table: HTMLTableElement, matrix: Column[][]): void => {
  matrix.forEach(row => {
    const tr = document.createElement('tr')
    table.append(tr)

    row
      .filter(col => !col.mocker)
      .forEach(col => {
        const th = createTh(col)

        if (col.rowspan) {
          th.rowSpan = col.rowspan
        }

        if (col.colspan) {
          th.colSpan = col.colspan
        }

        tr.append(th)
      })
  })
}
