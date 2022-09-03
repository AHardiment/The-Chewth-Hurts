const offset = {
  x: -1095,
  y: -1200,
};

const image = new Image();
image.src = "./assets/theGoodKnightTileset.png";

const foregroundImage = new Image();
foregroundImage.src = "./assets/foregroundObjects.png";

class Background {
  constructor({
    game,
    position,
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
  }
}

class Foreground {
  constructor({
    game,
    position,
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
  }
}

class Boundary {
  static width = 56;
  static height = 56;

  constructor({ game, position }) {
    this.game = game;
    this.position = position;
    this.width = 56;
    this.height = 56;
  }

  draw() {
    this.game.context.fillStyle = "rgb(255, 0, 0, 0";
    this.game.context.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
