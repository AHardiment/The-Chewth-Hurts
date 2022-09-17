const DayState = {
  Day: 0,
  Night: 1,
};

class Game {
  constructor() {
    this.canvasElement = document.querySelector("canvas");
    this.context = this.canvasElement.getContext("2d");

    this.width = this.canvasElement.width;
    this.height = this.canvasElement.height;

    this.dayBackground = new Background({
      game: this,
      position: {
        x: offset.x,
        y: offset.y,
      },
      image: image,
    });

    this.nightBackground = new Background({
      game: this,
      position: {
        x: offset.x,
        y: offset.y,
      },
      image: backgroundNightImage,
    });

    this.foreground = new Foreground({
      game: this,
      position: {
        x: offset.x,
        y: offset.y,
      },
      image: foregroundImage,
    });

    this.currentBackground = this.dayBackground;

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

    this.playButton = document.querySelector(".play-btn");

    this.strengthPickups = [];
    this.healthPickups = [];
    this.defencePickups = [];

    this.daySong = document.createElement("audio");
    this.daySong.src = "assets/music/mainTitleSong.mp3";
    this.daySong.loop = true;
    this.daySong.volume = 0.5;
    this.daySong.setAttribute("preload", "auto");
    this.daySong.setAttribute("controls", "none");
    this.daySong.style.display = "none";
    document.body.appendChild(this.daySong);

    this.nightSong = document.createElement("audio");
    this.nightSong.src = "assets/music/nightSong.mp3";
    this.nightSong.loop = true;
    this.nightSong.volume = 0.5;
    this.nightSong.setAttribute("preload", "auto");
    this.nightSong.setAttribute("controls", "none");
    this.nightSong.style.display = "none";
    document.body.appendChild(this.nightSong);

    this.winningSong = document.createElement("audio");
    this.winningSong.src = "assets/music/winningSound.mp3";
    this.winningSong.loop = false;
    this.winningSong.volume = 0.5;
    this.winningSong.setAttribute("preload", "auto");
    this.winningSong.setAttribute("controls", "none");
    this.winningSong.style.display = "none";
    document.body.appendChild(this.winningSong);

    this.losingSong = document.createElement("audio");
    this.losingSong.src = "assets/music/losingSound.mp3";
    this.losingSong.loop = false;
    this.losingSong.volume = 0.5;
    this.losingSong.setAttribute("preload", "auto");
    this.losingSong.setAttribute("controls", "none");
    this.losingSong.style.display = "none";
    document.body.appendChild(this.losingSong);

    this.enemies = [];

    this.strength = 50;
    this.health = 50;
    this.defence = 50;

    this.enemyHealth = 100;

    this.dayTime = 6;
    this.nightTime = 6;

    this.dayNightCount = 0;

    this.continueDecrementing = true;

    this.isRunning = false;

    this.dayState = DayState.Day;

    this.minMapXLocation = -840;
    this.maxMapXLocation = 1680;

    this.minMapYLocation = -960;
    this.maxMapYLocation = 120;

    this.randomXPosition =
      Math.floor(
        Math.random() * (this.maxMapXLocation - this.minMapXLocation + 1)
      ) + this.minMapXLocation;

    this.randomYPosition =
      Math.floor(
        Math.random() * (this.maxMapYLocation - this.minMapYLocation + 1)
      ) + this.minMapYLocation;

    this.gameOver = false;

    this.reset();
  }

