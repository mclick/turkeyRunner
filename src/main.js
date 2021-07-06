/*
    game title:         Turkey Strut 2021
    completed:          July 6, 2021
        
    TEAM:
        Matthew Click:      main programming/gameplay feel
        Jordan Fickel:      music and some art
        Stanley Caldwell:   lead art/visual design

    Creative Tilt:
    Jordan:     Made a 'lofi beat' for the first time. Autotuned 3 different turkey sounds and 
                programmatically chose which one to use based on what portion of the song is playing
                (check the playCall method in turkey.js). 
                Drew a squirrel for the first time.
    Matthew:
    Stanley: 
*/


let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 480,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
//Useful Constants that are used elsewhere
//maybe add settings menu to enable player control over these values??
let gravConst = -0.4;
let speedConst = 3;
let accelConst = .125/60;

let keyJump;

let highScore = 0;
