//this should work for all obstacles regardless of their appearence
class Kite extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
      this.xVel = Math.random()-0.5;
      this.yVel = Math.random()-0.5;
    }
    update(){
        this.x -= speedConst + this.xVel;
        this.y+=this.yVel;
        if(this.x<=0-this.width){
            this.reset();
        }
    }

    reset(){
        this.xVel =2* (Math.random()-0.5);
        this.yVel = 2*(Math.random()-0.5);
        this.x = game.config.width+game.config.width*Math.random();
        this.y = game.config.height/2*Math.random()-game.config.height/4
    }
}