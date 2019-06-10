function setup() {
  height = 600;
  width = 600;
  createCanvas(width, height);
  grid = new Grid(20, 7);
}

function hightlightNode() {
  // Highlight current rectangle that's being hovered
  let xPosition = mouseX - (mouseX % (width / grid.gridSize)) - 1;
  let yPosition = mouseY - (mouseY % (width / grid.gridSize)) - 1;

  rect(xPosition, yPosition, width / grid.gridSize, height / grid.gridSize);
}

function mouseClicked() {
  let xPosition = mouseX - (mouseX % (width / grid.gridSize)) - 1;
  let yPosition = mouseY - (mouseY % (width / grid.gridSize)) - 1;

  grid.addNode(xPosition, yPosition);
}

function draw() {
  background(200);
  hightlightNode();
  grid.show();
}
