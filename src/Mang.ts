import Column from './Column'
import { initialize } from './rendering'

class Mang {
  public static ids: string[] = []

  private readonly uid: string

  private readonly element: GridElement

  private shape: Shape = {}

  private pagination: Pagination = {}

  private _columns: Column[] = []

  private _data: any[] = []

  constructor(id: string) {
    this.uid = [
      id.replace(/[^\w]/g, ''),
      Date.now().toString(36)
    ].join('-')

    this.element = {
      root: document.querySelector(id) as HTMLElement
    }

    if (this.element.root == null) {
      throw new Error(`#${id} must be exists.`)
    }
  }

  render(data: any[] = []): void {
    this._data = data

    initialize(this.uid, this.element, this._columns)
  }

  size(width: number = -1, height: number = -1, frozen: number = 0): Mang {
    this.shape.width = width
    this.shape.height = height
    this.shape.frozen = frozen
    return this
  }

  columns(...columns: Column[]): Mang {
    this._columns = columns
    return this
  }

  public static column(name: string, label?: string): Column {
    return new Column(name, label)
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
