window.onload = checkLogin;
function checkLogin(){
    let allRegisteredUsers = [];
    let userRankings = [];
    if(sessionStorage.loggedInUsername !== undefined){
        let usrObj = JSON.parse(localStorage[sessionStorage.loggedInUsername]);
        document.getElementById("hometxt").innerHTML = '<span class="logOutIcon"> <ion-icon name="log-out-outline">< /ion-icon></span><span class="navText">Log Out</span>';
        var firstName = usrObj.fullName.split(/(\s+)/);
        document.getElementById("userWelcome").innerHTML = 'Hello ' + firstName[0];
    }else{
        document.getElementById("hometxt").innerHTML = '<span class="icon"> <ion-icon name="home-outline"></ion-icon></span><span class="navText">Home</span>';
        document.getElementById("userWelcome").innerHTML = 'Hello User';
    }
    for(let i = 0; i<localStorage.length;i++){
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        var user = JSON.parse(value);
        allRegisteredUsers[i] = user.score;
        userRankings[i] = user.fullName + " " + user.score;
    }
    for (let x = 1; x < allRegisteredUsers.length; x++) {
        let current = allRegisteredUsers[x];
        let curr = userRankings[x];
        let y = x - 1;
        while(y >= 0 && current < allRegisteredUsers[y]) {
            allRegisteredUsers[y+1] = allRegisteredUsers[y];
            userRankings[y+1] = userRankings[y];
        y--;
        allRegisteredUsers[y+1] = current;
        userRankings[y+1] = curr;
        }
    }

    for(let i = 1; i<4;i++){
        let name = userRankings[allRegisteredUsers.length-i].match(/[a-zA-Z]+/g);
        let score = userRankings[allRegisteredUsers.length-i].match(/\d+/g);
        let rank = document.createElement("tr");
        let firstElement = document.createElement("td");
        let secondElement = document.createElement("td");
        let thirdElement = document.createElement("td");
        firstElement.textContent = i;
        secondElement.textContent = name[0] +" "+ name[1];
        thirdElement.textContent = score[0];
        rank.appendChild(firstElement);
        rank.appendChild(secondElement);
        rank.appendChild(thirdElement);
        document.getElementById("leaderboard").appendChild(rank);

    }

}
function logOut(){
    if(sessionStorage.loggedInUsername != undefined){
        sessionStorage.removeItem("loggedInUsername");
    }
}
