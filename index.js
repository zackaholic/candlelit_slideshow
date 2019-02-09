import Slideshow from './modules/pictures.js'
import Recording from './modules/flameRecording.js'
import SimFlame from './modules/flicker.js'

const flame = new Recording();

const flameVal = () => {
  let f = flame.next();
  f = 127 - f;
  return f;
}

const changeBackground = (e) => (val) => {
  //const alpha = val / 100;
  // return e.style.color = `rgba(255, 255, 255, ${1 - alpha})`;
  //e.style.opacity = 1 - alpha;
  e.style.background = `radial-gradient( circle, transparent 5%, black ${val}%), rgba(0, 0, 0, 0.4)`; 
}

const applyVignette = changeBackground(document.querySelector(".vignette"));


addEventListener("click", function() {
    var el = document.documentElement,
      rfs = el.requestFullscreen
        || el.webkitRequestFullScreen
        || el.mozRequestFullScreen
        || el.msRequestFullscreen 
    ;

    rfs.call(el);
});



navigator.requestMIDIAccess()
  .then(function(access) {
     // Get lists of available MIDI controllers
     const inputs = access.inputs;
     const outputs = access.outputs;

         // Attach MIDI event "listeners" to each input
    for (var input of access.inputs.values()) {
        input.onmidimessage = (message) => {
          var command = message.data[0];
          var note = message.data[1];
          var velocity = (message.data.length > 2) ? message.data[2] : 0;
          applyVignette(280 - velocity * 2);
          console.log(`${velocity},`); 
        };
    }

    for (let output of outputs.values()) {
      console.log(output);

      setInterval(() => {
        const f = flameVal();
        console.log(f);
        applyVignette(f - 3);        
        output.send( [ 0x90, 0x45, f ] );
      }, 30);
    }

     access.onstatechange = function(e) {

       // Print information about the (dis)connected MIDI controller
       console.log(e.port.name, e.port.manufacturer, e.port.state);

     };
  });

