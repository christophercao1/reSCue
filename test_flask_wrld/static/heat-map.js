function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
};

var latMin = 34.02; 
var latMax = 34.03; 
var lonMin = -118.28; 
var lonMax = -118.29; 

var hsLatMin = 34.02001; 
var hsLatMax = 34.02002; 
var hsLonMin = -118.28001;
var hsLonMax = -118.29001; 

var dummyDataLength = 800; 

var uscCoords = [34.0224, -118.2851]; 
var gpCoords = [34.0563, -118.246]; 
var universalCoords = [34.1381, -118.3534]; 

var map = L.Wrld.map("map", "90de4007cdd170854398f362eb1c834b", {
	center: uscCoords, 
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
		var intensity = getRandomArbitrary(0.1, 1.0);
		heatMapArray.push([lat, lon]); 
	} 

	for (var i = 0; i < 10; i++) {
		var hsLat = getRandomArbitrary(hsLatMin, hsLatMax);
		var hsLon = getRandomArbitrary(hsLonMin, hsLonMax); 
		heatMapArray.push([lat, lon]); 
	}
	return heatMapArray; 
}

// Draw the heat map 
var heatMapArray = genCoordArray(500); 
var heat = L.heatLayer(heatMapArray, {radius: 25, minOpacity: 0.15}).addTo(map); 

function retrieve(id) {
	var element = document.getElementById(id); 
	var value = element.value; 
	// console.log(value);
	return value;  
}

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

