import renderCell from './renderCell'

function rendering(
  tr: HTMLTableRowElement,
  data: { [p: string]: any },
  columnMap: { [p: string]: Column },
  body: HTMLTableElement,
  prepend: boolean
) {
  Array.from(tr.cells).forEach(td => {
    const { id } = td.dataset

    if (id) {
      renderCell(td, data, id, columnMap[id])
    }
  })

  const _tr = tr.cloneNode(true) as HTMLTableRowElement

  _tr.setAttribute('data-row-number', data.__rowNumber)

  if (prepend) {
    body.prepend(_tr)
  } else {
    body.append(_tr)
  }

  if (!data.__element) {
    data.__element = []
  }

  data.__element.push(_tr)
}

export default (
  data: { [p: string]: any },
  { body, left }: GridElement,
  { row, columnMap, frozen }: Shape,
  prepend: boolean = false
) => {
  row.body.forEach(tr => {
    rendering(tr, data, columnMap, body, prepend)
  })

  if (frozen) {
    row.left.forEach(tr => {
      rendering(tr, data, columnMap, left, prepend)
    })
  }
}
