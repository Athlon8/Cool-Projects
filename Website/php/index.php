<?php
    //Include the PHP functions to be used on the page 
    include('common.php'); 
	
    //Set the title and navigation
    outputHeader("Home");
    outputBannerNavigation("Home");
?>

<!-- Below is the div for the body of the website -->
    <div class="homeBody">
        <div class="homeContent" id="logInContent">
        <h1>Log In</h1>
        <div class="credentials">
            <div class="vertical">
                <label class="text" for="email">Email:</label>
                <br>
                <label class="text" for="pwd">Password:</label>
            </div>
            <div class="vertical">
            <input class="input" type="email" id="email" name="email">
            <br>
            <input class="input" type="password" id="pwd" name="pwd" minlength="8">
            </div>
        </div>
        <p id="logInErrorMessage" style="color: red;"></p>
        <input class="buttonSub" type="submit" onclick="login()">
        <p>New Player? <a class="reg" href="register.php"> Register</a></p>
        <a href="game.html" class="button"> Play as a guest</a>

        <p>Note: your progress will not be saved if you play as a guest.</p>
    </div>
    </div>

<?php
    //The function below is to set the footer and end  the body and html tags
    outputFooter();
?>