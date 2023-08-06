//Trip projection js

var peopleSlider = document.getElementById("people");
var selectedPeopleSpan = document.getElementById("selectedPeople");

peopleSlider.addEventListener("input", function() {
  selectedPeopleSpan.textContent = peopleSlider.value;
});

$(document).ready(function() {
              
    var currentLocation = window.location.href;
            
    $('nav ul li a').each(function() {
    if ($(this).attr('href') === currentLocation) {
        $(this).addClass('active');
     }
    });
});

function displayReport() {//Next time I think I should make the table its own function or set of functions to keep things cleaner
  var peopleInput = document.getElementById("people");
  var daysInput = document.getElementById("days");
  var locationInput = document.querySelector('input[name="location"]:checked');
  var lineBreak = document.createElement("br");//This seems like overkill but I added a whole variabe for the <br> elelemt so I could add some space between the display button and the table :D

  // Error checking (The only weird thing about this is my code works with starting values so even clicking "Display" 
  //without filling out any fields will result in a valid input.)
  if (peopleInput.value === "" || daysInput.value === "" || locationInput === null) {
      alert("Make sure you fill out all required fields!");
      return; 
  }

  var people = parseInt(peopleInput.value);
  var days = parseInt(daysInput.value);
  var location = locationInput.value;

  // Check input vlaues for errors
  if (isNaN(people) || isNaN(days) || people < 1 || days < 1) {
      alert("That is not a valid input for this field, please try again.");
      return; 
  }

  //Check to see if any input fields are empty
  if (!peopleInput.value || !daysInput.value || !locationInput) {
    alert("Make sure you fill out all required fields!");
    return; 
  }

  var cost = calculateCost(location, days, people); //function call for totalCost return value
  var formattedCost = cost.toLocaleString(); //Format result to have commas in the thousands places 

  if (cost >= 5000) { //If the trip is over $5000 the site asks the user for a 20% down payment
    alert("This trips totals over $5000, please make an initial deposit of 20% of the total cost of this trip within the next two weeks to maintain your reservation. Thank you for booking your trip with us!")
  }

  //Create the table dynamicly with JavaScript
  var table = document.createElement("table");
  table.className = "result-table";

  //Create rows
  var row1 = document.createElement("tr");
  var row2 = document.createElement("tr");
  var row3 = document.createElement("tr");
  var row4 = document.createElement("tr");

  //Create cells
  var cell1 = document.createElement("td");
  cell1.textContent = "Total Cost";
  var cell2 = document.createElement("td");
  cell2.textContent = "$" + formattedCost;

  var cell3 = document.createElement("td");
  cell3.textContent = "Number of People";
  var cell4 = document.createElement("td");
  cell4.textContent = people;

  var cell5 = document.createElement("td");
  cell5.textContent = "Number of Days";
  var cell6 = document.createElement("td");
  cell6.textContent = days;

  var cell7 = document.createElement("td");
  cell7.textContent = "Location";
  var cell8 = document.createElement("td");
  cell8.textContent = location;

  //Append the cells to rows
  row1.appendChild(cell1);
  row1.appendChild(cell2);
  row2.appendChild(cell3);
  row2.appendChild(cell4);
  row3.appendChild(cell5);
  row3.appendChild(cell6);
  row4.appendChild(cell7);
  row4.appendChild(cell8);

  //Append the rows to the table
  table.appendChild(row1);
  table.appendChild(row2);
  table.appendChild(row3);
  table.appendChild(row4);

  //Get the report clear content
  var report = document.getElementById("report");
  report.innerHTML = "";

  report.appendChild(lineBreak);
  report.appendChild(table);
}

//Calcualte the cost
function calculateCost(location, days, people) {
  //create a base cost
  var baseCost = 0;
  
  if (location === "Hati") {
      baseCost = 100; //cost in $ per person per day in Hati
  } else if (location === "The Balkans") {
      baseCost = 350; //cost in $ per person per day in The Balkans
  } else if (location === "South Africa") {
      baseCost = 250; //cost in $ per person per day in South Africa
  }
  
  var totalCost = baseCost * days * people; //formula to calculate trip total. Base cost * number of people * number of days
  return totalCost;
}

 


