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
// and shift the latter by left and top margins.Ref HW LESSON d3; 3/12
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
 
// Import Data; ref 
d3.csv("data.csv").then(function(povertyData) {

  
  povertyData.forEach(function(data) {
   data.poverty = +data.poverty;
   data.healthcare = +data.healthcare;
  });
  
//Step 5: Create Scales

var xLinearScale = d3.scaleLinear()
.domain([8, d3.max(povertyData, d => d.poverty)])
.range([0, width]);

var yLinearScale = d3.scaleLinear()
.domain([0, d3.max(povertyData, d => d.healthcare)])
.range([height, 0]);

//Create Axes
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);
// Append the axes to the chartGroup
chartGroup.append("g")
.attr("transform", `translate(0, ${height})`)
.call(bottomAxis);

chartGroup.append("g")
.call(leftAxis);


// Create Circles. Ref https://www.w3schools.com/graphics/svg_circle.asp
var circlesGroup = chartGroup.selectAll("circle")
.data(povertyData)
.enter()
.append("circle")
.attr("cx", d => xLinearScale(d.poverty))
.attr("cy", d => yLinearScale(d.healthcare))
.attr("r", "15")
.attr("fill", "blue")
.attr("opacity", ".5");

// Append Labels list to the Circles. ref https://www.w3schools.com/graphics/svg_text.asp
//https://www.w3schools.com/jsref/met_node_appendchild.asp
//https://stackoverflow.com/questions/21988698/create-position-and-add-text-in-circle-using-d3-using-g-and-svg-in-javascrip
var circle = svg.selectAll("circlesGroup")
 .data(povertyData)
 .enter()
// Add Axis with state "abbr" Labels
circle.append("text")
.attr("x", function(d) { return xLinearScale(d.poverty); })
.attr("y", function(d) { return yLinearScale(d.healthcare); })
.text(function(d) { return d.abbr})
.attr("font-size", "12px")
.attr("dx", "7.6em")
.attr("dy", "2em")
.style("fill", "white")
.style("font-weight", "bold");

//Adding y Axis Labels 
chartGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left + 40)
.attr("x", 0 - (height / 2))
.attr("dy", "1em")
.attr("class", "axisText")
.text("Population Healthcare (%)")
.style("fill", "black");

//Adding x Axis Labels 
chartGroup.append("text")
.attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
.attr("class", "axisText")
.text("Population Poverty (%)")
.style("fill", "black");

     
  }).catch(function(error) {
    console.log(error);
  });





