//Pie Chart Stuff 
const container = d3.select("#pieChart");
const svg = container.append("svg")
  .attr("width", 300)
  .attr("height", 300);

// Create a circle within the SVG
svg.append("circle")
  .attr("cx", 150)
  .attr("cy", 150)
  .attr("r", 140)
  .attr("fill", "#F2A7C3")
  .attr("stroke", "black")
  .style("stroke-width", "2px")

//   Expense Input Form 

  document.getElementById('newExpense').addEventListener('click', function(){
    let table = document.querySelector('table');
    let row = table.insertRow(table.rows.length - 1);
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

    const data = [{
      name: 'Mortgage/Rent',
      value: document.getElementById('data1').value,
      key: 'A'
    }, {
    name: 'Home Insurance',
    value: document.getElementById('data2').value,
    key: 'B'
    }, {
    name: 'Car Insurance',
    value: document.getElementById('data3').value,
    key: 'C'
    }, {
    name: 'Loans',
    value: document.getElementById('data4').value,
    key: 'D' 
    }, {
    name: 'Groceries',
    value: document.getElementById('data5').value,
    key: 'E'
    }];

    // const defaultColor = d3.scaleOrdinal(d3.schemeCategory10);

    const customColors = d3.scaleOrdinal(['#FFCC0D', '#FF7326', '#FF194D', '#BF2669', '#702A8C', '#023B47', '#295E52', '#F2E085', '#FCAB55', '#EE7F38']);

    const pie = d3.pie().value(d => d.value);

    const radius = Math.min(svg.attr('width'), svg.attr('height'))/2;

    const arc = d3.arc(). outerRadius(radius).innerRadius(0);

    svg.selectAll('.arc').remove();

    const g = svg.append('g').attr('transform', 'translate(150, 150)');

    const pieChart = g
    .selectAll('.arc')
    .data(pie(data))
    .enter()
    .append('g')
    .attr('class', 'arc');

    pieChart
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => customColors(i))
      .attr("stroke", "black")
      .style("stroke-width", "1px")
      // .style("opacity", 0.7);

    pieChart
    .selectAll('mySlices')
    .data(pie(data))
    .enter()
    .append('text')
    .text(function(d){ return d.data.name})
    .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
    .style("text-anchor", "middle")
    .style("font-size", 17)
});

