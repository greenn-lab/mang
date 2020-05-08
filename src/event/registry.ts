import scroll from './scroll'

export default (element: GridElement, shape: Shape): void => {
  const scrolling = (e: WheelEvent): void => {
    scroll(e, element, shape)
  }

  if (shape.height > 0) {
    element.root.addEventListener('wheel', scrolling, false)
  } else {
    element.root.removeEventListener('wheel', scrolling)
  }
}
