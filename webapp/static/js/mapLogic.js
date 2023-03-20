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
}

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

// let pc = true;
// if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
//   pc = false;
// }
// var map1 = L.map("map", {
//   center: [39.50, -98.35],
//   zoom: 5,
//   dragging: pc,
//   tap: pc
// });

// const mapEl = document.querySelector("#map");
// mapEl.addEventListener("touchstart", onTwoFingerDrag);
// mapEl.addEventListener("touchend", onTwoFingerDrag);
// function onTwoFingerDrag (e) {
//   if (e.type === 'touchstart' && e.touches.length === 1) {
//     e.currentTarget.classList.add('swiping')
//   } else {
//     e.currentTarget.classList.remove('swiping')
//   }
// }