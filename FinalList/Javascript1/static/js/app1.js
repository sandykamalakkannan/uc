var tableData= data;
var tbody = d3.select("tbody");
tableData.forEach((UFOsighting)=>{var row=tbody.append("tr");Object.entries(UFOsighting).forEach(([key,value])=>{var cell= tbody.append("td"); cell.text(value);})})
console.log(tableData);

var FilterTable = d3.select("#filter-btn");
FilterTable.on("click", function() {
// Prevent the page from refreshing
d3.event.preventDefault();

// Get the value property of the input element
var inputValueD = d3.select("#datetime").property("value");
var inputValueCi = d3.select("#city").property("value");
var inputValueSt = d3.select("#state").property("value");
var inputValueCo = d3.select("#country").property("value");
var inputValueSh = d3.select("#shape").property("value");

console.log(inputValueD);
console.log(inputValueCi);
console.log(inputValueSt);
console.log(inputValueCo);
console.log(inputValueSh);

if (inputValueD !="")
    {var filteredData1 = tableData.filter((tdata1) => tdata1.datetime === inputValueD);}
else
     {filteredData1=tableData;}
if (inputValueCi !="")
    {var filteredData2 = filteredData1.filter((tdata2) => tdata2.city === inputValueCi);}
else
    {filteredData2=filteredData1;}
if (inputValueSt !== "")
    {var filteredData3 = filteredData2.filter((tdata3) => tdata3.state === inputValueSt);}
else 
    { filteredData3=filteredData2;}
if (inputValueCo !=="")
    {var filteredData4 = filteredData3.filter((tdata4) => tdata4.country === inputValueCo);}
else (inputValueCo ==="")
   {filteredData4=filteredData3;}
if (inputValueSh !== "")
    {var filteredData5 = filteredData4.filter((tdata5) => tdata5.shape === inputValueSh);}
else
    {filteredData5=filteredData4;}

console.log(filteredData5);

tbody.text("");
filteredData5.forEach((UFOsighting)=>{var row=tbody.append("tr");Object.entries(UFOsighting).forEach(([key,value])=>{var cell= tbody.append("td"); cell.text(value);})})   
});