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
    zoom: 5,
    zoomControl: true
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

myMap.scrollWheelZoom.disable();

L.Control.textbox = L.Control.extend({
    onAdd: function(map) {
        let text = L.DomUtil.create('div');
        text.id = "info_text";
        text.innerHTML = "<strong>Hold CTRL to Zoom</strong>"
        return text;
    },

    onRemove: function(map) {
        // Nothing to do here
    }
});
L.control.textbox = function(opts) { return new L.Control.textbox(opts);}
L.control.textbox({ position: 'bottomleft' }).addTo(myMap);

window.addEventListener("keyup", (e) => {
    if (!e.ctrlKey) {
        log(e);
        myMap.scrollWheelZoom.disable();
    }
});
window.addEventListener("keydown", (e) => {
    if (e.ctrlKey) {
        log(e);
        myMap.scrollWheelZoom.enable();
    }
});

function log(event){
  console.log( event.type );
};

function truncateString(str, num) {
    if (str.length > num) {
      return str.slice(0, num);
    } else {
      return str;
    }
};

function generateTable(state, currentbills) {
    let row = "";
    let rows = "";
    let table = "";
    let tableHeader = `<thead><tr><th scope="col">Bill ID</th><th scope="col">Bill Type</th><th scope="col">Title</th><th scope="col">Summary</th><th scope="col">Prediction</th><th scope="col">Probability</th></tr></thead>`;
    let tableBody = `<tbody>`;
    currentbills.forEach( (bill) => {
        if (bill['sponsor_state'] == state) {
            row = `<tr><th scope="row">1</th><td>${bill['meta_data']['bill_id']}</td><td>${bill['bill_type']}</td><td>${bill['meta_data']['title']}</td><td>${bill['meta_data']['summary']}</td><td>${bill['prediction']}</td><td>${bill['probability']}</td></tr>`;
            rows = rows + row;
        }
    });
    table = '<table class="table-responsive table-hover table-striped">' + tableHeader + tableBody + rows + '</tbody></table>';
    return table;
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

            // marker = L.marker(plot_object["coordinates"], options).addTo(myMap).on('click', () => {
            //     d3.select("#table-container").append(generateTable(state, currentbills));
            // }).on('mouseover', () => {
            //     showStateData();
            // }).on('mouseover', () => {
            //     hideStateData();
            // });

            // marker = L.marker(plot_object["coordinates"], options).addTo(myMap).on('click', () => {
            //     d3.select("#table-container").append("table", generateTable(state, currentbills));
            // });

            marker = L.marker(plot_object["coordinates"], options).addTo(myMap).on('click', () => {
                d3.select("#table-container").html(generateTable(state, currentbills));
            });

        });
    });
};

loadpage();