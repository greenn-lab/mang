export {}

declare global {

  export type Type = 'TEXT' | 'NUMBER' | 'DATE'

  export type Align = 'LEFT' | 'RIGHT' | 'CENTER'

  export interface Grid {
    size(width: number, height?: number): void

    column(name: String, type?: Type): GridColumn
  }

  export interface GridColumn {
    width(width: number): GridColumn

    type(type: Type): GridColumn

    column(name: String): GridColumn
  }

  export interface GridElement {
    root: HTMLElement,
    header: HTMLElement,
    main: HTMLElement
  }

  export interface GridSize {
    width?: number
    height?: number
  }

  export interface GridColumnAttribute {
    name: string
    type: Type
    align?: Align
    width?: number
  }
}
