// TDOO: I seem to be needed; but I shouldn't exist.

import Controller from '@ember/controller';
import { get, set } from '@ember/object';
/* global L */

export default Controller.extend({
  markerIcon() {
    //
  },

  actions: {
    initMap(event) {
      set(this, 'map', event.target);
      this.map.zoomControl.setPosition('bottomleft');
    },

    pointToLayer(data, feature, latlng) {
      console.log(data)
      return L.marker(latlng, {
        color: get(data, 'colorHex'),
        icon: L.divIcon({ html: `<div class='shadow'></div><i class='layer-${get(data, 'colorName')} fa fa-map-marker'></i>` }),
        title: feature.properties.title
      });
    }
  }
});
