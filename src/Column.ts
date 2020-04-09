class Column {
  private readonly _attribute: ColumnAttribute

  private _columns: Column[] = []

  constructor(name: string, label?: string) {
    this._attribute = {
      name,
      label: label || name,
      type: 'TEXT'
    }
  }

  get attribute() {
    return this._attribute
  }

  get columns() {
    return this._columns
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
    this._columns = columns

    return this
  }
}

export default Column
