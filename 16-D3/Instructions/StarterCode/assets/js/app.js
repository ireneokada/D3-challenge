// @TODO: YOUR CODE HERE! Ref lesson 16/3/12
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
  var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
// Import Data
d3.csv("data.csv").then(function(povData) {
  //  Parse the data
  
  povData.forEach(function(data){
   data.poverty=+data.poverty;
   data.healthcare=+data.healthcare;
  });
  })
//Step 5: Create Scales

var xLinearScale=d3.scalelinear()
.domain([8, d3.max(povData, d=>d.poverty)])
.range([0, width]);

var yLinearScale=d3.scalelinear()
.domain([8, d3.max(povData, d=>d.healthcare)])
.range([height, 0]);

//Create Axes
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLef(yLinearScale);
// Append the axes to the chartGroup
chartGroup.append("g")
.attr("transform", `translate(0, ${height})`)
.call(bottomAxis);

chartGroup.append("g")
.call(leftAxis);


// Create Circles
var circlesGroup = chartGroup.selectAll("circle")
.data(povData)
.enter()
.append("circle")
.attr("cx", d => xLinearScale(d.poverty))
.attr("cy", d => yLinearScale(d.healthcare))
.attr("r", "15")
.attr("fill", "blue")
.attr("opacity", ".5");

// Add Labels to the Circles

// Add Axis Labels



