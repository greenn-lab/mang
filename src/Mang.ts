import { initialize } from './render/intialize'

class Mang {
  public static ids: string[] = []

  private readonly uid: string

  private readonly element: GridElement

  private shape: Shape = {}

  private pagination: Pagination | undefined

  private columns: Column[] = []

  private data: any[] = []

  constructor(id: string) {
    this.uid = [
      id.replace(/[^\w]/g, ''),
      Date.now().toString(36)
    ].join('-')

    const style = document.createElement('style')
    style.id = `mang__style-${this.uid}`
    document.head.append(style)

    this.element = {
      root: document.querySelector(id) as HTMLElement,
      style: style.sheet as CSSStyleSheet,
      head: document.createElement('table'),
      body: document.createElement('table')
    }

    if (this.element.root == null) {
      throw new Error(`#${id} must be exists.`)
    }
  }

  render(data: any[] = []): void {
    this.data = data

    initialize(this.uid, this.element, this.columns)
  }

  size(width: number = -1, height: number = -1, frozen: number = 0): Mang {
    this.shape.width = width
    this.shape.height = height
    this.shape.frozen = frozen
    return this
  }

  setColumns(columns: Column[]): Mang {
    this.columns = columns
    return this
  }

  paginate(element: Element, size: number = 20, range: number = 5): Mang {
    this.pagination = {
      element,
      page: 1,
      size,
      range
    }
    return this
  }

  freeze(frozen: number): Mang {
    this.shape.frozen = frozen
    return this
  }
}

export default Mang

window.Mang = Mang
