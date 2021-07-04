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
        
    }

    create(){
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, game.config.height/2-borderUISize-borderPadding, 'Turkey Runner', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Space to Jump', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2+borderUISize+borderPadding, 'press Space to start', menuConfig).setOrigin(0.5)

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