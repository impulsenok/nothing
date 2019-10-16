export default class Player {

    constructor(playerData, Sprite, resources) {

        this.Sprite = Sprite;
        this.resources = resources;
        this.pos = playerData && playerData.pos ? playerData.pos : [0, 0];
        this.pressedKeys = {};
        this.bullets = [];
        this.lastFire = Date.now();
        this.direction = 'RIGHT';
        this.isDead = false;
        this.sprite = new this.Sprite(
            'images/good_enemies_4.png',
            this.resources,
            [0, 0],
            [32, 32],
            6,
            [0, 1, 2],
            'RIGHT'
        );
    }
}