var socket = io.connect('http://localhost:1891');
var berkeleyCoords = [37.871016, -122.250791];
var indoorCoords = [55.9178, -3.2397];
var buildingId = "f4795fc6-7fa1-460e-b449-82c4a957f955";
// +x, +y
var shiftLat = indoorCoords[0] - berkeleyCoords[0] + .00075;
var shiftLng = indoorCoords[1] - berkeleyCoords[1] + 0.0005;

var indoor_map = L.Wrld.map("map", "90de4007cdd170854398f362eb1c834b", {
	center: indoorCoords,
	zoom: 16,
	indoorsEnabled: true
});

var circles = L.layerGroup([]);

socket.on('update', function(data) {
  console.log("Inside indoor update");
  var objectArray = data['locations'];
  objectArray.forEach(function(object) {
    object[0] += shiftLat;
    object[1] += shiftLng;
  });
  indoor_map.removeLayer(circles);
  circles.clearLayers();
  var circleArray = [];
  for (var i=0; i < objectArray.length; i++) {
    var obj = L.circle([objectArray[i][0], objectArray[i][1]], { radius: 1, indoorMapFloorId: objectArray[i][2],
		indoorMapId: "f4795fc6-7fa1-460e-b449-82c4a957f955"});
    circles.addLayer(obj);
  }
  circles.addTo(indoor_map);
  console.log(circles.getLayers().length);
  // circles = L.layerGroup(circleArray)
  // outdoor_heat.setLatLngs(objectArray);
  // indoor_heat.setLatLngs(locArray);
}, indoor_map, circles);


var marker = L.marker(indoorCoords, { title: "idk"}).addTo(indoor_map);
var indoorControl = new WrldIndoorControl("widget-container", indoor_map);

// function getRandomArbitrary(min, max) {
//   return Math.random() * (max - min) + min;
// };
//
// var latMin = 37.87;
// var latMax = 37.88;
// var lonMin = -122.25
// var lonMax = -122.26


// var uscCoords = [34.0224, -118.2851];
// var gpCoords = [34.0563, -118.246];
// var universalCoords = [34.1381, -118.3534];




// map.themes.setWeather(L.Wrld.themes.weather.Rainy);

// Generating dummy data for the heat map
// function genCoordArray(n) {
// 	var heatMapArray = [];
// 	for (var i = 0; i < n; i++) {
// 		var lat = getRandomArbitrary(latMin, latMax);
// 		var lon = getRandomArbitrary(lonMin, lonMax);
// 		var intensity = getRandomArbitrary(0.1, 1.0);
// 		heatMapArray.push([lat, lon]);
// 	}
// 	return heatMapArray;
// };

// Draw the heat map
// var heatMapArray = genCoordArray(500);



// var heat = L.heatLayer(heatMapArray, {radius: 25, minOpacity: 0.2}).addTo(map);

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

// $(function() {
// 	$('button').click(function() {
// 		$.ajax({
// 			url: '/modifyMap',
// 			data: $('form').serialize(),
// 			type: 'POST',
// 			success: function(response) {
// 				// console.log(response);
// 				var x = retrieve("dummy");
// 				var newCoords = genCoordArray(x);
// 				console.log(newCoords);
// 				heat.setLatLngs(newCoords);
// 			},
// 			error: function(error) {
// 				console.log(error);
// 			}
// 		});
// 	});
// });
