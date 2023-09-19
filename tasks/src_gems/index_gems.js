import '../phaser.min.js';
//import GameStart from './scenes/GameStart.js';
//import GameScene from './scenes/GameScene.js';
import GameOver from './scenes/GameOver.js';
import EndScene from './scenes/EndScene.js';
import RewardControlStart from './scenes/RewardControlStart.js';
import RewardControlScene from './scenes/RewardControlScene.js';
import NextPhase from './scenes/NextPhase.js';
//new for reward version
import RewardGameScene from './scenes/RewardGameScene.js';
import RewardStart from './scenes/RewardStart.js';   
import TaskStart from './scenes/TaskStart.js';   
//import RewardControlScene from './scenes/RewardControlScene.js';


//var game = new GameScene('GameScene');
var rewardcontrol= new RewardControlScene('RewardControlScene');
var gameover = new GameOver("GameOver");
var nextphase = new NextPhase("NextPhase");
var reward = new RewardGameScene("RewardGameScene"); 

let config = {
    type: Phaser.AUTO,
    parent: 'consent',
    width: 800,
    height: 600,
    scene: [
        TaskStart,
        gameover,
        nextphase,
        RewardControlStart,
        rewardcontrol,
        RewardStart,
        reward,
        EndScene
    ]
};

// here was the Firebase stuff, see Tobys GIT - uncommment if using firebase

//my attempt, works if the ID is in the URL
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

            var rewardgame = new Phaser.Game(config);

            //deliberately trying to store rewardgame in the cache: 
            //this.game = rewardgame;

            rewardgame.trial_info = data;
            rewardgame.trial = 0;
            rewardgame.player_trial = 0;
            //creating a game counter as an input variable for the bonus function
            rewardgame.game_number = 1;
            //taskversion for the randomization
            if(urlParams.get('taskVersion')!=false) {
                rewardgame.taskversion = urlParams.get('taskVersion') ;
            }
            else {
                rewardgame.taskversion = "failed";
            }

            //this does work as long as the id is in the URL
            if(urlParams.get('id')!=false) {
                rewardgame.subjectID = urlParams.get('id') ;
            }
            
            else {
                rewardgame.subjectID = Math.floor(Math.random() * (2000000 - 0 + 1)) + 0; // if no ID, generate random ID (for testing)
//                var subject_id = '0000' // for testing
            }

            
            if(urlParams.get('number_id')!=false) {
                rewardgame.numberID = urlParams.get('number_id') ;
            }
            
            else {
                rewardgame.numberID = 'failed';
            }

            rewardgame.data = {};
            rewardgame.n_trials = 0;
            rewardgame.collision_count = 0;

            rewardgame.dataKeys = ['health', 'hole1_y', 'hole2_y', 'player_y', 'score', 'subjectID', 'trial', 'trial_type','game_number', 'taskversion','collision_count', 'numberID'];

            rewardgame.dataKeys.forEach(k => {
                rewardgame.data[k] = [];
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



document.getElementById('header_title').innerHTML = " Weltraumschatzspiel";
document.getElementById('consent').innerHTML = "        <p><b>Start des Teils mit den Weltraumschätzen</b><p>\n" +
    "         <p>\n" +
    "         <br> Im Weltraumschatzspiel sollst du so viele Weltraumschätze wie möglich einsammeln! <br><br>" +
    "        Machst du das gut, kannst du höhere Level erreichen.\n Je mehr Level du erreichst desto mehr Geld bekommst du am Ende des Spiels." +
    "        </p>\n" +
    "        <br><br>\n" +
    "        <button type=\"button\" id=\"start\" class=\"submit_button\">START</button>\n" +
    "        <br><br>";


document.getElementById("start").onclick = check_consent;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    alert("Sorry, this experiment does not work on mobile devices");
    document.getElementById('consent').innerHTML = "";
}
