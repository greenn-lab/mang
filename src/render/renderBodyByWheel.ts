import Mang from '../Mang'
import renderRow from './renderRow'

let countPerHeight = 0

let firstRow = 0

let lastRow = -1


function renderRowByScroll(rate: number, element: GridElement, shape: Shape, data: GridData) {
  const beforeFirstRow = firstRow
  const beforeLastRow = lastRow

  firstRow += rate

  if (firstRow < 0) {
    firstRow = 0
    return
  }

  if (firstRow > data.list.length - 1) {
    firstRow = data.list.length - 1
    return
  }

  lastRow = firstRow + countPerHeight

  if (lastRow > data.list.length - 1) {
    lastRow = data.list.length - 1
  }

  if (rate < 0) {
    for (let i = lastRow + 1; i <= beforeLastRow; i++) {
      (data.list[i].__element || [])
        .forEach((tr: HTMLTableRowElement) => tr.remove())
    }

    for (let i = beforeFirstRow - 1; i >= firstRow; i--) {
      data.list[i].__rowNumber = i + 1
      renderRow(data.list[i], element, shape, true)
    }
  } else {
    for (let i = beforeFirstRow; i < firstRow; i++) {
      (data.list[i].__element || [])
        .forEach((tr: HTMLTableRowElement) => tr.remove())
    }

    for (let i = beforeLastRow + 1; i <= lastRow; i++) {
      data.list[i].__rowNumber = i + 1
      renderRow(data.list[i], element, shape)
    }
  }
}


export default (element: GridElement, shape: Shape, data: GridData): void => {
  countPerHeight = Math.ceil(shape.bodyHeight / Mang.ROW_HEIGHT)

  renderRowByScroll(0, element, shape, data)

  let scroll = 0
  let beforeScroll = 0

  element.root.addEventListener('wheel',
    (e: WheelEvent) => {
      scroll += e.deltaY

      if (Math.abs(scroll - beforeScroll) > 3) {
        renderRowByScroll(scroll > beforeScroll ? 1 : -1, element, shape, data)

        scroll = 0
        beforeScroll = 0
      }
    })
}
