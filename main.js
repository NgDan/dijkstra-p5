const updateDOM = () => {
  document.querySelector(".nodes").innerHTML = Object.keys(grid.newNodes.nodes).length;
  document.querySelector(".edges").innerHTML = Object.keys(grid.newEdges.edges).length;

}


function setup() {
  // frameRate(1);
  height = 600;
  width = 600;
  createCanvas(width, height);
  sliderValue = 10;
  gridSize = 41;
  nodeSize = width / gridSize;
  grid = new Grid(gridSize, sliderValue, nodeSize);

  let slider = document.querySelector(".slidecontainer input");

  slider.addEventListener("input", function () {
    let radius = Math.pow(this.value * grid.nodeSize, 2);
    grid.radius = radius;
    grid.newNodes.connectNodesWithinRadius(radius);

    // grid.connectNodesWithinRadius(radius);
    updateDOM();

    // console.log(grid.newNodes.nodes)


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
    grid.unvisitedNodes.addNode(snapToGrid(mouseX), snapToGrid(mouseY));

    grid.newNodes.connectNodesWithinRadius(grid.radius);
    updateDOM();
  }
}

function keyPressed() {
  // when you press the S key, add start node
  if (keyCode === 83 && !grid.hasStartNode) {
    grid.hasStartNode = true;

    grid.newNodes.addNode(snapToGrid(mouseX), snapToGrid(mouseY), true, false);
    grid.unvisitedNodes.addNode(snapToGrid(mouseX), snapToGrid(mouseY), true, false);
    grid.newNodes.connectNodesWithinRadius(grid.radius);
    updateDOM();
  }

  // when you press the E key, add end node
  if (keyCode === 69 && !grid.hasEndNode) {
    grid.hasEndNode = true;

    grid.newNodes.addNode(snapToGrid(mouseX), snapToGrid(mouseY), false, true);
    grid.unvisitedNodes.addNode(snapToGrid(mouseX), snapToGrid(mouseY), false, true);
    grid.newNodes.connectNodesWithinRadius(grid.radius);
    updateDOM();
  }
  if (keyCode === 68) {
    grid.dijkstra();
  }

}

function draw() {
  background(200);
  hightlightNode();
  grid.show();
  grid.newNodes.draw('white');
  // grid.visitedNodes.draw('blue');
  grid.newEdges.draw('red', 1);
  grid.shortestPath.draw('yellow', 3);

}
