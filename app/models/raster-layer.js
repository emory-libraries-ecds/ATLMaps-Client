/* eslint new-cap: ["error", { "newIsCapExceptions": ['htmlSafe'] }] */
import { get, computed } from '@ember/object';

import { htmlSafe } from '@ember/string';
import DS from 'ember-data';
import Layer from './layer';

const {
  attr,
  belongsTo
} = DS;

export default Layer.extend({
  workspace: attr('string'),
  raster_layer_project: belongsTo('raster_layer_project', {
    async: true,
    inverse: null
  }),

  layers: attr('string'),

  thumb: attr(),

  safe_background_thumb: computed('photo', function safeBackgroundPhoto() {
    return new htmlSafe(`background-image: url("${get(this, 'thumb.url')}");`);
  }),

  showing: computed('opacity', function visiableLayer() {
    return get(this, 'opacity') === 0 ? false : true;
  })
});
