import Mang, { Columns } from './definitions'

class Column implements Mang.Column {
  readonly component: Mang.Component

  readonly attribute: Columns

  constructor(component: Mang.Component, name: string) {
    this.component = component
    this.attribute = {
      name,
      type: Mang.Type.TEXT,
      align: Mang.Align.LEFT
    }
  }

  and(): Mang.Component {
    return this.component;
  }

  width(width: number): Mang.Column {
    this.attribute.width = width
    return this
  }

  type(type: Mang.Type): Mang.Column {
    this.attribute.type = type
    return this
  }
}

export default Column
