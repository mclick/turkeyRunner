class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
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
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyJump)){
            this.scene.start('playScene');
        }
    }

}