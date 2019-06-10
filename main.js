function setup() {
  height = 800;
  width = 800;
  createCanvas(width, height);
  sliderValue = 5;
  grid = new Grid(50, sliderValue);
  let slider = document.querySelector(".slidecontainer input");
  slider.addEventListener("input", function() {
    grid.neighbourRadius = Math.pow(this.value * grid.nodeSize, 2);
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

  grid.addNode(xPosition, yPosition);
}

function draw() {
  background(200);
  hightlightNode();
  grid.show();
}
