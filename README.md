## Jot Pad

Jot Pad is a quick weekend (week day? Idk, what day is it again?) hack to learn about [Operational Transformations](operational-transformation.github.io). I've been reading about OT a lot, and figured the best way to understand is to build. Jot Pad (for the lack of a better name) uses [QuillJS](https://quilljs.com) and [Firebase Realtime Database](https://firebase.google.com/docs/database/). 

Understanding OT is tricky, and implementing it is slightly trickier. That said, [this visualization](operational-transformation.github.io/visualization.html) helped. *Click on the arrow heads when a delta is sent to the server. Took me a while to figure that out. And the home page [here](operational-transformation.github.io) seems truncated, but it is my understanding that it may be just a quirky design.*

Credit to [@CJEnright](https://github.com/CJEnright/quill-ot.js) for a neater implementation of OT for Quill. 

### To-do

- [x] Build single player mode
- [x] Compose socket events
- [x] Build a queue of deltas server-side
- [x] Emit transactions via Socket IO
- [x] Apply transformations via Quill
- [x] Put each stream of delta modification and update events in a separate socket room