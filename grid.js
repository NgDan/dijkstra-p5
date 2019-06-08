class Grid {
    constructor(size){
        this.size = size
    }
    draw(){
        
        //Draw grid lines
        for(let i=0; i<this.size; i++){
            line(i*width/this.size-1,0,i*width/this.size-1,height);
            line(0,i*width/this.size-1,height,i*width/this.size-1);
        }

        // Highlight current rectangle that's being hovered 
        rect(
            mouseX - mouseX%(width/this.size)-1,
            mouseY - mouseY%(height/this.size)-1,
            width/this.size,
            height/this.size
        )
    }
}