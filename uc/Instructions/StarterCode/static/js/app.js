// frableData = data;

var tableData = data;
// console.log(tableData);
// Get references to the tbody element, input fields and buttons
var tbody = d3.select("tbody");
data.forEach(function(UFOobjects) {
    console.log(UFOobjects);
    var row = tbody.append("tr");
    // Object.entries(UFOobjects).forEach(function([key, value]) {
    //   // console.log(key, value);
    //   // Append a cell to the row for each value
    //   // in the weather report object
    //   var cell = tbody.append("td");
    //   cell.text(value);
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
    data.forEach(function(filteredData) {
      
      var row = tbody.append("tr");

       Object.entries(filteredData).forEach(function([key, value]) {
      // console.log(key, value);
      // Append a cell to the row for each value
      // in the weather report object
      var cell = tbody.append("td");
      cell.text(value);
  
  });
  });
  
  });
  
