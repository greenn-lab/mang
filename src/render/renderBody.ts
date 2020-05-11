import renderRow from './renderRow'

export default (element: GridElement, shape: Shape, data: GridData): void => {
  if (shape.body.height) {



  } else {
    data.list
      .forEach((item, i) => {
        renderRow({ ...item, __rowNumber: i + 1 }, element, shape)
      })
  }
}
