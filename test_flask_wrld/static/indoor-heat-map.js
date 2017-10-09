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

// Indoor Controller
var indoorControl = new WrldIndoorControl("widget-container", map);

// Generating dummy data for the heat map
function genCoordArray(n) {
	var heatMapArray = [];
	for (var i = 0; i < n; i++) {
		var lat = getRandomArbitrary(latMin, latMax); 
		var lon = getRandomArbitrary(lonMin, lonMax); 
		var floor = Math.floor(getRandomArbitrary(0, 4)); 
		// heatMapArray.push(L.latLng(lat, lon, altitude)); 
		heatMapArray.push([lat, lon, floor]); 
	} 
	return heatMapArray; 
};

var heatMapArray = genCoordArray(100);
console.log(heatMapArray); 

for (var i = 0; i < heatMapArray.length; i++) {
	L.circle([heatMapArray[i][0], heatMapArray[i][1]], { radius: 1, indoorMapFloorId: heatMapArray[i][2],
		indoorMapId: "f4795fc6-7fa1-460e-b449-82c4a957f955"})
		.addTo(map); 
}

// Draw the heat map 
// Later need to replace with the array of coordinates
 
// var heat = L.heatLayer(heatMapArray, {radius: 15, minOpacity: 0.2}).addTo(map);

setInterval(function(){
	var newCoords = genCoordArray(100);
	console.log(newCoords);  
	// heat.setLatLngs(newCoords); 
}, 30000)

map.indoors.on("indoormapenter", function(e) {
    console.log(map.indoors.getActiveIndoorMap().getIndoorMapId()); 
    floor = map.indoors.getFloor().getFloorIndex(); 
    // console.log(map.indoors.IndoorMapFloor.getFloorIndex());  
});

map.indoors.on("indoormapfloorchange", function(f) {
	floor = map.indoors.getFloor().getFloorIndex(); 
	console.log(map.indoors.getFloor().getFloorIndex()); 
})
// Functions for  navigating indoors 
// function exitIndoors() {
// 	map.indoors.exit(); 
// 	console.log("redrawing");

// 	// Replace this with call to API/database to get current coords
// 	var newCoords = genCoordArray(100);
// 	heat.setLatLngs(newCoords); 
// };

// function moveUp() {
// 	map.indoors.moveUp();
// 	console.log("redrawing");
// 	var newCoords = genCoordArray(100);
// 	heat.setLatLngs(newCoords); 
// };

// function moveDown() {
// 	map.indoors.moveDown(); 
// 	console.log("redrawing");
// 	var newCoords = genCoordArray(100);
// 	heat.setLatLngs(newCoords); 
// };


// function redraw() {
// 	// heat.setLatLngs(genCoordArray(100));

// }

// function retrieve(id) {
// 	var element = document.getElementById(id); 
// 	var value = element.value; 
// 	return value;  
// };

// $(function() {
// 	$('#randomize').click(function() {
// 		$.ajax({
// 			url: '/modifyIndoor', 
// 			data: $('form').serialize(), 
// 			type: 'POST', 
// 			success: function(response) {
// 				var x = retrieve("dummy");
// 				var newCoords = genCoordArray(x); 
// 				heat.setLatLngs(newCoords); 
// 			}, 
// 			error: function(error) {
// 				console.log(error); 
// 			}
// 		});
// 	});
// });

