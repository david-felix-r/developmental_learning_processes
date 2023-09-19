class RewardStart extends Phaser.Scene {
    constructor() {
        super({
            key: 'RewardStart',
        });
    }

    create() {
        this.text = this.make.text();
        this.text.x = 400;
        this.text.y = 300;
        this.text.originX = 0.5;
        this.text.originY = 0.5;
        this.text.setText('Zusammenfassung des Weltraumschatz-Such-Spiel:\n\n\n' +
            'Deine Aufgabe ist es ein Raumschiff zu steuern\n und Weltraumschätze zu sammeln!\n\n'+
            'In diesem Spiel gibt es immer am oberen oder unterem Ende\n\n '+
            'des Bildschirms Weltraumschätze.\n\n Sammle so viele Schätze ein wie möglich.\n\n\n '+
            'Sammelst du viele Schätze ein, kannst du ein höheres Level erreichen!\n\n '+
            'Je mehr Level du schaffst, umso mehr Geld kannst du gewinnen!\n\n\n ' +
            'Drücke die Leertaste, um zu starten.\n\n ');
        this.text.setAlign('center');
        //trials can be reduced here for test-purposes
        //this.cache.game.n_trials = 3;
        this.cache.game.n_trials = this.cache.game.trial_info.positions_A.length;
       
       
        //console.log(this.cache.game.trial_info.positions_A)

        //this.cache.rewardgame.trial_info.positions_A = this.cache.rewardgame.trial_info.positions_A.reverse()
        //this.cache.rewardgame.trial_info.positions_B = this.cache.rewardgame.trial_info.positions_B.reverse()
        this.cache.game.trial_info.positions_A = this.cache.game.trial_info.positions_A.reverse()
        this.cache.game.trial_info.positions_B = this.cache.game.trial_info.positions_B.reverse()
        
    }

    update() {

        var cursors = this.input.keyboard.createCursorKeys();

        if (cursors.space.isDown) {
            cursors.space.isDown = false;
            this.scene.start('RewardGameScene', {score: this.scoreVal});
        }
    }


}

export default RewardStart;