/**
 * Created by jnordling on 12/13/14.
 */
/* global define */
define(['map/MapController','main/config','widgets/baseMapGallery'], function(MapController,MainConfig,BaseMapGallery) {
    var self;
    return {
        init: function(){
            // We can load a Lost of stuff here
            //this.buil_panel_control();
            // Creating scope varable for reference
            this.launchMap()
            self = this
        },
        launchMap: function(){
            //this.buildLeftPannel();
            this.set_LeftPannelToggle();
            this.set_WindowResize();
            this.set_sizeMapArea();
            this.set_right_menu_toggle();
            MapController.init();
        },
        set_LeftPannelToggle: function(){
            $('#PanelToggle').click(function(){
                $('#PanelToggle').css('display','none');
                var pannel = $('#leftPanel');
                if (MainConfig.pannel_state ==true){
                    w = 0;
                    $('#PanelToggle').css('left','0');
                    MainConfig.pannel_state = false;
                }else{
                    w = 350
                    $('#PanelToggle').css('left','350px');
                    MainConfig.pannel_state = true;
                }
                pannel.animate({
                    width: w,
                  }, 250, function() {
                    MapController.mapResize();
                    $('#PanelToggle').css('display','');
                  });
            });
        },

        set_right_menu_toggle:function(){
            $('.item').click(function(){
                var item = $( ".item" );
                var fillPannel = $('#fillPannel')
                var menu_item = $('#'+this.id);
                if(menu_item.hasClass('active')){
                    item.removeClass( "active" );
                    fillPannel.hide( "fast",function(){
                        //hide complete
                    });
                }else{
                    self.build_menu_item(this.id);
                    item.removeClass( "active" );
                    menu_item.addClass('active');
                    fillPannel.show( "fast",function(){
                        //show complete
                    });
                }
            });
        },

        set_sizeMapArea:function(){

            var pannel_width = $('#leftPanel').width();
            var outbox_width = $('#outerbox').width();
            var outbox_height = $('#outerbox').height();
            $('#mapArea').css('width',outbox_width);
            $('#mapArea').css('height',outbox_height);


        },

        build_menu_item:function(id){
            if(id =="basemap"){
                var basemap = new BaseMapGallery({id:'baseMapGallery'},"rightNavContent");
                //console.log(basemap.);
            }else{
                $('#rightNavContent').html("");
            }

            //var sam = new Switch(
            //         {
            //             id:'LayerSwitch',
            //             onChange: function(){
            //                 console.log('djfdj');
            //             }
            //         },
            //         "leftcontent"
            //     );
        },

        set_WindowResize:function(){
            $( window ).resize(function() {
                self.set_sizeMapArea();
                MapController.mapResize();
            });
        }
    }
});