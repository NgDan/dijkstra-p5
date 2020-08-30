const updateDOM = () => {
  document.querySelector('.nodes').innerHTML = Object.keys(
    grid.newNodes.nodes
  ).length;
  document.querySelector('.edges').innerHTML = Object.keys(
    grid.newEdges.edges
  ).length;
};

const createState = (initialState) => {
  let state = initialState;
  const getState = () => state;
  const setState = (value) => {
    state = value;
    return state;
  };
  return { setState, getState };
};

const state = createState('initial');

const hightLightInstructionMsg = () => {
  const msgElement = document.querySelector('.instructions-wrapper p');
  scrollTo(0, 0);
  msgElement.classList.remove('red-bg', 'white-bg');
  msgElement.classList.add('red-bg');
  setTimeout(() => {
    msgElement.classList.remove('red-bg');
    msgElement.classList.add('white-bg');
  }, 200);
};

const updateInstructions = () => {
  const msgElement = document.querySelector('.instructions-wrapper p');
  let message = 'Hover over a cell and press "S" to choose a starting point';
  if (!!grid.hasStartNode && !grid.hasEndNode) {
    message =
      'Select a few nodes on the map by using the left click button, then press "E" to choose an ending point';
  }
  if (!!grid.hasStartNode && !!grid.hasEndNode) {
    message =
      'Make sure all nodes are connected by dragging the slider or adding more nodes and press "D"';
  }
  if (!!grid.hasStartNode && !!grid.hasEndNode && state.getState() === 'end') {
    message =
      'You should see the shortest path in yellow. If something went wrong please refresh the page and follow the instructions again';
  }
  msgElement.innerText = message;
};

function setup() {
  // frameRate(1);
  height = 800;
  width = 800;
  const cnv = createCanvas(width, height);
  cnv.parent('canvascontainer');
  sliderValue = 10;
  gridSize = 60;
  nodeSize = width / gridSize;
  grid = new Grid(gridSize, sliderValue, nodeSize);

  let slider = document.querySelector('.slidecontainer input');

  slider.addEventListener('input', function () {
    let radius = this.value * grid.nodeSize;
    grid.radius = radius;
    grid.newNodes.connectNodesWithinRadius(radius);
  });
  updateDOM();
  updateInstructions();
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
  if (
    mouseX < width &&
    mouseY < width &&
    mouseX > 0 &&
    mouseY > 0 &&
    grid.hasStartNode
  ) {
    if (state.getState() === 'start-node') {
      grid.newNodes.addNode(snapToGrid(mouseX), snapToGrid(mouseY));
      grid.unvisitedNodes.addNode(snapToGrid(mouseX), snapToGrid(mouseY));

      grid.newNodes.connectNodesWithinRadius(grid.radius);
      updateDOM();
      updateInstructions();
    } else {
      hightLightInstructionMsg();
    }
  }
  if (state.getState() === 'initial') {
    hightLightInstructionMsg();
  }
}

function keyPressed() {
  if (state.getState() === 'initial' && keyCode !== 83) {
    hightLightInstructionMsg();
  }
  if (state.getState() === 'start-node' && keyCode !== 69) {
    hightLightInstructionMsg();
  }
  if (state.getState() === 'end-node' && keyCode !== 68) {
    hightLightInstructionMsg();
  }
  // when you press the S key, add start node
  if (keyCode === 83 && !grid.hasStartNode) {
    grid.hasStartNode = true;
    grid.newNodes.addNode(snapToGrid(mouseX), snapToGrid(mouseY), true, false);
    grid.startNode = grid.newNodes.startNode;
    grid.unvisitedNodes.addNode(
      snapToGrid(mouseX),
      snapToGrid(mouseY),
      true,
      false
    );
    grid.newNodes.connectNodesWithinRadius(grid.radius);
    state.setState('start-node');
    updateDOM();
    updateInstructions();
  }

  // when you press the E key, add end node
  if (keyCode === 69 && !grid.hasEndNode && grid.hasStartNode) {
    grid.hasEndNode = true;
    grid.newNodes.addNode(snapToGrid(mouseX), snapToGrid(mouseY), false, true);
    grid.unvisitedNodes.addNode(
      snapToGrid(mouseX),
      snapToGrid(mouseY),
      false,
      true
    );
    grid.newNodes.connectNodesWithinRadius(grid.radius);
    state.setState('end-node');
    updateDOM();
    updateInstructions();
  }
  if (keyCode === 68) {
    grid.shortestPath.edges = {};
    if (!!grid.hasStartNode && !!grid.hasEndNode) {
      state.setState('end');
      grid.dijkstra();
      updateInstructions();
    }
    if (state.getState() === 'end') {
      hightLightInstructionMsg();
    }
  }
}

function draw() {
  background(200);
  hightlightNode();
  grid.show();
  grid.newNodes.draw('white');
  grid.newEdges.draw('red', 1);
  grid.shortestPath.draw('yellow', 3);
}
