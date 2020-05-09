import renderCell from './renderCell'

function rendering(tr: HTMLTableRowElement, data: { [p: string]: any }, columnMap: { [p: string]: Column }, body: HTMLTableElement) {
  Array.from(tr.cells).forEach(td => {
    const { id } = td.dataset

    if (id) {
      renderCell(td, data, id, columnMap[id])
    }
  })

  body.append(tr.cloneNode(true))
}

export default (
  data: { [p: string]: any },
  { body, left }: GridElement,
  { row, columnMap, frozen }: Shape
) => {
  row.body.forEach(tr => {
    rendering(tr, data, columnMap, body)
  })

  if (frozen) {
    row.left.forEach(tr => {
      rendering(tr, data, columnMap, left)
    })
  }
}
