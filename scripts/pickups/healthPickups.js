const healthPickupImage = new Image();
healthPickupImage.src = "./assets/pickups/healthPickup.png";

class HealthPickup extends Pickup {
    constructor(game) {
        super(game);
    }
}