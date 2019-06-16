function setup() {
  height = 600;
  width = 600;
  createCanvas(width, height);
  sliderValue = 5;
  grid = new Grid(10, sliderValue);

  let slider = document.querySelector(".slidecontainer input");

  slider.addEventListener("input", function() {
    let radius = Math.pow(this.value * grid.nodeSize, 2);
    grid.radius = radius;
    grid.connectNodesWithinRadius(radius);
    document.querySelector('.nodes').innerHTML = ': ' + grid.nodes.length;
    document.querySelector('.edges').innerHTML = ': ' + Object.keys(grid.edges).length;
    console.log(grid)
  });
}

function snapToGrid(position){
  return position - (position % (width / grid.gridSize)) - 1
}

function hightlightNode() {
  // Highlight current rectangle that's being hovered

  rect(snapToGrid(mouseX), snapToGrid(mouseY), width / grid.gridSize, height / grid.gridSize);
}

function mouseClicked() {
  if (mouseX < width && mouseY < width && mouseX < width && mouseY < width) {
    grid.addNode(snapToGrid(mouseX), snapToGrid(mouseY));
  }
}

function keyPressed(){
  // when you press the S key, add start node
  if(keyCode === 83 && !grid.hasStartNode){
    grid.addNode(snapToGrid(mouseX), snapToGrid(mouseY), true, false);
    grid.hasStartNode = true;
  }

  // when you press the E key, add end node
  if(keyCode === 69 && !grid.hasEndNode){
    grid.addNode(snapToGrid(mouseX), snapToGrid(mouseY), false, true);
    grid.hasEndNode = true;
  }
  console.log(keyCode)
  console.log()
}

function draw() {
  background(200);
  hightlightNode();
  grid.show();
  grid.dijkstra()

}
