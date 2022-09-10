const totalAmountOfEnemies = 5;

enemyImage = new Image();
enemyImage.src = "./assets/characters/enemy-idle.png";

class Enemy extends Player {
  constructor(game) {
    super(game);

    // this.player = player;
    this.w = 184;
    this.h = 59;

    this.isActive = false;

    this.velocity = {
      x: 1,
      y: 1,
    };

    this.enemyHealth = 100;
  }

  runLogic() {
    if (!this.isActive) return;
    this.position.x += 1;
  }

  draw() {
    this.game.context.drawImage(
      this.image,
      this.frames.val * this.w,
      0,
      this.w / this.frames.max,
      this.h,
      this.position.x,
      this.position.y,
      this.w / this.frames.max,
      this.h
    );

    // if (this.frames.elapsed % 20 === 0) {
    //   if (this.frames.val < this.frames.max - 1) this.frames.val++;
    //   else this.frames.val = 0;
    // }
  }
}
