export namespace Mang {
  export interface Component {
  }

  export enum Type {
    TEXT= 1,
    NUMBER = 2,
    DATE = 3
  }

  export enum Align {
    LEFT = 'left',
    RIGHT = 'right',
    CENTER = 'center'
  }

  export interface Column {
    width(width: number): Column

    type(type: Type): Column

    and(): Component
  }
}
export default Mang

export interface Elements {
  root: HTMLElement,
  header: HTMLElement,
  main: HTMLElement
}

export interface Sizes {
  width?: number
  height?: number
}

export interface Columns {
  name: string
  type: Mang.Type
  align?: Mang.Align
  width?: number
}
