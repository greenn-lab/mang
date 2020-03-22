import Column from './Column'

class Mang {
  private readonly element: GridElement

  private width: number = -1

  private height: number = -1

  protected readonly columns: Column[] = []

  constructor(id: string) {
    const root = document.querySelector(`#${id}`) as HTMLElement

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

  public size(width: number, height: number = -1): Mang {
    this.width = width
    this.height = height

    return this
  }

  public column(name: string, type: Type = 'TEXT'): Column {
    const column = new Column(this, name, type)
    this.columns.push(column)
    return column
  }
}

export default Mang
window.Mang = Mang
