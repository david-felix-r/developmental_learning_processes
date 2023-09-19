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
      /*  var punishment_1 = 1;
        var punishment_2 = 0.75;
        var punishment_3 = 0.25;
        var punishment_4 = 0.5;
        var punishment_5 = 0.40;
        var punishment_6 = 0.20;
        var punishment_7 = 0.20;
        var punishment_8 = 0.40;
        var punishment_9 = 0.50;
        var punishment_10 = 0.10;
        var bonus ; 
        var bonus_1crash = (5 - punishment_1);
        var bonus_2crash = 5- (punishment_1 + punishment_2);
        var bonus_3crash = (5 - (punishment_1 + punishment_2 + punishment_3));
        var bonus_4crash = (5 - (punishment_1 + punishment_2 + punishment_3 + punishment_4));
        var bonus_5crash = (5 - (punishment_1 + punishment_2 + punishment_3 + punishment_4 + punishment_5));
        var bonus_6crash = (5 - (punishment_1 + punishment_2 + punishment_3 + punishment_4 + punishment_5 + punishment_6));
        var bonus_7crash = (5 - (punishment_1 + punishment_2 + punishment_3 + punishment_4 + punishment_5 + punishment_6 + punishment_7));
        var bonus_8crash = (5 - (punishment_1 + punishment_2 + punishment_3 + punishment_4 + punishment_5 + punishment_6 + punishment_7+punishment_8));
        var bonus_9crash = (5 - (punishment_1 + punishment_2 + punishment_3 + punishment_4 + punishment_5 + punishment_6 + punishment_7+punishment_8+ punishment_9));
        var bonus_10crash =(5 - (punishment_1 + punishment_2 + punishment_3 + punishment_4 + punishment_5 + punishment_6 + punishment_7+punishment_8+ punishment_9+punishment_10)); */
        this.text = this.make.text();
        //this.text.x = 130;
        //this.text.y = 250;
        this.text.x = 400;
        this.text.y = 300;
        this.text.originX = 0.5;
        this.text.originY = 0.5;
        
        const punishments = [
            0.25,
            0.10,
            0.15,
            0.10,
            0.30,
            0.10,
            0.25,
            0.05,
            0.15,
            0.05,
            0.02,
            0.11,
            0.12,
            0.01,
            0.10,
            0.10,
            0.04,
            0.04,
            0.05,
            0.04,
            0.02,
            0.10,
            0.03,
            0.02           
          ];
          
          const initialBonus = 2.5;
          const gameNumber = this.cache.game.game_number;
          if (gameNumber==1){
            let message = 'Ende des Spiels!\n\n\n\n';
            message += 'Beste Punktzahl: ' + this.topScore + '\n\n';
            message += 'Du hast insgesamt ' + (gameNumber - 1) + ' Raumschiffe kaputt gemacht.\n\n';
            message += 'Daher bekommst du 2,50€ als Bonus.';
          }

           else if (gameNumber >1 && gameNumber <= 25) {
            let message = 'Ende des Spiels!\n\n\n\n';
            message += 'Beste Punktzahl: ' + this.topScore + '\n\n';
            message += 'Du hast insgesamt ' + (gameNumber - 1) + ' Raumschiffe kaputt gemacht.\n\n';
          
            if (gameNumber > 1 && gameNumber <= 24) {
            let totalPunishment = 0;
              let punishmentLines = [];
              let currentLine = '';
              for (let i = 0; i < gameNumber - 1; i++) {
                totalPunishment += punishments[i];
                currentLine += punishments[i].toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }) + ', ';
                if (currentLine.length > 60) {
                  punishmentLines.push(currentLine.slice(0, -2));
                  currentLine = '';
                }
              }
              if (currentLine.length > 0) {
                punishmentLines.push(currentLine.slice(0, -2));
              }
          
              if (punishmentLines.length > 0) {
                message += 'So viel wurde dir für die einzelnen Raumschiffe abgezogen:\n\n';
                message += punishmentLines.join('\n') + '.\n\n\n';
              }
            
            
            let totalBonus = initialBonus - totalPunishment;
            totalBonus = totalBonus.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
            message += 'Insgesamt erhältst du einen Bonus von ' + totalBonus + '.' + '\n\n';
          
            message += '\n\nDrücke die Leertaste, um einige Fragen zu beantworten.';}
            this.text.setText(message);
          }
          
          else if (gameNumber > 25) {
            let message = 'Ende des Spiels!\n\n\n\n';
            message += 'Beste Punktzahl: ' + this.topScore + '\n\n';
            message += 'Du hast insgesamt ' + (gameNumber - 1) + ' Raumschiffe kaputt gemacht.\n\n';
            message += 'Insgesamt erhältst du einen Bonus von 0,10 €\n\n';
            message += '\n\nDrücke die Leertaste, um einige Fragen zu beantworten.';
          
            this.text.setText(message);
          }
          
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

        if (cursors.space.isDown) {
            cursors.space.isDown = false;
            var groupVersion = this.cache.game.taskversion; 
            var id = this.cache.game.subjectID; 
            var numb_id = this.cache.game.numberID;
            console.log(this.cache.game.taskversion);
            
            /*if ((this.cache.game.taskversion == '1')||(this.cache.game.taskversion == '2')||(this.cache.game.taskversion == '3')||(this.cache.game.taskversion == '4')) {
                window.location.href = 'https://kjppp-onlineresearch.ukw.de/AGReiter/asteroidTask/ya_questionnaires.html'+'\?id='+id+'\&taskVersion=' +groupVersion; 
            }
            else if ((this.cache.game.taskversion == '5')||(this.cache.game.taskversion == '6')||(this.cache.game.taskversion == '7')||(this.cache.game.taskversion == '8')||(this.cache.game.taskversion == '9')||(this.cache.game.taskversion == '10')||(this.cache.game.taskversion == '11')||(this.cache.game.taskversion == '12')) {
                window.location.href = 'https://kjppp-onlineresearch.ukw.de/AGReiter/asteroidTask/min_questionnaires.html'+'\?id='+id+'\&taskVersion=' +groupVersion;
            }*/

          if (parseFloat(groupVersion) % 2 == 1) {
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
        //scheint zu funktionieren, dass damit alles in ein json file geschrieben wird (bis auf die letzten Trials der Ausweichtestrunde!)
        for (var b=0; b < this.cache.game.data.length;b++) {
            json = json + json[b] ;
        } ;
        console.log(this.cache.game.data); // to see the data in the console
        console.log(this.cache.game.game_number)
        
        //should save a perfectly complete json
        var d = new Date();
        var key = "game_avoid_" + this.cache.game.taskversion+ "_" + this.cache.game.subjectID + "_" + this.cache.game.numberID+ "_" + d.getDate() + "_" + d.getUTCMonth() + "_" + d.getFullYear();
        
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