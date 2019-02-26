import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  layerSearch: service(),

  actions: {
    page(page, type) {
      this.sendAction('getResults', page, type);
    }
  }
});
