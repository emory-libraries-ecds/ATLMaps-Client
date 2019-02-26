import { get, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import DS from 'ember-data';
import LayerProject from './layer-project';

const { attr, belongsTo } = DS;

export default LayerProject.extend({
  vector_layer: belongsTo('vector_layer', {
    async: false,
    inverse: null
  }),
  marker: attr({ defaultValue: 0 }),
  data_type: computed('vector_layer', function() {
    return get(this, 'vector_layer.data_type');
  }),
  data_format: attr('string', {
    defaultValue: 'vector'
  }),
  dataColors: service(),

  colorName: computed('marker', function colorName() {
    if (get(this, 'data_type') === 'Point') {
      return (
        get(this, 'dataColors.markerColors')[this.get('marker')].name || null
      );
    }
    return (
      get(this, 'dataColors.shapeColors')[get(this, 'marker')].name || null
    );
  }),

  colorHex: computed('marker', function colorHex() {
    if (get(this, 'data_type') === 'Point') {
      return (
        get(this, 'dataColors.markerColors')[this.get('marker')].hex || null
      );
    }
    return get(this, 'dataColors.shapeColors')[get(this, 'marker')].hex || null;
  }),

  showing: computed('vector_layer.showing', function isShowing() {
    return get(this, 'vector_layer.showing');
  }).property('vector_layer.showing')
});
