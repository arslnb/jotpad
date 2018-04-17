## Jot Pad

Jot Pad is a quick weekend (week day? Idk, what day is it again?) hack to learn about [Operational Transformations](operational-transformation.github.io). I've been reading about OT a lot, and figured the best way to understand is to build. Jot Pad (for the lack of a better name) uses [QuillJS](https://quilljs.com) and [Firebase Realtime Database](https://firebase.google.com/docs/database/). 

### To-do

- [x] Build single player mode
- [x] Compose socket events
- [x] Build a queue of deltas server-side
- [x] Emit transactions via Socket IO
- [x] Apply transformations via Quill
- Put each stream of delta modification and update events in a separate socket room