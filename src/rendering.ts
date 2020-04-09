import Column from './Column'

const createCss = (uid: string, columns: Column[]) => {
  const css = document.createElement('style')
  css.id = uid

  if (document.head) {
    document.head.append(css)
  } else {
    document.documentElement.append(css)
  }

  const sheet = css.sheet as CSSStyleSheet

  columns.forEach((column, index) => {
    const { align, type, width } = column.attribute
    const styles = [
      `text-align: ${(align || (type === 'NUMBER' ? 'RIGHT' : 'LEFT')).toLowerCase()}`,
      `width: ${width}px`
    ]

    sheet.insertRule(`.${uid}__col${index} {${styles.join(';')}}`, index)
  })

  return sheet
}

let rows = 1

let cols = 0

const _columns: Column[] = []

const drawHeader = (head: HTMLElement, columns: Column[], uid: string, depth: number = 1): void => {
  columns.forEach(column => {
    const { label, name } = column.attribute
    const div = document.createElement('div')

    div.classList.add('mang__head-column')
    div.append(document.createTextNode(label || name))
    head.append(div)

    if (column.columns.length) {
      depth++

      if (rows < depth) {
        rows = depth
      }

      drawHeader(div, column.columns, uid, depth)
    } else {
      div.classList.add(`${uid}__col${cols}`)
      cols++

      _columns.push(column)
    }
  })
}

export const initialize = (uid: string, element: GridElement, columns: Column[]): void => {
  element.root.classList.add('mang', 'mang__root', uid)
  element.css = createCss(uid, columns)

  element.head = document.createElement('header')
  element.head.classList.add('mang__head')
  element.root.appendChild(element.head)

  element.body = document.createElement('main')
  element.body.classList.add('mang__body')
  element.root.appendChild(element.body)

  drawHeader(element.head, columns, uid)
}
