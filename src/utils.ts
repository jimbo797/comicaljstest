import { Comical } from "comicaljs";

export function startDragging(containerIn: HTMLElement) {
  const container = containerIn;
  let startDragX = 0;
  let startDragY = 0;
  let dragWhat: HTMLElement | undefined = undefined;
  document.addEventListener("mousedown", (ev) => {
    console.log("click");
    startDragX = ev.clientX;
    startDragY = ev.clientY;
    const dragBubble = Comical.getBubbleHit(container, startDragX, startDragY);
    dragWhat = dragBubble ? dragBubble.content : undefined;
    console.log({ dragWhat });
  });
  document.addEventListener("mousemove", (ev) => {
    if (ev.buttons === 1 && dragWhat) {
      console.log("moving");
      const deltaX = ev.clientX - startDragX;
      const deltaY = ev.clientY - startDragY;
      if (deltaX !== 0) {
        dragWhat.dataset.left = ''+parseInt(dragWhat.dataset.left as string, 10) + deltaX;
        dragWhat.style.left =
          (parseInt(dragWhat.dataset.left) / container.clientWidth) * 100 + "%";
        console.log({ left: dragWhat.dataset.left });
      }
      if (deltaY !== 0) {
        dragWhat.dataset.top = ''+parseInt(dragWhat.dataset.top as string, 10) + deltaY;
        dragWhat.style.top =
          (parseInt(dragWhat.dataset.top) / container.clientHeight) * 100 + "%";
      }
      startDragX = ev.clientX;
      startDragY = ev.clientY;
    }
  });
}

export const reposition = (bubbleEl: HTMLElement, parent: HTMLElement) => {
  const left = parseInt(bubbleEl.style.left.replace("%", ""), 10);
  const top = parseInt(bubbleEl.style.top.replace("%", ""), 10);
  bubbleEl.dataset.left = `${(left / 100) * parent.clientWidth}`;
  bubbleEl.dataset.top = `${(top / 100) * parent.clientHeight}`;
};