class Stick extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
    }
    update(){
        this.x -= speedConst;
        if(this.x<=0-this.width){
            this.reset();
        }
    }

    reset(){
        this.x = game.config.width;
        this.y = game.config.height/2*Math.random()+game.config.height/2+borderUISize;
    }
}