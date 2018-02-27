import Component from '@ember/component';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: '',
  layerSearch: service(),

  didRender() {
    get(this, 'model').setProperties({leafletObject: this.map})
  },

  // baseMap: computed('model')

  // {
  //   name: 'satellite',
  //   layer: L.layerGroup([
  //     L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  //       className: 'satellite base',
  //       thumbnail: '/assets/images/satellite.png',
  //       attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  //     }),
  //     L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_only_labels/{z}/{x}/{y}.png', {
  //       className: 'labels base',
  //       attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  //       subdomains: 'abcd'
  //     })
  //   ])
  // },
  // {
  //   name: 'greyscale',
  //   layer: L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
  //     className: 'greyscale base',
  //     thumbnail: '/assets/images/carto.png',
  //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  //     subdomains: 'abcd'
  //   })
  // }

  actions: {
    initMap(event) {
      // const _map = event.target;
      set(this, 'map', event.target)
      this.map.zoomControl.setPosition('bottomleft');
      get(this, 'layerSearch').setCurrentBounds(this.map.getBounds());
    },

    mapLayerAdded(rasterMap, obj) {
      rasterMap.setProperties({
        leafletObject: obj.target,
        activeInProject: true
      });
    },

    dataLayerAdded(dataFeature, obj) {
      dataFeature.setProperties({ leafletObject: obj.target});
      get(dataFeature, 'vector_layer').setProperties({activeInProject: true})
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
      leafletLayer.on('click', (event) => {
        event.target.closePopup();
        set(this, 'activeFeature', feature);
      });
    },

    closeFeature() {
      set(this, 'activeFeature', null);
    }
  }
});
