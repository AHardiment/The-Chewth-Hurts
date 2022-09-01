class Sprite {
    constructor({ position, velocity, image, frames = { max: 1 } }) {
      this.position = position;
      this.image = image;
      this.frames = frames;
      this.image.onload = () => {
        this.width = this.image.width / this.frames.max;
        this.height = this.image.height;
      };
    }
  
    draw() {
      context.drawImage(
        this.image,
        0,
        0,
        this.image.width / this.frames.max,
        this.image.height,
        this.position.x,
        this.position.y,
        this.image.width / this.frames.max,
        this.image.height
      );
    }
  }

  class Boundary {
    static width = 56;
    static height = 56;
  
    constructor({ position }) {
      this.position = position;
      this.width = 56;
      this.height = 56;
    }
  
    draw() {
      context.fillStyle = "rgb(255, 0, 0, 0";
      context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }