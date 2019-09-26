import GameData from './services/game_data.service';
import Player from "./objects/player";
import Sprite from './sprite';
import AppInstancesData from './services/app_data.service';


export default class SocketProcessing {
    constructor() {
    }

    static init(socket) {

        socket.on('new_connect', () => {
            console.log('my socket id:', socket.id);
            socket.emit('new_player_id', { id: socket.id });

        });

        socket.on('new_player', newPlayerId => {
            GameData.players[newPlayerId] = new Player(Sprite, AppInstancesData.resourses);
            console.log('new player connected: ', newPlayerId);

        });

        socket.on('player_disconnected', data => {
            console.log('player disconnected: ', data.id);
            if (GameData.players[data.id]) {
                delete GameData.players[data.id];
            }
        });

        socket.on('game_data_update', data => {

            Object.keys(data.players).map(key => {
                if (!GameData.players[key]) {
                    GameData.players[key] = new Player(Sprite, AppInstancesData.resourses);
                }

                GameData.players[key].pressedKeys = data.players[key].pressedKeys;
            });
        });


        document.addEventListener('keydown', (e) => {
            socket.emit('key_down', {
                playerId: socket.id,
                key: e.code,
                status: true
            });
        });

        document.addEventListener('keyup', (e) => {
            socket.emit('key_down', {
                playerId: socket.id,
                key: e.code,
                status: false
            });
        });
    }
}