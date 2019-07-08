function setup() {
  height = 500;
  width = 500;
  createCanvas(width, height);
  sliderValue = 5;
  gridSize = 10;
  nodeSize = width / gridSize;
  grid = new Grid(gridSize, sliderValue, nodeSize);

  let slider = document.querySelector(".slidecontainer input");

  slider.addEventListener("input", function() {
    let radius = Math.pow(this.value * grid.nodeSize, 2);
    grid.radius = radius;
    // grid.connectNodesWithinRadius(radius);
    document.querySelector(".nodes").innerHTML =
      ": " + Object.keys(grid.newNodes).length;
    document.querySelector(".edges").innerHTML =
      ": " + grid.newEdges.edges.length;

    grid.newNodes.connectNodesWithinRadius(radius);
    // grid.dijkstra();
  });
}

function snapToGrid(position) {
  return position - (position % (width / grid.gridSize)) - 1;
}

function hightlightNode() {
  // Highlight current rectangle that's being hovered

  rect(
    snapToGrid(mouseX),
    snapToGrid(mouseY),
    width / grid.gridSize,
    height / grid.gridSize
  );
}

function mouseClicked() {
  if (mouseX < width && mouseY < width && mouseX < width && mouseY < width) {
    grid.newNodes.addNode(snapToGrid(mouseX), snapToGrid(mouseY));
    grid.newNodes.connectNodesWithinRadius(grid.radius);
  }
}

function keyPressed() {
  // when you press the S key, add start node
  if (keyCode === 83 && !grid.hasStartNode) {
    grid.hasStartNode = true;

    grid.newNodes.addNode(snapToGrid(mouseX), snapToGrid(mouseY), true, false);
    grid.newNodes.connectNodesWithinRadius(grid.radius);
  }

  // when you press the E key, add end node
  if (keyCode === 69 && !grid.hasEndNode) {
    grid.hasEndNode = true;

    grid.newNodes.addNode(snapToGrid(mouseX), snapToGrid(mouseY), false, true);
    grid.newNodes.connectNodesWithinRadius(grid.radius);
  }
}

function draw() {
  background(200);
  hightlightNode();
  grid.newNodes.draw();
  grid.show();
  grid.newEdges.draw();
}
