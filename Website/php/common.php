<?php

//This is to output the header
function outputHeader($title){
    echo '<!DOCTYPE html>';
    echo '<html lang="en">';
    echo '<html>';
    echo '<head>';
    echo '<meta charset="UTF-8">';
    echo '<link rel="stylesheet" href="../css/stylesheet.css">';
    echo '<title>' . $title . '</title>';
    if($title == "Game"){

    }else if($title == "Leaderboard"){
        echo '<script src="../javascript/leaderboard.js"></script>';
    }else{
        echo '<script src="../javascript/common.js"></script>';
    }
    echo '</head>';
    echo '<body onload="checkLogin()">';
}

/* The function below is to set the style class of the current opened tab*/
function outputBannerNavigation($pageName){
    //Below is the entire code for the heading
    echo '<div class="nav">';
    echo '<img class="logo" src="../images/athlon.png" alt="">';
    echo '<ul>';
    
    //Array of the name of pages and there addresses
    $linkNames = array("Home", "Game", "How to Play","Rules", "Leaderboard");
    $linkAddresses = array("index.php", "game.php","howto.php", "rules.php", "leaderboard.php");
    $icons = array("home-outline", "game-controller-outline","create-outline", "reader-outline", "podium-outline");
    //The for loop below is to display all the attributes and set the styling class for them 
    for($x = 0; $x < count($linkNames); $x++){
        echo '<li ';
        if($linkNames[$x] == $pageName){
            echo 'class="items active">';
        }else{
            echo 'class="items">';
        }
        if($linkAddresses[$x] == "index.php"){
        echo '<a href="' . $linkAddresses[$x] . '" id="hometxt" onclick="logOut()">';
        }
        else{
            echo '<a href="' . $linkAddresses[$x] . '">';
        }
        echo '<span class="icon">';
        echo '<ion-icon name="' . $icons[$x] . '"></ion-icon>';
        echo '</span>';
        echo '<span class="navText">' . $linkNames[$x].'</span>';
        echo '</a>';
        echo '</li>';
    }
    echo '<div class="indicate"></div>';
    echo '</ul>';
    echo '<p class="user" id="userWelcome">Hello User!!</p>';
    echo '</div>';
    echo '<script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>';
    echo '<script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>';
    echo '</div>';
}

//The function below is to set the footer and end  the body and html tags
function outputFooter(){
    echo '</body>';
    echo '</html>';
}

