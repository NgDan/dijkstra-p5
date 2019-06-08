
function setup() {
    height = 800;
    width = 800;
    createCanvas(width,height);
    
    grid = new Grid(20);
}



function draw() {
    background(200);
    grid.draw();
}