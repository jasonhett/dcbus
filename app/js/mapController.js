define(["lib/lodash","lib/leaflet/leaflet", "lib/q"], function(_, L, Q) {
		//return an object to define the "my/shirt" module.

		var map;

		return {

			//Initialize Map
			init: function(){

				var self = this;

				//Create Map
				map = L.map('map-container').setView([38.9238, -77.037], 15);

				var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
				self.addTileLayer(osmUrl, 8/*min zoom*/, 22/*max zoom*/);

				//on Event listeners
				//map.on('zoomstart', function(){self.hideShowBusStopLayer()});
				map.on('zoomend', self.hideShowBusStopLayer.bind(this));
			},

			addTileLayer: function(url, minZoom, maxZoom){
				var osm = new L.TileLayer(url, {minZoom: minZoom, maxZoom: maxZoom});
				map.addLayer(osm);
			},

			requestBusStops: function(lat, lon, radius) {

				var self = this;

				//construct url
				var params = {
					// Specify your subscription key
					'api_key': 'ccfeeb81bbc54b3cbc064f3e4d5266ea',
					// Specify values for optional parameters, as needed
					Lat: lat,
					Lon: lon,
					Radius: radius
				};

				var url = 'https://api.wmata.com/Bus.svc/json/jStops?' + self.param(params);

				//send request
				return Q.Promise(function (resolve, reject) {
					var request = new XMLHttpRequest();

					request.open("GET", url, true);
					request.onload = onload;
					request.onerror = onerror;
					request.send();

					function onload() {
						if (request.status === 200) {
							resolve(request.responseText);
						} else {
							reject(new Error("Status code was " + request.status));
						}
					}
					function onerror() {
						reject(new Error("Can't XHR " + JSON.stringify(url)));
					}
				});
			},

			addBusStops: function(args){
				debugger;
			},

			alertError: function(Error){
				debugger;
				alert(Error.message);
			},

			param: function(obj){
				var str = [];
				for(var p in obj)
					if (obj.hasOwnProperty(p)) {
						str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					}
				return str.join("&");
			},

			hideShowBusStopLayer: function(){
				var self = this;
				var zoom = map.getZoom();
				//if low enough bus layer and query extent for stops
				if(zoom >= 18){
					self.showBusStopLayer();
				} else { //if NOT low, hide bus layer
					self.hideBusStopLayer();
				}
			},

			showBusStopLayer: function(){
				var self = this;
				var center = map.getCenter();
				var radius = this.getMapRadiusM();
				self.requestBusStops(center.lat, center.lng, radius).then(self.addBusStops);
			},

			hideBusStopLayer: function(){

			},

			getMapRadiusM: function() {
				var mapBoundNorthEast = map.getBounds().getNorthEast();
				var mapDistance = mapBoundNorthEast.distanceTo(map.getCenter());
				return mapDistance;
			}

		}
	}
);


//$(function() {
//	var params = {
//		// Specify your subscription key
//		'api_key': '',
//		// Specify values for optional parameters, as needed
//		// Lat: "",
//		// Lon: "",
//		// Radius: "",
//	};
//
//	$.ajax({
//		url: 'https://api.wmata.com/Bus.svc/json/jStops?' + $.param(params),
//		type: 'GET',
//	})
//		.done(function(data) {
//			alert("success");
//		})
//		.fail(function() {
//			alert("error");
//		});
//});




//$(function() {
//	var params = {
//		// Specify your subscription key
//		'api_key': 'ccfeeb81bbc54b3cbc064f3e4d5266ea',
//		// Specify values for optional parameters, as needed
//		RouteID: "43"
//		// Lat: "",
//		// Lon: "",
//		// Radius: "",
//	};
//
//	$.ajax({
//		url: 'https://api.wmata.com/Bus.svc/json/jBusPositions?' + $.param(params),
//		type: 'GET'
//	})
//		.done(function(data) {
//			console.log(data);
//			data.BusPositions.forEach(function(busPos){
//				console.log(busPos)
//
//				//add bus pos to the map
//				var latlng = L.latLng(busPos.Lat, busPos.Lon);
//				L.marker(latlng).addTo(map);
//
//			})
//		})
//		.fail(function() {
//			alert("error");
//		});
//})