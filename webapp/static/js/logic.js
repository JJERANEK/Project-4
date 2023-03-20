const url = "https://usbillsapp.onrender.com/api/v1/topbilldata"
// const url = "../../Resources/House_113_118.csv"
// const delay = ms => new Promise(res => setTimeout(res, ms));

// d3.json(billsurl).then (data => {
//     console.log(data);
// });

// Build Charts
function buildCharts(billID) {
    console.log(billID);
    d3.json(url).then(data => {

        let filteredData = data.filter(bill => bill["meta_data"]["bill_id"].toUpperCase() == billID)[0];
        let total_cosponsors = filteredData["cosponsors_total"];
        let dem_cosponsors = filteredData["cosponsors_dem"];
        let rep_cosponsors = filteredData["cosponsors_rep"];
        let ind_cosponsors = filteredData["cosponsors_ind"];

        function countTo() {
            let from = 0;
            let to = total_cosponsors;
            let step = to > from ? 1 : -1;
            let interval = 10;

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
            values: [rep_cosponsors, dem_cosponsors, ind_cosponsors],
            // Replace values with correct pulls
            labels: ["Republican", "Democrat", "Independent"],
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
  
    d3.json(url).then(data => {
        let filteredData = data.filter(bill => bill["meta_data"]["bill_id"].toUpperCase() == billID)[0];
        let title = filteredData["meta_data"]["title"];
        let summary = filteredData["meta_data"]["summary"];
        InfoBox.append("h4").text(`${billID}: ${title}` + "\n");
        InfoBox.append("p").text(`Summary: ${summary}`);
    })
};

function populateSponsor(billID) {
    let SponsorData = d3.select('#sponsor-metadata');

    SponsorData.html(" ")

    d3.json(url).then(data => {
        console.log(data);
        let filteredData = data.filter(bill => bill["meta_data"]["bill_id"].toUpperCase() == billID)[0];
        let committees = filteredData["committees"];
        let sponsorParty = filteredData["sponsor_party"].replace('R', 'Republican').replace('D', 'Democrat');
        let sponsorState = filteredData["sponsor_state"];
        console.log(filteredData);
        console.log(committees);
        SponsorData.append("p").text(`Sponsoring Party: ${sponsorParty}`);
        SponsorData.append("p").text(`Sponsoring State: ${sponsorState}`);
        SponsorData.append("p").text(`Committees: ${committees}`);
  
    })
};

// Option Change Function
function optionChanged(billID) {
    console.log(billID);
    buildCharts(billID);
    populateInfo(billID);
    populateSponsor(billID);
};

// Set Up Dashboard
function initDashboard() {
    let dropdown = d3.select("#selDataset")
    d3.json(url).then(data => {
        console.log(data);
        let billIDs = [];
        for (let i = 0; i < data.length; i++) {
            let metadata = data[i]["meta_data"];
            let billID = metadata["bill_id"].toUpperCase();
            let title = metadata["title"];
            billIDs.push(billID);
            dropdown.append("option").text(`${billID}: ${title}`).property("value", billID);
        }
        buildCharts(billIDs[0]);
        populateInfo(billIDs[0]);
        populateSponsor(billIDs[0]);
});
};

initDashboard();

