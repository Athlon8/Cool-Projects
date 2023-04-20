// importing all the required modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// importing the database file
const database = require('./database');

// creating the express app and configuring it with path and body-parser
const app = express();
app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.json());
// setting the app for handling the post request this would be used to send data to database
app.post('/saveCode', saveCode);
app.post('/saveUser', saveUser);
app.post('/logInUser', logInUser);
// setting up the get request
app.get('/getCodes', getCodes);
app.post('/getSpecificCode', getSpecificCode);

function getSpecificCode(request, response){
  let name = request.body.codeName;
  console.log(name);
  database.getSpecificCode({codeName: name}, function(result){
    response.send(result);
  })
}

function getCodes(request, response){
  database.getCodes(function(result){
    response.send(result);
  })
}

function saveCode(request, response){
  // getting the name and codeText
  let name = request.body.codeName;
  let codeText = request.body.codeText;
  let ownerName = request.body.owner;
  // generating a file path to save the content of the code as a txt file in the Written Codes folder
  let path = 'public/Written Codes/'+ name +'-' + Date.now() + '.txt';

  fs.writeFile(path, codeText, function(error) {
    if(error) {
      response.send("Error saving");
    }else{
      response.send('Saved Successfully');
      database.saveCodes({name: name,text: path,owner: ownerName});

    }
  });
}

function saveUser(request, response){
  // getting all the info
  let name = request.body.userName;
  let email = request.body.userEmail;
  let password = request.body.userPassword;
  database.insertUser({userName: name, userEmail: email, userPassword: password}, function(result){
    response.send(result);
  })
}

function logInUser(request, response){
  // getting all the info
  let email = request.body.userEmail;
  let password = request.body.userPassword;
  database.logIn({userEmail: email, userPassword: password}, function(result){
    response.send(result);
  })
}

app.use((req, res) => {
  res.status(404);
  res.send('<h1> Error </h1>');
})

app.listen(8080, () => {
  console.log("listening on port 8080");
})