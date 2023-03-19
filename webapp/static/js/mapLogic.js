const base_url = window.location.href;
let updated_base_url = truncateString(base_url,base_url.length - 'usmap'.length);
const billdataurl = `${updated_base_url}api/v1/currentbilldata`;
let coordinates = [39.50, -98.35];
let plot_object = {
    "type": "Feature",
    "properties": {},
    "geometries": [
        {
          "type": "Circle",
          "coordinates": [0,0]
        }
    ]
}; 
let myMap = L.map("map", {
    center: coordinates,
    zoom: 5
});


// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);



function truncateString(str, num) {
    if (str.length > num) {
      return str.slice(0, num);
    } else {
      return str;
    }
  };

function optionChanged(selection) {
    
};

function getCoordinates() {

};

function aggregateBills() {

};

function loadpage() {
    d3.json(billdataurl).then(bills => {
        let currentbills = [];
        bills.forEach( (bill) => {
            currentbills.push(bill);
            stateCounts[bill['sponsor_state']] ++;
        });
        // add stateCounts to map
        stateList.forEach( (state) => {
            plot_object["coordinates"] = stateCoordDict[stateDict[state]];
            options = {
                "title":`Current Bills: ${stateCounts[state]}`,
                "riseOnHover":"true"
            };
            L.marker(plot_object["coordinates"], options).addTo(myMap);
        });
    });
};

loadpage();