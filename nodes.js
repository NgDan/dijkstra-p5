class Nodes {
  constructor(size) {
    this.nodes = {};

    this.startNode = null;

    this.endNode = null;

    this.nodeSize = size;
  }
  addNode(x, y, isStart = false, isEnd = false) {
    let _id = x.toString() + y.toString();
    isStart ? this.startNode = new Node(x, y, isStart, isEnd) : null;
    isEnd ? this.endNode = new Node(x, y, isStart, isEnd) : null;
    if (
      Object.keys(this.nodes).length === 0 ||
      typeof this.nodes[_id] === "undefined"
    ) {
      this.nodes[_id] = new Node(x, y, isStart, isEnd);
    }
    document.querySelector(".nodes").innerHTML =
      ": " + Object.keys(this.nodes).length;
    document.querySelector(".edges").innerHTML =
      ": " + Object.keys(grid.newEdges).length;
  }

  updateNeighboursDistanceAndReturnClosest(node, edges, nodes) {
    if (node !== null) {
      // console.log(nodes);
      // console.log(edges + '\n\n');

      return Object.keys(edges.edges).filter(edge => {
        return edges.edges[edge].node1._id === node._id || edges.edges[edge].node2._id === node._id;
      }).map(key => {
        let edge = edges.edges[key];
        if (edge.node1._id === node._id) {
          let neighbourNode = edge.node2._id;
          //here if this edge's weight is smaller than shortestDistFrom start, update it
          return neighbourNode;
        } else {
          let neighbourNode = edge.node1._id;

          return neighbourNode;
        }
      })

    } else {
      return null;
    }
  }

  getNodesNumber() {
    return Object.keys(this.nodes).length;
  }

  connectNodesWithinRadius(radius) {
    const distanceBetweenNodes = (node1, node2) => {
      return (
        Math.pow(Math.abs(node1.posX - node2.posX), 2) +
        Math.pow(Math.abs(node1.posY - node2.posY), 2)
      );
    };
    if (this.getNodesNumber() < 2) {
      return;
    }

    Object.keys(this.nodes).map(item => {
      Object.keys(this.nodes).map(item2 => {
        let weight = distanceBetweenNodes(this.nodes[item], this.nodes[item2]);
        // let reverseEdgeId = this.nodes[item2]._id + this.nodes[item]._id;

        if (this.nodes[item]._id !== this.nodes[item2]._id && weight < radius) {
          grid.newEdges.addEdge(this.nodes[item], this.nodes[item2]);
        }
        if (weight > radius) {
          grid.newEdges.removeEdge(this.nodes[item], this.nodes[item2]);
        }
      });
    });

    // console.log(grid.edges);
    // console.log(this.nodes);
  }

  draw() {
    Object.keys(this.nodes).map(item => {
      if (this.nodes[item].isStart) {
        fill("green");
        rect(
          this.nodes[item].posX,
          this.nodes[item].posY,
          this.nodeSize,
          this.nodeSize
        );
        fill("white");
      } else if (this.nodes[item].isEnd) {
        fill("red");
        rect(
          this.nodes[item].posX,
          this.nodes[item].posY,
          this.nodeSize,
          this.nodeSize
        );
        fill("white");
      } else {
        fill("white");
        rect(
          this.nodes[item].posX,
          this.nodes[item].posY,
          this.nodeSize,
          this.nodeSize
        );
      }
    });
  }
}
