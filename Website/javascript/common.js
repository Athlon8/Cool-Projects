window.onload = checkLogin;
// this is the function that is called the moment the page is loaded it checks if the user is logged in or not
function checkLogin(){
    if(sessionStorage.loggedInUsername !== undefined){
        // below is the object that would hold all the information of the user
        let usrObj = JSON.parse(localStorage[sessionStorage.loggedInUsername]);
        document.getElementById("hometxt").innerHTML = '<span class="logOutIcon"> <ion-icon name="log-out-outline">< /ion-icon></span><span class="navText">Log Out</span>';
        var firstName = usrObj.fullName.split(/(\s+)/);
        document.getElementById("userWelcome").innerHTML = 'Hello ' + firstName[0];
    }else{
        // The statements below will change the home icon and the welcome message if the user logs out
        document.getElementById("hometxt").innerHTML = '<span class="icon"> <ion-icon name="home-outline"></ion-icon></span><span class="navText">Home</span>';
        document.getElementById("userWelcome").innerHTML = 'Hello User';
    }
}
// below is the register function is where the validation takes place
function register(){
    var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    if(document.getElementById("fullname").value === "" || document.getElementById("username").value === ""
    || document.getElementById("dob").value === "" || document.getElementById("pwd").value === "" ||
    document.getElementById("conpwd").value === ""){
        document.getElementById("registerErrorMessage").textContent = "Enter all the details!"; 
    }
    else if(/\s/.test(document.getElementById("fullname").value) == false){
        document.getElementById("registerErrorMessage").textContent = "Enter your full name"; 
    }
    else if(document.getElementById("username").value in localStorage){
        document.getElementById("registerErrorMessage").textContent = "User Already Exists!"; 
    }
    else if(mediumRegex.test(document.getElementById("pwd").value) == false){
        document.getElementById("registerErrorMessage").textContent = "Weak Password"; 
    }
    else if(document.getElementById("pwd").value != document.getElementById("conpwd").value){
        document.getElementById("registerErrorMessage").textContent = "Passwords do not match"; 
    }else{
        var allUsers = {};
        var username=document.getElementById("username").value;
        allUsers.username = username;
        allUsers.fullName = document.getElementById("fullname").value;
        allUsers.dob = document.getElementById("dob").value;
        allUsers.pwd = document.getElementById("pwd").value;
        allUsers.confirmPwd = document.getElementById("conpwd").value;
        allUsers.score = 0;
        localStorage[allUsers.username] = JSON.stringify(allUsers);
        document.getElementById("registerErrorMessage").textContent = "User Registered"; 
        window.location.href = "../html/index.html";
    }
}
let cookies = document.cookie;
// below is the log in function that is called when the user clicks on the submit button in the home page 
function login(){
    let email = document.getElementById("email").value;
    if(localStorage[email] === undefined){
        document.getElementById("logInErrorMessage").textContent = "User does not exist"; 
        return; 
    }
    else{
        let user = JSON.parse(localStorage[email]);//Convert to object
        let password = document.getElementById("pwd").value;
        if(password === user.pwd){//Successful login
            window.location.href = "../html/game.html";
            sessionStorage.loggedInUsername = email;
        }
        else{
            document.getElementById("logInErrorMessage").textContent = "Wrong Password"; 
        }
    }
}
// below is the log out function that would remove the username of the user from session storage when they log out
function logOut(){
    if(sessionStorage.loggedInUsername != undefined){
        sessionStorage.removeItem("loggedInUsername");
        // document.getElementById("hometxt").innerHTML = "<span class='icon'> <ion-icon name='home-outline'></ion-icon></span><span class='navText'>Home</span>";
    }
}