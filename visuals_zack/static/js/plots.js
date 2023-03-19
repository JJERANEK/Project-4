console.log(data);

// Trace for the Greek Data
let greekNames = data.map(data => data.greekName);  

console.log("Names:", greekNames);

// Data trace array
let greekSearch = data.map(data => data.greekSearchResults);  

console.log("Greek Search:", greekSearch); 

// Apply the group barmode to the layout
let trace1 = {
    x: greekNames,
    y: greekSearch,
    text: greekNames,
    name: "Greek",
    type: "bar"
  };
// Create data array
let dataPlot = [trace1];

// Apply a title to the layout
let layout = {
  title: "Greek gods search results",
  barmode: "group",
  // Include margins in the layout so the x-tick labels display correctly
  margin: {
    l: 50,
    r: 50,
    b: 200,
    t: 50,
    pad: 4
  }
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", dataPlot, layout);
