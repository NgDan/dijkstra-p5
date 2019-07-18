class Nodes {
  constructor(size) {
    this.nodes = {};

    this.startNode = null;

    this.endNode = null;

    this.nodeSize = size;

    this.getNodes = () => {
      return this.nodes;
    };
  }
  addNode(x, y, isStart = false, isEnd = false) {
    let _id = x.toString() + y.toString();
    isStart ? (this.startNode = new Node(x, y, isStart, isEnd)) : null;
    isEnd ? (this.endNode = new Node(x, y, isStart, isEnd)) : null;
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

  addExistingNode(node) {
    this.nodes[node._id] = node;
  }

  deleteNode(id) {
    delete this.nodes[id];
  }

  getDistanceBetweenNodes(node1id, node2id, nodes) {
    return Math.sqrt(
      Math.pow(nodes[node1id].posX - nodes[node2id].posX, 2) +
      Math.pow(nodes[node1id].posY - nodes[node2id].posY, 2)
    );
  }

  updateNeighboursDistanceAndReturnClosest(node, edges, visitedNodes) {
    if (node !== null) {
      let shortestWeight = 10000000000000;
      let closestNeighbour;

      // console.log("edges: ");
      // console.log(edges);

      Object.keys(edges.edges)
        .filter(edge => {
          return (
            edges.edges[edge].node1._id === node._id ||
            edges.edges[edge].node2._id === node._id
          );
        })
        .map(key => {
          let edge = edges.edges[key];
          let currentDistanceFromStart =
            node.shortestDistFromStart + edge.weight;
          let neighbourNode;
          edge.node1._id === node._id
            ? (neighbourNode = edge.node2)
            : (neighbourNode = edge.node1);
          //here if this edge's weight + this nodes distance from start is smaller than shortestDistFrom start, update it

          if (typeof visitedNodes[neighbourNode._id] === "undefined") {
            if (neighbourNode.shortestDistFromStart !== "infinity") {
              currentDistanceFromStart < neighbourNode.shortestDistFromStart
                ? ((grid.newNodes.nodes[
                  neighbourNode._id
                ].shortestDistFromStart = currentDistanceFromStart),
                  (grid.newNodes.nodes[neighbourNode._id].previousNode = node))
                : null;
            } else {
              grid.newNodes.nodes[
                neighbourNode._id
              ].shortestDistFromStart = currentDistanceFromStart;
              grid.newNodes.nodes[neighbourNode._id].previousNode = node;
            }
            // if (edge.weight < shortestWeight) {
            //   closestNeighbour = neighbourNode;
            //   shortestWeight = edge.weight;
            // }
            return neighbourNode;
          }
        });
      Object.keys(this.nodes).forEach(id => {
        if (this.nodes[id].shortestDistFromStart !== 'infinity' && this.nodes[id].shortestDistFromStart < shortestWeight && typeof visitedNodes[id] === "undefined") {
          closestNeighbour = this.nodes[id];
          shortestWeight = this.nodes[id].shortestDistFromStart;
        }
        console.log(this.nodes[node])
      })
      // console.log(this.nodes)
      return closestNeighbour;
    } else {
      return null;
    }
  }

  getNodesNumber() {
    return Object.keys(this.nodes).length;
  }

  connectNodesWithinRadius(radius) {
    const distanceBetweenNodes = (node1, node2) => {
      return Math.sqrt(
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

  draw(color) {
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
        fill(color);
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
