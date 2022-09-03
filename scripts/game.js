class Game {
  constructor() {
    this.canvasElement = document.querySelector("canvas");
    this.context = this.canvasElement.getContext("2d");

    this.width = this.canvasElement.width;
    this.height = this.canvasElement.height;
    this.background = new Background({
      game: this,
      position: {
        x: offset.x,
        y: offset.y,
      },
      image: image,
    });

    this.foreground = new Foreground({
      game: this,
      position: {
        x: offset.x,
        y: offset.y,
      },
      image: foregroundImage,
    });

    this.player = new Player({
      game: this,
      position: {
        x: this.width / 2 - 192 / 4 / 2,
        y: this.height / 2 - 68 / 2,
      },
      image: playerDownImage,
      frames: {
        max: 4,
      },
      sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        down: playerDownImage,
        right: playerRightImage,
      },
    });
  }

  enableControls() {
    const keys = {
      w: {
        isPressed: false,
      },
      a: {
        isPressed: false,
      },
      s: {
        isPressed: false,
      },
      d: {
        isPressed: false,
      },
    };

    window.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "KeyW":
          console.log("w");
          keys.w.isPressed = true;
          break;
        case "KeyA":
          keys.a.isPressed = true;
          break;
        case "KeyS":
          keys.s.isPressed = true;
          break;
        case "KeyD":
          keys.d.isPressed = true;
          break;
      }
    });

    window.addEventListener("keyup", (e) => {
      switch (e.code) {
        case "KeyW":
          keys.w.isPressed = false;
          break;
        case "KeyA":
          keys.a.isPressed = false;
          break;
        case "KeyS":
          keys.s.isPressed = false;
          break;
        case "KeyD":
          keys.d.isPressed = false;
          break;
      }
    });
  }

  isColliding({ rectangle1, rectangle2 }) {
    return (
      rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
      rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
      rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
      rectangle1.position.y <= rectangle2.position.y + rectangle2.height
    );
  }

  generateBoundaries() {
    this.collisionsMap = [];

    for (let i = 0; i < collisions.length; i += 53) {
      this.collisionsMap.push(collisions.slice(i, 53 + i));
    }

    this.boundaries = [];

    this.collisionsMap.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 1025)
          this.boundaries.push(
            new Boundary({
              game: this,
              position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y,
              },
            })
          );
      });
    });
  }

  runLogic() {
    // the runLogic function should run in a loop (within the update() method)

    this.movables = [
      this.background,
      ...this.boundaries,
      this.foreground,
      ...this.strengthPickups,
    ];
  }

  generatePickups() {
    for (let i = 0; i < 50; i++) {
      this.generateSingleStrenghtPickup(i, i);
    }
    console.log(this.strengthPickups);
  }

  generateSingleStrenghtPickup(x, y) {
    const pickup = new StrengthPickup({
      game: this,
      position: {
        x: x,
        y: y,
      },
      image: strengthPickupImage,
    });
    this.strengthPickups.push(pickup);
  }

  draw() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.background.draw();
    this.player.draw();
    this.foreground.draw();
  }

  update() {
    this.draw();
    this.boundaries.forEach((boundary) => {
      boundary.draw();
    });

    let isMoving = true;

    this.player.moving = false;

    if (keys.w.isPressed) {
      //this should go in the draw/runLogic method of the player.js file
      for (let i = 0; i < this.boundaries.length; i++) {
        this.player.moving = true;
        this.player.image = this.player.sprites.up;
        const boundary = this.boundaries[i];
        if (
          this.isColliding({
            rectangle1: this.player,
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
        this.movables.forEach((movable) => {
          movable.position.y += 3;
        });
      }
    } else if (keys.s.isPressed) {
      for (let i = 0; i < this.boundaries.length; i++) {
        this.player.moving = true;
        this.player.image = this.player.sprites.down;
        const boundary = this.boundaries[i];
        if (
          this.isColliding({
            rectangle1: this.player,
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
        this.movables.forEach((movable) => {
          movable.position.y -= 3;
        });
      }
    } else if (keys.a.isPressed) {
      for (let i = 0; i < this.boundaries.length; i++) {
        this.player.moving = true;
        this.player.image = this.player.sprites.left;
        const boundary = this.boundaries[i];
        if (
          this.isColliding({
            rectangle1: this.player,
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
        this.movables.forEach((movable) => {
          movable.position.x += 3;
        });
      }
    } else if (keys.d.isPressed) {
      for (let i = 0; i < this.boundaries.length; i++) {
        this.player.moving = true;
        this.player.image = this.player.sprites.right;
        const boundary = this.boundaries[i];
        if (
          this.isColliding({
            rectangle1: this.player,
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
        this.movables.forEach((movable) => {
          movable.position.x -= 3;
        });
      }
    }
    for (let i = 0; i < this.strengthPickups.length; i++) {
      // console.log(i, this.strengthPickups[i]);
      this.strengthPickups[i].draw();
    }
  }

  start() {
    this.strengthPickups = [];
    this.generateBoundaries();
    this.generatePickups();
    // this.addStrengthPickups();
    // console.log(this.strengthPickups);
    this.runLogic();
    this.enableControls();

    //window.requestAnimationFrame(timestamp => this.update(timestamp))
    this.interval = setInterval(() => {
      // this bit should be inside the update function
      this.update();
    }, 1000 / 120);
  }
}
