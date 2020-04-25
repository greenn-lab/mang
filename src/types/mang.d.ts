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
    index?: number
    colspan?: number
    rowspan?: number
    mocker: boolean
  }


  export interface GridElement {
    root: HTMLElement
    head: HTMLTableElement
    body: HTMLTableElement
    apex?: HTMLTableElement
    left?: HTMLTableElement
    cage?: {
      apex: HTMLDivElement
      left: HTMLDivElement
    }
  }


  export interface Shape {
    width?: number
    height?: number
    frozen?: number
    columns?: Column[]
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
