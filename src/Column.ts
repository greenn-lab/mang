import Mang from './Mang'

class Column {
  readonly component: Mang | undefined

  readonly attribute: CellAttribute

  readonly columns: Column[] = []

  constructor(name: string, label?: string, component?: Mang) {
    this.component = component
    this.attribute = {
      name,
      label: label || name,
      type: 'TEXT'
    }
  }

  width(width: number): Column {
    this.attribute.width = width
    return this
  }

  type(type: Type, format?: Surface): Column {
    this.attribute.type = type
    this.attribute.surface = format
    return this
  }

  surface(surface: Surface): Column {
    this.attribute.surface = surface
    return this
  }

  editable(editable: boolean = true): Column {
    this.attribute.editable = editable
    return this
  }

  align(align: Align = 'LEFT'): Column {
    this.attribute.align = align
    return this
  }

  merge(rows: number = 1, cols: number = 1) {
    this.attribute.merge = { rows, cols }
    return this
  }

  children(...columns: Column[]): Column {
    this.columns.concat(columns)
    return this
  }

  column(name: string, label?: string): Column {
    if (this.component) {
      this.component.column(name, label)
    }

    return this
  }

  mang(): Mang | undefined {
    return this.component
  }
}

export default Column
