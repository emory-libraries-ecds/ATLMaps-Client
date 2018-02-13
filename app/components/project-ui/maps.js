import Ember from 'ember';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';
import UIkit from 'uikit';

export default Ember.Component.extend({
  tagName: '',
  store: service(),
  mapObject: service(),

  didInsertElement() {
    UIkit.accordion(document.getElementById('sortable-maps'));
  },

  actions: {
    reorder(event) {
      let index = 1;
      for( let item of event.target.children) {
        set(this, 'modelToReorder', item.attributes['data-model'].value);
        let storeItem = get(this, 'store').peekRecord(
          get(this, 'modelToReorder'),
          item.attributes['data-id'].value
        );

        let newPosition = get(this, 'modelToReorder').length - index + 10;
        storeItem.setProperties({
          position: newPosition
        });

        // let rasterSlug = get(storeItem, 'raster_layer.slug');
        // TODO: this will go away when we move to ember-leaflet
        // get(this, 'mapObject.projectLayers.rasters')[rasterSlug].setZIndex(newPosition);
        index++;
      }
    },

    // TODO: once using ember-leaflet, this will be done using the mut helper. Remove this action.
    setOpacity(layer, event) {
      layer.setProperties({opacity: event.target.value});
      // get(layer, 'leaflet_object').setOpacity(event.target.value);
    }
  }
});
