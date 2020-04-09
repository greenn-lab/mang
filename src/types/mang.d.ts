export {}

declare global {
  export type Type = 'TEXT' | 'NUMBER' | 'DATE'

  export type Align = 'LEFT' | 'RIGHT' | 'CENTER'

  export type Surface = (value: any, row: any) => {} | string | undefined

  export type selector = string | Element | Document

  export interface GridElement {
    root: HTMLElement
    css?: CSSStyleSheet
    head?: HTMLElement
    body?: HTMLElement
  }


  export interface Shape {
    width?: number
    height?: number
    frozen?: number
    header?: {
      rows: number
      cols: number
    }
  }

  export interface Pagination {
    selector?: selector
    size?: number
    range?: number
  }

  export interface CellMerge {
    rows: number
    cols: number
  }

  export interface ColumnAttribute {
    name: string
    type: Type
    label?: string
    surface?: Surface
    editable?: boolean
    align?: Align
    width?: number
    merge?: CellMerge
  }
}
