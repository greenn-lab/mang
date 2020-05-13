let x = 0

const y = 0

function horizontal(e: MouseEvent, scrollElement: HTMLElement, shape: Shape) {
  console.log('horizontal', e.x - x)
}

export default (element: GridElement, shape: Shape): void => {
  element.scroll.x
    .addEventListener('mousedown', (e: MouseEvent) => {
      x = e.x

      const fn = (ev: MouseEvent) => {
        horizontal(ev, element.scroll.x, shape)
      }

      const release = (ev: MouseEvent) => {
        console.log(ev.type)
        element.root.classList.remove('mang--dragging')
        element.root.removeEventListener('mousemove', fn)
        element.root.removeEventListener('mouseup', release)
        element.root.removeEventListener('mouseleave', release)
      }

      element.root.classList.add('mang--dragging')
      element.root.addEventListener('mousemove', fn)
      element.root.addEventListener('mouseup', release)
      element.root.addEventListener('mouseleave', release)
    })
}
