var socket = io.connect('http://localhost:1891');
var berkeleyCoords = [37.871016, -122.250791];
var indoorCoords = [55.9178, -3.2397]

var outdoor_map = L.Wrld.map("map", "90de4007cdd170854398f362eb1c834b", {
	center: berkeleyCoords,
	zoom: 16
});

var outdoor_heat = L.heatLayer([]).addTo(outdoor_map);

socket.on('update', function(data) {
  var outdoorObjectArray = data['locations'];
  outdoor_heat.setLatLngs(outdoorObjectArray);
}, outdoor_map, outdoor_heat);


var marker = L.marker([37.871016, -122.250791], { title: "Berkeley"}).addTo(outdoor_map);

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
