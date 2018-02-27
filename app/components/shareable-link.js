import Component from '@ember/component';
import { set, get } from '@ember/object';
import { inject as service } from '@ember/service';
import { run } from '@ember/runloop';

export default Component.extend({
  flashMessage: service(),
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

  actions: {

    setColor(color) {
      set(this, 'embedParams.color', color.name);
      set(this, 'selectedColor', color);
    },

    success(type) {
      const flash = get(this, 'flashMessage');
      flash.setProperties({
        message: `${type} COPIED TO CLIPBOARD`,
        show: true,
        success: true
      });
      run.later(this, () => {
        flash.setProperties({ message: '', show: false });
      }, 3000);
    },

    error() {
      const flash = get(this, 'flashMessage');
      flash.setProperties({
        message: 'FAILED TO COPY',
        show: true,
        success: false
      });
      run.later(this, () => {
        flash.setProperties({ show: false });
      }, 300);
    }
  }
});
