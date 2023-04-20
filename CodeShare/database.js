//Import the mysql module
const mysql = require('mysql');

//Create a connection pool with the user details
const connectionPool = mysql.createPool({
    connectionLimit: 1,
    host: "localhost",
    user: "root",
    password: "12345",
    database: "codesharedb",
    debug: false
});



function saveCodes(codeInfo){
    // Building the sql query
    let sqlQuery = "insert into codes(codename, codetext, codeowner)" + 
    "values ('"+codeInfo.name+"', '"+codeInfo.text+"', '"+codeInfo.owner+"')";
    // sending the query
    connectionPool.query(sqlQuery, (error, result) => {
        if(error){
            console.log('Error');
        }
    })

}
function insertUser(userInfo,callback){
    // Building the sql query
    let sqlQuery = "insert into users(useremail, username, userpassword)" + 
    "values ('"+userInfo.userEmail+"', '"+userInfo.userName+"', '"+userInfo.userPassword+"')";
    // sending the query
    connectionPool.query(sqlQuery, (error, result) => {
        if(error){
            console.log('Error');
        }else{
            callback(result);
        }
    })

}
/* get all codes */
function getCodes(callback){
    //Build query
    let sql = "SELECT * FROM codes";

    //Execute query and output results
    connectionPool.query(sql, (err, result) => {
        if (err){//Check for errors
            console.error("Error executing query: " + JSON.stringify(err));
        }
        else{//Output results in JSON format - a web service would return this string.
            callback(result);
        }
    });
}

// get specific code
function getSpecificCode(name, callback){
    //Build query
    let sql = 'select * from codes where codename = "' + name.codeName + '"';
    console.log(name);
    //Execute query and output results
    connectionPool.query(sql, (err, result) => {
        if (err){//Check for errors
            console.error("Error executing query: " + JSON.stringify(err));
        }
        else{//Output results in JSON format - a web service would return this string.
            callback(result);
        }
    });
}

function logIn(userInfo,callback){
    // Building the sql query
    let sql = 'select * from users where useremail = "' + userInfo.userEmail + '"';
    // sending the query
    connectionPool.query(sql, (error, result) => {
        if(error){
            console.log('Error');
        }else{
            callback(result);
        }
    })

}

module.exports = {saveCodes, getCodes, getSpecificCode, insertUser, logIn};



