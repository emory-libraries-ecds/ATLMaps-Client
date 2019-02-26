/* eslint new-cap: ["error", { "newIsCapExceptions": ['htmlSafe'] }] */
import { computed, get } from '@ember/object';
import { htmlSafe } from '@ember/string';
import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  vector_layer: belongsTo('vector_layer', { async: false }),
  geometry_type: attr('string'),
  geojson: attr(),
  properties: attr(),
  filters: attr(),
  name: attr('string'),
  description: attr('string'),
  image: attr('string'),
  image_credit: attr('string'),
  images: attr(),
  youtube: attr('string'),
  vimeo: attr('string'),
  audio: attr('string'),
  color_name: attr('string'),
  feature_id: attr('string'),
  show: attr('boolean', {
    defaultValue: true
  }),

  // Ember SafeString to render HTML
  safeDescription: computed('description', function safeDescription() {
    return new htmlSafe(get(this, 'properties.description'));
  }),

  latLng: computed('geojson', function latLng() {
    return [
      get(this, 'geojson.coordinates')[1],
      get(this, 'geojson.coordinates')[0]
    ];
  }),

  // Temporary properties for editing
  lat: attr(),
  lon: attr(),

  colorHex: computed('vector_layer.filterdColors', function colorHex() {
    return get(this, 'vector_layer.filteredColors')[get(this, 'filters.grade')];
  })
});
