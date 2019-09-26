import ResourcesProcessing from './assets/js/resourses';
import Sprite from './assets/js/sprite';
import Player from './assets/js/objects/player';
import CoreProcessing from './assets/js/core_processing';
import GameData from './assets/js/services/game_data.service';
import AppInstancesData from './assets/js/services/app_data.service';
import * as io from "./assets/js/soscket-io";
import SocketProcessing from './assets/js/socket-processing';

const socket = io('http://172.16.1.123:9000');
SocketProcessing.init(socket);

const canvas = document.getElementById("battle-ground");
const ctx = canvas.getContext('2d');

AppInstancesData.resourses = new ResourcesProcessing();

AppInstancesData.resourses.load([
    'images/sprites.png',
    'images/terrain.png'
]);

// The main game loop
const core = new CoreProcessing(
    canvas,
    ctx,
    AppInstancesData.resourses,
    GameData
);

AppInstancesData.resourses.onReady(core.appInit.bind(core));

