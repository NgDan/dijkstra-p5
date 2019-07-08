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

    this.unvisitedNodes = [];

    this.visitedNodes = [];

    this.nodeSize = nodeSize;

    this.radius = Math.pow(radius * this.nodeSize, 2);
  }

  // dijkstra() {
  //   let currentNode = this.startNode;

  //   grid.unvisitedNodes = this.nodes;

  //   const getNeighbours = node => {
  //     if (node !== null) {
  //       return Object.keys(this.edges)
  //         .filter(edge => {
  //           return (
  //             this.edges[edge].node1 === node || this.edges[edge].node2 === node
  //           );
  //         })
  //         .map(key => {
  //           if (this.edges[key].node1 === node) {
  //             return this.edges[key].node2;
  //           } else {
  //             return this.edges[key].node1;
  //           }
  //         });
  //     } else {
  //       return null;
  //     }
  //   };

  //   console.log(getNeighbours(currentNode));

  //   for (let i = 0; i < neighbours.length; i++) {
  //     // get distance between current node and iterated neighbour
  //     let distance =
  //       currentNode.shortestDistFromStart +
  //       this.distanceBetweenNodes(neighbours[i], currentNode);

  //     if (
  //       neighbours[i].shortestDistFromStart === "infinity" ||
  //       neighbours[i].shortestDistFromStart > distance
  //     ) {
  //       neighbours[i].shortestDistFromStart = distance;
  //       this.edges[neighbours[i]._id].previousNode = currentNode;
  //     }
  //   }
  //   console.log();
  // }

  show() {
    //Draw grid lines
    for (let i = 0; i < this.gridSize; i++) {
      line(i * this.nodeSize - 1, 0, i * this.nodeSize - 1, height);
      line(0, i * this.nodeSize - 1, height, i * this.nodeSize - 1);
    }
  }
}
