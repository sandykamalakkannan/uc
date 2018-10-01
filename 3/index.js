// Get references to the tbody element, input field and button.
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#date");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");
var $searchBtn1 = document.querySelector("#search1");
var $searchBtn2 = document.querySelector("#search2");
var $searchBtn3 = document.querySelector("#search3");
var $searchBtn4 = document.querySelector("#search4");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);
$searchBtn1.addEventListener("click", handleSearchButtonClick1);
$searchBtn2.addEventListener("click", handleSearchButtonClick2);
$searchBtn3.addEventListener("click", handleSearchButtonClick3);
$searchBtn4.addEventListener("click", handleSearchButtonClick4);

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// Set filteredUfo to dataSet initially
var filteredUfo = dataSet;

// renderTable renders the filteredUfo to the tbody
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < filteredUfo.length; i++) {
    // Get get the current address object and its fields
    var ufos = filteredUfo[i];
    var fields = Object.keys(ufos);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the date object, create a new cell at set its inner text to be the current value at the current address's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = ufos[field];
    }
  }
}

function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterDate = $dateInput.value.trim();

  // Set filteredUfo to an array of all addresses whose "date" matches the filter
  filteredUfo = dataSet.filter(function(ufos) {
    var datesUfo = ufos.date;

    // If true, add the date to the filteredUfo, otherwise don't add it to filteredAddresses
    return datesUfo === filterDate;
  });
  renderTable();
}
function handleSearchButtonClick1() {
  var filterCity = $cityInput.value.trim().toLowerCase();
  filteredUfo = dataSet.filter(function(ufos) {
    var cityUfo = ufos.city.toLowerCase();
    return cityUfo === filterCity;
  });
  renderTable();
}
function handleSearchButtonClick2() {
  var filterState = $stateInput.value.trim().toLowerCase();
  filteredUfo = dataSet.filter(function(ufos) {
    var stateUfo = ufos.state.toLowerCase();
    return stateUfo === filterState;
  });
  renderTable();
}
function handleSearchButtonClick3() {
  var filterCountry = $countryInput.value.trim().toLowerCase();
  filteredUfo = dataSet.filter(function(ufos) {
    var countryUfo = ufos.country.toLowerCase();
    return countryUfo === filterCountry;
  });
  renderTable();
}
function handleSearchButtonClick4() {
  var filterShape = $shapeInput.value.trim().toLowerCase();
  filteredUfo = dataSet.filter(function(ufos) {
    var shapeUfo = ufos.shape.toLowerCase();
    return shapeUfo === filterShape;
  });
  renderTable();
}
// Render the table for the first time on page load
renderTable();