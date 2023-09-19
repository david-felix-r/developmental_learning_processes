class GameStart extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameStart',
        });
    }

    create() {
        this.text = this.make.text();
        this.text.x = 400;
        this.text.y = 300;
        this.text.originX = 0.5;
        this.text.originY = 0.5;
        this.text.setText('Zusammenfassung des Asteroiden-Wand-Spiels:\n\n\n' +
            'Deine Aufgabe ist es ein Raumschiff zu steuern und Asteroiden auszuweichen.\n\n\n' +
            'Umso besser du den Asteroiden ausweichst, umso höher\nwird deine Punktzahl sein!\n\n Es gibt am unteren oder oberen Ende Lücken\n' +
            'im Asteroidengürtel.\n\n\n Fliege durch diese Lücken!\n\n' +
            
            'Jedes Mal, wenn du ein Schiff kaputt machst, wird dein Bonus weniger.\n\n\n'+
            'Am Ende des Spiels werden dir noch Fragen gestellt,\nbevor du die Aufgabe beenden kannst.\n\n\n' +
            'Drücke die Leertaste zum Starten!');
        this.text.setAlign('center');
        //trials can be reduced here for test-purposes
       // this.cache.game.n_trials = 20;
        this.cache.game.n_trials = this.cache.game.trial_info.positions_A.length;
        
        /*if (parseFloat(this.cache.game.taskversion) % 2 == 0) {
            this.scene.start("RewardStart", {score: this.scoreVal});
        }*/
    }

    update() {

        var cursors = this.input.keyboard.createCursorKeys();

            if (cursors.space.isDown) {
                cursors.space.isDown = false;
                this.scene.start('GameScene', {score: this.scoreVal});
            }

        /*
        if (parseFloat(this.cache.game.taskversion) % 2 == 0) {

            //sould I here add the is space Down thing etc? apparently not
            this.scene.start("RewardStart", {score: this.scoreVal});
        } 
        
    

        else {
            var cursors = this.input.keyboard.createCursorKeys();

            if (cursors.space.isDown) {
                cursors.space.isDown = false;
                this.scene.start('GameScene', {score: this.scoreVal});
            }
        } */
        
    }


}

export default GameStart;