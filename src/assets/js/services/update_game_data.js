import GameData from './game_data.service';

export default class HandleGameData {
    constructor() {}

    static isDown(playerId, key) {
        if (GameData.players[playerId] &&
            GameData.players[playerId].pressedKeys) {
            return GameData.players[playerId].pressedKeys[key];
        }
    }

    static handleInput(dt) {

        // console.log('handle here: ', GameData);

        Object.keys(GameData.players).forEach(playerId => {
            const player = GameData.players[playerId];

            // console.log('handle here PLAYER: ', player);

            if(HandleGameData.isDown(playerId, 'DOWN')) {
                player.pos[1] += 200 * dt;

            }

            if(HandleGameData.isDown(playerId, 'UP')) {
                player.pos[1] -= 200 * dt;
            }

            if(HandleGameData.isDown(playerId, 'LEFT')) {
                player.pos[0] -= 200 * dt;
            }

            if(HandleGameData.isDown(playerId, 'RIGHT')) {
                player.pos[0] += 200 * dt;
            }

            if(HandleGameData.isDown(playerId, 'SPACE')) {
                // let x = GameData.player.pos[0] + GameData.player.sprite.size[0] / 2;
                // let y = GameData.player.pos[1] + GameData.player.sprite.size[1] / 2;
                //
                // GameData.bullets.push({ pos: [x, y],
                //     dir: 'forward',
                //     sprite: new Sprite('images/sprites.png', this.resources, [0, 39], [18, 8]) });
                // GameData.bullets.push({ pos: [x, y],
                //     dir: 'up',
                //     sprite: new Sprite('images/sprites.png', this.resources, [0, 50], [9, 5]) });
                // GameData.bullets.push({ pos: [x, y],
                //     dir: 'down',
                //     sprite: new Sprite('images/sprites.png', this.resources, [0, 60], [9, 5]) });
                //
                // GameData.lastFire = Date.now();
            }

        });
    }
}