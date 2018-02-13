import { get, computed } from '@ember/object';
import DS from 'ember-data';
import LayerProject from './layer-project';

const {
    attr,
    belongsTo
} = DS;

export default LayerProject.extend({
    position: attr(),
    raster_layer: belongsTo('raster_layer', {
        async: false,
        inverse: null
    }),
    // Non-API attributes for persisting state.
    // opacity: computed(function getOpacity() {
    //     return get(this, 'raster_layer_id.opacity');
    // }).property('raster_layer_id.opacity'),

    showing: computed(function isShowing() {
        return get(this, 'raster_layer.showing');
    }).property('raster_layer.showing')
});
