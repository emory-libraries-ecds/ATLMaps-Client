import Component from '@ember/component';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: '',
  layerSearch: service(),

  didRender() {
    get(this, 'model').setProperties({ leafletObject: this.map });
  },

  actions: {
    initMap(event) {
      this._super(...arguments);
      // const _map = event.target;
      set(this, 'map', event.target);
      this.map.zoomControl.setPosition('bottomleft');
      get(this, 'layerSearch').setCurrentBounds(this.map.getBounds());
    },

    mapLayerAdded(rasterMap, obj) {
      this._super(...arguments);
      rasterMap.setProperties({
        leafletObject: obj.target,
        activeInProject: true
      });
    },

    updateBounds() {
      let map = get(this, 'model.leafletObject');
      if (map && 'getBounds' in map) {
        get(this, 'layerSearch').setCurrentBounds(map.getBounds());
      }
    },

    showFeature(feature) {
      set(this, 'activeFeature', feature);
    },

    showShapeFeature(feature, leafletFeature, leafletLayer) {
      leafletLayer.bindPopup();
      leafletLayer.on('click', event => {
        event.target.closePopup();
        set(this, 'activeFeature', feature);
      });
    },

    closeFeature() {
      set(this, 'activeFeature', null);
    }
  }
});
