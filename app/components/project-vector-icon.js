import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Component.extend({
    tagName: 'span',

    didUpdate: function(){
        var layer = this.get('layer');
        var projectID = this.get('projectID');
        console.log("the component thinks the projectID is " + projectID);
        var _this = this;
        var marker = DS.PromiseObject.create({
            promise: _this.store.find('vector_layer_project', {
                project_id: projectID, vector_layer_id: layer.id
            })
        });
        marker.then(function() {
            // When we are on the `explore` route, we're not going to have saved
            // data to look up so we're going to search the DOM for the layer's
            // marker color and apply it.
            try {
                var markerColor = marker.content.content[0]._data.marker;
                Ember.$("span.geojson."+layer.get('layer_type')+"."+layer.get('layer')).addClass("map-marker layer-"+_this.globals.color_options[markerColor]);
            }
            catch(err) {
                markerColor = Ember.$('.leaflet-marker-icon.'+ layer.get('layer')).attr('class').split(/\s+/)[5];
                Ember.$("span.geojson."+layer.get('layer_type')+"."+layer.get('layer')).addClass("map-marker " + markerColor);
            }
        });
    },

    didInsertElement: function(){
        this.didUpdate();
    }
});