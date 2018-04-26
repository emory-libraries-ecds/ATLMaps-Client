import Component from '@ember/component';
import { set, get } from '@ember/object';
import { inject as service } from '@ember/service';
import UIkit from 'uikit';

export default Component.extend({
  dataColors: service(),
  baseMaps: service(),
  tagName: '',

  shareUrlId: '',
  embedCodeId: '',
  height: 600,
  width: 800,
  embedParams: {
    color: 'red',
    base: 'greyscale'
  },
  selectedColor: null,

  didInsertElement() {
    const layer = get(this, 'layer');
    let shareModal = UIkit.modal(
      document.getElementById(`share-modal-${get(layer, 'name')}${layer.id}`)
    );
    let embedModal = UIkit.modal(
      document.getElementById(`embed-modal-${get(layer, 'name')}${layer.id}`)
    );
    set(this, 'shareModal', shareModal);
    set(this, 'embedModal', embedModal);
  },

  actions: {
    setColor(color) {
      set(this, 'embedParams.color', color.name);
      set(this, 'selectedColor', color);
    },

    success(type) {
      UIkit.notification({
        message: `${type} copied to clipboard`,
        status: 'success'
      });
    },

    error() {
      UIkit.notification({
        message: 'Error copying URL to clipboard',
        status: 'danger'
      });
    },

    showModal(type) {
      if (type === 'share') {
        get(this, 'shareModal').show();
      } else {
        get(this, 'embedModal').show();
      }
    }
  }
});