  removeStrengthPickup(index) {
    this.strengthPickups[index].isActive = false;
  }
  removeHealthPickup(index) {
    this.healthPickups[index].isActive = false;
  }
  removeDefencePickup(index) {
    this.defencePickups[index].isActive = false;
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

  randomisePickupPositions() {
    for (let pickup of this.strengthPickups) {
      let x =
        Math.floor(
          Math.random() * (this.maxMapXLocation - this.minMapXLocation + 1)
        ) + this.minMapXLocation;
      let y =
        Math.floor(
          Math.random() * (this.maxMapYLocation - this.minMapYLocation + 1)
        ) + this.minMapYLocation;
      pickup.position.x = x;
      pickup.position.y = y;
    }
    for (let pickup of this.healthPickups) {
      let x =
        Math.floor(
          Math.random() * (this.maxMapXLocation - this.minMapXLocation + 1)
        ) + this.minMapXLocation;
      let y =
        Math.floor(
          Math.random() * (this.maxMapYLocation - this.minMapYLocation + 1)
        ) + this.minMapYLocation;
      pickup.position.x = x;
      pickup.position.y = y;
    }
    for (let pickup of this.defencePickups) {
      let x =
        Math.floor(
          Math.random() * (this.maxMapXLocation - this.minMapXLocation + 1)
        ) + this.minMapXLocation;
      let y =
        Math.floor(
          Math.random() * (this.maxMapYLocation - this.minMapYLocation + 1)
        ) + this.minMapYLocation;
      pickup.position.x = x;
      pickup.position.y = y;
    }
  }

  generatePickups() {
    for (let i = 0; i < totalAmountOfPickups; i++) {
      let x =
        Math.floor(
          Math.random() * (this.maxMapXLocation - this.minMapXLocation + 1)
        ) + this.minMapXLocation;
      let y =
        Math.floor(
          Math.random() * (this.maxMapYLocation - this.minMapYLocation + 1)
        ) + this.minMapYLocation;
      this.generateSingleStrengthPickup(x, y);
    }
    for (let i = 0; i < totalAmountOfPickups; i++) {
      let x =
        Math.floor(
          Math.random() * (this.maxMapXLocation - this.minMapXLocation + 1)
        ) + this.minMapXLocation;
      let y =
        Math.floor(
          Math.random() * (this.maxMapYLocation - this.minMapYLocation + 1)
        ) + this.minMapYLocation;
      this.generateSingleHealthPickup(x, y);
    }
    for (let i = 0; i < totalAmountOfPickups; i++) {
      let x =
        Math.floor(
          Math.random() * (this.maxMapXLocation - this.minMapXLocation + 1)
        ) + this.minMapXLocation;
      let y =
        Math.floor(
          Math.random() * (this.maxMapYLocation - this.minMapYLocation + 1)
        ) + this.minMapYLocation;
      this.generateSingleDefencePickup(x, y);
    }
  }

  // removeEnemies() {
  //   for (let i = 0; i < totalAmountOfEnemies; i++) {
  //     delete this.enemies[i];
  //     this.movables.splice(4 + i, 1);
  //   }
  // }

  removePickups() {
    for (let i = 0; i < totalAmountOfPickups; i++) {
      delete this.strengthPickups[i];
      this.movables.splice(3 + i, 1);
    }
  }

  runLogic() {
    // the runLogic function should run in a loop (within the update() method)

    this.movables = [
      ...this.boundaries, // 0
      this.currentBackground, // 1
      this.nightBackground, // 2
      // ...this.strengthPickups, // 3
      // ...this.healthPickups,
      // ...this.defencePickups,
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
    this.movables.push(pickup);
    pickup.isActive = true;
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
    this.movables.push(pickup);
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
    this.movables.push(pickup);
  }

  activatePickups(active) {
    for (let pickup of this.strengthPickups) {
      pickup.isActive = active;
    }
    for (let pickup of this.healthPickups) {
      pickup.isActive = active;
    }
    for (let pickup of this.defencePickups) {
      pickup.isActive = active;
    }
  }

  updatePhysicsVelocity() {
    moveables.forEach((moveable) => {
      moveable.position.x += moveable.velocity.x;
      moveable.position.y += moveable.velocity.y;
    });
  }

  newEnemyRound() {
    for (let enemy of this.enemies) {
      enemy.isActive = true;
      enemy.position.x = Math.random() * 840;
      enemy.position.y = Math.random() * 120;
    }
  }

  generateEnemies() {
    for (let i = 0; i < totalAmountOfEnemies; i++) {
      const enemy = new Enemy({
        game: this,
        position: {
          x: Math.floor(Math.random() * 840),
          y: Math.floor(Math.random() * 480),
        },
        image: enemyImage,
        frames: {
          max: 4,
        },
      });
      this.enemies.push(enemy);
      this.movables.push(enemy);
      enemy.isActive = false;
    }
  }

  playDaySong() {
    this.daySong.play();
  }

  playNightSong() {
    this.nightSong.play();
  }

  pauseDaySong() {
    this.daySong.pause();
  }

  pauseNightSong() {
    this.nightSong.pause();
  }

  playWinningSong() {
    this.winningSong.play();
  }

  playLosingSong() {
    this.losingSong.play();
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  draw() {
    this.currentBackground.draw();
    this.player.draw();
    this.foreground.draw();
    if (this.dayState === DayState.Day) {
      for (let pickup of this.strengthPickups) {
        if (pickup.isActive) {
          pickup.draw();
        }
      }
      for (let pickup of this.healthPickups) {
        if (pickup.isActive) {
          pickup.draw();
        }
      }
      for (let pickup of this.defencePickups) {
        if (pickup.isActive) {
          pickup.draw();
        }
      }
    }

    this.drawAttributes();
    this.drawTasks();
    this.player.draw();
  }

  switchToNight() {
    if (this.counter === 0 && !this.gameOver) {
      this.currentBackground = this.nightBackground;
      this.counter = this.nightTime * 120;
      this.dayState = DayState.Night;
      this.activatePickups(false);
      this.newEnemyRound();
      this.player.attackEnemy();
      this.dayNightCount++;
      console.log(this.dayNightCount);
      this.pauseDaySong();
      this.playNightSong();
    }
  }

  switchToDay() {
    if (this.counter === 0 && !this.gameOver) {
      this.dayTime = this.dayTime *= 1.5;
      this.currentBackground = this.dayBackground;
      this.counter = this.dayTime * 120;
      this.dayState = DayState.Day;
      this.activatePickups(true);
      this.randomisePickupPositions();
      for (let enemy of this.enemies) {
        enemy.isActive = false;
      }
      this.pauseNightSong();
      this.playDaySong();
    }
  }

  drawAttributes() {
    const attributesBoard = new Image();
    attributesBoard.src = "assets/attributesBoard.png";
    this.context.drawImage(attributesBoard, 0, 0, 840, 480);

    this.context.font = "36px serif";
    this.context.fillStyle = "black";

    this.context.fillText(
      `     HEALTH: ${this.health} - DEFENCE: ${this.defence} - STRENGTH: ${this.strength}`,
      5,
      59,
      840
    );
  }

  drawTasks() {
    this.context.font = "36px serif";
    this.context.fillStyle = "white";

    this.context.fillRect(10, 362, 820, 55);

    this.context.fillStyle = "black";
    this.context.fillText(
      `Quick, collect the items to increase your attributes!`,
      80,
      400,
      840
    );
  }

  decrementAttributes() {
    if (
      this.counter % 120 === 0 &&
      this.dayState === DayState.Night &&
      this.dayNightCount === 1
    ) {
      this.health -= 1;
      this.defence -= 1;
      this.strength -= 1;
    } else if (
      this.counter % 120 === 0 &&
      this.dayState === DayState.Night &&
      this.dayNightCount === 2
    ) {
      this.health -= 10;
      this.defence -= 10;
      this.strength -= 10;
    } else if (
      this.counter % 120 === 0 &&
      this.dayState === DayState.Night &&
      this.dayNightCount === 3
    ) {
      this.health -= 20;
      this.defence -= 20;
      this.strength -= 20;
    }
  }

  checkForLoss() {
    if (this.health <= 0 && this.strength <= 0 && this.defence <= 0) {
      this.gameOver = true;
    }
  }

  lose() {
    if (this.gameOver) {
      this.context.clearRect(0, 0, 840, 480);
      this.context.font = "36px serif";
      this.context.fillStyle = "white";
      this.context.fillRect(0, 0, 840, 480);
      this.context.fillStyle = "black";
      this.context.fillText(
        `GAME OVER`,
        this.width / 2 - 120,
        this.height / 2,
        240
      );
      this.context.fillText(
        `You lasted ${this.dayNightCount - 1} days`,
        this.width / 2 - 120,
        this.height / 2 + 50,
        240
      );
      this.pauseDaySong();
      this.pauseNightSong();
      this.playLosingSong();
    }
  }

  win() {
    if (!this.gameOver && this.dayNightCount >= 4) {
      this.context.clearRect(0, 0, 840, 480);
      this.context.font = "36px serif";
      this.context.fillStyle = "white";
      this.context.fillRect(0, 0, 840, 480);
      this.context.fillStyle = "black";
      this.context.fillText(
        `YOU WIN`,
        this.width / 2 - 120,
        this.height / 2,
        240
      );
      this.pauseDaySong();
      this.pauseNightSong();
      this.playWinningSong();
    }
  }

  drawDayCountdown() {
    this.context.font = "36px serif";
    this.context.fillStyle = "black";
    this.context.fillText(`${Math.floor(this.counter / 120)}`, 20, 400, 840);
  }

  update() {
    switch (this.dayState) {
      case DayState.Day:
        this.counter--;
        this.switchToNight();
        break;
      case DayState.Night:
        this.counter--;
        this.switchToDay();
        break;
      default:
      // code block
    }
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
    this.decrementAttributes();
    this.checkForLoss();
    this.lose();
    this.win();
  }

  start() {
    this.counter = this.dayTime * 120;
    this.isRunning = true;
    this.generateBoundaries();
    this.runLogic();
    this.generateEnemies();
    this.generatePickups();
    this.enableControls();
    this.interval = setInterval(() => {
      // this bit should be inside the update function
      this.update();
    }, 1000 / 120);
    this.playDaySong();
  }

  reset() {
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
}
