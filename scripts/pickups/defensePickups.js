const defensePickupImage = new Image();
defensePickupImage.src = "./assets/pickups/defensePickup.png";

class DefensePickup extends Pickup {
    constructor(game) {
        super(game);
    }
}