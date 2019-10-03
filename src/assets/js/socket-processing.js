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
            GameData.players[newPlayerId] = new Player(null, Sprite, AppInstancesData.resourses);
            console.log('new player connected: ', newPlayerId);
            socket.emit('update_data_for_new_player', { player: GameData.players[socket.id] });
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
                    GameData.players[key] = new Player(data.players[key], Sprite, AppInstancesData.resourses);
                }

                // GameData.players[key].pos = data.players[key].pos;
                GameData.players[key].pressedKeys = data.players[key].pressedKeys;
            });
        });

        socket.on('update_objects_positions', data => {
            Object.keys(data.players).map(key => {
                if (key !== socket.id) {
                    GameData.players[key].pos = data.players[key].pos;
                }
            });
        });


        document.addEventListener('keydown', (e) => {
            socket.emit('key_down', {
                playerId: socket.id,
                key: e.code,
                status: true,
                playerData: GameData.players[socket.id]
            });
        });

        document.addEventListener('keyup', (e) => {
            socket.emit('key_down', {
                playerId: socket.id,
                key: e.code,
                status: false,
                playerData: GameData.players[socket.id]
            });
        });

        window.addEventListener('focus', e => {
            socket.emit('player_returned_to_game', socket.id);
        });
    }
}