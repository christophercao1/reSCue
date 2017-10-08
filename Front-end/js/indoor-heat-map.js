var socket = io.connect('http://localhost:1891');
var berkeleyCoords = [37.871016, -122.250791];
var indoorCoords = [55.9178, -3.2397];
var buildingId = "f4795fc6-7fa1-460e-b449-82c4a957f955";
var shiftLat = indoorCoords[0] - berkeleyCoords[0] + .00075;
var shiftLng = indoorCoords[1] - berkeleyCoords[1] + 0.0005;

var indoor_map = L.Wrld.map("map", "90de4007cdd170854398f362eb1c834b", {
	center: berkeleyCoords,
	zoom: 16,
	indoorsEnabled: true
});

var outdoor_heat = L.heatLayer([]).addTo(indoor_map);
var indoor_heat = L.heatLayer([]).addTo(indoor_map);
var circles = L.layerGroup([]);

socket.on('update', function(data) {
  // Outside
  console.log("outdoor update");
  var outdoorObjectArray = data['locations'];
  var outdoorArray = [];
  for (var i=0; i < outdoorObjectArray.length; i++){
    var lat = outdoorObjectArray[i][0] + 0.0015;
    var lon = outdoorObjectArray[i][1] + 0.00095;
    outdoorArray.push([lat, lon]);
  }
  outdoor_heat.setLatLngs(outdoorArray);

  var indoorObjectArray = data['locations'];
  indoorObjectArray.forEach(function(object) {
    object[0] += shiftLat;
    object[1] += shiftLng;
  });
  indoor_map.removeLayer(circles);
  circles.clearLayers();
  for (var i=0; i < indoorObjectArray.length; i++) {
    var obj = L.circle([indoorObjectArray[i][0], indoorObjectArray[i][1]], { radius: 1, indoorMapFloorId: indoorObjectArray[i][2],
		indoorMapId: "f4795fc6-7fa1-460e-b449-82c4a957f955"});
    circles.addLayer(obj);
  }
  circles.addTo(indoor_map);

  // Adjusting inaccuracy in heatmap
  indoor_heat.setLatLngs(indoorObjectArray);

},  outdoor_heat, indoor_map, indoor_heat, circles);

var berkeleyMarker = L.marker(berkeleyCoords, { title: "CAL HACKS"}).addTo(indoor_map);
var indoorMarker = L.marker(indoorCoords, { title: "idk"}).addTo(indoor_map);
var indoorControl = new WrldIndoorControl("widget-container", indoor_map);

// Remove heat map upon entering
indoor_map.indoors.on("indoormapenter", function(e) {
  indoor_map.removeLayer(indoor_heat);
})

// Add the heat map back upon exit
indoor_map.indoors.on("indoormapexit", function(f) {
  indoor_heat.addTo(indoor_map);
})

berkeleyMarker.on("click", function(event) {
  indoor_map.panTo(L.latLng(indoorCoords[0], indoorCoords[1]));
});

indoorMarker.on("click", function(event) {
  indoor_map.panTo(L.latLng(berkeleyCoords[0], berkeleyCoords[1]));
})
