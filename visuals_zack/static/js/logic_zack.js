// Bar Chart for bills that pass in the last 10 years: from 2013 to 2023, congresses 113th to 117th.
// First for the House
// Load in the data for the house from github repo:
const git_repo_url = "https://raw.githubusercontent.com/JJERANEK/Project-4/main/Resources/" 
var house_url = git_repo_url+"house_cleaned.csv"
console.log(house_url)

// Function to sum arrays:
function sumArray(array) {
  let sum = 0;
  array.forEach(item => {
    sum += item;
  });
  return sum;
}

d3.csv(house_url).then(function(data) {
  console.log("Data for the House:",data);
  // Data for trace for Congress_113:
  let congress_113 = data.filter(bill => bill["Congress"] === '113');
  console.log("congress_113",congress_113) 
  // Data trace array
  let billPassed_113 = congress_113.map(data => data.bill_passed);
  console.log("billPassed",billPassed_113)  
  // Add up the bills passed:
  var total_billPassed_113 = sumArray(billPassed_113);
  console.log("total_billPassed_113",total_billPassed_113)
  var total_Failed_113 = total_billPassed_113 - total_billPassed_113.length;
  console.log("total_Failed_113",total_Failed_113)
  // Trace for the congress for bill
  let billCongress = congress_113.map(data => data.Congress);
  console.log("billCongress",billCongress)  

  // Set the trace for congress_113:
    let trace_113 = {
      x: billCongress, 
      y: total_billPassed_113,
      // text: labels,
      // hovertext: labels,
      name: "113th Congress",
      type: "bar"
    };
    // Create data array
    let dataPlot = [trace_113];

    // Apply a title to the layout
    let layout = {
    title: "Bills Passed by Congressional Term:<br>House of Representatives",
    // barmode: "group",
    showlegend: false,
    xaxis: {
      type: "category",
      tickvals: ['Failed', 'Passed'],
      tickson: "boundaries",
      ticklen: 15,
      showdividers: true,
      dividercolor: 'grey',
      dividerwidth: 2
    },
    // Include margins in the layout so the x-tick labels display correctly
    margin: {
      l: 50,
      r: 50,
      b: 20,
      t: 50,
      pad: 4
    }
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("plot", dataPlot, layout);

});   

// function makeBarChart(barArray) {
//     // Set the passed array to a new var "bar_new":
//     let bar_new = barArray 
//     // Set up colors for bars:
//     barColors = ["#084594", "#e31a1c", "#ff7f00", "#737373", "#762a83","#e7298a","#9ecae1", "#662506"]       
//     // Set up nice labels forf all of the risk vars we want to display from the array of bar_new:
//     let y_labels = ["Drought","Flood","Heatwave", "Hurricane", "Lightning", "Tornado", "Wildfire","Winter<br>Weather"].reverse(); 
//     // Set all the vars in the array of bar_new to object vars to build the charts and reverse them:
//     let barArray_x = [bar_new.drought_score, bar_new.flood_score,bar_new.heatwave_score, bar_new.hurricane_score, bar_new.lightning_score,bar_new.tornado_scores, bar_new.wildfire_scores, bar_new.winterweather_score];   

//     // Trace1 for the data of 8 risks:
//     let trace1 = {
//       x: barArray_x,
//       y: y_labels,
//       text: y_labels, 
//       hovertext: y_labels,
//       name: "Bar1",
//       marker:{
//         color: barColors
//       },
//       type: "bar",
//       orientation: "v"
//     };
//     // add the trace1 to a barData array:
//     var barData = [trace1];

//     // Apply a title to the layout and margins, pull the ID for the title:
//     let layout_bar = {
//       title: `<b>Climate Risk Scores for ${bar_new.county_name} County</b>`,
//       xaxis: {
//         range: [0, 100] // set the range of the x-axis to 0-100
//       },
//       margin: {
//         l: 100,
//         r: 100,
//         t: 100,
//         b: 100
//       }
//     };

//     // Render the plot to the div tag with id "bar", and pass barData and layout:
//     Plotly.newPlot("graph_1", barData, layout_bar);
//   } // end of makeBarChart() call 