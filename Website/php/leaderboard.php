<?php
    //Include the PHP functions to be used on the page 
    include('common.php'); 
	
   //Set the title and navigation 
    outputHeader("Leaderboard");
    outputBannerNavigation("Leaderboard");
?>

 <!-- Below is the style for the leaderboard table -->
 <script src="../javascript/leaderboard.js"></script>
<style>
        p {text-align: center;}
        div {text-align: center;}
        </style>

        <style>
            table {
              font-family: arial, sans-serif;
              border-collapse: collapse;
              width: 100%;
              text-align: center;
              margin-top: 5%;
            }
            
            td, th {
              border: 1px solid #aef3f3;
              text-align: center;
              padding: 30px;
              font-family: 'Times New Roman', Times, serif;
              color:black;
              text-size-adjust: bold;
              
            }
            
            tr:nth-child(even) {
              background-color: #aef3f3;
            }
            </style>
            <!-- Below is the table for the leaderboard -->
    <table id="leaderboard"> 
        <tr>
          <th>Ranking</th>
          <th>Username</th>
          <th>Score</th>
          
        </tr>
    </table>

<?php
    //The function below is to set the footer and end  the body and html tags
    outputFooter();
?>