/**
 * Created by jnordling on 12/14/14.
 */
define([],function(){
   return{
          pannel_state: true,
          default_basemap:"streets",
          basemaps_options :[
             {
                'name': 'satellite',
                'thumbnail': 'http://www.arcgis.com/sharing/rest/content/items/413fd05bbd7342f5991d5ec96f4f8b18/info/thumbnail/imagery_labels.jpg'
             },
             {
                'name':'streets',
                'thumbnail':'http://www.arcgis.com/sharing/rest/content/items/d8855ee4d3d74413babfb0f41203b168/info/thumbnail/world_street_map.jpg'
             },
             {
                'name':'gray',
                'thumbnail':"http://www.arcgis.com/sharing/rest/content/items/8b3b470883a744aeb60e5fff0a319ce7/info/thumbnail/light_gray_canvas.jpg"
             },
             {
                'name':'gray',
                'thumbnail':"http://www.arcgis.com/sharing/rest/content/items/8b3b470883a744aeb60e5fff0a319ce7/info/thumbnail/light_gray_canvas.jpg"
             },
             {
                'name':'gray',
                'thumbnail':"http://www.arcgis.com/sharing/rest/content/items/8b3b470883a744aeb60e5fff0a319ce7/info/thumbnail/light_gray_canvas.jpg"
             }
          ],
          layers:[
            {
              'name':'Layer1',
              'url':'#url'
            },
            {
              'name':'Layer2',
              'url':'#url'
            },
            {
              'name':'Layer2',
              'url':'#url'
            }
          ]
   }
});