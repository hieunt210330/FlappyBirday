class Bird {
    constructor(x, y, width, height, image_src, context){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        this.image = new Image();
        this.image.src = image_src;
        this.context = context;
        
        this.image.onload = function() 
        {
            context.drawImage(birdImage, x, brd.y, width, height);
        }

    }

    draw()
    {
        this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    updatePosition(velocityY, boardHeight, groundHeight)
    {
        // Bird can go up and out of the screen
        // this.y += velocityY;

        // Bird can't go up and out of the screen
        this.y = Math.max(this.y + velocityY, 0);

        // Bird can't be below the ground
        this.y = Math.min(this.y + velocityY, boardHeight + this.height - groundHeight);
    }

    isCollidingWithPipe(pipe)
    {
        if (pipe.top.x <= this.x + bird.width && this.x <= pipe.top.x + pipe.top.width)
        {
            // check if the bird is between the top and bottom pipes
            if (this.y <= pipe.top.y + pipe.top.height)
            {
                return true;
            }
            else if (this.y + this.height >= pipe.bottom.y)
            {
                return true;
            }
        }
        return false;
    }

    isCollidingWithGround(groundHeight, boardHeight)
    {
        return this.y + this.height >= boardHeight - groundHeight;
    }
}