
class RewardGameScene extends Phaser.Scene {

    constructor(key) {
        super({
            key: key,
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false,
                    gravity: { y: 0 },
                    setBounds: true,
                    width: 800,
                    height: 600,
                    x: 0,
                    y: 0,
                    checkCollision: {
                        up: true,
                        down: true,
                        left: true,
                        right: true
                    }
                }
            },
        });
        this.collision_count = 0;
    }


    init(data) {
//muss ich hier noch etwas anpassen, damit sich zwischen den Beiden Spielen nichts überschreibt?
        if (!data) {
            this.topScore = 0;
        }

        if (data) {
            if (data.score > this.topScore) {
                this.topScore = data.score;
            }
        }

        this.hole = null;
        this.hole2 = null;

    }


    preload() {
        this.load.image('ship', './assets/thrust_ship.png');
        // this.load.image('pipes', './assets/block6.png');
        this.load.image('fire', './assets/flame2.png');

        this.load.image('space', './assets/space2.png')

        this.load.image('gem1', './assets/mineral1.png');
        this.load.image('gem2', './assets/mineral2.png');
        this.load.image('gem3', './assets/mineral3.png');
        this.asteroids = ['gem1', 'gem2', 'gem3']

    }

    create() {

        // this.cache.game.canvas.hidden = false;
        this.physics.gravity = 0;


        this.space = this.physics.add.image(400, 300, 'space');

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

    update() {

        this.ship.x = 200;

        var graphics = this.add.graphics();


        this.fire.x = this.ship.x - 20;
        this.fire.y = this.ship.y;

        var cursors = this.input.keyboard.createCursorKeys();

        if (cursors.up.isDown) {
            this.ship.body.velocity.y -= 20;
            this.fire.body.velocity.y -= 20;
            this.fire.visible = true;
        }

        else if (cursors.down.isDown) {
            this.ship.body.velocity.y += 20;
            this.fire.body.velocity.y += 20;
            this.fire.visible = true;
        }

        else {
            this.ship.body.velocity.y *=0.98;
            this.fire.body.velocity.y *=0.98;
            this.fire.visible = false;
        }

       // this.score.setText('Weltraumschatzladung:\n\n'  +
          //  '\n\nLevel:\n' + this.scoreVal);
        
      this.score.setText('Weltraumschatzladung:\n\n'  +
           '\n\nLevel:\n' + this.cache.game.game_number);

        /*if (this.ship.health < 1) {
            this.ship.health -= 0.0001;
        }*/ //somehow I had a problem with permanent increases in the health bar, using the more clear case description below seems to prevent that

        if (this.ship.health < 1 && this.ship.health >0) {
            this.ship.health -= 0.0001;
        }

        this.score.depth = 1000;

        if (this.last_asteroid != null &&
            this.ship.x > this.last_asteroid.x &&
            (this.cache.game.trial - this.cache.game.player_trial == 1)) {
            this.cache.game.player_trial += 1;
        }
//changed in contrast to original avoidance version, will go to Endscene
        if (this.cache.game.player_trial >= this.cache.game.n_trials) {
            this.nextPhase();
        }


    }


    addData() {

        this.cache.game.data.trial.push(this.cache.game.player_trial);
        this.cache.game.data.trial_type.push('rewardgame');
        this.cache.game.data.player_y.push(this.ship.y);
        this.cache.game.data.hole1_y.push(this.hole);
        this.cache.game.data.hole2_y.push(this.hole2);
        this.cache.game.data.subjectID.push(this.cache.game.subjectID);
        this.cache.game.data.score.push(this.scoreVal);
        this.cache.game.data.health.push(this.ship.health);
        this.cache.game.data.game_number.push(this.cache.game.game_number);
        this.cache.game.data.taskversion.push(this.cache.game.taskversion);
        this.cache.game.data.collision_count.push(this.collision_count);
        this.cache.game.data.numberID.push(this.cache.game.numberID);
    }


    collide(bodyA, bodyB, axis, context)
    {
        //reframing the health bar as a game progress bar to make the rewardgame more parallel to the avoidance version
        
        //i reduced that to an extend that I hope should make it equally hard as the avoidance version
        //idea: good performance in avoidance version requires being in a certain zone, being in that certain 
        //zone should also only lead to an equal amount of game progress in the reward version, therefore 1/~ amount of 
        //available rewards per round which is around 4
        
        
         
        bodyA.health += 0.033;
        //for testing:
      // bodyA.health += 0.4

        bodyB.x = -99999999999;
        bodyB.checkCollision = false;
        //bodyA.setTint('0xff0000');
        

        if (bodyA.health >= 1.00) {
            bodyA.scene.gameOver()
        }

    }


    updateAsteroids() {

        this.hole = this.cache.game.trial_info.positions_A[this.cache.game.trial];
        this.hole2 = this.cache.game.trial_info.positions_B[this.cache.game.trial];

        var max_val = 0;
        this.last_asteroid = null;
        for (let i = 0; i < this.pipes.getChildren().length; i++) {
            var val = Phaser.Math.Between(800, 1000);
            if ((i < this.hole - 3 || i > this.hole) && (i < this.hole2 || i > this.hole2 + 3)) {
                this.pipes.getChildren()[i].setX(99999);
            }
            else {
                this.pipes.getChildren()[i].setX(val);
                this.pipes.getChildren()[i].setVelocity(-700, 0);
                if (val > max_val) {
                    max_val = val;
                    this.last_asteroid = this.pipes.getChildren()[i];
                }
            }
        }

        this.cache.game.trial += 1;

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
//I think that has to stay as it is for now
        this.scene.start('GameOver', {score: this.scoreVal, topScore: this.topScore, game: 'rewardgame'});

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
//this was from the attempt to make it in one go
/*
        if (parseFloat(this.cache.game.taskversion) % 2 == 0) {
            this.scene.start('GameStart', {score: this.scoreVal, topScore: this.topScore});
        }
        else {
            this.scene.start('NextPhase', {score: this.scoreVal, topScore: this.topScore});
        }*/

//this was used to eliminate the control version for the reward task
        //this.scene.start('EndScene', {score: this.scoreVal, topScore: this.topScore});

        this.scene.start('NextPhase', {level: this.cache.game.game_number, sumTreasure: this.collision_count});

    }
}

export default RewardGameScene;