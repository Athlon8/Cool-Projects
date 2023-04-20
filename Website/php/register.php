<?php
    //Include the PHP functions to be used on the page 
    include('common.php'); 
	
    //Set the title and navigation
    outputHeader("Home");
    outputBannerNavigation("Home");
?>
<!-- Below is the content of the body after navigation none of the inputs are saved as of now -->
<div class="homeBody">
        <div class="homeContent">
        <h1>Register</h1>
        <div class="credentials">
            <div class="vertical">
                <label class="text" for="fullName">Full Name:</label>
                <br>
                <label class="text" for="username">Username:</label>
                <br>
                <label class="text" for="dob">Date of Birth:</label>
                <br>
                <label class="text" for="password">Password:</label>
                <br>
                <label class="text" for="conpass">Confirm Password:</label>
            </div>
            <div class="vertical">
            <input class="input" type="name" id="fullname" name="fullname">
            <br>
            <input class="input" type="text" id="username" name="username">
            <br>
            <input class="input" type="date" id="dob" name="dob">
            <br>
            <input class="input" type="password" id="pwd" name="pwd" minlength="8">
            <br>
            <input class="input" type="password" id="conpwd" name="conpwd" minlength="8">
            </div>
        </div>
        <p id="registerErrorMessage" style="color: red;"></p>
        <input class="buttonSub" type="submit" onclick="register()">
        <p class="button">Play as a guest</p>

        <p>Note: your progress will not be saved if you play as a guest.</p>
    </div>
</div>
<?php
    //The function below is to set the footer and end  the body and html tags
    outputFooter();
?>