class Edges {
  constructor() {
    this.edges = {};
  }

  addEdge(node1, node2) {
    let edgeId = node1._id + node2._id;
    let reverseEdgeId = node2._id + node1._id;

    let edgeWeight = (node1, node2) => {
      return (
        Math.pow(Math.abs(node1.posX - node2.posX), 2) +
        Math.pow(Math.abs(node1.posY - node2.posY), 2)
      );
    };

    if (
      typeof this.edges[edgeId] === "undefined" &&
      typeof this.edges[reverseEdgeId] === "undefined"
    ) {
      this.edges[edgeId] = new Edge(node1, node2, edgeWeight(node1, node2));
    }
  }

  removeEdge(node1, node2) {
    let edgeId = node1._id + node2._id;
    let reverseEdgeId = node2._id + node1._id;

    if (this.edges[edgeId]) {
      delete this.edges[edgeId];
    }
    if (this.edges[reverseEdgeId]) {
      delete this.edges[reverseEdgeId];
    }
  }

  getNeighbourNodes(node) {
    //get neighbours
  }

  draw() {
    Object.keys(this.edges).map(item => {
      stroke("red");
      strokeWeight(3);
      line(
        this.edges[item].node1.posX + grid.nodeSize / 2,
        this.edges[item].node1.posY + grid.nodeSize / 2,
        this.edges[item].node2.posX + grid.nodeSize / 2,
        this.edges[item].node2.posY + grid.nodeSize / 2
      );
      strokeWeight(1);
      stroke("black");
    });
  }
}
