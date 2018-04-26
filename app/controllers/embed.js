import Controller from '@ember/controller';
import { computed, get, getProperties, set } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';
import UIkit from 'uikit';

export default Controller.extend({
  baseMaps: service(),

  queryParams: ['base', 'color'],

  base: null,

  color: null,

  activeFeature: null,

  baseMap: computed('base', function() {
    let base = get(this, 'base') || 'greyscale';
    return get(this, `baseMaps.${base}`);
  }),

  raster: computed('model', function() {
    if (get(this, 'model.rasters')) {
      return get(this.model.rasters, 'firstObject');
    }
  }),

  vector: computed('model', function() {
    if (get(this, 'model.vectors')) {
      return get(this.model.vectors, 'firstObject');
    }
  }),

  layer: computed('raster', 'vector', function() {
    if (get(this, 'vector')) {
      return get(this, 'vector');
    } else {
      return get(this, 'raster');
    }
  }),

  rasterOnly: computed('model', function() {
    return isEmpty(this.model.vectors);
  }),

  actions: {
    initMap(event) {
      set(this, 'map', event.target);
      this.map.zoomControl.setPosition('bottomleft');
      set(
        this,
        'featureDetail',
        UIkit.offcanvas(document.getElementById('embed-feature-detail'))
      );
    },

    mapLayerAdded(rasterMap, obj) {
      rasterMap.setProperties({
        leafletObject: obj.target,
        activeInProject: true
      });

      let rasterMapProps = getProperties(
        rasterMap,
        'minx',
        'maxx',
        'miny',
        'maxy'
      );

      get(this, 'map').fitBounds([
        [rasterMapProps.maxy, rasterMapProps.maxx],
        [rasterMapProps.miny, rasterMapProps.minx]
      ]);
    },

    switchBase(base) {
      set(this, 'base', base);
    },

    showFeature(feature) {
      set(this, 'feature', feature);
      get(this, 'featureDetail').show();
    }
  }
});
