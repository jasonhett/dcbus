/**
 * Created by jasonhettmansperger on 5/25/15.
 */
define(["lib/lodash","lib/leaflet/leaflet", "lib/q"], function(_, L, Q) {
		//return an object to define the "my/shirt" module.

		var map,
			basemapLayer,
			stopLayer;


		return {

			//Initialize Map
			init: function(mainMap){

				var self = this;

				//Create Map
				map = L.map('map-container').setView([38.9238, -77.037], 15);

				//Create layer for Basemap
				//var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
				var basemapURL = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
				self.addBasemapLayer(basemapURL, 8/*min zoom*/, 22/*max zoom*/);

				//Create layers for stops
				var stopLayer = Stops.addBusStopLayer(map);


			},

			addBasemapLayer: function(url, minZoom, maxZoom){
				basemapLayer = new L.TileLayer(url, {minZoom: minZoom, maxZoom: maxZoom});
				map.addLayer(basemapLayer);
			}

		}
	}
);