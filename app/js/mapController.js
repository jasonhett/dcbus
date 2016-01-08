define(["lib/lodash","lib/leaflet/leaflet", "lib/q", 'stopsController', 'routeController', 'utilities', 'busController'], function(_, L, Q, Stops, Route, Util, BusController) {
		//return an object to define the "my/shirt" module.

		var map,
			basemapLayer,
			stopLayer;


		return {

			//Initialize Map
			init: function(){

				var self = this;

				//Create Map
				map = L.map('map-container').setView([38.9238, -77.037], 15);
				map.locate({setView: true, maxZoom: 18})

				//Create layer for Basemap
				//var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
				var basemapURL = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
				basemapLayer = self.addBasemapLayer(basemapURL, 8/*min zoom*/, 22/*max zoom*/);
				stopLayer = Stops.addBusStopLayer(map);


				//Initialize Routes
				Route.init(map);
				BusController.init(map);

			},

			addBasemapLayer: function(url, minZoom, maxZoom){
				map.addLayer(new L.TileLayer(url, {minZoom: minZoom, maxZoom: maxZoom}));
				return basemapLayer;
			}

		}
	}
);
