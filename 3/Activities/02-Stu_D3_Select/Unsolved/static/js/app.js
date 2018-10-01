// The new student and grade to add to the table
var newGrade = ["Wash", 79];

// Use D3 to select the table
var table = d3.select("table");

// Use d3 to create a bootstrap striped table
// http://getbootstrap.com/docs/3.3/css/#tables-striped
table.attr("class","table table-stripped");

// Use D3 to select the table body
var tbody =d3.select("tbody");

var row = tbody.append("tr");


// Append one table row `tr` to the table body
row.append("td").text(newGrade[0]);
// Append one cell for the student name
row.append("td").text(newGrade[1]);
// Append one cell for the student grade
