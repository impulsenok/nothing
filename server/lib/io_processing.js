import Data from './main_data.service';
import KeysHandle from './key_handling';

export default class IoProcessing {
    constructor(ioInstance, socket) {
        this.ioInstance = ioInstance;
        this.socket = socket;
        this.clientId = socket.id;
    }

    launch() {

        this.socket.emit('new_connect');

        this.socket.on('new_player_id', data => {

            console.log('new client id here:', data);

            Data.setPlayer(data.id);

            console.log('\n', Data.getData(), '\n');
            this.ioInstance.emit('new_player', data.id);
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnecting?', this.socket.id);
            this.ioInstance.emit('player_disconnected', {id: this.clientId});
            Data.deletePlayer(this.socket.id);
        });

        this.socket.on('key_down', data => {
            KeysHandle.setKey(data);
            Data.updatePlayerPosition(data);
        });

        this.socket.on('player_returned_to_game', playerId => {
            console.log(`player with id = ${playerId} returned to game`);
            this.ioInstance.emit('update_objects_positions', Data.getData());
        });

        setInterval(() => {
            this.ioInstance.emit('game_data_update', Data.getData());
        }, 1000 / 60);
    }
}