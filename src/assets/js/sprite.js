export default class SpriteProcessing {
    constructor(url, resources, pos, size, speed, frames, dir, once) {
        this.pos = pos;
        this.size = size;
        this.speed = typeof speed === 'number' ? speed : 0;
        this.frames = frames;
        this._index = 0;
        this.url = url;
        this.resources = resources;
        this.dir = dir;
        this.once = once;
    }

    get direction() {
        return this.dir;
    }

    setDirection(direction) {
        this.dir = direction;
    }

    update(dt) {
        this._index += this.speed * dt;
    }

    render(ctx) {
        let frame;

        if (this.speed > 0) {
            let max = this.frames.length;
            let idx = Math.floor(this._index);
            frame = this.frames[idx % max];

            if (this.once && idx >= max) {
                this.done = true;
                return;
            }
        }
        else {
            frame = 0;
        }


        let x = this.pos[0];
        let y = this.pos[1];

        x += frame * this.size[0];

        if (this.dir) {

            switch (this.dir) {
                case 'DOWN': y = 0;
                    break;
                case 'LEFT': y = this.size[1];
                    break;
                case 'RIGHT': y = this.size[1] * 2;
                    break;
                case 'UP': y = this.size[1] * 3;
                    break;
                default: y = 0;
            }
        }

        ctx.drawImage(this.resources.get(this.url),
            x, y,
            this.size[0], this.size[1],
            0, 0,
            this.size[0], this.size[1]);
    }

}