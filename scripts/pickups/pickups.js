const totalAmountOfPickups = 20;

class Pickup {
  constructor({ game, position, image, frames = { max: 1 }, sprites }) {
    this.game = game;
    this.position = position;
    this.image = image;
    this.width = 56;
    this.height = 56;
    this.isActive = true;

    this.velocity = {
      x: 0,
      y: 0,
    };
  }

  draw() {
    this.game.context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
