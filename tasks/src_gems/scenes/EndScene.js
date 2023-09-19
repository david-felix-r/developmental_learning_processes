class EndScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'EndScene',
        });
    }

    init(data) {
        this.scoreVal = data.score;
        this.topScore = data.topScore;
    }

    create() {
        //test bonus
        
        this.text = this.make.text();
        //this.text.x = 130;
        //this.text.y = 250;
        this.text.x = 400;
        this.text.y = 300;
        this.text.originX = 0.5;
        this.text.originY = 0.5;

        const rewards = [
            0.25, 
            0.15,
            0.30,
            0.20,
            0.12,
            0.01,
            0.10,
            0.15,
            0.10,
            0.10,
            0.25,
            0.11,
            0.05,
            0.04,
            0.05,
            0.05,
            0.04,
            0.02,
            0.10,
            0.10,
            0.10,
            0.04,            
            0.03,
            0.02           
          ];
          
          const initialBonus = 0;
          const gameNumber = this.cache.game.game_number;
          if (gameNumber>=26){
            let message = 'Ende dieses Spiels!\n\n\n\n';
            message += 'Beste Punktzahl: ' + this.topScore + '\n\n';
            message += 'Du hast insgesamt ' + (gameNumber - 1) + ' Ladungen Weltraumschätze eingesammelt.\n\n';
            message += 'Daher bekommst du 2,50€ als Bonus. \n\n';
            message += '\n\nDrücke die Leertaste, um zum nächsten Teil des Experiments zu kommen.';
          }

           else if (gameNumber >1 && gameNumber <= 25) {
            let message = 'Ende des Spiels!\n\n\n\n';
            message += 'Beste Punktzahl: ' + this.topScore + '\n\n';
            message += 'Du hast insgesamt ' + (gameNumber - 1) + ' Ladungen Weltraumschätze eingesammelt.\n\n';
          
            if (gameNumber > 1 && gameNumber <= 24) {
              let totalReward = 0;
              let rewardLines = [];
              let currentLine = '';
              for (let i = 0; i < gameNumber - 1; i++) {
                totalReward += rewards[i];
                currentLine += rewards[i].toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }) + ', ';
                if (currentLine.length > 60) {
                  rewardLines.push(currentLine.slice(0, -2));
                  currentLine = '';
                }
              }
              if (currentLine.length > 0) {
                rewardLines.push(currentLine.slice(0, -2));
              }
          
              if (rewardLines.length > 0) {
                message += 'So viel Geld bekommst du für die einzelnen Ladungen Weltraumschätze:\n\n';
                message += rewardLines.join('\n') + '.\n\n\n';
              }
            
            
            let totalBonus = initialBonus + totalReward;
            totalBonus = totalBonus.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
            message += 'Insgesamt erhältst du einen Bonus von ' + totalBonus + '.' + '\n\n';
          
            message += '\n\nDrücke die Leertaste, um zum nächsten Teil des Experiments zu kommen.';}
            this.text.setText(message);
          }
          
          else if (gameNumber ==1) {
            let message = 'Ende des Spiels!\n\n\n\n';
            message += 'Beste Punktzahl: ' + this.topScore + '\n\n';
            message += 'Du hast leider keine volle Ladung Weltraumschätze eingesammelt.\n\n';
            message += 'Daher bekommst du für dieses Spiel leider keinen Bonus.\n\n';
            message += '\n\nDrücke die Leertaste, um zum nächsten Teil des Experiments zu kommen.';
          
            this.text.setText(message);
          }
          
        //for old bonus code look at older version of experiment
    
        /*this.text.setText('Ende der Aufgabe!\n\n\n\nBeste Punktzahl: ' + this.topScore +
            '\n\n\nClick here to answer some questions and finish the task');*/
        this.text.setAlign('center');
        this.saveData(); 

        //this.text.setInteractive();
        //direkt hier eine andere Funktion schreiben, die auch mit pointerup oder so augelöst wird
        //this.text.on('pointerup', function() {
        //window.location.href = "https://kjppp-onlineresearch.ukw.de/AGReiter/asteroidTask/ya_questionnaires.html";
        //});
    }

    update() {
        var cursors = this.input.keyboard.createCursorKeys();
/*
        if (cursors.space.isDown) {
            cursors.space.isDown = false;
            var groupVersion = this.cache.game.taskversion; 
            var id = this.cache.game.subjectID; 
            console.log(this.cache.game.taskversion);
            if ((this.cache.game.taskversion == '1')||(this.cache.game.taskversion == '2')||(this.cache.game.taskversion == '3')||(this.cache.game.taskversion == '4')) {
                window.location.href = 'https://kjppp-onlineresearch.ukw.de/AGReiter/spaceTask/ya_questionnaires.html'+'\?id='+id+'\&taskVersion=' +groupVersion; 
            }
            else if ((this.cache.game.taskversion == '5')||(this.cache.game.taskversion == '6')||(this.cache.game.taskversion == '7')||(this.cache.game.taskversion == '8')||(this.cache.reardgame.taskversion == '9')||(this.cache.game.taskversion == '10')||(this.cache.game.taskversion == '11')||(this.cache.game.taskversion == '12')) {
                window.location.href = 'https://kjppp-onlineresearch.ukw.de/AGReiter/asteroidTask/min_questionnaires.html'+'\?id='+id+'\&taskVersion=' +groupVersion;
            }
        }*/

        if (cursors.space.isDown) {
          cursors.space.isDown = false;
          var groupVersion = this.cache.game.taskversion; 
          var id = this.cache.game.subjectID; 
          console.log(this.cache.game.taskversion);
          var numb_id = this.cache.game.numberID;
          if (parseFloat(this.cache.game.taskversion) % 2 == 0) {
              window.location.href = 'https://kjppp-onlineresearch.ukw.de/AGReiter/spaceTask/instructions_2nd_game.html'+'\?id='+id+'\&taskVersion=' +groupVersion+'\&'+'number_id='+numb_id; 
          }
          else {
              window.location.href = 'https://kjppp-onlineresearch.ukw.de/AGReiter/spaceTask/questionnaires.html'+'\?id='+id+'\&taskVersion=' +groupVersion+'\&'+'number_id='+numb_id;
          }
      }
    }

    saveData()
    {
        var json = JSON.stringify(this.cache.game.data) ;
        //
        for (var b=0; b < this.cache.game.data.length;b++) {
            json = json + json[b] ;
        } ;
        console.log(this.cache.game.data); // to see the data in the console
        console.log(this.cache.game.game_number)
        
        //should save a perfectly complete json
        var d = new Date();
        var key = "game_reward_" + this.cache.game.taskversion+ "_" + this.cache.game.subjectID + "_" + this.cache.game.numberID+ "_" + d.getDate() + "_" + d.getUTCMonth() + "_" + d.getFullYear();
        
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'write_final_json.php'); // 'write_data.php' is the path to the php file described above.
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({filename: key, filedata: json})); 
        

    }

    /*
    {


        // var a = {};
        var a = await this.cache.game.serverManager.uploadData(key+'.csv', csv);

        window.location.href = 'https://app.prolific.ac/submissions/complete?cc=DCY6UA5M';
        return a

    }*/
}

export default EndScene;