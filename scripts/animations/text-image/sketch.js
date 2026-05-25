let img;
let chars = ["@", "#", "S", "%", "?", "*", "+", ";", ":", ",", ".", " "];

function preload() {
  img = loadImage("../images/selfi.jpg");
}

function rotateRight(arr) {
  arr.unshift(arr.pop());
  return arr;
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.elt.style.position = "fixed";
  canvas.elt.style.top = "0";
  canvas.elt.style.left = "0";
  canvas.elt.style.zIndex = "-1";
  background(255);
  frameRate(4);
  textFont("monospace");
}

function draw() {
  // chars = rotateRight(chars);
  background(255);
  let cellSize = 8;
  let cols = floor(width / cellSize);
  let rows = floor(height / cellSize);

  img.resize(cols, rows);
  img.loadPixels();

  textSize(cellSize);
  textAlign(LEFT, TOP);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let idx = (x + y * cols) * 4;
      let r = img.pixels[idx];
      let g = img.pixels[idx + 1];
      let b = img.pixels[idx + 2];
      let bright = (r + g + b) / 3;
      let charIdx = floor(map(bright, 0, 255, 0, chars.length - 1));
      fill(r);
      text(chars[(charIdx + frameCount) % 12], x * cellSize, y * cellSize);
    }
  }
}

function keyPressed() {
  if (key === "+") {
    cellSize = constrain(cellSize + 2, 4, 32);
    redraw();
  }
  if (key === "-") {
    cellSize = constrain(cellSize - 2, 4, 32);
    redraw();
  }
}
