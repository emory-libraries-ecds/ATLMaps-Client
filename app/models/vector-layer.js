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
  filters: attr(),
  data_format: attr('string', {
    defaultValue: 'vector'
  }),
  fillOpacity: attr('number', {
    defaultValue: 0.2
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
  showing: computed(function() {
    // get(this, '_hiddenFeatures');
    return this.get('vector_feature').isEvery('show', true);
  })
});
