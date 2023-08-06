
// Function to save user information
function saveUserInfo() {
    // Get input
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var birthdate = document.getElementById("birthdate").value;
    var password = document.getElementById("password").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var gender = document.getElementById("gender").value;
    
    // Validate
    if (firstName === "" || lastName === "" || birthdate === "" || password === "" || phoneNumber === "" || gender === "") {
      alert("Please fill in all the fields.");
      return;
    }
    
    // Save the user information locally
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("birthdate", birthdate);
    localStorage.setItem("password", password);
    localStorage.setItem("phoneNumber", phoneNumber);
    localStorage.setItem("gender", gender);
    
    alert("User information saved.");
  }
//Display profile details
function displayUserProfile() {
    var userProfileDiv = document.getElementById("userProfile");
    
    // Retrieve information from local storage 
    var firstName = localStorage.getItem("firstName");
    var lastName = localStorage.getItem("lastName");
    var phoneNumber = localStorage.getItem("phoneNumber");
    var gender = localStorage.getItem("gender");
    
    var userProfileHTML = "<h2>User Profile</h2>";
    userProfileHTML += "<p>First Name: " + firstName + "</p>";
    userProfileHTML += "<p>Last Name: " + lastName + "</p>";
    userProfileHTML += "<p>Phone Number: " + phoneNumber + "</p>";
    userProfileHTML += "<p>Gender: " + gender + "</p>";
    
    userProfileDiv.innerHTML = userProfileHTML;
  }
  
  // Display the work activity history
  function displayActivityHistory() {
    var activityList = document.getElementById("activityList");
    
    // Retrieve work activity history 
    var activityHistory = getWorkActivityHistory();
    
    var activityListHTML = "";
    
    if (activityHistory.length > 0) {
      for (var i = 0; i < activityHistory.length; i++) {
        activityListHTML += "<li>" + activityHistory[i] + "</li>";
      }
    } else {
      activityListHTML = "<li>No activity history found.</li>";
    }
    
    activityList.innerHTML = activityListHTML;
  }

  
  function showNewEntryPage() {
    // Navigate to the new entry page 
    window.location.href = "new.html";
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    displayUserProfile();
    displayActivityHistory();
  });
  
//new.html js

// Function to save the new entry
function saveEntry() {
  // Retrieve the form and its data
  var entryForm = document.getElementById("entryForm");
  var dateInput = document.getElementById("date");
  var ministeredToInput = document.getElementById("ministeredTo");
  var itemsDonatedInput = document.getElementById("itemsDonated");
  var hoursInput = document.getElementById("hours");
  
  // Perform validation
  if (!entryForm.checkValidity()) {
    entryForm.reportValidity();
    return;
  }
  
  // Retrieve the values 
  var date = dateInput.value;
  var ministeredTo = ministeredToInput.value;
  var itemsDonated = itemsDonatedInput.value;
  var hours = hoursInput.value;

  // Save the entry
  saveWorkEntry(date, ministeredTo, itemsDonated, hours);
  
  // Display confirmation
  var confirmationMessage = "Entry saved successfully:\n\n" +
    "Date: " + date + "\n" +
    "Ministered To: " + ministeredTo + "\n" +
    "Items Donated: " + itemsDonated + "\n" +
    "Hours: " + hours;
  alert(confirmationMessage);
  
  // Clear form 
  entryForm.reset();
}

// Function to save the work entry to local storage
function saveWorkEntry(date, ministeredTo, itemsDonated, hours) {
  // Retrieve existing work activity
  var entries = localStorage.getItem("workEntries");
  entries = entries ? JSON.parse(entries) : [];
  
  // Create a new entry object
  var newEntry = {
    date: date,
    ministeredTo: ministeredTo,
    itemsDonated: itemsDonated,
    hours: hours
  };
  
  entries.push(newEntry);
  
  // Store the updated entries array back in local storage
  localStorage.setItem("workEntries", JSON.stringify(entries));
}

// Function to retrieve work activity 
function getWorkEntries() {
  var entries = localStorage.getItem("workEntries");
  entries = entries ? JSON.parse(entries) : [];
  
  return entries;
}

//Clear button functionality
function clearWorkHistory() {
  localStorage.removeItem("workEntries");
}

function redirectToPage() {
  window.location.href = "work.html";
}


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

//Canvas js

//About page shape
window.addEventListener('load', function() { 
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');
  
  var squareSize = 200; 
  
  var outerSquareSize = squareSize + 50;
  
  canvas.width = outerSquareSize;
  canvas.height = outerSquareSize;
  ctx.clearRect(0, 0, outerSquareSize, outerSquareSize);
  
  var gradient = ctx.createLinearGradient(0, 0, squareSize, squareSize);
  gradient.addColorStop(0, 'cyan');
  gradient.addColorStop(1, 'lightblue');
  var gradient_2 = ctx.createLinearGradient(0, 0, outerSquareSize, outerSquareSize);
  gradient_2.addColorStop(0, 'white');
  gradient_2.addColorStop(1, 'cyan');

  ctx.fillStyle = gradient_2;
  ctx.fillRect(0, 0, outerSquareSize, outerSquareSize);
  ctx.fillStyle = gradient;
  ctx.fillRect((outerSquareSize - squareSize) / 2, (outerSquareSize - squareSize) / 2, squareSize, squareSize);
});

//Graph

//Create variable for work entries
var workEntries = getWorkEntries();

// Check if there is data for the graph
if (window.location.href.includes("graph.html") && workEntries.length === 0) {
  alert("No data available to display. Go back to the work activity log and record your service.");
  window.location.href = "work.html";
} else {
  var canvas = document.getElementById("graphCanvas");
  var ctx = canvas.getContext("2d");
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  var graphWidth = canvas.width - 40;
  var graphHeight = canvas.height - 60;
  var barSpacing = 20;

  // Calculate the maximum hours
  var maxHours = Math.max(...workEntries.map(entry => entry.hours));

  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
// Sort the workEntries array based on the date
workEntries.sort((a, b) => new Date(a.date) - new Date(b.date));

 // Draw the graph title
ctx.font = "25px Helvetica Neue";
ctx.fillStyle = "white";
var title = "Work Activity Hours";
var titleX = 20;
var titleY = 50; // Add spacing under the title
ctx.fillText(title, titleX, titleY);


var barWidth = 50;
var barSpacing = 50;
var maxHours = Math.max(...workEntries.map(entry => entry.hours));
var maxBarHeight = graphHeight - titleY - 30; // Adjusting for the title

// Draw the left label
ctx.font = "14px Helvetica Neue";
ctx.fillStyle = "white";
var labelInterval = 2; // Display label for every two hours
for (var i = 0; i <= maxHours; i += labelInterval) {
  var labelY = canvas.height - 30 - (i / maxHours) * maxBarHeight;
  ctx.fillText(i.toString(), 20, labelY);
}

// Draw the bars
for (var i = 0; i < workEntries.length; i++) {
  var entry = workEntries[i];

  // Calculate the height of the bar
  var barHeight = (entry.hours / maxHours) * maxBarHeight; 

  // Calculate the position of the bar
  var x = 40 + (barWidth + barSpacing) * i;
  var y = canvas.height - 30 - barHeight - 20; 

  // Draw the bar
  ctx.fillRect(x, y, barWidth, barHeight);

  // Draw the date label
  ctx.font = "12px Helvetica Neue";
  ctx.fillStyle = "white";
  ctx.fillText(entry.date, x, canvas.height - 10);
}
}
