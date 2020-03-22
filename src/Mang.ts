import Column from './Column'

class Mang {
  private readonly element: GridElement

  private readonly shape: Shape = {}

  private readonly pagination: Pagination = {}

  private readonly columns: Column[] = []

  constructor(id: string) {
    const root = document.querySelector(id) as HTMLElement

    if (root == null) {
      throw new Error(`#${id} must be exists.`)
    }

    this.element = {
      root,
      header: document.createElement('header'),
      main: document.createElement('main')
    }

    root.appendChild(this.element.header)
    root.appendChild(this.element.main)
  }

  static child(name: string, label?: string) {
    return new Column(name, label)
  }

  size(width: number = -1, height: number = -1, frozen: number = 0): Mang {
    this.shape.width = width
    this.shape.height = height
    this.shape.frozen = frozen
    return this
  }

  column(name: string, label?: string): Column {
    const column = new Column(name, label, this)
    this.columns.push(column)
    return column
  }

  paginate(selector: selector, size: number = 20, range: number = 5): Mang {
    this.pagination.selector = selector
    this.pagination.size = size
    this.pagination.range = range
    return this
  }

  freeze(frozen: number): Mang {
    this.shape.frozen = frozen
    return this
  }
}

export default Mang

window.Mang = Mang
