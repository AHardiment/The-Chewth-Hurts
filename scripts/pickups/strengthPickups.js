const strengthPickupImage = new Image();
strengthPickupImage.src = "./assets/pickups/strengthPickup.png";

class StrengthPickup extends Pickup {
    constructor(game) {
        super(game);
    }

   /*  runLogic() {
        this.generateStrengthPickups();
        for (let pickup of strengthPickups) {
            pickup.draw();
        }
    }; 

    generateStrengthPickups() {
        for (let i = 0; i < 100; i++) {
          const strengthPickup = new StrengthPickup({
            game: this,
            position: {
              x: Math.floor(Math.random() * 840),
              y: Math.floor(Math.random() * 480),
            },
            image: strengthPickupImage,
          });
          this.strengthPickups.push(strengthPickup);
        }
      }
      */
}