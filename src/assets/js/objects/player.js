export default class Player {

    constructor(Sprite, resources) {

        this.Sprite = Sprite;
        this.resources = resources;
        this.pos = [0, 0];
        this.sprite = new this.Sprite('images/sprites.png', this.resources, [0, 0], [39, 39], 16, [0, 1])

    }
}