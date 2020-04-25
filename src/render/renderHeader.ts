export default (table: HTMLTableElement, matrix: Column[][], limitIndex: number = 0): void => {
  matrix.forEach(row => {
    const tr = document.createElement('tr')
    table.append(tr)

    row
      .filter(col => !col.mocker)
      .forEach(col => {
        if (limitIndex > 0 && col.index && limitIndex < col.index) {
          return
        }

        const th = document.createElement('th')
        th.classList.add('mang--cell')
        th.textContent = col.label || col.id
        th.dataset.index = String(col.index)

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
