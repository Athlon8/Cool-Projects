// JavaScript for the sign up page

// Get references to the form and input elements
const form = document.getElementById("signupForm");
const Address = document.getElementById("Address");
const Mobile= document.getElementById("Mobile");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

// Add event listener to the form to handle form submissions
form.addEventListener("submit", (e) => {
  // Prevent default form behavior
  e.preventDefault();

  // Check if the passwords match
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match");
    return;
  }

  // Send the form data to the server for further processing
  // (Assuming you have a function to handle this)
  // sendFormData(username.value, email.value, password.value);

  // Clear the form fields after successful submission
  form.reset();
});
