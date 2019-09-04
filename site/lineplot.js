var updateData
(function(){
  // Set the dimensions of the canvas / graph
  var margin = {top: 30, right: 20, bottom: 30, left: 50},
      width = 600 - margin.left - margin.right,
      height = 270 - margin.top - margin.bottom;

  // Set the ranges
  var x = d3.scaleTime().range([0, width]).domain([new Date(1900, 1), new Date(2018, 1)]);
  var y = d3.scaleLinear().range([height, 0]);

  // Adds the svg canvas
  var svg = d3.select("#lineplot_area")
      .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
      .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

  svg.append('g')
    .call(d3.axisLeft(y));
  svg.append('g')
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Define the line
  var valueline = d3.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.value); });

  // Get the data
  var parsed_data;

  d3.csv("name_usage.csv", function(error, data) {
      data.forEach(function(d) {
        series = new Array()
        for (let [key, value] of Object.entries(d)) {
          if (key != 'name' && key != 'sexe') {
            d[key] = +value
            series.push({'date': new Date(+key, 1), 'value': d[key]})
          }
        }
        d.series = series
      });

      x.domain([new Date(1900, 1), new Date(2018, 1)]).nice();
      y.domain([0, 1]);

      // Add the valueline path.
      svg.append("path")
          .attr("class", "line")
          .attr("d", valueline(data[100].series));

      // Add the X Axis
      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(x);

      // Add the Y Axis
      svg.append("g")
          .attr("class", "y axis")
          .call(y);

      parsed_data = data
  });

  // ** Update data section (Called from the onclick)
  updateData = function (name, sexe) {
    id = 0
    for (var i = 0; i < parsed_data.length; i++) {
      if (parsed_data[i].name == name && parsed_data[i].sexe == sexe){
        id = i;
      }
    }

    // Select the section we want to apply our changes to
    var svg = d3.select("#lineplot_area").transition();

    // Make the changes
    svg.select(".line")   // change the line
        .duration(350)
        .attr("d", valueline(parsed_data[id].series));
  }
})()
