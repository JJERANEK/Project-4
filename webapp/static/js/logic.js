// const url = "https://usbillsapp.onrender.com/"
const url = "/Project_4/Project-4/Resources/House_113_118.csv"
// const delay = ms => new Promise(res => setTimeout(res, ms));

// let bill_data = 

// d3.csv(bill_data).then ((data => {
//     console.log(data);

//     let bill_id = data.Bill_id;
//     let title = data.Title;
//     let policy_area = data.Policy_area;
//     let bill_progress = data.Bill_progress;
//     let summary = data.Summary;

    
// }));

// Populate Bill Information
function populateInfo(billID) {

    let InfoBox = d3.select("#sample-metadata");
  
    InfoBox.html(" ")
  
    d3.csv(url).then(data => {
        let billID = data["Legislation Number"];
        let title = data.Title;
        let summary = data["Latest Summary"];
  
        console.log(data);
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
