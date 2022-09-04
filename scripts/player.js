const playerDownImage = new Image();
playerDownImage.src = "./assets/characters/playerDown.png";

const playerUpImage = new Image();
playerUpImage.src = "./assets/characters/playerUp.png";

const playerLeftImage = new Image();
playerLeftImage.src = "./assets/characters/playerLeft.png";

const playerRightImage = new Image();
playerRightImage.src = "./assets/characters/playerRight.png";

class Player {
  constructor({ game, position, image, frames = { max: 1 }, sprites }) {
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

  runLogic() {
    let isMoving = true;

    this.game.player.moving = false;

    if (keys.w.isPressed) {
      //this should go in the draw/runLogic method of the player.js file
      for (let i = 0; i < this.game.boundaries.length; i++) {
        this.game.player.moving = true;
        this.game.player.image = this.game.player.sprites.up;
        const boundary = this.game.boundaries[i];
        if (
          this.game.isColliding({
            rectangle1: this.game.player,
            rectangle2: {
              ...boundary,
              position: {
                x: boundary.position.x,
                y: boundary.position.y + 3,
              },
            },
          })
        ) {
          isMoving = false;
          break;
        }
      }

      if (isMoving) {
        this.game.movables.forEach((movable) => {
          movable.position.y += 3;
        });
      }
    } else if (keys.s.isPressed) {
      for (let i = 0; i < this.game.boundaries.length; i++) {
        this.game.player.moving = true;
        this.game.player.image = this.game.player.sprites.down;
        const boundary = this.game.boundaries[i];
        if (
          this.game.isColliding({
            rectangle1: this.game.player,
            rectangle2: {
              ...boundary,
              position: {
                x: boundary.position.x,
                y: boundary.position.y - 3,
              },
            },
          })
        ) {
          isMoving = false;
          break;
        }
      }

      if (isMoving) {
        this.game.movables.forEach((movable) => {
          movable.position.y -= 3;
        });
      }
    } else if (keys.a.isPressed) {
      for (let i = 0; i < this.game.boundaries.length; i++) {
        this.game.player.moving = true;
        this.game.player.image = this.game.player.sprites.left;
        const boundary = this.game.boundaries[i];
        if (
          this.game.isColliding({
            rectangle1: this.game.player,
            rectangle2: {
              ...boundary,
              position: {
                x: boundary.position.x + 3,
                y: boundary.position.y,
              },
            },
          })
        ) {
          isMoving = false;
          break;
        }
      }

      if (isMoving) {
        this.game.movables.forEach((movable) => {
          movable.position.x += 3;
        });
      }
    } else if (keys.d.isPressed) {
      for (let i = 0; i < this.game.boundaries.length; i++) {
        this.game.player.moving = true;
        this.game.player.image = this.game.player.sprites.right;
        const boundary = this.game.boundaries[i];
        if (
          this.game.isColliding({
            rectangle1: this.game.player,
            rectangle2: {
              ...boundary,
              position: {
                x: boundary.position.x - 3,
                y: boundary.position.y,
              },
            },
          })
        ) {
          isMoving = false;
          break;
        }
      }

      if (isMoving) {
        this.game.movables.forEach((movable) => {
          movable.position.x -= 3;
        });
      }
    }
  }

  pickupStrengthPickup() {
    for (let i = 0; i < this.game.strengthPickups.length; i++) {
      const pickup = this.game.strengthPickups[i];
      if (
        this.game.isColliding({
          rectangle1: this.game.player,
          rectangle2: {
            ...pickup,
            position: {
              x: pickup.position.x - 3,
              y: pickup.position.y - 3,
            },
          },
        })
      ) {
        console.log("Picked up");
        this.game.strengthPickups.splice(i, 1);
        // this.game.player.strength += 1;}
        this.game.strength += 1;
      }
    }
    console.log(this.game.strength);
  }
}
