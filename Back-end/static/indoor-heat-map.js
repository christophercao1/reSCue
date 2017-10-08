function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
};

var latMin = 55.915; 
var latMax = 55.925;
var lonMin = -3.236;
var lonMax = -3.246;

var napierCoords = [55.9178, -3.2397];  

var map = L.Wrld.map("map", "90de4007cdd170854398f362eb1c834b", {
	center: napierCoords, 
	zoom: 16,
	indoorsEnabled: true
}); 


map.themes.setWeather(L.Wrld.themes.weather.Rainy); 

// Generating dummy data for the heat map
function genCoordArray(n) {
	var heatMapArray = [];
	for (var i = 0; i < n; i++) {
		var lat = getRandomArbitrary(latMin, latMax); 
		var lon = getRandomArbitrary(lonMin, lonMax); 
		heatMapArray.push([lat, lon]); 
	} 
	return heatMapArray; 
};

// Draw the heat map 
// Later need to replace n with the array of coordinates
var heatMapArray = genCoordArray(100); 
var heat = L.heatLayer(heatMapArray, {radius: 15, minOpacity: 0.2}).addTo(map); 

// Functions for  navigating indoors 
function exitIndoors() {
	map.indoors.exit(); 
	
};

function moveUp() {
	map.indoors.moveUp(); 
};

function moveDown() {
	map.indoors.moveDown(); 
};


function redraw() {
	heat.setLatLngs(genCoordArray(100));
}

function retrieve(id) {
	var element = document.getElementById(id); 
	var value = element.value; 
	return value;  
};

$(function() {
	$('button').click(function() {
		$.ajax({
			url: '/modifyIndoor', 
			data: $('form').serialize(), 
			type: 'POST', 
			success: function(response) {
				var x = retrieve("dummy");
				var newCoords = genCoordArray(x); 
				heat.setLatLngs(newCoords); 
			}, 
			error: function(error) {
				console.log(error); 
			}
		});
	});
});

