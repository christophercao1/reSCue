function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
};

var latMin = 37.87;
var latMax = 37.88;
var lonMin = -122.25
var lonMax = -122.26


var uscCoords = [34.0224, -118.2851]; 
var gpCoords = [34.0563, -118.246]; 
var universalCoords = [34.1381, -118.3534];

var berkeleyCoords = [37.8719, -122.2585];  

var map = L.Wrld.map("map", "90de4007cdd170854398f362eb1c834b", {
	center: berkeleyCoords, 
	zoom: 16
}); 


map.themes.setWeather(L.Wrld.themes.weather.Rainy); 

// Generating dummy data for the heat map
function genCoordArray(n) {
	var heatMapArray = [];
	for (var i = 0; i < n; i++) {
		var lat = getRandomArbitrary(latMin, latMax); 
		var lon = getRandomArbitrary(lonMin, lonMax); 
		var intensity = getRandomArbitrary(0.1, 1.0);
		heatMapArray.push([lat, lon]); 
	} 
	return heatMapArray; 
};

// Draw the heat map 
var heatMapArray = genCoordArray(500); 
var heat = L.heatLayer(heatMapArray, {radius: 25, minOpacity: 0.2}).addTo(map); 


// Functions for  navigating indoors 
function exitIndoors() {
	map.indoors.exit(); 
	var heat = L.heatLayer(heatMapArray, {radius: 25, minOpacity: 0.2}).addTo(map);
};

function moveUp() {
	map.indoors.moveUp(); 
};

function moveDown() {
	map.indoors.moveDown(); 
};

function retrieve(id) {
	var element = document.getElementById(id); 
	var value = element.value; 
	return value;  
};

$(function() {
	$('button').click(function() {
		$.ajax({
			url: '/modifyMap', 
			data: $('form').serialize(), 
			type: 'POST', 
			success: function(response) {
				// console.log(response); 
				var x = retrieve("dummy");
				var newCoords = genCoordArray(x); 
				console.log(newCoords); 
				heat.setLatLngs(newCoords); 
			}, 
			error: function(error) {
				console.log(error); 
			}
		});
	});
});

