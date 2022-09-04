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
    this.strengthPickups = [];
    this.healthPickups = [];
    this.defensePickups = [];

    this.strength = 0;
    this.health = 100;
    this.defense = 50;
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

  generatePickups() {
    for (let i = 0; i < 25; i++) {
      let x = Math.floor(Math.random() * 3001) - 1500;
      let y = Math.random() * 350;
      this.generateSingleStrengthPickup(x, y);
      // this.generateSingleHealthPickup(x, y);
    }
    for (let i = 0; i < 1; i++) {
      let x = Math.random() * 840;
      let y = Math.random() * 480;
      this.generateSingleHealthPickup(x, y);
    }
    for (let i = 0; i < 1; i++) {
      let x = Math.random() * 840;
      let y = Math.random() * 480;
      this.generateSingleDefensePickup(x, y);
    }
  }

  runLogic() {
    // the runLogic function should run in a loop (within the update() method)

    this.movables = [
      this.background,
      ...this.boundaries,
      this.foreground,
      ...this.strengthPickups,
      ...this.healthPickups,
      ...this.defensePickups,
    ];
  }

  generateSingleStrengthPickup(x, y) {
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

  generateSingleHealthPickup(x, y) {
    const pickup = new HealthPickup({
      game: this,
      position: {
        x: x,
        y: y,
      },
      image: healthPickupImage,
    });
    this.healthPickups.push(pickup);
  }

  generateSingleDefensePickup(x, y) {
    const pickup = new DefensePickup({
      game: this,
      position: {
        x: x,
        y: y,
      },
      image: defensePickupImage,
    });
    this.defensePickups.push(pickup);
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  draw() {
    this.background.draw();
    this.player.draw();
    this.foreground.draw();
    for (let pickup of this.strengthPickups) {
      //console.log('HEY');
      pickup.draw();
    }
    for (let pickup of this.healthPickups) {
      //console.log('HEY');
      pickup.draw();
    }
    for (let pickup of this.defensePickups) {
      pickup.draw();
    }
    this.drawStrength();
  }

  drawStrength() {
    this.context.font = "30px Arial";
    this.context.fillStyle = "black";
    this.context.fillText("Strength: " + this.strength, 10, 50);
  }

  update() {
    this.clear();
    this.draw();
    this.boundaries.forEach((boundary) => {
      boundary.draw();
    });
    this.player.runLogic();
    this.player.pickupStrengthPickup();
  }

  start() {
    //this.strengthPickups = [];
    this.generateBoundaries();
    this.generatePickups();
    // this.addStrengthPickups();
    // console.log(this.strengthPickups);
    this.runLogic();
    this.enableControls();
    this.interval = setInterval(() => {
      // this bit should be inside the update function
      this.update();
    }, 1000 / 120);

    //window.requestAnimationFrame(timestamp => this.update(timestamp))
  }
}
