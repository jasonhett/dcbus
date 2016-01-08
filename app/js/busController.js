/**
 * Created by jasonhettmansperger on 5/25/15.
 */
define(["lib/lodash","lib/leaflet/leaflet", "lib/q", 'utilities'], function(_, L, Q, Util) {
		//return an object to define the "my/shirt" module.

		var map;
		var apiKey = 'ccfeeb81bbc54b3cbc064f3e4d5266ea';
		var stopLayer;
		var map;

		var busIcon = L.icon({
			iconUrl: 'app/images/busStop2.png',
			iconSize: [32, 32],
			iconAnchor: [16, 0]
			//popupAnchor: [-3, -76],
			//shadowUrl: 'my-icon-shadow.png',
			//shadowRetinaUrl: 'my-icon-shadow@2x.png',
			//shadowSize: [68, 95],
			//shadowAnchor: [22, 94]
		});

		return {

			//Initialize Map
			init: function(mainMap){
				debugger
				map = mainMap;

				stopLayer = L.layerGroup([]).addTo(map);

			},

			displayPopupBuses: function(data){

				var self = this;

				var busIDs = _.pluck(data.Predictions, 'VehicleID');
				var routeIDs = _.uniq(_.pluck(data.Predictions, 'RouteID'));

				routeIDs.forEach(function(routeID){
					var params = {
						'api_key': apiKey,
						RouteID: routeID
					};

					var url = 'https://api.wmata.com/Bus.svc/json/jBusPositions?';
					Util.sendRequest(url, params).then(function(data){

						var JSONdata = JSON.parse(data);
						var busesInPopup = _.filter(JSONdata.BusPositions, function(busData){
							if(_.contains(busIDs, busData.VehicleID)){
								var latlng = L.latLng(busData.Lat, busData.Lon);
								var newMarker = L.marker(latlng, {icon: busIcon});
								stopLayer.addLayer(newMarker);
							}

						});


						debugger;

					});
				})

			}

		}
	}
);
