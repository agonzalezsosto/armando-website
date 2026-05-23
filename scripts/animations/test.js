function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.elt.style.position = "fixed";
  canvas.elt.style.top = "0";
  canvas.elt.style.left = "0";
  canvas.elt.style.zIndex = "-1";
}

function draw() {
  background(220);
  circle(width / 2, height / 2, 100);
}
