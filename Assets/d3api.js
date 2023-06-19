// Initial Pie Chart Info
const container = d3.select("#pieChart");
const svg = container.append("svg")
  .attr("width", 300)
  .attr("height", 300);

// Create a circle within the SVG
svg.append("circle")
  .attr("cx", 150)
  .attr("cy", 150)
  .attr("r", 140)
  .attr("fill", "#808080")
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 0.7);

// Expense Input Form
document.getElementById('culminate').addEventListener('click', function () {
  let amounts = document.getElementsByName('amount[]');
  let total = 0;
  for (var i = 0; i < amounts.length; i++) {
    if (amounts[i].value !== '') {
      total += parseFloat(amounts[i].value);
    }
  }
  document.getElementById('total').innerHTML = 'Total Expenses: $' + total.toFixed(2);

  const data = [
    {
      name: 'Mortgage/Rent',
      value: document.getElementById('data1').value,
      key: 'A',
    },
    {
      name: 'Insurance',
      value: document.getElementById('data2').value,
      key: 'B',
    },
    {
      name: 'Utilities',
      value: document.getElementById('data3').value,
      key: 'C',
    },
    {
      name: 'Loans',
      value: document.getElementById('data4').value,
      key: 'D',
    },
    {
      name: 'Groceries',
      value: document.getElementById('data5').value,
      key: 'E',
    },
    {
      name: 'Transportation',
      value: document.getElementById('data6').value,
      key: 'F',
    },
    {
      name: 'Miscellaneous',
      value: document.getElementById('data7').value,
      key: 'G',
    },
  ];

  // Save the amount data
  localStorage.setItem('expenseData', JSON.stringify(data));

  // Pie Chart Styling after Data Input
  const customColors = d3.scaleOrdinal([
    '#FFCC0D',
    '#FF7326',
    '#FF194D',
    '#BF2669',
    '#702A8C',
    '#023B47',
    '#295E52',
    '#F2E085',
    '#FCAB55',
    '#EE7F38',
  ]);

  const pie = d3.pie().value((d) => d.value);

  const radius = Math.min(svg.attr('width'), svg.attr('height')) / 2;

  const arc = d3.arc().outerRadius(radius).innerRadius(0);

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
    .attr('fill', (d, i) => customColors(i));

  pieChart
    .selectAll('mySlices')
    .data(pie(data))
    .enter()
    .append('text')
    .text(function (d) {
      return d.data.key;
    })
    .attr('transform', function (d) {
      return 'translate(' + arc.centroid(d) + ')';
    })
    .style('text-anchor', 'middle')
    .style('font-size', 17);
});

// Save and retrieve data on load
function updatePieChart() {
  let amounts = document.getElementsByName('amount[]');
  let total = 0;
  for (var i = 0; i < amounts.length; i++) {
    if (amounts[i].value !== '') {
      total += parseFloat(amounts[i].value);
    }
  }
  document.getElementById('total').innerHTML = 'Total Expenses: $' + total.toFixed(2);

  const savedData = localStorage.getItem('expenseData');
  if (savedData) {
    const data = JSON.parse(savedData);
    document.getElementById('data1').value = data[0].value;
    document.getElementById('data2').value = data[1].value;
    document.getElementById('data3').value = data[2].value;
    document.getElementById('data4').value = data[3].value;
    document.getElementById('data5').value = data[4].value;
    document.getElementById('data6').value = data[5].value;
    document.getElementById('data7').value = data[6].value;
    document.getElementById('culminate').click();
  }
}

window.addEventListener('load', updatePieChart);
