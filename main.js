function setup() {
  height = 600;
  width = 600;
  createCanvas(width, height);
  sliderValue = 5;
  grid = new Grid(10, sliderValue);
  let slider = document.querySelector(".slidecontainer input");
  slider.addEventListener("input", function() {
    grid.neighbourRadius = Math.pow(this.value * grid.nodeSize, 2);
    grid.addEdges();
  });
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

  if (mouseX < width && mouseY < width && mouseX < width && mouseY < width) {
    grid.addNode(xPosition, yPosition);
  }
}

function draw() {
  background(200);
  hightlightNode();
  grid.show();
}
