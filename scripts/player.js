const playerDownImage = new Image();
playerDownImage.src = "./assets/characters/playerDown.png";

const playerUpImage = new Image();
playerUpImage.src = "./assets/characters/playerUp.png";

const playerLeftImage = new Image();
playerLeftImage.src = "./assets/characters/playerLeft.png";

const playerRightImage = new Image();
playerRightImage.src = "./assets/characters/playerRight.png";

class Player {
  constructor({
    game,
    position,
    velocity,
    image,
    frames = { max: 1 },
    sprites,
  }) {
    this.game = game;
    this.position = position;
    this.image = image;
    this.frames = { ...frames, val: 0, elapsed: 0 };
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
    this.moving = false;
    this.sprites = sprites;
  }

  draw() {
    this.game.context.drawImage(
      this.image,
      this.frames.val * this.width,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    );

    if (!this.moving) return;

    if (this.frames.max > 1) {
      this.frames.elapsed++;
    }

    if (this.frames.elapsed % 20 === 0) {
      if (this.frames.val < this.frames.max - 1) this.frames.val++;
      else this.frames.val = 0;
    }
  }
}
