/**
 * Created by jasonhettmansperger on 5/25/15.
 */
define(["lib/lodash","lib/leaflet/leaflet", "lib/q", 'utilities'], function(_, L, Q, Util) {
		//return an object to define the "my/shirt" module.

		var map
		var routeList = [];
		var apiKey = 'ccfeeb81bbc54b3cbc064f3e4d5266ea';


		return {

			//Initialize Map
			init: function(mainMap){

				var self = this;
				map = mainMap;

				self.initRouteSelector();

			},

			addRoute: function(routeID){

				var self = this;
				var routInfo = self.requestRouteInfo(routeID);

			},

			initRouteSelector: function(){

				var self = this;

				var routeSelector = document.getElementById("routeSelector");

				var params = {
					'api_key': apiKey
				};

				var url = 'https://api.wmata.com/Bus.svc/json/jRoutes?';

				Util.sendRequest(url, params).then(function(data){

					var JSONdata = JSON.parse(data);

					_.forEach(JSONdata.Routes, function(route){
						var option = document.createElement("option");
						option.text = route.Name;
						option.value = route.RouteID;
						routeSelector.add(option);
					})

				})

				routeSelector.addEventListener('change', function(evt){self.newRouteSelect(evt)});
				//routeSelector.onchange = self.newRouteSelect;


			},


			requestRouteInfo: function(routeID){

				var self = this;

				var params = {
					'api_key': apiKey,
					RouteID: routeID
				};

				var url = 'https://api.wmata.com/Bus.svc/json/jRouteDetails?';
				Util.sendRequest(url, params).then(function(data){

					var JSONdata = JSON.parse(data);

					self.addRouteToMap(JSONdata);

				});

			},

			newRouteSelect: function(evt){

				var self = this;

				self.addRoute(evt.target.value);

			},

			getRouteColor: function(direction){

				var color;
				switch (direction) {
					case "NORTH":
						color = 'red';
						break
					case "SOUTH":
						color = 'blue';
						break
					case "EAST":
						color = 'orange'
						break
					case "WEST":
						color = 'green'
						break
					case "LOOP":
						color = 'yellow'
						break
					default:
						color = 'grey'
						break;
				}

				return color;
			},

			getPointList: function(shape){

				shape = _.sortBy(shape, 'SeqNum')

				var latLngArray = _.map(shape, function(point){
					return (new L.LatLng(point.Lat, point.Lon));
				})

				debugger;

				return latLngArray;

			},

			addRouteToMap: function(JSONdata){

				var self = this;

				self.deleteRoutes();

				_.forEach(JSONdata, function(key){
					if(key.DirectionText){

						var routeColor = self.getRouteColor(key.DirectionText);
						var pointList = self.getPointList(key.Shape)

						var routePolyLine = new L.Polyline(pointList, {
							color: routeColor,
							weight: 6,
							opacity: 0.5,
							smoothFactor: 1

						});

						routePolyLine.addTo(map);

						routeList.push(routePolyLine);

					}
				})

				self.fitMapToRoutes();

			},

			fitMapToRoutes: function(){

				var allRouteLatLons = [];
				_.forEach(routeList, function(route){
					allRouteLatLons = allRouteLatLons.concat(route._latlngs);
				})

				map.fitBounds(allRouteLatLons);

			},

			deleteRoutes: function(){
				_.forEach(routeList, function(route){
					map.removeLayer(route);
				})
				routeList = [];
			}

		}
	}
);