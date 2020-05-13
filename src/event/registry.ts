import wheel from './wheel'
import scroll from './scroll'

export default (element: GridElement, shape: Shape): void => {
  wheel(element, shape)

  scroll(element, shape)
}
