class TaskStart extends Phaser.Scene {
    constructor() {
        super({
            key: 'TaskStart',
        });
    }

    create() {
        this.text = this.make.text();
        this.text.x = 400;
        this.text.y = 300;
        this.text.originX = 0.5;
        this.text.originY = 0.5;
        this.text.setText('Zur Erinnerung:\n\n\n' +
        'In allen diesen Spielen steuerst du ein Raumschiff mit den Pfeiltasten:\n\n\n' +
        'Mit der Pfeiltaste nach OBEN bewegst du dein Schiff nach OBEN.\n'+
        'Mit der Pfeiltaste nach UNTEN bewegst du dein Schiff nach UNTEN.\n\n\n'+
        'Dein Raumschiff hat eine Art Schwung, \nmanchmal musst du es also etwas abbremsen\n\n' +
        'Du kannst dein Raumschiff Abbremsen, indem du kurz die Pfeiltaste in die \n'+'andere Richtung drückst als die Richtung, in die du fliegen willst.\n\n' +
        'Drücke die Leertaste zum Starten!');
        this.text.setAlign('center');
        //trials can be reduced here for test-purposes
        this.cache.game.n_trials = 8;
        //this.cache.game.n_trials = this.cache.game.trial_info.positions_A.length;
        
        /*if (parseFloat(this.cache.game.taskversion) % 2 == 0) {
            this.scene.start("RewardStart", {score: this.scoreVal});
        }*/
    }

    update() {
        //that is an artifact of an old attempt to only have one Phaser Game
       /* if (parseFloat(this.cache.game.taskversion) % 2 == 0) {
        
            var cursors = this.input.keyboard.createCursorKeys();

            if (cursors.space.isDown) {
                cursors.space.isDown = false;
            this.scene.start("RewardStart", {score: this.scoreVal});}
        }
    

        else {
            var cursors = this.input.keyboard.createCursorKeys();

            if (cursors.space.isDown) {
                cursors.space.isDown = false;
                this.scene.start('GameStart', {score: this.scoreVal});
            }
        }*/
        var cursors = this.input.keyboard.createCursorKeys();

            if (cursors.space.isDown) {
                cursors.space.isDown = false;
                this.scene.start('GameStart', {score: this.scoreVal});
            }
    }


}

export default TaskStart;