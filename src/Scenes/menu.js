class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){
        this.load.audio('jump', './assets/finalAssets/sound/jump.wav');
        this.load.audio('die', './assets/finalAssets/sound/die.wav');
        this.load.audio('01turkey', './assets/finalAssets/sound/01turkeyBm.wav');
        this.load.audio('02turkey', './assets/finalAssets/sound/02turkeyG.wav');
        this.load.audio('03turkey', './assets/finalAssets/sound/03turkeyFsharp.wav');
        this.load.audio('intro', './assets/finalAssets/sound/intro.wav');
        
        this.load.image('titleScreen','./assets/finalAssets/turkeytitle.png');

    }

    create(){
        this.backround = this.add.sprite(game.config.width/2,game.config.height/2,'titleScreen');

        keyJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //intro music
        this.intro = this.sound.add('intro', { loop: true });
        this.intro.play();
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyJump)){
            this.intro.stop();
            this.scene.start('playScene');
        }
    }

}