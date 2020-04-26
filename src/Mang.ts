import initialize from './render/initialize'
import renderBody from './render/renderBody'

class Mang {
  public static ids: string[] = []

  private readonly element: GridElement

  private shape: Shape = {
    frozen: 0,
    columns: [],
    row: {
      left: [],
      body: []
    }
  }

  private pagination: Pagination | undefined

  private columns: Column[] = []

  private data: any[] = []

  constructor(id: string) {
    this.element = {
      root: document.querySelector(id) as HTMLElement,
      head: document.createElement('table'),
      body: document.createElement('table')
    }

    if (this.element.root == null) {
      throw new Error(`#${id} must be exists.`)
    }
  }

  render(data?: any[]): void {
    if (Array.isArray(data)) {
      this.data = data
    }

    initialize(this.element, this.shape, this.columns)

    renderBody(this.element, this.shape, this.data)
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
