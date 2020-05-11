import initialize from './initialize'
import renderBody from './render/renderBody'
import registryEvent from './event/registry'

class Mang {
  public static ids: string[] = []

  private readonly element: GridElement

  private shape: Shape = {
    width: -1,
    height: -1,
    body: {
      width: 0,
      height: 0
    },
    frozen: 0,
    columns: [],
    columnMap: {},
    scroll: {
      x: 0,
      y: 0
    },
    row: {
      left: [],
      body: []
    }
  }

  private columns: Column[] = []

  private data: GridData = {
    list: [],
    search: {}
  }

  constructor(id: string) {
    if (document.querySelector(id) == null) {
      throw new Error(`#${id} must be exists.`)
    }

    this.element = {
      root: document.querySelector(id) as HTMLElement,
      head: document.createElement('table'),
      body: document.createElement('table'),
      apex: document.createElement('table'),
      left: document.createElement('table'),
      cage: {
        head: document.createElement('header'),
        body: document.createElement('main'),
        apex: document.createElement('div'),
        left: document.createElement('div'),
      }
    }
  }

  setData(data: { [key: string]: any }[]): Mang {
    if (Array.isArray(data)) {
      this.data.list = data.map(row => Object.assign(row, { __status: '' }))
    }

    return this
  }

  render(data?: { [key: string]: any }[]): Mang {
    if (data) {
      this.setData(data)
    }

    initialize(this.element, this.shape, this.columns)

    renderBody(this.element, this.shape, this.data)

    registryEvent(this.element, this.shape)

    return this
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
    this.data.pagination = {
      element,
      page: 0,
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
