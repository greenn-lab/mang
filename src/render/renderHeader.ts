export default (element: GridElement, matrix: Column[][]): void => {
  matrix.forEach(row => {
    const tr = document.createElement('tr')
    element.head.append(tr)

    row
      .filter(col => !col.mocker)
      .forEach(col => {
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
