class RewardControlStart extends Phaser.Scene {
    constructor() {
        super({
            key: 'RewardControlStart',
        });
    }

    create() {
        this.text = this.make.text();
        this.text.x = 400;
        this.text.y = 300;
        this.text.originX = 0.5;
        this.text.originY = 0.5;
        this.text.setText('Raumschiff-Kontroll-Spiel:\n\n\n Das kommende Spiel unterscheidet sich vom bisherigen Spiel!\n\n' +
            'Jetzt musst du zeigen, wie gut du das Schiff steuern kannst.\n\n' +
            'Wichtig: Du musst immer in der markierten Mitte starten! \n\n\nDie Weltraumschätze werden IMMER ABWECHSELND\n'+
            'in der oberen oder unteren Hälfte des Bildschirms erscheinen!\n\n\n' +
            'Fliege nach dem Sammeln der Schätze immer so schnell wie möglich\n in den markierten Bereich in der Mitte zurück!\n\n\n' +
            'Drücke die Leertaste zum Starten!');
        this.text.setAlign('center');
        //can be changed for testing
         this.cache.game.n_trials = 30;
        //this.cache.game.n_trials = 6;
        this.cache.game.player_trial = 0;
        this.cache.game.trial = 0;

    }

    update() {

        var cursors = this.input.keyboard.createCursorKeys();

        if (cursors.space.isDown) {
            cursors.space.isDown = false;
            this.scene.start('RewardControlScene', {score: this.scoreVal});
        }
    }

}

export default RewardControlStart;