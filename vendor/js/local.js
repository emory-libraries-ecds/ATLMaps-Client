// // Random JavaScript

// $(document).ready(function(){
//   $.material.ripples(".btn, .navbar a");
//   $.material.input();
//   // (function(){
//   //   // init on shuffle items 
//   //   shuffle.init();
//   //   // init menu
//   // })();
  
  
//   // document events
//   $(document).on('click','#hide-layer-options',function(){
//     $(".layer-controls").animate({"left":"-100%"},500,"easeInQuint",function(){
//       $("#show-layer-options").fadeIn(500);
//     });
//   })
//   .on('click','#show-layer-options',function(){
//     $(".layer-controls").animate({"left":"0%"},500,"easeOutQuint");
//     $("#show-layer-options").fadeOut(500);
//   })
//   .on('click','.shuffle-items li.item',function(evt){
//     var $target = $(evt.target),
//         $target_slider = $target.parents('.slider');
    
//     if( $target_slider.length>0 ){
//       return false;
//     }
//     // if ($(this).hasClass('info') === false){
//     //   $(".shuffle-items li.item.info").remove();
//     //   $(".active_marker").removeClass("active_marker");
//     // }
//     // shuffle.click(this);
//   })
//   .on('slide','.shuffle-items li.item .slider',function(evt){
//     var $this = $(this);
//     $this.siblings('input').val($this.val()).change();
    
//   })
//   .on('mouseup','.togglebutton.opacity label',function(){

//     $( "span.toggle_label" ).toggleClass( "off" );

//     $(".vectorData").toggle();

//     var active = $(".togglebutton label input[type=checkbox]:first-child:checked").length>0;
    
//     if (active){
//        $('input.value-input').val('0')
//   $('.noUi-origin').css('left', '0%')
//   $('.wmsLayer').css('opacity', '0')
//     }
//     else{
//         $('input.value-input').val('10')
//   $('.noUi-origin').css('left', '100%')
//   $('.wmsLayer').css('opacity', '1')
//     }
//   });

 









  
//   //var options = {
//   //  valueNames: [ 'name', 'description' ],
//   //  indexAsync: true
//   //};
//   //
//   //var layerList = new List('searchableLayers', options);
  
// });

// //var map = '';