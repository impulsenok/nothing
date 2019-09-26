// import Sprite from "./sprite";
import HandleGameData from './services/update_game_data';

export default class CoreProcessing {
    constructor(canvas, ctx, resources, gameData) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.resources = resources;
        this.gameData = gameData;
        this.lastTime = null;
        this.terrainPattern = null;
        this.executionCounter = 0;
    }

    appInit() {
        this.terrainPattern = this.ctx.createPattern(this.resources.get('images/terrain.png'), 'repeat');
        this.lastTime = Date.now();
        this.main();
    }

    main() {
        const now = Date.now();
        const dt = (now - this.lastTime) / 1000.0;

        this.update(dt);
        this.render();

        this.lastTime = now;
        // this.executionCounter++;
        // if (this.executionCounter < 320) {
            this._requestAnimationFrame(() => this.main());
        // }

    }

    // Update game objects
    update(dt) {
        // this.keysHandle.handleInput(dt);
        HandleGameData.handleInput(dt);
        this.updateEntities(dt);

        // this.checkCollisions();
    }

    updateEntities(dt) {
        // Update the player sprite animation
        Object.keys(this.gameData.players).map(key => {
            if (this.gameData.players[key]) {
                this.gameData.players[key].sprite.update(dt);
            }
        });

        // Update all the this.gameData.bullets
        // for(let i=0; i<this.gameData.bullets.length; i++) {
        //     const bullet = this.gameData.bullets[i];
        //
        //     switch(bullet.dir) {
        //         case 'up': bullet.pos[1] -= this.gameSettings.bulletSpeed * dt; break;
        //         case 'down': bullet.pos[1] += this.gameSettings.bulletSpeed * dt; break;
        //         default:
        //             bullet.pos[0] += this.gameSettings.bulletSpeed * dt;
        //     }
        //
        //     // Remove the bullet if it goes off screen
        //     if(bullet.pos[1] < 0 || bullet.pos[1] > this.canvas.height ||
        //         bullet.pos[0] > this.canvas.width) {
        //         this.gameData.bullets.splice(i, 1);
        //         i--;
        //     }
        // }

        // Update all the this.gameData.enemies
        // for(let i=0; i<this.gameData.enemies.length; i++) {
        //     this.gameData.enemies[i].pos[0] -= this.gameSettings.enemySpeed * dt;
        //     this.gameData.enemies[i].sprite.update(dt);
        //
        //     // Remove if off screen
        //     if(this.gameData.enemies[i].pos[0] + this.gameData.enemies[i].sprite.size[0] < 0) {
        //         this.gameData.enemies.splice(i, 1);
        //         i--;
        //     }
        // }

        // Update all the this.gameData.explosions
        // for(let i=0; i<this.gameData.explosions.length; i++) {
        //     this.gameData.explosions[i].sprite.update(dt);
        //
        //     // Remove if animation is done
        //     if(this.gameData.explosions[i].sprite.done) {
        //         this.gameData.explosions.splice(i, 1);
        //         i--;
        //     }
        // }
    }

    collides(x, y, r, b, x2, y2, r2, b2) {
        return !(r <= x2 || x > r2 ||
            b <= y2 || y > b2);
    }

    boxCollides(pos, size, pos2, size2) {
        return this.collides(pos[0], pos[1],
            pos[0] + size[0], pos[1] + size[1],
            pos2[0], pos2[1],
            pos2[0] + size2[0], pos2[1] + size2[1]);
    }

    // checkCollisions() {
    //     this.checkPlayerBounds();
    //
    //     // Run collision detection for all this.gameData.enemies and this.gameData.bullets
    //     for(let i=0; i<this.gameData.enemies.length; i++) {
    //         let pos = this.gameData.enemies[i].pos;
    //         let size = this.gameData.enemies[i].sprite.size;
    //
    //         for(let j=0; j<this.gameData.bullets.length; j++) {
    //             let pos2 = this.gameData.bullets[j].pos;
    //             let size2 = this.gameData.bullets[j].sprite.size;
    //
    //             if(this.boxCollides(pos, size, pos2, size2)) {
    //                 // Remove the enemy
    //                 this.gameData.enemies.splice(i, 1);
    //                 i--;
    //
    //                 // Add an explosion
    //                 this.gameData.explosions.push({
    //                     pos: pos,
    //                     sprite: new Sprite('images/sprites.png',
    //                         this.resources,
    //                         [0, 117],
    //                         [39, 39],
    //                         16,
    //                         [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    //                         null,
    //                         true)
    //                 });
    //
    //                 // Remove the bullet and stop this iteration
    //                 this.gameData.bullets.splice(j, 1);
    //                 break;
    //             }
    //         }
    //
    //         if(this.boxCollides(pos, size, this.gameData.player.pos, this.gameData.player.sprite.size)) {
    //             this.gameOver();
    //         }
    //     }
    // }

    // checkPlayerBounds() {
    //     // Check bounds
    //     if(this.gameData.player.pos[0] < 0) {
    //         this.gameData.player.pos[0] = 0;
    //     }
    //     else if(this.gameData.player.pos[0] > this.canvas.width - this.gameData.player.sprite.size[0]) {
    //         this.gameData.player.pos[0] = this.canvas.width - this.gameData.player.sprite.size[0];
    //     }
    //
    //     if(this.gameData.player.pos[1] < 0) {
    //         this.gameData.player.pos[1] = 0;
    //     }
    //     else if(this.gameData.player.pos[1] > this.canvas.height - this.gameData.player.sprite.size[1]) {
    //         this.gameData.player.pos[1] = this.canvas.height - this.gameData.player.sprite.size[1];
    //     }
    // }

    // Draw everything
    render() {
        this.ctx.fillStyle = this.terrainPattern;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        Object.keys(this.gameData.players).map(key => {
            if (this.gameData.players[key]) {
                this.renderEntity(this.gameData.players[key]);
            }
        });

        // this.renderEntity(this.gameData.player);

        // this.renderEntities(this.gameData.bullets);
        // this.renderEntities(this.gameData.enemies);
        // this.renderEntities(this.gameData.explosions);
    }

    // renderEntities(list) {
    //     for(let i=0; i<list.length; i++) {
    //         this.renderEntity(list[i]);
    //     }
    // }

    renderEntity(entity) {
        this.ctx.save();
        this.ctx.translate(entity.pos[0], entity.pos[1]);
        entity.sprite.render(this.ctx);
        this.ctx.restore();
    }

// Game over
//     gameOver() {
//         document.getElementById('game-over').style.display = 'block';
//         document.getElementById('game-over-overlay').style.display = 'block';
//         this.gameData.isGameOver = true;
//     }

// Reset game to original state
//     reset() {
//         document.getElementById('game-over').style.display = 'none';
//         document.getElementById('game-over-oveconsole.log(\'>>> TYPE\', this.type);rlay').style.display = 'none';
//         this.gameData.isGameOver = false;
//         this.gameData.gameTime = 0;
//
//         this.gameData.enemies = [];
//         this.gameData.bullets = [];
//
//         this.gameData.player.pos = [50, this.canvas.height / 2];
//     }

    _requestAnimationFrame(callback) {
        return window.requestAnimationFrame(callback)       ||
            window.webkitRequestAnimationFrame(callback) ||
            window.mozRequestAnimationFrame(callback)    ||
            window.oRequestAnimationFrame(callback)      ||
            window.msRequestAnimationFrame(callback)     ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    };
}