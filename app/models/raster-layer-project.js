import DS from 'ember-data';
import LayerProject from './layer-project';

const { attr, belongsTo } = DS;

export default LayerProject.extend({
  position: attr('number'),

  raster_layer: belongsTo('raster_layer', {
    async: false,
    inverse: null
  })
});
