import "./styles.css";
import { Comical, Bubble } from "comicaljs";
import Typewriter from "typewriter-effect/dist/core";

// document.addEventListener("DOMContentLoaded", () => {
const parent = document.getElementById("panel");

// rather crude support for dragging bubbles around. Sometimes a bubble gets caught
// when aiming for a handle that's up against it, and it doesn't yet handle scaling.
// But it's good enough to help us try out the effects of moving bubbles in StoryBook.
// Assumes bubbles are positioned by style attributes containing left: and top: in px.
function startDragging(containerIn) {
  const container = containerIn;
  let startDragX = 0;
  let startDragY = 0;
  let dragWhat = undefined;
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
        dragWhat.dataset.left = parseInt(dragWhat.dataset.left, 10) + deltaX;
        dragWhat.style.left =
          (dragWhat.dataset.left / container.clientWidth) * 100 + "%";
        console.log({ left: dragWhat.dataset.left });
      }
      if (deltaY !== 0) {
        dragWhat.dataset.top = parseInt(dragWhat.dataset.top, 10) + deltaY;
        dragWhat.style.top =
          (dragWhat.dataset.top / container.clientHeight) * 100 + "%";
      }
      startDragX = ev.clientX;
      startDragY = ev.clientY;
    }
  });
}

const bubble1El = document.getElementById("bubble1");
const bubble2El = document.getElementById("bubble2");

const reposition = (bubbleEl, parent) => {
  const left = parseInt(bubbleEl.style.left.replace("%", ""), 10);
  const top = parseInt(bubbleEl.style.top.replace("%", ""), 10);
  bubbleEl.dataset.left = (left / 100) * parent.clientWidth;
  bubbleEl.dataset.top = (top / 100) * parent.clientHeight;
};

reposition(bubble1El, parent);
reposition(bubble2El, parent);

setTimeout(() => {
  const bubble1 = new Bubble(bubble1El);

  bubble1.setBubbleSpec({
    version: "1.0",
    style: "speech",
    // tails: [],
    tails: [Bubble.makeDefaultTail(bubble1El)],
    level: 2,
    backgroundColors: ["rgba(255,255,255,1)"]
  });

  Comical.startEditing([parent]);
  Comical.initializeChild(bubble2El, bubble1El);
  Comical.update(parent);
  startDragging(parent);

  const typewriter1 = new Typewriter("#bubble1-typewriter", {
    cursor: "",
    delay: 25
  });

  const typewriter2 = new Typewriter("#bubble2-typewriter", {
    cursor: "",
    delay: 25
  });

  typewriter1
    .typeString(
      "<div>Lorem ipsum, baby!</div><div>There is a large</div><div>sentence here.</div>"
    )
    .callFunction(() => {
      typewriter2
        .typeString(
          "<div>Lorem ipsum, baby!</div><div><b>There is a large</b></div><div>sentence here.</div>"
        )
        .start();
    })
    .start();

  window.addEventListener("resize", () => {
    reposition(bubble1El, parent);
    reposition(bubble2El, parent);
    Comical.update(parent);
    Comical.stopEditing();
    // Comical.startEditing([parent]);
  });

  document.getElementById("start-editing").addEventListener("click", () => {
    Comical.startEditing([parent]);
  });

  document.getElementById("finish-editing").addEventListener("click", () => {
    Comical.stopEditing();
  });

  // Comical.activateElement(child);
  // Comical.initializeChild(child);
}, 500);
// });
