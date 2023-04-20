// Below are all of the variables that would be used throughout the code
let userLogIn = false;
let gameStart  = false;
let gameScore = 0;
let size = 10;
let height = 210;
let levelScore = 200;
let game;
let timerInterval;
let currentLevel = 0;
let usrObj;
let highScore;
let levelTime = 2;
let time = levelTime * 60;
let place = 0;
let position = 0;

// below is the creation of the aim image
const aim = new Image(80, 80);
aim.src = "../images/aim.png";
aim.id = "aimPng";

// below are almost all of the elements that would be created throughout the code
const scoretxt = document.createElement("p");
const timertxt = document.createElement("p");
const storage = document.createElement("div");
const levelIndicator = document.createElement("p");
const gameBackground = document.createElement("audio");
const gameOver = document.createElement("audio");
const gameShoot = document.createElement("audio");
const levelComplete = document.createElement("audio");
const duckHuntEffect = document.createElement("audio");

// below are all the ids of the newly created elements
timertxt.id = "timer";
scoretxt.id = "score";
levelIndicator.id = "levelIndicator";
gameBackground.id = "gameBg";
gameOver.id = "gameover";
gameShoot.id = "shoot";
levelComplete.id = "levelComplete";
duckHuntEffect.id = "hunt";

// Below all of the newly created elements are getting there style classes
timertxt.className = "timer";
scoretxt.className = "scoreClass";
storage.className = "storage";

// below is the assiging of all the text contents
scoretxt.textContent = "Score: " + gameScore;
timertxt.textContent = "Timer: 2:00";
levelIndicator.textContent = "Level Completed";

// below are all of the sources of the newly created elements
gameBackground.src = "../audio/gameBG.mp3";
gameOver.src = "../audio/gameOverAudio.mp3";
gameShoot.src = "../audio/shoot.mp3";
levelComplete.src = "../audio/levelComplete.mp3";
duckHuntEffect.src = "../audio/duckHuntEffect.mp3";

// below the starting 2 ducks, the start button,and the play area are assigned to a variable
var duck1 = document.getElementById("duckImage");
var duck2 = document.getElementById("duckBottom");
var startButton = document.getElementById("startButton");
var elm = document.getElementById("playArea");


window.onload = checkLogin;

// below is the check login function which is called to check if the user is logged in or not
function checkLogin(){
    if(sessionStorage.loggedInUsername !== undefined){
        usrObj = JSON.parse(localStorage[sessionStorage.loggedInUsername]);
        document.getElementById("hometxt").innerHTML = '<span class="logOutIcon"> <ion-icon name="log-out-outline"></ion-icon></span><span class="navText">Log Out</span>';
        var firstName = usrObj.fullName.split(/(\s+)/);
        document.getElementById("userWelcome").innerHTML = 'Hello ' + firstName[0];
        userLogIn = true;
    }
}


const preGame = setInterval(moveSquare,100);

// below is the move square function to move the first 2 ducks
function moveSquare(){
        if(position < 90){
            document.getElementById("duckImage").style.left = position + "%";
            document.getElementById("duckBottom").style.left = position + "%";
        }else{
            position = 0;
            document.getElementById("duckImage").style.left = position + "%";
            document.getElementById("duckBottom").style.left = position + "%";
        }
        position = position + 2;
}

// below is the function that would be called when the user starts the game
function startGame(){
    clearInterval(preGame);
    startButton.remove();
    duck1.remove();
    duck2.remove(); 
    creatingDuck();
    if(userLogIn == true){
    highScore = usrObj.score;
    }
    gameBackground.loop = true;
    gameBackground.play(); 

    game = setInterval(loopingDucks,100);
    timerInterval = setInterval(timerFunc, 1000);

    document.getElementById("difficultyLevel").textContent = "Level: First";

    elm.appendChild(storage);
    elm.appendChild(aim);

    storage.appendChild(timertxt);
    storage.appendChild(scoretxt);
    gameStart = true;

    elm.addEventListener("mousemove",getcordd);
    
    // below is the function to get coordinates of the screen and move the arrow with the cursor
    function getcordd(e){
        document.getElementById("aimPng").style.top = (e.pageY - 210)+ "px";
        document.getElementById("aimPng").style.left=(e.pageX -215)+ "px";
        document.getElementById("scoreTxt").style.top = (e.pageY - 210)+ "px";
        document.getElementById("scoreTxt").style.left=(e.pageX -190)+ "px";
    }
}

