class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
      this.score = 5*speedConst;
    }
    update(){
        this.x -= speedConst;
        if(this.x<=0-this.width){
            this.reset();
        }
    }

    reset(){
        this.x = game.config.width+game.config.width*Math.random();
        this.y = game.config.height/2*Math.random()+game.config.height/2;
        this.score = 5*speedConst;
    }
}