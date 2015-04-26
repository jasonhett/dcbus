/**
 * Created by jnordling on 12/13/14.
 */
define(["esri/map","map/map_config"],function(Map,MapConfig){
    'use strict';
    var brmap;
    return{
        init: function(){

            brmap = new Map("mapDiv", {
                center: [-77.03687,38.90719],
                zoom: 12,
                basemap: MapConfig.default_basemap,
                autoResize: true
            });

        },
        mapResize:function(){
            brmap.resize();
        },
        changeBaseMap:function(obj){
            brmap.setBasemap(obj.target.id);
        }
    };
});