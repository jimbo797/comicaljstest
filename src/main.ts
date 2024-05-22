import './style.css';
import { Bubble, Comical } from 'comicaljs';
// import { startDragging, reposition } from './utils';

const space = document.getElementById("bubblespace") as HTMLElement; // cyan

// const bubble1El = document.getElementById("bubble1") as HTMLElement; // purple
// const bubble2El = document.getElementById("bubble2") as HTMLElement; // purple
const bubble1words = document.getElementById("words1") as HTMLElement; // red
const bubble2words = document.getElementById("words2") as HTMLElement; // red
const bubble3words = document.getElementById("words3") as HTMLElement; // red

document.getElementById("start")?.addEventListener("click", () => Comical.startEditing([space]));
document.getElementById("stop")?.addEventListener("click", () => {
  // Comical.update(space); // is this needed?
  Comical.stopEditing();
});

const words1 = new Bubble(bubble1words);
// const words2 = new Bubble(bubble2words);
const words3 = new Bubble(bubble3words);

words1.setBubbleSpec(Bubble.getDefaultBubbleSpec(bubble1words, "speech"));
words3.setBubbleSpec(Bubble.getDefaultBubbleSpec(bubble3words, "speech"));

// NOTE: bubble only appears when i start editing, and then everything shifts down when i stop editing
Comical.startEditing([space]);

Comical.initializeChild(bubble2words, bubble1words); // creates bubble around "extension" of speech (words2)

// can string together many extensions, just make sure each bubble before terminal bubble has its own bubble object
// Comical.initializeChild(bubble3words, bubble1words);
// Comical.initializeChild(bubble2words, bubble3words); 

Comical.update(space); // Update to make changes like children bubbles
// Comical.stopEditing();


// More declarative way to make a bubble spec (as opposed to default bubble spec)
// bubble1.setBubbleSpec({
//   version: "1.0",
//   style: "speech",
//   // tails: [],
//   tails: [Bubble.makeDefaultTail(bubble1El)],
//   level: 2,
//   backgroundColors: ["rgba(255,255,255,1)"]
// });

// Not yet figured out: moving bubbles on the screen (how to click and drag html div elements?)
// startDragging(space);
