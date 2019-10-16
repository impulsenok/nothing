import GameData from './game_data.service';
import Sprite from '../sprite';

export default class HandleGameData {
    constructor() {}

    static isDown(playerId, key) {
        if (GameData.players[playerId] &&
            GameData.players[playerId].pressedKeys) {
            return GameData.players[playerId].pressedKeys[key];
        }
    }

    static handleInput(dt, resources) {

        Object.keys(GameData.players).forEach(playerId => {
            const player = GameData.players[playerId];

            if(HandleGameData.isDown(playerId, 'DOWN')) {
                player.pos[1] += 100 * dt;
                player.sprite.setDirection('DOWN');
            }

            if(HandleGameData.isDown(playerId, 'UP')) {
                player.pos[1] -= 100 * dt;
                player.sprite.setDirection('UP');
            }

            if(HandleGameData.isDown(playerId, 'LEFT')) {
                player.pos[0] -= 100 * dt;
                player.sprite.setDirection('LEFT');
            }

            if(HandleGameData.isDown(playerId, 'RIGHT')) {
                player.pos[0] += 100 * dt;
                player.sprite.setDirection('RIGHT');
            }

            if(HandleGameData.isDown(playerId, 'SPACE')) {
                let x = player.pos[0] + player.sprite.size[0] / 2;
                let y = player.pos[1] + player.sprite.size[1] / 2;

                if ((Date.now() - player.lastFire) > 1000) {

                    player.bullets.push({
                        pos: [x, y],
                        dir: player.sprite.direction,
                        sprite: new Sprite(
                            'images/sprites.png',
                            resources,
                            [8, 135],
                            [13, 13]
                        )
                    });

                    // player.bullets.push({
                    //     pos: [x, y],
                    //     dir: 'up',
                    //     sprite: new Sprite('images/sprites.png', resources, [0, 50], [9, 5])
                    // });
                    //
                    // player.bullets.push({
                    //     pos: [x, y],
                    //     dir: 'down',
                    //     sprite: new Sprite('images/sprites.png', resources, [0, 60], [9, 5])
                    // });

                    player.lastFire = Date.now();
                }
            }

        });
    }
}