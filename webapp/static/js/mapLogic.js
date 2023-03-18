const base_url = window.location.href;
const billdataurl = `${base_url}api/v1/topbilldata`;


let coordinates = [39.50, -98.35];

let myMap = L.map("map", {
    center: coordinates,
    zoom: 5
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

function optionChanged(selection) {
    
};


let Alabama	                    = [32.806671, -86.791130];
let Alaska	                    = [61.370716, -152.404419];
let Arizona	                    = [33.729759, -111.431221];
let Arkansas	                = [34.969704, -92.373123];
let California	                = [36.116203, -119.681564];
let Colorado	                = [39.059811, -105.311104];
let Connecticut	                = [41.597782, -72.755371];
let Delaware	                = [39.318523, -75.507141];
let DistrictofColumbia	        = [38.897438, -77.026817];
let Florida	                    = [27.766279, -81.686783];
let Georgia	                    = [33.040619, -83.643074];
let Hawaii	                    = [21.094318, -157.498337];
let Idaho	                    = [44.240459, -114.478828];
let Illinois	                = [40.349457, -88.986137];
let Indiana	                    = [39.849426, -86.258278];
let Iowa	                    = [42.011539, -93.210526];
let Kansas	                    = [38.526600, -96.726486];
let Kentucky	                = [37.668140, -84.670067];
let Louisiana	                = [31.169546, -91.867805];
let Maine	                    = [44.693947, -69.381927];
let Maryland	                = [39.063946, -76.802101];
let Massachusetts	            = [42.230171, -71.530106];
let Michigan	                = [43.326618, -84.536095];
let Minnesota	                = [45.694454, -93.900192];
let Mississippi	                = [32.741646, -89.678696];
let Missouri	                = [38.456085, -92.288368];
let Montana	                    = [46.921925, -110.454353];
let Nebraska	                = [41.125370, -98.268082];
let Nevada	                    = [38.313515, -117.055374];
let NewHampshire	            = [43.452492, -71.563896];
let NewJersey	                = [40.298904, -74.521011];
let NewMexico	                = [34.840515, -106.248482];
let NewYork	                    = [42.165726, -74.948051];
let NorthCarolina	            = [35.630066, -79.806419];
let NorthDakota	                = [47.528912, -99.784012];
let Ohio	                    = [40.388783, -82.764915];
let Oklahoma	                = [35.565342, -96.928917];
let Oregon	                    = [44.572021, -122.070938];
let Pennsylvania	            = [40.590752, -77.209755];
let RhodeIsland	                = [41.680893, -71.511780];
let SouthCarolina	            = [33.856892, -80.945007];
let SouthDakota	                = [44.299782, -99.438828];
let Tennessee	                = [35.747845, -86.692345];
let Texas	                    = [31.054487, -97.563461];
let Utah	                    = [40.150032, -111.862434];
let Vermont	                    = [44.045876, -72.710686];
let Virginia	                = [37.769337, -78.169968];
let Washington	                = [47.400902, -121.490494];
let WestVirginia	            = [38.491226, -80.954453];
let Wisconsin	                = [44.268543, -89.616508];
let Wyoming	                    = [42.755966, -107.302490];

let state_decoder = {
    Alabama	        : "AL",
    Alaska	        : "AK",
    Arizona	        : "AZ",
    Arkansas	    : "AR",
    California	    : "CA",
    Colorado	    : "CO",
    Connecticut	    : "CT",
    Delaware	    : "DE",
    DistrictofColumbia:"DC",
    Florida	        : "FL",
    Georgia	        : "GA",
    Hawaii	        : "HI",
    Idaho	        : "ID",
    Illinois	    : "IL",
    Indiana	        : "IN",
    Iowa	        : "IA",
    Kansas	        : "KS",
    Kentucky	    : "KY",
    Louisiana	    : "LA",
    Maine	        : "ME",
    Maryland	    : "MD",
    Massachusetts	: "MA",
    Michigan	    : "MI",
    Minnesota	    : "MN",
    Mississippi	    : "MS",
    Missouri	    : "MO",
    Montana	        : "MT",
    Nebraska	    : "NE",
    Nevada	        : "NV",
    NewHampshire	: "NH",
    NewJersey	    : "NJ",
    NewMexico	    : "NM",
    NewYork	        : "NY",
    NorthCarolina	: "NC",
    NorthDakota	    : "ND",
    Ohio	        : "OH",
    Oklahoma	    : "OK",
    Oregon	        : "OR",
    Pennsylvania	: "PA",
    RhodeIsland	    : "RI",
    SouthCarolina	: "SC",
    SouthDakota	    : "SD",
    Tennessee	    : "TN",
    Texas	        : "TX",
    Utah	        : "UT",
    Vermont	        : "VT",
    Virginia	    : "VA",
    Washington	    : "WA",
    WestVirginia	: "WV",
    Wisconsin	    : "WI",
    Wyoming	        : "WY"
}

function getCoordinates() {

}

function loadpage() {
    d3.json(billdataurl).then(bills => {
        let topbills = [];
        bills.forEach( (bill) => {
            topbills.append(bill);
        });
    });
};

loadpage(parkname);