// Pie Chart Stuff 
//const container = d3.select("#pieChart");
//const svg = container.append("svg")
  //.attr("width", 300)
  //.attr("height", 300);

// Create a circle within the SVG
//svg.append("circle")
  //.attr("cx", 150)
  //.attr("cy", 150)
  //.attr("r", 147)
  //.attr("fill", "#F2A7C3");

//   Expense Input Form 

  document.getElementById('newExpense').addEventListener('click', function(){
    let table = document.querySelector('table');
    let row = table.insertRow(table.rows.length);
    let labelCell = row.insertCell(0);
    let amountCell = row.insertCell(1);
    labelCell.innerHTML = '<input type="text" name="label[]" placeholder="Expense label">';
    amountCell.innerHTML = '<input type="number" name="amount[]" placeholder="Expense Amount">';
});

document.getElementById('culminate').addEventListener('click', function(){
    let amounts = document.getElementsByName('amount[]')
    let total = 0;
    for (var i=0; i < amounts.length; i++) {
        if (amounts[i].value !== '') {
            total += parseFloat(amounts[i].value);
        }
    } 
    document.getElementById('total').innerHTML = 'Total Expenses: $' + total.toFixed(2); 
});

// Form to d3.js chart

const container = d3.select("#chart");
const svg = container.append("svg")
  .attr("width", 300)
  .attr("height", 300);

function createPieChart(data) {

  var width = 300;
  var height = 300;
  var radius = Math.min(width, height) / 2;


  var color = d3.scaleOrdinal(d3.schemeCategory10);

 
  var chart = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  
  var pie = d3.pie()
    .value(function(d) { return d; });

  
  var arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);


  var slices = chart.selectAll("path")
    .data(pie(data))
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", function(d, i) { return color(i); });
}

 document.getElementById('dataForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  
  // Get form values
  let data1 = parseFloat(document.getElementById('data1').value);
  let data2 = parseFloat(document.getElementById('data2').value);
  let data3 = parseFloat(document.getElementById('data3').value);
  let data4 = parseFloat(document.getElementById('data4').value);
  let data5 = parseFloat(document.getElementById('data5').value);
  
  let data = [data1, data2, data3, data4, data5]; // Store form data in an array
  
  svg.selectAll("*").remove();

  // Call a function to create the pie chart using the data
  createPieChart(data);
});