//passowrd.html logic

// Store the default password, currently: '1234'
var defaultPassword = "1234";

//Verify the password
function verifyPassword() {
  var enteredPassword = document.getElementById("password").value;
  
  if (enteredPassword === defaultPassword) {
    window.location.href = "menu.html";
  } else {
    alert("Incorrect password. Please try again.");
  }
}


