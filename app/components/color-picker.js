/**
 * @public
 * Component to set color for a vector layer.
 */
import Component from '@ember/component';
import { set, get } from '@ember/object';
import { inject as service } from '@ember/service';
import UIkit from 'uikit';

export default Component.extend({
  dataColors: service(),
  tagName: '',

  colors: [],

  didInsertElement() {
    const group = get(this, 'projectLayer.vector_layer.data_type');
    if (group === 'Point') {
      set(this, 'colors', get(this, 'dataColors.safeMarkerColors'));
    } else {
      set(this, 'colors', get(this, 'dataColors.safeShapeColors'));
    }

    let colorModal = UIkit.modal(
      document.getElementById(`color-modal-${get(this, 'projectLayer.id')}`)
    );
    set(this, 'colorModal', colorModal);
  },

  willDestroyElement() {
    get(this, 'colorModal').destroy();
  },

  actions: {
    // Updates the color on the map, but does not save it.
    previewColor(color, index) {
      const projectLayer = get(this, 'projectLayer');

      projectLayer.setProperties({
        marker: index
      });
      const vector = projectLayer.get('vector_layer');
      vector.setProperties({
        colorName: color.name,
        colorHex: color.hex
      });
      return false;
    },

    setColor(projectLayer) {
      projectLayer.save().then(() => {
        get(this, 'colorModal').hide();
      });
    },

    // This is to reset the color when the cussor leaves the color picker
    // without having set a new color.
    // NOTE: I really hope this gets simplier when we move to JSONAPI.
    reset() {
      // const self = this;
      const projectLayer = get(this, 'projectLayer');
      projectLayer.rollbackAttributes();
      const vector = get(this, 'projectLayer.vector_layer');
      vector.setProperties({
        colorName: get(projectLayer, 'colorName'),
        colorHex: get(projectLayer, 'colorHex')
      });
      return false;
    },

    showModal() {
      get(this, 'colorModal').show();
    }
  }
});
