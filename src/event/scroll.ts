export default (e: WheelEvent, element: GridElement, { body, scroll }: Shape): void => {
  e.preventDefault()

  scroll.x += e.deltaX
  scroll.y += e.deltaY

  if (scroll.x > body.width - 100) scroll.x = body.width - 100
  else if (scroll.x < 0) scroll.x = 0

  element.head.style.marginLeft = `${scroll.x * -1}px`
  element.body.style.marginLeft = `${scroll.x * -1}px`
}
