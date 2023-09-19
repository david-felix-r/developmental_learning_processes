class GameOver extends Phaser.Scene {

    init(data) {
        this.scoreVal = data.score;
        this.topScore = data.topScore;
        this.game = data.game;
    }

    create() {
        this.cache.game.player_trial += 1;
        this.cache.game.game_number +=1;
        this.text = this.make.text();
        this.text.x = 400;
        this.text.y = 300;
        this.text.originX = 0.5;
        this.text.originY = 0.5;
        this.text.setText('Sehr gut, du hast eine Ladung Schätze eingesammelt!\n\n'+' Damit hast du ein neues Level erreicht.' + '\n\n\Dafür bekommst du einen Bonus!'+
            '\n\n\nDrücke die Leertaste zum Weiterspielen!');
        this.text.setAlign('center');
        this.saveData();

    }

    update() {

        var cursors = this.input.keyboard.createCursorKeys();

        if (cursors.space.isDown) {
            cursors.space.isDown = false;
            if (this.game == 'game') {
                this.scene.start('GameScene', {score: this.scoreVal});
            }
            else if (this.game == 'avoidance') {
                this.scene.start('AvoidanceScene', {score: this.scoreVal});
            }

            else if (this.game == 'rewardgame') {
                this.scene.start('RewardGameScene', {score: this.scoreVal});
            }

            else if (this.game == 'rewardcontrol') {
                this.scene.start('RewardControlScene', {score: this.scoreVal});
            }
        }

        
    }
    

    saveData() {  
        var json = JSON.stringify(this.cache.game.data) ;
        //scheint zu funktionieren, dass damit alles in ein json file geschrieben wird 
        for (var b=0; b < this.cache.game.data.length;b++) {
            json = json + json[b] ;
        } ;
        console.log(this.cache.game.data); // to see the data in the console
        console.log(this.cache.game.game_number);//to check whether the parameter works
        
        //adds the different games onto each other into one json file
        var d = new Date();
        var key = "dataset_rew_" + this.cache.game.subjectID + "-" + d.getDate() + "-" + d.getUTCMonth() + "-" + d.getFullYear();
        
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'write_data_game.php'); // 'write_data.php' is the path to the php file described above.
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({filename: key, filedata: json}));  

        //writing data per game into single file:
/*        var d = new Date();
        var key = "pergame_" + this.cache.game.subjectID + "-" + d.getDate() + "-" + d.getUTCMonth() + "-" + d.getFullYear() + d.getHours() + ":"+ d.getMinutes() + ":" + d.getSeconds();
        
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'write_data_game.php'); // 'write_data.php' is the path to the php file described above.
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({filename: key, filedata: json}));*/
     
    }
}

export default GameOver;


