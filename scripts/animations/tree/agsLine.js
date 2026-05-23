function agsLine(x1, y1, x2, y2, clrProg = 255, segNum = 100) {
  var xInterval = (x2 - x1) / segNum;
  var yInterval = (y2 - y1) / segNum;

  for (var i = 0; i < segNum; i++) {
    stroke(0, clrProg + (i / segNum) * 255);
    line(
      x1 + xInterval * i,
      y1 + yInterval * i,
      x1 + xInterval * (i + 1),
      y1 + yInterval * (i + 1),
    );
  }
}
