// const billsurl = "https://usbillsapp.onrender.com/"
const url = "../../Resources/House_113_118.csv"
// const delay = ms => new Promise(res => setTimeout(res, ms));

// d3.json(billsurl).then (data => {
//     console.log(data);
// });

// Build Charts
function buildCharts(billID) {
    console.log(billID);
    d3.csv(url).then(data => {

        let filteredData = data.filter(bill => bill["Legislation Number"] == billID)[0];
        let total_cosponsors = filteredData["Number of Cosponsors"];

        function countTo() {
            let from = 0;
            let to = total_cosponsors;
            let step = to > from ? 1 : -1;
            let interval = 100;

            if (from == to) {
                document.querySelector("#output").textContent = `${from}% Likely to Pass`;
                return;
            }

            let counter = setInterval(function() {
                from += step;
                document.querySelector("#output").textContent = `${from}% Likely to Pass`;

                if (from == to) {
                    clearInterval(counter);
                }
            }, interval);
        }

        countTo();

        let plotColors = ["rgb(255, 0, 0)", "rgb(12, 22, 204)", "rgb(128, 128, 128)"];

        let pieData = [{
            values: [120, 120, 10],
            labels: ["Democrat", "Republican", "Independent"],
            domain: {column: 0},
            name: 'Cosponsors',
            hoverinfo: 'label+value',
            hole: .5,
            type: 'pie',
            automargin: true,
            marker: {
                'colors': plotColors,
                'line': {
                    'color': '#0f0f0f',
                    'width': 2
                }},
          }];
          
          let pieLayout = {
            annotations: [
              {
                font: {
                  size: 20
                },
                showarrow: false,
                text: `Total<br>Cosponsors:<br> ${total_cosponsors}`,
                x: 0.14,
                y: 0.5
              }],
            height: 500,
            width: 800,
            showlegend: false,
            grid: {rows: 1, columns: 2},
            paper_bgcolor: "rgba(0,0,0,0)"
          };
          
          Plotly.newPlot('donut', pieData, pieLayout);
    })
};

// Populate Bill Information
function populateInfo(billID) {

    let InfoBox = d3.select("#sample-metadata");
  
    InfoBox.html(" ")
  
    d3.csv(url).then(data => {
        let filteredData = data.filter(bill => bill["Legislation Number"] == billID)[0];
        let title = filteredData.Title;
        let summary = filteredData["Latest Summary"].replaceAll('<p>', '').replaceAll('</p>', '').replaceAll('<br>', '').replaceAll('</br>', '');
        InfoBox.append("h4").text(`${billID}: ${title}`);
        InfoBox.append("p").text(`Summary: ${summary}`);
  
    })
}

// Option Change Function
function optionChanged(billID) {
    console.log(billID);
    buildCharts(billID);
    populateInfo(billID);
}

// Set Up Dashboard
function initDashboard() {
    let dropdown = d3.select("#selDataset")
    d3.csv(url).then(data => {
        let billIDs = [];
        for (let i = 0; i < data.length; i++) {
            billIDs.push(data[i]["Legislation Number"])
            dropdown.append("option").text(`${data[i]["Legislation Number"]}`).property("value", data[i]["Legislation Number"])
        }
        buildCharts(billIDs[0]);
        populateInfo(billIDs[0]);
});
};

initDashboard();

// Dropdowns for Make a Bill
