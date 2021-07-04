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
let accelConst = .15/60;

let keyJump;