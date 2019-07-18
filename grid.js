class Grid {
  constructor(gridSize, radius, nodeSize, startNode = null, endNode = null) {
    this.gridSize = gridSize;

    this.nodes = [];
    //edges are stored in an object instead of array because it's faster to lookup

    this.newNodes = new Nodes(nodeSize);

    this.edges = {};

    this.newEdges = new Edges();

    this.startNode = startNode;

    this.endNode = endNode;

    this.unvisitedNodes = new Nodes(nodeSize);

    this.visitedNodes = new Nodes(nodeSize);

    this.nodeSize = nodeSize;

    this.radius = Math.sqrt(Math.pow(radius * this.nodeSize, 2));

    this.shortestPath = new Edges();
  }

  dijkstra() {


    let currentNode = this.newNodes.startNode;

    let closestNeighbour;

    while (Object.keys(this.unvisitedNodes.nodes).length > 0) {
      closestNeighbour = grid.newNodes.updateNeighboursDistanceAndReturnClosest(
        currentNode,
        this.newEdges,
        this.visitedNodes.nodes
      );

      // console.log(this.visitedNodes.nodes);

      this.unvisitedNodes.deleteNode(currentNode._id);
      this.visitedNodes.addExistingNode(currentNode);

      currentNode = closestNeighbour;

      // console.log(currentNode);
    }

    let backtrackNode;

    Object.keys(this.newNodes.nodes).forEach(node => {
      this.newNodes.nodes[node].isEnd
        ? (backtrackNode = this.newNodes.nodes[node])
        : null;
    });

    while (backtrackNode._id !== this.newNodes.startNode._id) {
      this.shortestPath.addEdge(backtrackNode, backtrackNode.previousNode);
      backtrackNode = backtrackNode.previousNode;
    }
  }

  show() {
    //Draw grid lines
    for (let i = 0; i < this.gridSize; i++) {
      line(i * this.nodeSize - 1, 0, i * this.nodeSize - 1, height);
      line(0, i * this.nodeSize - 1, height, i * this.nodeSize - 1);
    }
  }
}
