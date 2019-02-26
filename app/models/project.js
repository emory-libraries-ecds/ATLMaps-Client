/* eslint new-cap: ["error", { "newIsCapExceptions": ['htmlSafe'] }] */
import DS from 'ember-data';
import { sort, filterBy } from '@ember/object/computed';
import { A } from '@ember/array';
import { get, computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

const { Model, attr, hasMany } = DS;

export default Model.extend({
  name: attr('string', {
    defaultValue: 'Untitled'
  }),
  description: attr('string'),
  center_lat: attr('number', {
    defaultValue: 33.75440111
  }),
  center_lng: attr('number', {
    defaultValue: -84.3898111
  }),
  zoom_level: attr('number', {
    defaultValue: 13
  }),
  default_base_map: attr('string', {
    defaultValue: 'greyscale'
  }),
  user_id: attr(),
  new_project: attr('boolean'),
  saved: attr('boolean'),
  published: attr('boolean', {
    defaultValue: false
  }),
  featured: attr('boolean', {
    defaultValue: false
  }),
  user: attr(),
  raster_layer_project: hasMany('raster_layer_project', {
    async: false
  }),
  vector_layer_project: hasMany('vector_layer_project', {
    async: false
  }),
  raster_layers: hasMany('raster_layer', {
    async: true
  }),
  vector_layers: hasMany('vector_layer', {
    async: true
  }),
  slug: attr('string'),
  owner: attr(),
  mine: attr('boolean'),
  may_edit: attr('boolean'),
  intro: attr('string'),
  media: attr('string'),
  photo: attr('string'),
  card_url: attr('string'),

  // The following are non-API based attributes.

  // Non-API backed attributes for managing state.
  showingSearch: attr('boolean', {
    defaultValue: false
  }),

  showing_all_vectors: attr('boolean', {
    defaultValue: true
  }),

  showing_all_rasters: attr('boolean', {
    defaultValue: true
  }),

  safe_background_photo: computed('photo', function safeBackgroundPhoto() {
    return new htmlSafe(`background-image: url("${get(this, 'photo')}");`);
  }),

  safeIntro: computed('intro', function safeIntro() {
    return new htmlSafe(get(this, 'intro'));
  }),

  // Attribute that will be set to true if a user is "exploring".
  exploring: attr('boolean', {
    defaultValue: false
  }),

  // may_browse: attr('boolean', {
  //   defaultValue: false
  // }),

  // Computed property that sorts rasters by on the position their `position`
  // in the project. See http://emberjs.com/api/classes/Ember.computed.html#method_sort
  sortedRasterLayers: sort('raster_layer_project', '_positionSort'),
  _positionSort: ['position:desc'],

  // Used in determing which nav links to show.
  hasRasters: computed('raster_layer_project', function hasRasters() {
    return get(this, 'raster_layer_project.length') > 0;
  }),

  hasVectors: computed('vector_layer_project', function hasVectors() {
    return get(this, 'vector_layer_project.length') > 0;
  }),

  // The following computed values are used for the show/hide all toggle switch.
  // The goal is to turn the toggle switch back to true when you make a layer visiable again.

  // Like `hidden_vectors` we'll call length to see if any rasters are visiable.
  // visiable_rasters: computed.filterBy('raster_layer_project_ids', 'showing', true),

  // Like `hidden_vectors` we'll call length to see if any rasters are visiable.
  hiddenVectors: filterBy('vector_layers', 'showing', false),
  allVectorsHidden: computed('hiddenVectors', function allVectorsHidden() {
    get(this, 'hiddenVectors');
    return get(this, 'vector_layers').isEvery('showing', false);
  }),

  hiddenRasters: filterBy('raster_layers', 'opacity', '0'),
  allRastersHidden: computed('hiddenRasters', function allRastersHidden() {
    get(this, 'hiddenRasters');
    return get(this, 'raster_layers').isEvery('opacity', '0');
  }),

  hasIntro: computed('intro', 'media', function hasIntro() {
    if (get(this, 'intro') || get(this, 'media')) {
      return true;
    }
    return false;
  }),

  mediaOnly: computed('intro', 'media', function mediaOnly() {
    if (get(this, 'media') && get(this, 'intro') == null) {
      return true;
    }
    return false;
  }),

  baseMap: computed('default_base_map', function() {
    return get(this, 'baseMaps').findBy('name', get(this, 'default_base_map'));
  }),

  baseMaps: computed('', function() {
    return new A([
      {
        name: 'street',
        url: 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
        attribution:
          '&copy; Openstreetmap France | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        thumbnail: '/assets/images/street_map.png'
      },
      {
        name: 'greyscale',
        url:
          'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        thumbnail: '/assets/images/carto.png'
      },
      {
        name: 'satellite',
        url:
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution:
          'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        thumbnail: '/assets/images/satellite.png'
      }
    ]);
  })
});
