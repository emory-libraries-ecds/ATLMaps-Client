// TODO make all computed properties camlecase and all API attributes
// snake case. This will make it easier to tell them apart in templates
// and modules...and to identify ones we no longer need.
/* eslint new-cap: ["error", { "newIsCapExceptions": ['htmlSafe'] }] */
import { get, computed } from '@ember/object';

import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/string';
import DS from 'ember-data';
import ENV from '../config/environment';

const {
  Model,
  attr,
  belongsTo,
  hasMany
} = DS;

export default Model.extend({
  /*
  * Extended by RasterLayer and VectorLayer
  */
  name: attr('string'),
  type: attr('string'),
  title: attr('string'),
  slug: attr('string'),
  keywords: attr('string'),
  description: attr('string'),
  safe_description: computed('description', function safeDescription() {
    return new htmlSafe(`${get(this, 'description')}`);
  }),
  layer: attr('string'),
  date: attr('date'),
  data_type: attr('string'),
  data_format: attr('string'),
  zoomlevels: attr('string'),
  minx: attr('number'),
  miny: attr('number'),
  maxx: attr('number'),
  maxy: attr('number'),
  attribution: attr('string'),
  project_ids: hasMany('project', {
    async: true
  }),
  tag_ids: hasMany('tag'),
  institution: belongsTo('institution'),
  tag_slugs: attr('string'),
  active: attr('boolean', {
    defaultValue: false
  }),
  active_in_project: attr('boolean', {
    defaultValue: false
  }),
  active_in_list: attr('boolean', {
    defaultValue: false
  }),
  shareUrl: computed('name', function absoluteUrl() {
    return `${ENV.absoluteBase}/layers/${get(this, 'name')}`;
  }),
  embedUrl: computed('name', function absoluteUrl() {
    return `${ENV.absoluteBase}/embed/${get(this, 'name')}?`;
  }),
  url: attr('string'),
  leaflet_id: attr('number'),
  leaflet_object: attr(),
  opacity: attr('number', {
    defaultValue: 1
  }),
  slider_id: attr('string'),
  mapObject: service(),
  showing: computed('opacity', function visiableLayer() {
    if (get(this, 'leaflet_object')) {
      if (Number.parseInt(get(this, 'opacity'), 1) !== 0) {
        get(this, 'leaflet_object').addTo(get(this, 'mapObject.map'));
        return true;
      }
      get(this, 'leaflet_object').remove();
      return false;
    }
    return true;
  })
});
