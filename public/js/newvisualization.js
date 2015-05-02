var margin = {top: 20, right: 20, bottom: 100, left: 40};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

//define scale of x to be from 0 to width of SVG, with .1 padding in between
var x = d3.scale.linear()
  .range([0, width]);

//define scale of y to be from the height of SVG to 0
var y = d3.scale.linear()
  .range([height, 0]);

//define axes
var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.created_time); })
    .y(function(d) { return y(d.likes.count); });


var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<img src='" + d.images.low_resolution.url + "' width='75' height='75'><br><br>" + d.likes.count + " Likes";
  })

//create svg
var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);


//get json object which contains media counts
d3.json('/myphotos', function(error, data) {
  data.forEach(function(d) {
    d.created_time = d.created_time;
    d.likes.count = +d.likes.count;
  });
  x.domain(d3.extent(data, function(d) { return d.created_time; }));
  y.domain(d3.extent(data, function(d) { return d.likes.count; }));

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("# Likes");

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);


  svg.selectAll(".circle")
     .data(data)
     .enter()
     .append("svg:circle")
     .attr("class", "circle")
     .attr("cx", function (d) {
        return x(d.created_time);
     })
     .attr("cy", function (d) {
       return y(d.likes.count);
     })
     .attr("r", 5)    
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

//stops spinner
spinner.stop();
});