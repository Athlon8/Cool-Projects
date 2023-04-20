<?php
    //Include the PHP functions to be used on the page 
    include('common.php'); 
	
   //Set the title and navigation
    outputHeader("Rules");
    outputBannerNavigation("Rules");
?>

<!-- This is the starting of the main body after the navigation to display the rules -->
    <div class="homeBody">
        <p class="rules">* Hunt as many ducks as you can and complete the levels.</p>
        <p class="rules">* After completing all the levels you can continue playing the game to beat your high score and be on the top of the leaderboard.</p>
        <p class="rules">* Do not refresh the page while playing.</p>
        <p class="rules">* The score would only be saved after the registration.</p>
        <p class="rules">* Only the highest score would be considered for the leaderboard.</p>
        <p class="rules">* Have fun!</p>
    </div>

<?php
    //The function below is to set the footer and end  the body and html tags
    outputFooter();
?>