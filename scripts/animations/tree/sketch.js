var tree = [];
var count = 0;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.elt.style.position = "fixed";
  canvas.elt.style.top = "0";
  canvas.elt.style.left = "0";
  canvas.elt.style.zIndex = "-1";

  generateTree();
}

function generateTree() {
  if (tree.length != 0) {
    tree = [];
    count = 0;
  }

  tree[0] = new Branch(width / 2, height, width / 2, height - 100);

  for (var i = 0; i < 500; i++) {
    var { startPoint, endA, endB } = tree[i].generateBranches();
    tree.push(new Branch(startPoint.x, startPoint.y, endA.x, endA.y));
    tree.push(new Branch(startPoint.x, startPoint.y, endB.x, endB.y));
  }
}

function draw() {
  background(255);
  count++;

  for (var i = 0; i < tree.length; i++) {
    tree[i].displayBranch(count * 0.002 * (tree.length - i + 1));
  }

  if (count > 250) {
    generateTree();
  }
}
