import RewardGameScene from './/RewardGameScene.js';

class RewardControlScene extends RewardGameScene {
/*
    constructor() {
        super({ key: 'RewardGameScene' });
    }*/

preload() {
    this.load.image('ship', './assets/thrust_ship.png');
    // this.load.image('pipes', './assets/block6.png');
    this.load.image('fire', './assets/flame2.png');

    this.load.image('otherspace', './assets/space5.png')

    this.load.image('gem1', './assets/mineral1.png');
    this.load.image('gem2', './assets/mineral2.png');
    this.load.image('gem3', './assets/mineral3.png');
    this.asteroids = ['gem1', 'gem2', 'gem3']

}
/*
create(){
    super.create();
    this.space = this.physics.add.image(400, 300, 'otherspace');
}
*/


create() {

    // this.cache.game.canvas.hidden = false;
    this.physics.gravity = 0;


    this.space = this.physics.add.image(400, 300, 'otherspace');

    this.fire = this.physics.add.image(225, 345, 'fire').setActive().setVelocity(0, 0);
    this.fire.setRotation(4.71);
    this.fire.setScale(0.3, 0.3);
    this.fire.collideWorldBounds = true;

    this.ship = this.physics.add.image(200, 300, 'ship').setActive().setVelocity(0, 0);
    this.ship.setCollideWorldBounds(true);
    this.ship.onWorldBounds = true;
    // this.ship.setTypeA().setCheckAgainstB().setActiveCollision();
    // this.ship.setCollideCallback(this.collide(this.pipe, this.`ship));


    // Shield bar
    //this.ship.health = 1;
    this.ship.health = 0;
    var graphics = this.add.graphics();

    this.healthBar = new Phaser.Geom.Rectangle(30, 60, 140, 20);
    this.healthBar.depth = 2000;


    //graphics.fillStyle(0x1dadf7, 1);
    //color was changed to green
    graphics.fillStyle(0x0ad149, 1);
    graphics.fillRectShape(this.healthBar);

    this.healthEvent = this.time.addEvent({
        delay: 50,
        callback: function() {

            // I have no idea why any of this works
            graphics.clear();
            this.healthBarBackground = graphics.fillStyle(0xe2e2e2, 1);
            this.healthBarBackground.fillRect(30, 60, 140, 20);
            this.healthBarBackground.alpha = 0.5;

            var w = 140 * this.ship.health;
            this.healthBar.setSize(w, 20);

            graphics.fillStyle(0x0ad149, 1);

            graphics.fillRectShape(this.healthBar);
            
        },
        callbackScope: this,
        loop: true
    });

    this.pipes = this.physics.add.group({
        key: 'asteroid',
        repeat: 24,
        setXY: { x: 700, y: 10, stepY: 25 },
        setVelocityX: -70
    });


    this.pipes.children.iterate(function (child) {
        child.setTexture(this.asteroids[Phaser.Math.Between(0, 2)]);
        child.setX(2000);
    }, this);

    this.pipes.depth = 0;

    this.timedEvent = this.time.addEvent({
        delay: 4000,
        callback: this.updateAsteroids,
        callbackScope: this,
        loop: true
    });


    this.collider = this.physics.add.overlap(this.ship, this.pipes, this.handleCollision, this.collide, this);

    this.scoreVal = 0;
    this.score = this.make.text().setText(this.scoreVal).setX(30).setY(40);

    this.scoreEvent = this.time.addEvent({
        delay: 100,
        callback: function() {
            this.scoreVal += 10
        },
        callbackScope: this,
        loop: true
    });

    // keep track of trials
    this.last_asteroid = null;

    this.dataSaveEvent = this.time.addEvent({
        delay: 500,
        callback: this.addData,
        callbackScope: this,
        loop: true
    });

}

  // Collision handling callback
  handleCollision() {
    this.collision_count +=1 ;
  
  }

  updateAsteroids() {

    this.hole = 0;
    this.hole2 = 0;

    var max_val = 0;
    this.last_asteroid = null;
    for (let i = 0; i < this.pipes.getChildren().length; i++) {
        var val = Phaser.Math.Between(800, 1000);
        if (i < 5) {
            //var vv = this.ship.y;
            if((this.cache.game.trial)%2==0){
                var vv=500;
            }
            else {
                var vv=100
            }
            this.pipes.getChildren()[i].setX(val);
            this.pipes.getChildren()[i].setY(vv += (30 * (3 - i)));
            this.pipes.getChildren()[i].setVelocity(-700, 0);
            if (val > max_val) {
                max_val = val;
                this.last_asteroid = this.pipes.getChildren()[i];
            }
        }
        else {
            this.pipes.getChildren()[i].setX(99999);

        }
    }

    this.cache.game.trial += 1;

}



    addData() {

        this.cache.game.data.trial.push(this.cache.game.player_trial);
        this.cache.game.data.trial_type.push('rewardcontrol')
        this.cache.game.data.player_y.push(this.ship.y);
        this.cache.game.data.subjectID.push(this.cache.game.subjectID);
        this.cache.game.data.score.push(this.scoreVal);
        this.cache.game.data.health.push(this.ship.health);
        this.cache.game.data.hole1_y.push(0);
        this.cache.game.data.hole2_y.push(0);
        this.cache.game.data.game_number.push(this.cache.game.game_number); 
        this.cache.game.data.taskversion.push(this.cache.game.taskversion);
        this.cache.game.data.collision_count.push(this.cache.game.collision_count);
        this.cache.game.data.numberID.push(this.cache.game.numberID);
    }

    nextPhase() {

        var cursors = this.input.keyboard.createCursorKeys();
        cursors.up.isDown = false;
        cursors.down.isDown = false;

        this.ship.body = false;
        this.pipes.body = false;
        this.fire.body = false;
        this.space.body = false;

        if (!this.topScore) {
            this.topScore = this.scoreVal;
        }

        else if (this.scoreVal > this.topScore) {
            this.topScore = this.scoreVal;
        }

        this.scene.start('EndScene', {score: this.scoreVal, topScore: this.topScore});

    }

    gameOver() {

        var cursors = this.input.keyboard.createCursorKeys();
        cursors.up.isDown = false;
        cursors.down.isDown = false;


        if (!this.topScore) {
            this.topScore = this.scoreVal;
        }

        else if (this.scoreVal > this.topScore) {
            this.topScore = this.scoreVal;
        }

        this.scene.start('GameOver', {score: this.scoreVal, topScore: this.topScore, game: 'rewardcontrol'});

    }

}

export default RewardControlScene;