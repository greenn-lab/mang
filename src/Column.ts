class Column {
  readonly component: Grid

  readonly attribute: GridColumnAttribute

  constructor(component: Grid, name: string, type: Type = 'TEXT') {
    this.component = component
    this.attribute = {
      name,
      type
    }
  }

  width(width: number): Column {
    this.attribute.width = width
    return this
  }

  type(type: Type): Column {
    this.attribute.type = type
    return this
  }

  column(name: String, type?: Type): Column {
    this.component.column(name, type)

    return this
  }
}

export default Column
