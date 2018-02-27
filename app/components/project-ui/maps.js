import Component from '@ember/component';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';
import UIkit from 'uikit';

export default Component.extend({
  tagName: '',
  store: service(),

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

        index++;
      }
    },

    // TODO: once using ember-leaflet, this will be done using the mut helper. Remove this action.
    setOpacity(layer, event) {
      layer.setProperties({opacity: event.target.value});
    }
  }
});
