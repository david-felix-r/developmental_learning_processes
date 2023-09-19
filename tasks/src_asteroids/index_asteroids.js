import '../phaser.min.js';
import GameStart from './scenes/GameStart.js';
import GameScene from './scenes/GameScene.js';
import GameOver from './scenes/GameOver.js';
import EndScene from './scenes/EndScene.js';
import AvoidanceStart from './scenes/AvoidanceStart.js';
import AvoidanceScene from './scenes/AvoidanceScene.js';
import NextPhase from './scenes/NextPhase.js';
//new for reward version
//import RewardGameScene from './scenes/RewardGameScene.js';
//import RewardStart from './scenes/RewardStart.js';   
import TaskStart from './scenes/TaskStart.js';   


var game = new GameScene('GameScene');
var avoidance = new AvoidanceScene('AvoidanceScene');
var gameover = new GameOver("GameOver");
var nextphase = new NextPhase("NextPhase");
//var reward = new RewardGameScene("RewardGameScene"); 

let config = {
    type: Phaser.AUTO,
    parent: 'consent',
    width: 800,
    height: 600,
    scene: [
        TaskStart,
        GameStart,
        game,
        gameover,
        nextphase,
        AvoidanceStart,
        avoidance,
        EndScene
    ]
};


// here was the Firebase stuff, see Tobys GIT - uncommment if using firebase


var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
//var id = urlParams.get('id');
//var agegr = urlParams.get('agegroup');


// Consent form, no longer consent, I also disabled that because the checkbox was often not found by the participants
var check_consent = function (elem) {
    //if ( $('#consent_checkbox7').is(':checked')) {
    if (1 == 1) {
        document.getElementById('consent').innerHTML = "";
        window.scrollTo(0,0);
        $.getJSON('./trial_info.json', function (data) {

            let game = new Phaser.Game(config);

            game.trial_info = data;
            game.trial = 0;
            game.player_trial = 0;
            //creating a game counter as an input variable for the bonus function
            game.game_number = 1;
            //taskversion for the randomization
            if(urlParams.get('taskVersion')!=false) {
                game.taskversion = urlParams.get('taskVersion') ;
            }
            else {
                game.taskversion = "failed";
            }

            //this does work as long as the id is in the URL
            if(urlParams.get('id')!=false) {
                game.subjectID = urlParams.get('id') ;
            }
            
            else {
                game.subjectID = Math.floor(Math.random() * (2000000 - 0 + 1)) + 0; // if no ID, generate random ID (for testing)
//                var subject_id = '0000' // for testing
            }

            if(urlParams.get('number_id')!=false) {
                game.numberID = urlParams.get('number_id') ;
            }
            
            else {
                game.numberID = 'failed';
            }

            game.data = {};
            game.n_trials = 0;
            game.data.collision_count = 0; 

            game.dataKeys = ['health', 'hole1_y', 'hole2_y', 'player_y', 'score', 'subjectID', 'trial', 'trial_type','game_number', 'taskversion', 'collision_count', 'numberID'];

            game.dataKeys.forEach(k => {
                game.data[k] = [];
            });

        });
        return true;
    }
    else {
        alert("Bitte beseitige alles, was dich ablenken könnte. Wenn du dann bereit bist, " +
            "kannst du mit dem Experiment anfangen.");
        return false;
    }
};



document.getElementById('header_title').innerHTML = "Asteroidenspiel";
document.getElementById('consent').innerHTML = "        <p><b>Start des Teils mit den Asteroiden</b><p>\n" +
    "        <p>\n" +
    "         <br> Im Asteroidenspiel sollst du Asteroiden ausweichen! <br><br>" +
    "        Wenn du schlecht in dem Spiel bist, geht dein Schiff kaputt und du verlierst Punkte.\n Zu Beginn des Spiels erhältst du einen Bonus, machst du ein Schiff kaputt, wird dir davon Geld abgezogen." +
    "        </p>\n" +
    "        <br><br>\n" +
    "        <button type=\"button\" id=\"start\" class=\"submit_button\">START</button>\n" +
    "        <br><br>";


document.getElementById("start").onclick = check_consent;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    alert("Sorry, this experiment does not work on mobile devices");
    document.getElementById('consent').innerHTML = "";
}
