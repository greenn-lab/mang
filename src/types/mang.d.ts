export {}

declare global {
  export type Type = 'TEXT' | 'NUMBER' | 'DATE' | 'BOOLEAN' | 'CHECKBOX' | 'RADIO' | 'ROW_NUMBER'

  export type Align = 'LEFT' | 'RIGHT' | 'CENTER'

  export type Surface = (value: any, row: any) => {} | string | undefined

  export interface Column {
    id: string
    label?: string
    type?: Type
    pattern?: string
    surface?: Surface
    editable?: boolean
    hide?: boolean
    align?: Align
    width?: number
    merge?: Merge
    children?: Column[]
  }


  export interface GridElement {
    root: HTMLElement
    style: CSSStyleSheet
    head: HTMLElement
    body: HTMLElement
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


  export interface Option {
    multiSelection: false
  }

  export interface State {

  }


  export interface Pagination {
    element: Element
    page?: number
    size?: number
    range?: number
  }


  export interface Merge {
    rows: number
    cols: number
  }

}
