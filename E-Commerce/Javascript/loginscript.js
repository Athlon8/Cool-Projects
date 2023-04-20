// Get the form element
var form = document.getElementById("login-form");

// Add a submit event listener to the form
form.addEventListener("submit", function(e) {
  e.preventDefault();
  // Get the email and password
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var errorMessage = document.getElementById("error-message");

  // Check if the username and password are not empty
  if (email === "" || password === "") {
    errorMessage.innerHTML = "Please fill out all fields";
    return;
  }

  // Check if the username and password match the correct credentials
  if (email === "user" && password === "password") {
    alert("Login successful!");
  } else {
    errorMessage.innerHTML = "Incorrect email or password";
  }
});
