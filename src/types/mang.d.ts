export {}

declare global {

  export type Type = 'TEXT' | 'NUMBER' | 'DATE'

  export type Align = 'LEFT' | 'RIGHT' | 'CENTER'

  export type Surface = Align | Function | string | undefined

  export type selector = string | Element | Document

  export interface GridElement {
    root: HTMLElement,
    header: HTMLElement,
    main: HTMLElement
  }


  export interface Shape {
    width?: number
    height?: number
    frozen?: number
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

  export interface CellAttribute {
    name: string,
    label?: string,
    type: Type
    surface?: Surface
    editable?: boolean;
    align?: Align
    width?: number
    merge?: CellMerge
  }
}
