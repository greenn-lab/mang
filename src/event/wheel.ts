function horizontalScrolling(e: WheelEvent, element: GridElement, { scroll, bodyWidth }: Shape): void {
  e.preventDefault()

  scroll.x += e.deltaX
  scroll.y += e.deltaY

  if (scroll.x > bodyWidth - 100) scroll.x = bodyWidth - 100
  else if (scroll.x < 0) scroll.x = 0

  element.head.style.marginLeft = `${scroll.x * -1}px`
  element.body.style.marginLeft = `${scroll.x * -1}px`
}

export default (element: GridElement, shape: Shape): void => {
  element.root.addEventListener('wheel', (e: WheelEvent) => {
    horizontalScrolling(e, element, shape)
  })
}
