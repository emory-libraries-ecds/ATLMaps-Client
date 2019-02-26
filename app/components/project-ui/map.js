import Component from '@ember/component';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: '',
  layerSearch: service(),
  store: service(),

  didRender() {
    get(this, 'model').setProperties({ leafletObject: this.map });
  },

  setColor(feature) {
    return {
      color: '#ffffff',
      fillColor: feature.properties.style.color
    };
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

    showFeature(feature, projectLayer) {
      this.send('clearActiveFeature');
      set(this, 'activeFeature', feature);
      feature.setProperties({
        active: true,
        colorName: get(projectLayer, 'colorName'),
        colorHex: get(projectLayer, 'colorHex')
      });
    },

    showGeojsonFeature(feature, vectorLayer, leafletFeature, leafletLayer) {
      this.send('clearActiveFeature');
      leafletLayer.bindPopup();
      leafletFeature.vector_layer = vectorLayer;
      leafletFeature.colorHex = leafletFeature.properties.style.color;
      leafletLayer.on('click', event => {
        event.target.closePopup();
        set(this, 'activeFeature', leafletFeature);
      });
    },

    showShapeFeature(feature, leafletFeature, leafletLayer) {
      this.send('clearActiveFeature');
      leafletLayer.bindPopup();
      leafletLayer.on('click', event => {
        event.target.closePopup();
        set(this, 'activeFeature', feature);
        feature.setProperties({ active: true });
      });
    },

    closeFeature() {
      this.send('clearActiveFeature');
      set(this, 'activeFeature', null);
    },

    // Removes active calss for icon or shape.
    clearActiveFeature() {
      let features = get(this, 'store').peekAll('vector_feature');
      features.forEach(feature => {
        feature.setProperties({ active: false });
      });
    }
  }
});
