// frableData = data;

var tableData = data;
// console.log(tableData);
// Get references to the tbody element, input fields and buttons
var tbody = d3.select("tbody");
data.forEach(function(UFOobjects) {
    console.log(UFOobjects);
    var row = tbody.append("tr");
    Object.entries(UFOobjects).forEach(function([key, value]) {
      // console.log(key, value);
      // Append a cell to the row for each value
      // in the weather report object
      var cell = tbody.append("td");
      cell.text(value);
    });
  });


  var filterTable = d3.select("#filter-btn");

  filterTable.on("click", function() {
  
    // Prevent the page from refreshing
    d3.event.preventDefault();
  
    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");
    var inputValue = inputElement.property("value");

    console.log(inputValue);
    var filteredData = tableData.filter( UFOobjects => UFOobjects.datetime === inputValue);

    console.log(filteredData);
  

  
  });
  

// function handleSearchButtonClick() {
//   // go through search items with formatted user's search terms by removing leading and trailing whitespace

//   var filterDate = $dateInput.value.trim();
//   if (filterDate != "") {
//     filteredData = dataSet.filter(function (sighting) {
//       var sightingDate = sighting.datetime;
//       return sightingDate === filterDate;
//     });
//   };
//   var filterCity = $cityInput.value.trim().toLowerCase();
//   if (filterCity != "") {
//     filteredData = filteredData.filter(function (sighting) {
//       var sightingCity = sighting.city;
//       return sightingCity === filterCity;
//     });
//   };
//   var filterState = $stateInput.value.trim().toLowerCase();
//   if (filterState != "") {
//     filteredData = filteredData.filter(function (sighting) {
//       var sightingState = sighting.state;
//       return sightingState === filterState;
//     });
//   };
//   var filterCountry = $countryInput.value.trim().toLowerCase();
//   if (filterCountry != "") {
//     filteredData = filteredData.filter(function (sighting) {
//       var sightingCountry = sighting.country;
//       return sightingCountry === filterCountry;
//     });
//   };
//   var filterShape = $shapeInput.value.trim().toLowerCase();
//   if (filterShape != "") {
//     filteredData = filteredData.filter(function (sighting) {
//       var sightingShape = sighting.shape;
//       return sightingShape === filterShape;
//     });
//   };
//   renderTable();
// };


// // Reset the data and search form after a search
// function handleResetButtonClick() {
//   filteredData = dataSet;
//   $dateInput.value = "";
//   $cityInput.value = "";
//   $stateInput.value = "";
//   $countryInput.value = "";
//   $shapeInput.value = "";
//   renderTable();
// }

// // Render the table for the first time on page load
// renderTable();
