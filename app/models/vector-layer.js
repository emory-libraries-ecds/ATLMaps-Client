import DS from 'ember-data';
import { computed, get } from '@ember/object';
import { filterBy } from '@ember/object/computed';
import { dasherize } from '@ember/string';
import Layer from './layer';

const { attr, belongsTo, hasMany } = DS;

export default Layer.extend({
  vector_layer_project: belongsTo('vector_layer_project', {
    async: true,
    inverse: null
  }),
  // vector_feature: attr(),
  vector_feature: hasMany('vector-feature', { async: false }),
  data_type: attr('string', {
    defaultValue: 'GeometryCollection'
  }),
  geojson: attr(),
  remote_geojson: attr(),
  filters: attr(),
  data_format: attr('string', {
    defaultValue: 'vector'
  }),
  fillOpacity: computed('showing', function() {
    if (get(this, 'showing') === false) {
      return 0;
    } else if (get(this, 'vector_feature').length > 0) {
      return 0.2;
    } else {
      return 1;
    }
  }),
  weight: attr('number', {
    defaultValue: 3
  }),
  dataTypeSlug: computed('data_type', function() {
    return dasherize(get(this, 'data_type'));
  }),
  // showing: attr('boolean', {
  //   defaultValue: true
  // })
  _hiddenFeatures: filterBy('vector_feature', 'show', true),
  showing: computed('vector_feature', function() {
    // get(this, '_hiddenFeatures');
    return this.get('vector_feature').isEvery('show', true);
  }),

  filteredColors: attr({
    defaultValue: {
      A: '#4CAF50',
      B: '#1E88E5',
      C: '#FFEB3B',
      D: '#F44336'
    }
  })
});
