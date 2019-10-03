import Data from './main_data.service';

export default class KeysHandle {
    constructor() {}

    static setKey(data) {
        let key;
        switch(data.key) {
            case 'Space':
                key = 'SPACE'; break;
            case 'KeyA':
                key = 'LEFT'; break;
            case 'KeyW':
                key = 'UP'; break;
            case 'KeyD':
                key = 'RIGHT'; break;
            case 'KeyS':
                key = 'DOWN'; break;
        }

        Data.setPlayerKey(data.playerId, key, data.status);
    }
}