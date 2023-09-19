import GameOver from "./GameOver.js";

class NextPhase extends GameOver {

    constructor() {
        super({
            key: 'NextPhase',
        });
    }


    create() {
        this.cache.game.player_trial += 1
        this.text = this.make.text();
        this.text.x = 400;
        this.text.y = 300;
        this.text.originX = 0.5;
        this.text.originY = 0.5;
        this.text.setText('Spiel vorbei!\n\nDeine Punktzahl: ' + this.scoreVal + '\n\nBeste Punktzahl: ' + this.topScore +
            '\n\n\nDrücke die Leertaste, um das nächste Spiel zu spielen');
        this.text.setAlign('center');
        this.saveData();

    }

    update() {

        var cursors = this.input.keyboard.createCursorKeys();

        if (cursors.space.isDown) {
            cursors.space.isDown = false;
            this.scene.start('AvoidanceStart', {score: this.scoreVal});
        }
    }

}

export default NextPhase;