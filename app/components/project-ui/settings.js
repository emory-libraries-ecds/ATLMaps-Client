import Component from '@ember/component';
import { get } from '@ember/object';
import UIkit from 'uikit';

export default Component.extend({
  tagName: '',

  actions: {
    showIntroEdit() {
      UIkit.modal(document.getElementById('intro-edit')).show();
    },

    setCenterZoom(project) {
      const map = get(project, 'leafletObject');
      let newCenter = map.getCenter();
      let newZoom = map.getZoom();
      get(this, 'model.project').setProperties({
        center_lat: newCenter.lat,
        center_lng: newCenter.lng,
        zoom_level: newZoom
      });
    }
  }
});
