class Grid {
    constructor(gridSize){
        this.gridSize = gridSize;
        this.nodes = [];
        this.edges = [];
        this.nodeSize = width/this.gridSize;  
    }

    addNode(x,y){
        let nodeAlreadyExists = false;
        if(this.nodes == []){
            this.nodes.push(new Node(x,y));
        }else{
        for(let i = 0; i < this.nodes.length; i++){
            console.log(x)
                if(this.nodes[i].posX == x && this.nodes[i].posY == y){
                nodeAlreadyExists = true;
            }
            }
            if (!nodeAlreadyExists){
                this.nodes.push(new Node(x,y));
            }
        }
    }
    

    show(){
        //Draw grid lines
        for(let i=0; i<this.gridSize; i++){
            line(i*this.nodeSize-1,0,i*this.nodeSize-1,height);
            line(0,i*this.nodeSize-1,height,i*this.nodeSize-1);
        }
        for(let i = 0; i < this.nodes.length; i++){
            rect(this.nodes[i].posX,this.nodes[i].posY,this.nodeSize,this.nodeSize)
        }
    }
}