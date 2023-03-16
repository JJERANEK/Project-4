// const url = "https://usbillsapp.onrender.com/"
const url = "../../Resources/House_113_118.csv"
// const delay = ms => new Promise(res => setTimeout(res, ms));


// Populate Bill Information
function populateInfo(billID) {

    let InfoBox = d3.select("#sample-metadata");
  
    InfoBox.html(" ")
  
    d3.csv(url).then(data => {
        console.log(data);
        // let billIDs = [];
        // let titles = [];
        // let summaries = [];
        // for (let i = 0; i < data.length; i++) {
        //     billIDs.push(data[i]["Legislation Number"]);
        //     titles.push(data[i].Title);
        //     summaries.push(data[i]["Latest Summary"]);
        // };
        let filteredData = data.filter(bill => bill["Legislation Number"] == billID)[0];
        console.log(filteredData);
        let title = filteredData.Title;
        let summary = filteredData["Latest Summary"];
        InfoBox.append("h4").text(`${billID}: ${title}`);
        InfoBox.append("p").text(`${summary}`);
  
    })
}

// Option Change Function
function optionChanged(billID) {
    console.log(billID);
    // buildCharts(bill);
    populateInfo(billID);
}

// Set Up Dashboard
function initDashboard() {
    let dropdown = d3.select("#selDataset")
    d3.csv(url).then(data => {
        console.log(data);
        let billIDs = [];
        for (let i = 0; i < data.length; i++) {
            billIDs.push(data[i]["Legislation Number"])
            dropdown.append("option").text(data[i]["Legislation Number"]).property("value", data[i]["Legislation Number"])
        }
        // buildCharts(billIDs[0]);
        populateInfo(billIDs[0]);
});
};

initDashboard();

// Dropdowns for Make a Bill
