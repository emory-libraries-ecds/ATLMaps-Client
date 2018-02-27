/* eslint new-cap: ["error", { "newIsCapExceptions": ['htmlSafe'] }] */
import { computed, get } from '@ember/object';
import { htmlSafe } from '@ember/string';
import DS from 'ember-data';

const {
  Model,
  attr,
  belongsTo
} = DS;

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
  feature_id: attr('string'),
  color_name: attr('string'),
  color_hex: attr('string'),

  // Ember SafeString to render HTML
  safeDescription: computed('description', function safeDescription() {
    return new htmlSafe(get(this, 'description'));
  }),

  latLng: computed('geojson', function latLng() {
    return [get(this, 'geojson.coordinates')[1], get(this, 'geojson.coordinates')[0]];
  }),

  colorHex: computed('color_hex', '_colorHex', function() {
    if (get(this, 'color_hex')) {
      return get(this, 'color_hex');
    }
    return get(this, '_colorHex');
  }),

  colorName: computed('color_name', '_colorName', function() {
    if (get(this, 'color_name')) {
      return get(this, 'color_name');
    }
    return get(this, '_colorName');
  }),

  // Temporary properties for editing
  lat: attr(),
  lon: attr()
});
