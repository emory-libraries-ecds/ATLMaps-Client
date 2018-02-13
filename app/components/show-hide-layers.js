/**
 * @public
 * Component that shows or hides all layers of a type.
*/

import Component from '@ember/component';

import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  mapObject: service(),
  store: service(),
  tagName: '',
  showingAll: true,

  actions: {
    toggleAll() {
    //   const store = get(this, 'store');
      get(this, 'layers').forEach((layer) => {
        // Only toggle the ones that have been added to the map, not all that
        // are currently in the store.
        if (get(layer, 'active_in_project')) {
          if (get(this, 'showingAll')) {
            layer.setProperties({ opacity: 0 });
            get(layer, 'leaflet_object').setOpacity(0);
          } else {
            layer.setProperties({ opacity: 1 });
            get(layer, 'leaflet_object').setOpacity(1);
          }
        }
      });
      this.toggleProperty('showingAll');
    },

    toggleOne(layer) {
      if (get(layer, 'opacity') === 0) {
        layer.setProperties({ opacity: 10 });
      } else {
        layer.setProperties({ opacity: 0 });
      }
    }
  }
});