// below I added the click event listener to the play area div
elm.addEventListener("click", function(e){
    if(gameStart == true){
    if(e.target.classList.contains('duck') || e.target.classList.contains('duckBottom')){

        gameShoot.volume = 0.6;
        gameShoot.play();
        var exists = document.getElementById("currentDuck");
        exists.remove();
        place = 0;
        duckHuntEffect.play();
 
        gameScore = gameScore + 10;
        scoretxt.innerHTML = "Score: " + gameScore;
        if(userLogIn == true){
            if(gameScore>highScore){
            usrObj.score = usrObj.score + 10;
            localStorage[usrObj.username] = JSON.stringify(usrObj);
            }
        }
        if(gameScore>=levelScore){
            currentLevel = currentLevel + 1;
            clearInterval(game);
            gameScore = 0;
            scoretxt.innerHTML = "Score: " + gameScore;
            elm.appendChild(levelIndicator);
            gameBackground.pause();
            levelComplete.play();
            setTimeout(function(){
                levelIndicator.remove();
                if(currentLevel==1){
                    levelTime = 1;
                    time = levelTime * 60;
                    document.getElementById("difficultyLevel").textContent = "Level: Second";
                    creatingDuck();
                    game = setInterval(loopingDucks,80);
                    gameBackground.play();
                }else if(currentLevel == 2){
                    levelTime = 1;
                    time = levelTime * 60;
                    document.getElementById("difficultyLevel").textContent = "Level: Third";
                    creatingDuck();
                    game = setInterval(loopingDucks,60);
                    gameBackground.play();
                }else if(currentLevel >2 ){
                    clearInterval(timerInterval);
                    timertxt.innerHTML = "Timer: Null";
                    document.getElementById("difficultyLevel").textContent = "Level: Fourth";
                    creatingDuck();
                    game = setInterval(loopingDucks,20);
                    gameBackground.play();
                }
                
            }, 1500);

        }else{
            creatingDuck();
        }
    }else{
        gameShoot.volume = 1;
        gameShoot.play();
    }
}
})
function creatingDuck(){
    var exists = document.getElementById("currentDuck");
    const newDuck = new Image(80, 80);
    var top = Math.floor(Math.random() * 90) + 1;
    if(exists != null){
        exists.remove();
        var random = Math.floor(Math.random() *3) + 1;
        newDuck.src = "../images/duck" + random+".gif";
        newDuck.id = "currentDuck";
        newDuck.classList = "duck";
        if(random == 3){
            newDuck.style.filter = "brightness(400%)";
            newDuck.style.left = "90%";
        }
        elm.appendChild(newDuck);
        aim.remove();
        elm.appendChild(aim);
        document.getElementById("currentDuck").style.top = top + "%";
    }else{
    var random = Math.floor(Math.random() *3) + 1;
    newDuck.src = "../images/duck" + random+".gif";
    newDuck.id = "currentDuck";
    newDuck.classList = "duck";
    if(random == 3){
        newDuck.style.filter = "brightness(400%)";
        newDuck.style.left = "90%";
    }
    elm.appendChild(newDuck);
    aim.remove();
    elm.appendChild(aim);
    document.getElementById("currentDuck").style.top = top + "%";
    }
 
}
function loopingDucks(){
    var currentDuck = document.getElementById("currentDuck");
    var currentDuckImage = currentDuck.src.split("images/");
    console.log(currentDuckImage[1]);
    if(place <= 90){
        if(currentDuckImage[1] == "duck3.gif"){
            currentDuck.style.left = (90-place) + "%";
        }else{
            currentDuck.style.left = place + "%";
        }
    }else{
        place = 0;
        if(currentDuckImage[1] == "duck3.gif"){
            currentDuck.style.left = (90-place) + "%";
        }else{
            currentDuck.style.left = place + "%";
        }
        creatingDuck();
    }
    place = place + 1;
}
function timerFunc(){
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if(seconds<10){
        timertxt.innerHTML = "Timer: " + minutes + ":0" + seconds;
    }else{
    timertxt.innerHTML = "Timer: " + minutes + ":" + seconds;
    }
    if(time == 0){
        gameBackground.pause();
        gameOver.play();
        clearInterval(game);
        clearInterval(timerInterval);
        gameStart = false;
        levelIndicator.textContent = "Game Over";
        elm.appendChild(levelIndicator);
    }
    time--;
}
function logOut(){
    if(sessionStorage.loggedInUsername != undefined){
        sessionStorage.removeItem("loggedInUsername");
    }
}