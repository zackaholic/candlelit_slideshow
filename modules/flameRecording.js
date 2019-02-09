import flame from './recording-steady-old.js'
// import flame from './recording-brief-perturb.js'

let index = 0;

export default class FlameRecording {
  constructor() {
  }
  
  next() {
    index++;
    return 127 - flame[index % flame.length];
  }
}
