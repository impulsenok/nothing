const data = {
    players: {}
};

export default class Data {
    constructor() {}

    static getData() {
        return data;
    }

    static deletePlayer(id) {
        if (data.players[id]) {
            delete data.players[id];
        }
    }

    static setPlayer(id) {
        data.players[id] = {
            pressedKeys: {}
        };
    }

    static setPlayerKey(id, key, status) {
        if (data.players[id]) {
            data.players[id].pressedKeys[key] = status;
        }
    }
}