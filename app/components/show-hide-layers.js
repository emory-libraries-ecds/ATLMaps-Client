/**
 * @public
 * Component that shows or hides all layers of a type.
 */

import Component from '@ember/component';
import { get } from '@ember/object';

export default Component.extend({
  tagName: '',

  actions: {
    toggleAll() {
      let layers = get(this, 'layers');
      if (layers.isEvery('opacity', '0')) {
        layers.setEach('opacity', '1');
        layers.setEach('fillOpacity', '0.2');
      } else {
        layers.setEach('opacity', '0');
        layers.setEach('fillOpacity', '0');
      }
    }
  }
});
