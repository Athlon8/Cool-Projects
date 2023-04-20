window.onload = displayCodesList;

function displayCodesList(){
    if(sessionStorage.loggedInUser !== undefined){
        let usrObj = JSON.parse(sessionStorage.loggedInUser);
        document.getElementById("loginButton").textContent = "";
        document.getElementById("registrationButton").textContent = "Hello " + usrObj[0].username; 
    }
        var request = new XMLHttpRequest();
        request.open('GET', '/getCodes');
        request.setRequestHeader('Content-Type', 'application/json');
        //Create event handler that specifies what should happen when server responds
        request.onload = () => {
            //Check HTTP status code
            if(request.status === 200){
                console.log(request.responseText);
                let codesList = JSON.parse(request.responseText);
                let allCodes = '';
                for(let i = 0; i<codesList.length; ++i){
                    allCodes += '<li data-name = "'+codesList[i].codename+'">'+codesList[i].codename+'</li>';
                }
                document.getElementById('listCodes').innerHTML = allCodes;
            }
            else
                alert("Error communicating with server: " + request.status);
        };
        // sending the request
        request.send();
}
// Now I will add an event listener that detects when the whole DOM content in the website is loaded or else I might encounter some errors
// if I will assign event listeners to values before they are laoded
document.addEventListener('DOMContentLoaded', function(){
    const list = document.getElementById('listCodes');
    const codeDisplay = document.getElementById('codeDisplay');
    list.addEventListener("click", (event) => {
        // getting the list element
        var element = event.target.closest('li');
        // now extracting the content of the li element
        var title = element.dataset.name;
        var request = new XMLHttpRequest();
        request.open('POST', '/getSpecificCode');
        request.setRequestHeader('Content-Type', 'application/json');
        //Create event handler that specifies what should happen when server responds
        request.onload = () => {
            //Check HTTP status code
            if(request.status === 200){
                console.log(request.responseText);
                let codesList = JSON.parse(request.responseText);
                let path = codesList[0].codetext.replace('public/', '');
                document.getElementById('ownerText').textContent = "Code by: " + codesList[0].codeowner;
                let code = '';
                fetch(path)
                        .then(response => response.text())
                        .then(data => {
                            const numberLines = data.split('\n')
                            let code = '';
                            // Now I will loop through all the lines to display the code
                        
                            for(let i = 0; i<numberLines.length;i++){
                                // now I will add the code to code variable
                                code += '<h2 style="font-size:18px;">'+ numberLines[i] + '</h2>';
                            }
                            
                            document.getElementById('codeDisplay').innerHTML = code;
                        })
                        .catch(error => {
                            console.error(error);
                        });
            }
            else
                alert("Error communicating with server: " + request.status);
        };
        // sending the request
        request.send(JSON.stringify({codeName: title}));
       
    });
    const registerButton = document.getElementById('registrationButton');
    const registrationModal = new bootstrap.Modal(document.getElementById('registrationModal'));
    registerButton.addEventListener("click", function() {
        registrationModal.show();
    });
    const logInButton = document.getElementById('loginButton');
    const logInModal = new bootstrap.Modal(document.getElementById('loginModal'));
    logInButton.addEventListener('click', function() {
        logInModal.show();
    });
    // getting the submit button for registering
    const submitButtonLogIn = document.getElementById('userLogInButton');
    // adding an event listener
    submitButtonLogIn.addEventListener('click', function(){
        // making variables for storing the user information
        var email = document.getElementById('userEmailLogIn').value;
        var password = document.getElementById('userPasswordLogIn').value;
        // creating an ajax request to send the code name and code text to the Server.js
        if(email == "" || password == ""){
            alert("Please enter all details");
        }else{
                var request = new XMLHttpRequest();
                request.open('POST', '/logInUser');
                request.setRequestHeader('Content-Type', 'application/json');
                //Create event handler that specifies what should happen when server responds
                request.onload = () => {
                    //Check HTTP status code
                    if(request.status === 200){
                        console.log(request.responseText);
                        let usrObj = JSON.parse(request.responseText);
                        if(usrObj.length === 0){
                            alert("Incorrect email or password");
                        }else{
                            if(usrObj[0].userpassword == password){
                                sessionStorage["loggedInUser"] = JSON.stringify(usrObj);
                                logInModal.hide();
                                location.reload();
                            }else{
                                alert("Incorrect Password");
                            }
                        }
                    }
                    else
                        alert("Error communicating with server: " + request.status);
                };
                // sending the request
                request.send(JSON.stringify({userEmail: email, userPassword: password}));
        }
    });
    // button of adding the code
    const addCodeButton = document.getElementById('codeInputButton');
    // getting the code input model
    const codeInputModal = new bootstrap.Modal(document.getElementById('codeInputModal'));
    // setting an event listener to it
    addCodeButton.addEventListener('click', function(){
        // checking if the user is logged in or not
        if(sessionStorage.loggedInUser !== undefined){
            codeInputModal.show();
        }else{
            alert('Log In first');
        }
    });
    // gtting the submit button of the codeInputModal
    const codeSubmitButton = document.getElementById('codeSubmitButton');
    // setting an event listener
    codeSubmitButton.addEventListener('click', function(){
        // making 2 variables one for the name and one for thet code text
        var name = document.getElementById('codeName').value;
        var codeText = document.getElementById('codeText').value;
        var usrObj = JSON.parse(sessionStorage.loggedInUser);
        var ownerName = usrObj[0].username;
        console.log(ownerName);
        // creating an ajax request to send the code name and code text to the Server.js
        var request = new XMLHttpRequest();
        request.open('POST', '/saveCode');
        request.setRequestHeader('Content-Type', 'application/json');
        //Create event handler that specifies what should happen when server responds
        request.onload = () => {
            //Check HTTP status code
            if(request.status === 200){
                console.log(request.responseText);
                if(request.responseText == "Saved Successfully"){
                    codeInputModal.hide();
                    location.reload();
                }else{
                    alert("Code can not be saved");
                }
            }
            else
                alert("Error communicating with server: " + request.status);
        };
        // sending the request
        request.send(JSON.stringify({codeName: name, codeText: codeText, owner: ownerName}));
    });
    // getting the submit button for registering
    const submitButtonReg = document.getElementById('userRegButton');
    // adding an event listener
    submitButtonReg.addEventListener('click', function(){
        // making variables for storing the user information
        var name = document.getElementById('userNameReg').value;
        var email = document.getElementById('userEmailReg').value;
        var password = document.getElementById('userPasswordReg').value;
        var conPassword = document.getElementById('userConPasswordReg').value;
        // creating an ajax request to send the code name and code text to the Server.js
        if(name == "" || email == "" || password == "" || conPassword == ""){
            alert("Please enter all details");
        }else{
            if(password != conPassword){
                alert("Passwords do not match");
            }else{
                var request = new XMLHttpRequest();
                request.open('POST', '/saveUser');
                request.setRequestHeader('Content-Type', 'application/json');
                //Create event handler that specifies what should happen when server responds
                request.onload = () => {
                    //Check HTTP status code
                    if(request.status === 200){
                        console.log(request.responseText);
                        alert("User Added Successfully");
                    }
                    else
                        alert("Error communicating with server: " + request.status);
                };
                // sending the request
                request.send(JSON.stringify({userName: name, userEmail: email, userPassword: password}));
            }
        }
    });
})