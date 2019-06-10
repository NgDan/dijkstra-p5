class Grid {
  constructor(gridSize, neighbourRadius) {
    this.gridSize = gridSize;
    this.nodes = [];
    //edges are stored in an object because it's faster to lookup
    this.edges = {};
    this.nodeSize = width / this.gridSize;
    this.neighbourRadius = Math.pow(neighbourRadius * this.nodeSize, 2);
  }

  distanceBetweenNodes(node1, node2) {
    return (
      Math.pow(Math.abs(node1.posX - node2.posX), 2) +
      Math.pow(Math.abs(node1.posY - node2.posY), 2)
    );
  }

  addEdges() {
    if (this.nodes.length < 2) {
      return;
    }
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = 0; j < this.nodes.length; j++) {
        let edgeId = this.nodes[i]._id + this.nodes[j]._id;
        let reverseEdgeId = this.nodes[j]._id + this.nodes[i]._id;
        let weight = this.distanceBetweenNodes(this.nodes[i], this.nodes[j]);

        if (this.edges[edgeId] || this.edges[reverseEdgeId]) {
        } else if (
          this.nodes[i] !== this.nodes[j] &&
          weight < this.neighbourRadius
        ) {
          this.edges[edgeId] = new Edge(this.nodes[i], this.nodes[j], weight);
          console.log(this.edges[edgeId].weight);
        }
      }
    }
  }

  addNode(x, y) {
    let nodeAlreadyExists = false;
    if (this.nodes == []) {
      this.nodes.push(new Node(x, y));
    } else {
      for (let i = 0; i < this.nodes.length; i++) {
        if (this.nodes[i].posX == x && this.nodes[i].posY == y) {
          nodeAlreadyExists = true;
        }
      }
      if (!nodeAlreadyExists) {
        this.nodes.push(new Node(x, y));
        console.log(this.neighbourRadius);
      }
    }
    this.addEdges();
  }

  show() {
    //Draw grid lines
    for (let i = 0; i < this.gridSize; i++) {
      line(i * this.nodeSize - 1, 0, i * this.nodeSize - 1, height);
      line(0, i * this.nodeSize - 1, height, i * this.nodeSize - 1);
    }
    for (let i = 0; i < this.nodes.length; i++) {
      rect(
        this.nodes[i].posX,
        this.nodes[i].posY,
        this.nodeSize,
        this.nodeSize
      );
    }
    for (let i = 0; i < Object.keys(this.edges).length; i++) {
      stroke("red");
      strokeWeight(3);
      line(
        this.edges[Object.keys(this.edges)[i]].node1.posX + this.nodeSize / 2,
        this.edges[Object.keys(this.edges)[i]].node1.posY + this.nodeSize / 2,
        this.edges[Object.keys(this.edges)[i]].node2.posX + this.nodeSize / 2,
        this.edges[Object.keys(this.edges)[i]].node2.posY + this.nodeSize / 2
      );
      strokeWeight(1);
      stroke("black");
    }
  }
}
