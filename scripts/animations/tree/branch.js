class Branch {
  constructor(x1, y1, x2, y2) {
    this.pointA = createVector(x1, y1);
    this.pointB = createVector(x2, y2);
  }

  generateBranches() {
    var endA = this.branchGenerator(PI / this.randNumbers());
    var endB = this.branchGenerator(-(PI / this.randNumbers()));
    return {
      startPoint: this.pointB,
      endA,
      endB,
    };
  }

  randNumbers() {
    return map(random(1000), 0, 1000, 2, 6);
  }

  branchGenerator(rot) {
    var dir = p5.Vector.sub(this.pointB, this.pointA);
    dir.rotate(rot);
    dir.mult(0.67);
    return p5.Vector.add(this.pointB, dir);
  }

  displayBranch(darkness) {
    strokeWeight(1);
    stroke(0, darkness);
    line(this.pointA.x, this.pointA.y, this.pointB.x, this.pointB.y);
  }
}
