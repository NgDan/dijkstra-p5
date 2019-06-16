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
  console.log(keyCode)
  console.log()
}

function draw() {
  background(200);
  hightlightNode();
  grid.show();

}
