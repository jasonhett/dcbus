/**
 * Created by jasonhettmansperger on 5/25/15.
 */
define(["lib/lodash","lib/leaflet/leaflet", "lib/q"], function(_, L, Q) {
		//return an object to define the "my/shirt" module.
		return {

			sendRequest: function(url, paramObj){
				var self = this;

				url = url + self.param(paramObj);

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

			param: function(obj){
				var str = [];
				for(var p in obj)
					if (obj.hasOwnProperty(p)) {
						str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					}
				return str.join("&");
			}
		}
	}
);