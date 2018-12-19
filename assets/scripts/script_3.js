// 2. Use the margin convention practice 
var margin5 = {top5: 50, right5: 50, bottom5: 50, left5: 50}
  , width5 = 800
  , height5 =400

// The number of datapoints
var n5 = 1000;

// 5. X scale will use the index of our data
var xScale = d3.scaleLinear()
    .domain([0, n5-1]) // input
    .range([0, width5]); // output

// 6. Y scale will use the randomly generate number 
var yScale = d3.scaleLinear()
    .domain([0, 1]) // input 
    .range([height5, 0]); // output 

// 7. d3's line generator
var line5 = d3.line()
    .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX) // apply smoothing to the line

// 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number

var dataset = d3.range(n5).map(function(d) { return {"y": d3.randomUniform(1)() } })

// 1. Add the SVG to the page and employ #2
var svg5 = d3.select("#svg2").append("svg")
    .attr("width", width5 + margin5.left5 + margin5.right5)
    .attr("height", height5 + margin5.top5 + margin5.bottom5)
  .append("g")
    .attr("transform", "translate(" + margin5.left5 + "," + margin5.top5 + ")");

// 3. Call the x axis in a group tag
svg5.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height5 + ")")
    .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

// 4. Call the y axis in a group tag
svg5.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

// 9. Append the path, bind the data, and call the line generator 
svg5.append("path")
    .datum(dataset) // 10. Binds data to the line 
    .attr("class", "line") // Assign a class for styling 
    .attr("d", line5); // 11. Calls the line generator 

// 12. Appends a circle for each datapoint 
svg5.selectAll(".dot")
    .data(dataset)
  .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function(d, i) { return xScale(i) })
    .attr("cy", function(d) { return yScale(d.y) })
    .attr("r", 5);
