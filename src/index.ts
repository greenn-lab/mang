import Mang, { Elements, Sizes } from './definitions';
import Column from "./column";

class mang implements Mang.Component {
  readonly element: Elements

  columns: Mang.Column[] = []

  size: Sizes = {}

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

  public width(width: number): Mang.Component {
    this.size.width = width
    return this
  }

  public height(height: number): Mang.Component {
    this.size.height = height
    return this
  }

  public column(name: string): Mang.Column {
    const column = new Column(this, name)
    this.columns.push(column)
    return column
  }
}

window.Mang = mang
