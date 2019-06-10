
function setup() {

    height = 800;
    width = 800;
    createCanvas(width,height);
    grid = new Grid(10);
}



function hightlightNode(){

    // Highlight current rectangle that's being hovered 
    let xPosition = mouseX - mouseX%(width/grid.gridSize)-1;
    let yPosition = mouseY - mouseY%(width/grid.gridSize)-1;

    rect(
        xPosition,
        yPosition,
        width/grid.gridSize,
        height/grid.gridSize
    )
}

function mouseClicked(){
    let xPosition = mouseX - mouseX%(width/grid.gridSize)-1;
    let yPosition = mouseY - mouseY%(width/grid.gridSize)-1;

    grid.addNode(xPosition,yPosition);
} 

function draw() {
    background(200);
    hightlightNode();
    grid.show();
}