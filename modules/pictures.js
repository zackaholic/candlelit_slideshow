const _images = [
  'aa.jpg',
  'aaport.jpg',
  'aaport3.jpg',
  'aaport4-2.jpg',
  'aasoldiers.jpg',
  'bed.jpg',
  'bros1.jpg',
  'bros2-1.jpg',
  'bros3-1.jpg',
  'bros3.jpg',
];

const prependImagePath = name => `${/images/}${name}`;

const wrapIndex = (arr) => (index) => arr[index % arr.length];

const image = wrapIndex(_images);

export default class Slideshow {
  constructor(container) {
    this.container = container;
    this.index = 0;
  }
  displayNext() {
    this.container.src = prependImagePath(image(this.index++));
  }
}
