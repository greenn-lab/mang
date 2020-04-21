import header from './header'

const createElement = (parent: HTMLElement, child: HTMLElement, tagName: string, ...tokens: string[]): void => {
  tokens.forEach(token => child.classList.add(token))

  const tag = document.createElement(tagName)
  tag.append(child)
  parent.append(tag)
}

const setColgroup = (table: HTMLTableElement, columns: Column[]): void => {
  const colgroup = document.createElement('colgroup')
  table.prepend(colgroup)

  let total = 0

  for (let i = 0; i < columns.length; i++) {
    const width = columns[i].width || 100
    total += width

    const col = document.createElement('col')
    col.style.width = `${width}px`
    colgroup.append(col)
  }

  table.style.width = `${total}px`
}

export const initialize = (uid: string, element: GridElement, columns: Column[]): void => {
  element.root.classList.add('mang', 'mang__root', uid)

  createElement(element.root, element.head, 'header', 'mang__head')
  createElement(element.root, element.body, 'main', 'mang__body')

  const dataColumns = header(uid, element, columns)

  console.log(dataColumns)

  setColgroup(element.head, dataColumns)


  element.head.querySelectorAll('.mang__head-column[data-column]')
    .forEach((column) => {
      column.addEventListener('click', () => {
      })
    })
}
