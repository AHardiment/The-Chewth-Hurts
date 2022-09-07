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

    this.nightBackground = new Background({
      game: this,
      position: {
        x: offset.x,
        y: offset.y,
      },
      image: backgroundNightImage,
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
    this.defencePickups = [];

    this.strength = 0;
    this.health = 100;
    this.defence = 50;

    this.dayCount = 5;
    this.nightCount = 90;

    this.isRunning = false;

    this.counter = 30;

    this.canvasBackground = document.querySelector("canvas");
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
    for (let i = 0; i < 10; i++) {
      let x = Math.floor(Math.random() * 2501) - 1250;
      let y = Math.random() * 350;
      this.generateSingleStrengthPickup(x, y);
      // this.generateSingleHealthPickup(x, y);
    }
    for (let i = 0; i < 10; i++) {
      let x = Math.random() * 840;
      let y = Math.random() * 480;
      this.generateSingleHealthPickup(x, y);
    }
    for (let i = 0; i < 10; i++) {
      let x = Math.random() * 840;
      let y = Math.random() * 480;
      this.generateSingleDefencePickup(x, y);
    }
  }

  runLogic() {
    // the runLogic function should run in a loop (within the update() method)

    this.movables = [
      this.background,
      ...this.boundaries,
      this.foreground,
      this.nightBackground,
      ...this.strengthPickups,
      ...this.healthPickups,
      ...this.defencePickups,
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

  generateSingleDefencePickup(x, y) {
    const pickup = new DefencePickup({
      game: this,
      position: {
        x: x,
        y: y,
      },
      image: defencePickupImage,
    });
    this.defencePickups.push(pickup);
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
    for (let pickup of this.defencePickups) {
      pickup.draw();
    }
    console.log(this.counter);
    this.drawAttributes();
    if (this.counter === 0) {
      this.background = this.nightBackground;
      this.background.draw();
      this.player.draw();
    }
  }

  drawAttributes() {
    const attributesBoard = new Image();
    attributesBoard.src = "assets/attributesBoard.png";
    this.context.drawImage(attributesBoard, 0, 0, 840, 480);
    // this.context.fillStyle = "rgba(0, 0, 0, 0.5)";
    // this.context.fillRect(47, 10, 760, 45);
    this.context.font = "36px serif";
    this.context.fillStyle = "black";
    // this.context.shadowColor = "black";
    // this.context.shadowBlur = 1;
    this.context.fillText(
      `     HEALTH: ${this.health} - DEFENCE: ${this.defence} - STRENGTH: ${this.strength}`,
      5,
      59,
      840
    );
  }

  drawNightCountdown() {
    this.context.font = "36px serif";
    this.context.fillStyle = "black";
    this.context.fillText(`${this.nightCount}`, 20, 400, 840);
  }

  drawDayCountdown() {
    this.context.font = "36px serif";
    this.context.fillStyle = "black";
    this.context.fillText(`${Math.floor(this.counter / 120)}`, 20, 400, 840);
  }

  dayCountdown() {
    if (this.dayCount !== 0) {
      this.dayCount -= 1;
    } else {
      this.nightCount = 90;
    }
  }

  nightCountdown() {
    if (this.nightCount !== 0) {
      this.nightCount -= 1;
    } else {
      this.dayCount = 30;
    }
  }

  update() {
    this.counter--;
    this.clear();
    this.draw();
    this.boundaries.forEach((boundary) => {
      boundary.draw();
    });
    this.player.runLogic();
    this.player.pickupStrengthPickups();
    this.player.pickupHealthPickups();
    this.player.pickupDefencePickups();
    this.drawDayCountdown();
    // this.drawNightCountdown();
  }

  start() {
    this.counter = 31 * 120;
    this.isRunning = true;
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
    // setInterval(() => {
    //   this.dayCountdown();
    // }, 1000);
    // setInterval(() => {
    //   this.nightCountdown();
    // }, 1000);
    //window.requestAnimationFrame(timestamp => this.update(timestamp))
  }
}
