class AvoidanceStart extends Phaser.Scene {
    constructor() {
        super({
            key: 'AvoidanceStart',
        });
    }

    create() {
        this.text = this.make.text();
        this.text.x = 400;
        this.text.y = 300;
        this.text.originX = 0.5;
        this.text.originY = 0.5;
        this.text.setText('Asteroiden-Wolken-Spiel\n\n\n\n' +
            'Im kommmenden Spiel fliegt eine Gruppe Asteroiden auf dich zu\n' +
            'und du musst ihnen ausweichen\n\n' +
            'Die Asteroiden werden immer direkt vor deinem Raumschiff erscheinen\n\n\n' +
            'Drücke die Leertaste zum Starten!');
        this.text.setAlign('center');
        //can be changed for testing
        this.cache.game.n_trials = 30;
       // this.cache.game.n_trials = 6;
        this.cache.game.player_trial = 0;
        this.cache.game.trial = 0;

    }

    update() {

        var cursors = this.input.keyboard.createCursorKeys();

        if (cursors.space.isDown) {
            cursors.space.isDown = false;
            this.scene.start('AvoidanceScene', {score: this.scoreVal});
        }
    }

}

export default AvoidanceStart;