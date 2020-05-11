export {}

declare global {
  export type ColumnType = 'TEXT' | 'NUMBER' | 'DATE' | 'TIMESTAMP' | 'ROW_NUMBER' | 'BOOLEAN' | 'CHECKBOX' | 'RADIO'

  export type Align = 'LEFT' | 'RIGHT' | 'CENTER'

  export type Surface = ((row: { [key: string]: any }) => string) | string

  export interface Column {
    id: string
    keys: string[]
    label: string | ''
    type: ColumnType
    hide?: boolean
    pattern?: string
    surface?: Surface
    align?: Align
    width?: number
    editable?: boolean
    merge?: Merge
    children?: Column[]
    index?: number
    colspan?: number
    rowspan?: number
    cell?: HTMLTableDataCellElement
    mocker: boolean
  }


  export interface GridElement {
    root: HTMLElement
    head: HTMLTableElement
    body: HTMLTableElement
    apex: HTMLTableElement
    left: HTMLTableElement
    cage: {
      head: HTMLElement
      body: HTMLElement
      apex: HTMLDivElement
      left: HTMLDivElement
    }
  }


  export interface Shape {
    width: number
    height: number
    body: {
      width: number
      height: number
    }
    frozen: number
    columns: Column[]
    columnMap: { [key: string]: Column }
    scroll: {
      x: number
      y: number
    }
    row: {
      left: HTMLTableRowElement[]
      body: HTMLTableRowElement[]
    }
  }


  export interface GridData {
    list: { [key: string]: any }[],
    pagination?: {
      element: Element
      page: number
      size: number
      range: number
    },
    search: {
      [key: string]: any
    },
    sort?: {
      id: string,
      direction: 'asc' | 'desc' | undefined
    }[]
  }


  export interface Option {
    multiSelection: false
  }


  export interface Merge {
    rows: number
    cols: number
  }

}
