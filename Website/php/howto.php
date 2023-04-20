<?php
    //Include the PHP functions to be used on the page 
    include('common.php'); 
	
    //Set the title and navigation 
    outputHeader("How to play");
    outputBannerNavigation("How to Play");
?>

<!-- Content of the page -->
    <div class="homeBody">
        <p class="rules">The game is very simple to play. There are 4 levels.</p>
        <p class="rules"> The aim of each level is to get a score of 200 before the time
        runs out </p>
        <p class="rules"> except the final level which has no time or score limit. Anyone who has successfully completed the
        first three levels.</p>
        <p class="rules"> Can continue playing for ever and score as high as they can.</p>
        <p class="rules">Each duck gives a score of 10 after being hunted.</p>
        <br>
        <p class="rules">The score of the guests will not shown on the leaderboard.</p>
    </div>

<?php
    //The function below is to set the footer and end  the body and html tags
    outputFooter();
?>