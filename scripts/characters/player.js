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

    this.velocity = {
      x: 0,
      y: 0,
    };
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

  pickupStrengthPickups() {
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
        if (pickup.isActive) {
          this.game.removeStrengthPickup(i);
          // this.game.player.strength += 1;}
          this.game.strength += 5;
        }
      }
    }
  }
  
  pickupDefencePickups() {
    for (let i = 0; i < this.game.defencePickups.length; i++) {
      const pickup = this.game.defencePickups[i];
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
        if (pickup.isActive) {
          this.game.removeDefencePickup(i);
          // this.game.player.strength += 1;}
          this.game.defence += 5;
        }
      }
    }
  }

  pickupHealthPickups() {
    for (let i = 0; i < this.game.healthPickups.length; i++) {
      const pickup = this.game.healthPickups[i];
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
        if (pickup.isActive) {
          this.game.removeHealthPickup(i);
          // this.game.player.strength += 1;}
          this.game.health += 5;
        }
      }
    }
  }

  attackEnemy() {
    for (let i = 0; i < this.game.enemies.length; i++) {
      const enemy = this.game.enemies[i];
      if (
        this.game.isColliding({
          rectangle1: this.game.player,
          rectangle2: {
            ...enemy,
            position: {
              x: enemy.position.x - 3,
              y: enemy.position.y - 3,
            },
          },
        })
      ) {
        if (enemy.isActive) {
          this.game.enemyHealth -= 5;
          if (this.game.enemyHealth === 0) {
            this.game.removeEnemies(i);
          }
          console.log(this.game.enemyHealth);
        }
      }
    }
  }
}
