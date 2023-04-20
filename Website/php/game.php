<?php
    //Include the PHP functions to be used on the page 
    include('common.php'); 
	
    //Set the title and navigation
    outputHeader("Game");
    outputBannerNavigation("Game");
?>

    <!-- It is the div for the game -->
    <p id="difficultyLevel"></p>
    <div id="playArea" class="gameContainer">
        <img id="duckImage" class="duck" src="../images/duck1.gif" alt="" height="100px" width="120px" >
        <p class="startButton" id="startButton" onclick="startGame()">Start Game</p>
        <img id="duckBottom" class="duckBottom" src="../images/duck2.gif" alt="" height="100px" width="120px" >
        <p id="scoreTxt">10</p>
    </div>
    <script src="../javascript/game.js"></script>

<?php
//The function below is to set the footer and end  the body and html tags
    outputFooter();
?>