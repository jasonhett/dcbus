/**
 * Created by jasonhettmansperger on 5/25/15.
 */
define(["lib/lodash","lib/leaflet/leaflet", "lib/q", 'utilities', 'busController'], function(_, L, Q, Util, BusController) {
		//return an object to define the "my/shirt" module.
		var map;
		var stopLayer;
		var apiKey = 'ccfeeb81bbc54b3cbc064f3e4d5266ea';

		var masterMarkerList = [];


		var stopIcon = L.icon({
			iconUrl: 'app/images/busStop.png',
			iconSize: [32, 32],
			iconAnchor: [16, 0]
			//popupAnchor: [-3, -76],
			//shadowUrl: 'my-icon-shadow.png',
			//shadowRetinaUrl: 'my-icon-shadow@2x.png',
			//shadowSize: [68, 95],
			//shadowAnchor: [22, 94]
		});

		return {

			//Initialize Application
			addBusStopLayer: function(mainMap){
				map = mainMap;
				var self = this;

				stopLayer = L.layerGroup([]).addTo(map);

				//add Bus Stop Layer events
				//map.on('zoomend', self.hideShowBusStopLayer);
				map.on('moveend', self.updateBusStops.bind(this));

				return stopLayer;

			},

			updateBusStops: function(){

				var self = this;

				self.addBusStops();

				debugger;

				//if route, only show stops on route

				//else do normal add bus stops
			},

			addBusStops: function(){
				//empty all markers

				if(map.getZoom() >= 18){
					//fetch new markers
					var self = this;
					var center = map.getCenter();
					var radius = self.getMapRadiusM();
					var params = {
						// Specify your subscription key
						'api_key': apiKey,
						// Specify values for optional parameters, as needed
						Lat: center.lat,
						Lon: center.lng,
						Radius: radius
					};

					var url = 'https://api.wmata.com/Bus.svc/json/jStops?';

					Util.sendRequest(url, params)
						.then(function(data){
							var data = JSON.parse(data);
							var markerArray = [];
							data.Stops.forEach(function(busPos){

								if(_.contains(_.pluck(masterMarkerList, 'id'), busPos.StopID)){
									return;
								}

								var cloneStop = _.cloneDeep(busPos);
								var latlng = L.latLng(busPos.Lat, busPos.Lon);
								var newMarker = L.marker(latlng, {icon: stopIcon});

								//set on click events for marker;
								newMarker.on('click', function (evt){
									var params = {
										'api_key': apiKey,
										StopID: cloneStop.StopID
									};

									var url = 'https://api.wmata.com/NextBusService.svc/json/jPredictions?';

									Util.sendRequest(url, params)
										.then(function(data){
											var data = JSON.parse(data);
											self.deployBusStopPopup(data, newMarker, cloneStop);
											BusController.displayPopupBuses(data);
										})
								});

								stopLayer.addLayer(newMarker);
								masterMarkerList.push({marker: newMarker, id: busPos.StopID});
							})
						});
				} else {
					stopLayer.clearLayers();
					masterMarkerList = [];
				}
			},

			deployBusStopPopup: function(JSONdata, marker, stop){
				//construct content
				var popupContent = "<p>Stop: "+JSONdata.StopName+"</p>Next Bus Predictions <br />";
				_.forEach(JSONdata.Predictions, function(prediction){
					if(prediction.Minutes<30){
						popupContent += "<span>"+prediction.RouteID+": in "+prediction.Minutes+" minutes</span><br />";
					}
				})

				var popup = L.popup({autoPan: true,
									className: 'bus-stop-popup'})
					.setLatLng(marker._latlng)
					.setContent(popupContent)
					.openOn(map);

			},


			getMapRadiusM: function() {
				var mapBoundNorthEast = map.getBounds().getNorthEast();
				var mapDistance = mapBoundNorthEast.distanceTo(map.getCenter());
				return mapDistance;
			}
		}
	}
);
