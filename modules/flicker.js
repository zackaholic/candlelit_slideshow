// https://www.michaelbromley.co.uk/blog/simple-1d-noise-in-javascript/

////////////////////////////////////////////////
const add = (increaseBy, v) => v + increaseBy;
const clamp = (min, max, val) => 
  val > max ? max : val < min ? min : val;
const scale = (factor, val) => val * factor;
////////////////////////////////////////////////

var Simple1DNoise = function() {
  var MAX_VERTICES = 256;
  var MAX_VERTICES_MASK = MAX_VERTICES -1;
  var amplitude = 1;
  var scale = 1;

  var r = [];

  for ( var i = 0; i < MAX_VERTICES; ++i ) {
    r.push(Math.random());
  }

  var getVal = function( x ){
    var scaledX = x * scale;
    var xFloor = Math.floor(scaledX);
    var t = scaledX - xFloor;
    var tRemapSmoothstep = t * t * ( 3 - 2 * t );

    /// Modulo using &
    var xMin = xFloor & MAX_VERTICES_MASK;
    var xMax = ( xMin + 1 ) & MAX_VERTICES_MASK;

    var y = lerp( r[ xMin ], r[ xMax ], tRemapSmoothstep );

    return y * amplitude;
  };

  /**
  * Linear interpolation function.
  * @param a The lower integer value
  * @param b The upper integer value
  * @param t The value between the two
  * @returns {number}
  */
  var lerp = function(a, b, t ) {
    return a * ( 1 - t ) + b * t;
  };

  // return the API
  return {
    getVal: getVal,
    setAmplitude: function(newAmplitude) {
        amplitude = newAmplitude;
    },
    setScale: function(newScale) {
        scale = newScale;
    }
  };
};

var long = new Simple1DNoise();
var short = new Simple1DNoise();
// var x = 1;
// var y = generator.getVal(x);
long.setAmplitude(0.2);
long.setScale(0.4);

short.setAmplitude(0.65);
short.setScale(2.5);

let longX = 1;
let shortX = 1;


const newValue = function() {
  longX += 0.1;
  shortX += 0.2;

  let l = long.getVal(longX);
  let s = short.getVal(shortX);

  l = scale(150, l);
  l = add(40, l);
  s = scale(20, s);
  s = add(40, s);

  return l + s;
}

export default class FakeFlame {
  constructor() {
  }

  next() {
    return newValue();
  }
  
  majorAmplitude(val) {
    long.setAmplitude(val);
  }
  
  majorScale(val) {
    long.setScale(val);
  }
  
  minorAmplitude(val) {
    short.setAmplitude(val);
  }
  
  minorScale(val) {
    short.setScale(val);
  }

}













