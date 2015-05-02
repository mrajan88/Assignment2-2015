var margin = {top: 20, right: 20, bottom: 100, left: 40};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

//define scale of x to be from 0 to width of SVG, with .1 padding in between
var scaleX = d3.scale.ordinal()
  .rangeRoundBands([0, width], .1);

//define scale of y to be from the height of SVG to 0
var scaleY = d3.scale.linear()
  .range([height, 0]);

//define axes
var xAxis = d3.svg.axis()
  .scale(scaleX)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(scaleY)
  .orient("left");

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<img src='" + d.profile_picture + "' width='50' height='50'><br>" + d.full_name + "<br>" + d.username + "<br>" +  d.counts.media + " Posts<br>" + d.counts.followed_by + " Followers<br> " + d.counts.follows + " Following<br>";
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
  
  //set domain of x to be all the usernames contained in the data
  scaleX.domain(data.map(function(d) { return d.created_time; }));
  //set domain of y to be from 0 to the maximum media count returned
  scaleY.domain([0, d3.max(data, function(d) { return d.likes.count; })]);

  //set up x axis
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")") //move x-axis to the bottom
    .call(xAxis)
    .selectAll("text")  
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", function(d) {
      return "rotate(-65)" 
    });

  //set up y axis
  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("# Likes");

  //set up bars in bar graph
  svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return scaleX(d.created_time); })
    .attr("width", scaleX.rangeBand())
    .attr("y", function(d) { return scaleY(d.likes.count); })
    .attr("height", function(d) { return height - scaleY(d.likes.count); })
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);
console.log("Reacehd 4");
//stops spinner
spinner.stop();

function type(d) {
  d.likes.count = +d.likes.count;
  return d;
}

});
