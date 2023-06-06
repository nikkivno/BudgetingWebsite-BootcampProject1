// Colour Theme 
function changeTheme(theme) {
    document.documentElement.className = theme; }


// Pie Chart Stuff 

const container = d3.select("#pieChart");


const svg = container.append("svg")
  .attr("width", 300)
  .attr("height", 300);

// Create a circle within the SVG
svg.append("circle")
  .attr("cx", 150)
  .attr("cy", 150)
  .attr("r", 147)
  .attr("fill", "#F2A7C3");


//   -----------------------------