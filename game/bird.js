class Bird {
    constructor(x, y, width, height, image){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
    }

    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}