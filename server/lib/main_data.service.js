const data = {
    players: {}
};

export default class Data {
    constructor() {}

    static getData() {
        return data;
    }

    static getPlayerData(id) {
        return data.players[id];
    }

    static deletePlayer(id) {
        if (data.players[id]) {
            delete data.players[id];
        }
    }

    static setPlayer(id) {
        data.players[id] = {
            pressedKeys: {},
            pos: [0, 0]
        };
    }

    static setPlayerKey(id, key, status) {
        if (data.players[id]) {
            data.players[id].pressedKeys[key] = status;
        }
    }

    static updatePlayerPosition(incomingData) {
        if (data.players[incomingData.playerId]) {
            data.players[incomingData.playerId].pos = incomingData.playerData.pos;
        }
    }
}