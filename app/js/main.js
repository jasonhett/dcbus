/**
 * Created by jasonhettmansperger on 5/9/15.
 */
define(["mapController"], function(MapController) {
		//return an object to define the "my/shirt" module.
		return {

			//Initialize Application
			init: function(){ 

				//Initialize the Map
				MapController.init();

			}

			//addToCart: function() {
			//	inventory.decrement(this);
			//	cart.add(this);
			//}
		}
	}
);
