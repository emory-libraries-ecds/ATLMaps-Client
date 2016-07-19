import Ember from 'ember';
/* globals noUiSlider */
export default Ember.Component.extend({

    mapObject: Ember.inject.service('map-object'),
    classNames: ['opacity-slider'],

    didInsertElement: function(){
        let _this = this;
        var layer = this.get('layer');
        var options = {
            start: [ layer.get('opacity') ],
            connect: false,
            range: {
                'min': 0,
                'max': 10
            }
        };

        var slider = document.getElementById(layer.get('slider_id'));

        noUiSlider.create(slider, options, true);

        // Change the opactity when a user moves the slider.
        var valueInput = document.getElementById(layer.get('slider_value_id'));

        slider.noUiSlider.on('update', function(values, handle){
            var opacity = values[handle] / 10;
            // Get the Leaflet object and use its `setOpacity` to, well, set the opacity.
            _this.get('mapObject.rasterLayers')[layer.get('slug')].setOpacity(opacity);
            layer.setProperties({opacity: values[handle]});
        });

        valueInput.addEventListener('change', function(){
            slider.noUiSlider.set(this.value);
        });

        // Make a reference so we can destroy on exit.
        Ember.set(this, 'slider', slider);

        // Watch the toggle check box to show/hide all raster layers.
        let showHideSwitch = document.getElementById('toggle-layer-opacity');
        showHideSwitch.addEventListener('click', function(){
            if (Ember.$("input#toggle-layer-opacity").prop("checked")){
                slider.noUiSlider.set(10);
            }
            else{
                slider.noUiSlider.set(0);
            }
        });

        Ember.set(this, 'toggle', showHideSwitch);
    },

    willDestroyElement(){
        this.get('slider').noUiSlider.destroy();
        document.removeEventListener('click', this.get('toggle'));
    }

});
