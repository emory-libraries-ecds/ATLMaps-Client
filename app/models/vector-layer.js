import DS from 'ember-data';
import { computed, get } from '@ember/object';
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
    return dasherize(get(this, 'data_type'))
  }),
  showing: attr('boolean', {
    defaultValue: true
  })
});
